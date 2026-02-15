import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Filter, Clock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { arrayToCSV, downloadCSV } from "@/lib/csv-utils";

interface AuditLog {
    id: string;
    user_id: string;
    action: string;
    details: any;
    created_at: string;
}

export const AuditLogViewer = () => {
    const { toast } = useToast();
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [actionFilter, setActionFilter] = useState<string>("all");

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('audit_logs')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(100);

            if (error) throw error;
            setLogs(data || []);
        } catch (error: any) {
            toast({
                title: "Error fetching audit logs",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const handleExport = () => {
        const csvData = logs.map(log => ({
            timestamp: new Date(log.created_at).toLocaleString(),
            user_id: log.user_id,
            action: log.action,
            details: JSON.stringify(log.details)
        }));

        const csv = arrayToCSV(csvData);
        downloadCSV(`audit_logs_${new Date().toISOString().split('T')[0]}.csv`, csv);

        toast({
            title: "Export Complete",
            description: `Exported ${logs.length} audit log entries`,
        });
    };

    const getActionBadgeColor = (action: string) => {
        if (action.includes('delete')) return 'bg-red-500/10 text-red-400 border-red-500/20';
        if (action.includes('create') || action.includes('invite')) return 'bg-green-500/10 text-green-400 border-green-500/20';
        if (action.includes('update') || action.includes('change')) return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
        if (action.includes('suspend')) return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
        return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
    };

    const filteredLogs = logs.filter(log => {
        const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.user_id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = actionFilter === 'all' || log.action.toLowerCase().includes(actionFilter);
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-6">

            {/* Header & Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="flex items-center gap-3 flex-1 max-w-md">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <Input
                            placeholder="Search logs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-zinc-900/50 border-white/10"
                        />
                    </div>

                    <Select value={actionFilter} onValueChange={setActionFilter}>
                        <SelectTrigger className="w-40 bg-zinc-900/50 border-white/10">
                            <Filter className="h-4 w-4 mr-2" />
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Actions</SelectItem>
                            <SelectItem value="create">Create</SelectItem>
                            <SelectItem value="update">Update</SelectItem>
                            <SelectItem value="delete">Delete</SelectItem>
                            <SelectItem value="suspend">Suspend</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex gap-3">
                    <Button variant="outline" onClick={fetchLogs} disabled={loading} className="border-white/10">
                        <Clock className="mr-2 h-4 w-4" />
                        Refresh
                    </Button>
                    <Button variant="outline" onClick={handleExport} disabled={logs.length === 0} className="border-white/10">
                        <Download className="mr-2 h-4 w-4" />
                        Export CSV
                    </Button>
                </div>
            </div>

            {/* Logs Table */}
            <div className="rounded-xl border border-white/5 bg-zinc-900/30 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-white/5 hover:bg-white/5">
                            <TableHead className="text-zinc-400">Timestamp</TableHead>
                            <TableHead className="text-zinc-400">Action</TableHead>
                            <TableHead className="text-zinc-400">User ID</TableHead>
                            <TableHead className="text-zinc-400">Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-zinc-500 py-8">
                                    Loading audit logs...
                                </TableCell>
                            </TableRow>
                        ) : filteredLogs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-zinc-500 py-8">
                                    No audit logs found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredLogs.map((log) => (
                                <TableRow key={log.id} className="border-white/5 hover:bg-white/5">
                                    <TableCell className="font-mono text-xs text-zinc-400">
                                        {new Date(log.created_at).toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={getActionBadgeColor(log.action)}>
                                            {log.action}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-mono text-xs text-zinc-400">
                                        {log.user_id.substring(0, 8)}...
                                    </TableCell>
                                    <TableCell className="text-sm text-zinc-300 max-w-md truncate">
                                        {log.details ? JSON.stringify(log.details) : '-'}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="text-xs text-zinc-500 text-center">
                Showing {filteredLogs.length} of {logs.length} total logs
            </div>
        </div>
    );
};
