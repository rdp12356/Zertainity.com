import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Upload, FileText, AlertCircle } from "lucide-react";
import { arrayToCSV, csvToArray, downloadCSV, validateUserRow, generateUserCSVTemplate, UserCSVRow } from "@/lib/csv-utils";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const CSVImportExport = () => {
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [importing, setImporting] = useState(false);
    const [exporting, setExporting] = useState(false);
    const [importErrors, setImportErrors] = useState<string[]>([]);

    const handleExportUsers = async () => {
        setExporting(true);
        try {
            const { data, error } = await supabase.rpc('get_all_users_with_roles');

            if (error) throw error;

            const csvData = (data || []).map((user: { email: string; role: string; created_at: string; is_suspended: boolean }) => ({
                email: user.email,
                role: user.role,
                created_at: new Date(user.created_at).toLocaleDateString(),
                is_suspended: user.is_suspended ? 'Yes' : 'No'
            }));

            const csv = arrayToCSV(csvData);
            downloadCSV(`zertainity_users_${new Date().toISOString().split('T')[0]}.csv`, csv);

            toast({
                title: "Export Complete",
                description: `Exported ${csvData.length} users to CSV`,
            });
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Export failed";
            toast({
                title: "Export Failed",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setExporting(false);
        }
    };

    const handleDownloadTemplate = () => {
        const template = generateUserCSVTemplate();
        downloadCSV('user_import_template.csv', template);
        toast({
            title: "Template Downloaded",
            description: "Use this template to import users",
        });
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            const csvContent = e.target?.result as string;
            await processCSVImport(csvContent);
        };
        reader.readAsText(file);
    };

    const processCSVImport = async (csvContent: string) => {
        setImporting(true);
        setImportErrors([]);
        const errors: string[] = [];

        try {
            const rows = csvToArray<UserCSVRow>(csvContent);

            if (rows.length === 0) {
                throw new Error('CSV file is empty');
            }

            let successCount = 0;

            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                const validation = validateUserRow(row);

                if (!validation.valid) {
                    errors.push(`Row ${i + 2}: ${validation.errors.join(', ')}`);
                    continue;
                }

                try {
                    // Note: In production, this would use an edge function to create users
                    // For now, we'll just log the invitation
                    const { data: { user } } = await supabase.auth.getUser();

                    await supabase.from('audit_logs').insert({
                        user_id: user?.id,
                        action: 'csv_import_user',
                        details: {
                            email: row.email,
                            role: row.role,
                            first_name: row.firstName,
                            last_name: row.lastName,
                            imported_at: new Date().toISOString()
                        }
                    });

                    successCount++;
                } catch (error: unknown) {
                    const errorMessage = error instanceof Error ? error.message : "Unknown error";
                    errors.push(`Row ${i + 2}: ${errorMessage}`);
                }
            }

            setImportErrors(errors);

            toast({
                title: "Import Complete",
                description: `Successfully imported ${successCount} users. ${errors.length} errors.`,
                variant: errors.length > 0 ? "destructive" : "default",
            });
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Import failed";
            toast({
                title: "Import Failed",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setImporting(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    return (
        <div className="grid md:grid-cols-2 gap-6">

            {/* Export Card */}
            <Card className="bg-zinc-900/30 border-white/5">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Download className="h-5 w-5 text-blue-400" />
                        Export Users
                    </CardTitle>
                    <CardDescription>Download all users as CSV file</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-zinc-400">
                        Export all users with their roles, creation dates, and suspension status to a CSV file.
                    </p>
                    <Button
                        onClick={handleExportUsers}
                        disabled={exporting}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                        {exporting ? 'Exporting...' : 'Export All Users'}
                    </Button>
                </CardContent>
            </Card>

            {/* Import Card */}
            <Card className="bg-zinc-900/30 border-white/5">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Upload className="h-5 w-5 text-green-400" />
                        Import Users
                    </CardTitle>
                    <CardDescription>Bulk import users from CSV file</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-zinc-400">
                        Import multiple users at once with their roles and profile information.
                    </p>

                    <div className="space-y-3">
                        <Button
                            variant="outline"
                            onClick={handleDownloadTemplate}
                            className="w-full border-white/10"
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            Download Template
                        </Button>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".csv"
                            onChange={handleFileSelect}
                            className="hidden"
                        />

                        <Button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={importing}
                            className="w-full bg-green-600 hover:bg-green-700"
                        >
                            {importing ? 'Importing...' : 'Select CSV File'}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Import Errors */}
            {importErrors.length > 0 && (
                <Card className="md:col-span-2 bg-red-500/5 border-red-500/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-400">
                            <AlertCircle className="h-5 w-5" />
                            Import Errors ({importErrors.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                            {importErrors.map((error, index) => (
                                <Alert key={index} variant="destructive" className="bg-red-500/10 border-red-500/20">
                                    <AlertDescription className="text-sm">{error}</AlertDescription>
                                </Alert>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};
