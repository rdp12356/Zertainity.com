import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Edit } from "lucide-react";

interface DataManagementProps {
    currentUserRole: string;
}

interface Institution {
    id: string;
    name: string;
    location: string;
    description?: string;
}

export const DataManagement = ({ currentUserRole }: DataManagementProps) => {
    const { toast } = useToast();
    const [colleges, setColleges] = useState<Institution[]>([]);
    const [schools, setSchools] = useState<Institution[]>([]);
    const [loading, setLoading] = useState(false);

    // Form States
    const [newCollege, setNewCollege] = useState({ name: "", location: "", description: "" });
    const [newSchool, setNewSchool] = useState({ name: "", location: "", description: "" });

    const canEdit = ['owner', 'admin', 'manager', 'editor'].includes(currentUserRole);
    const canDelete = ['owner', 'admin', 'manager'].includes(currentUserRole);

    const fetchData = async () => {
        setLoading(true);
        const { data: cData } = await supabase.from('colleges').select('*');
        if (cData) setColleges(cData);

        const { data: sData } = await supabase.from('schools').select('*');
        if (sData) setSchools(sData);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddCollege = async () => {
        if (!canEdit) return;
        try {
            const { error } = await supabase.from('colleges').insert([newCollege]);
            if (error) throw error;
            toast({ title: "Success", description: "College added" });
            setNewCollege({ name: "", location: "", description: "" });
            fetchData();
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : "An error occurred";
            toast({ title: "Error", description: message, variant: "destructive" });
        }
    };

    const handleAddSchool = async () => {
        if (!canEdit) return;
        try {
            const { error } = await supabase.from('schools').insert([newSchool]);
            if (error) throw error;
            toast({ title: "Success", description: "School added" });
            setNewSchool({ name: "", location: "", description: "" });
            fetchData();
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : "An error occurred";
            toast({ title: "Error", description: message, variant: "destructive" });
        }
    };

    const handleDelete = async (table: 'colleges' | 'schools', id: string) => {
        if (!canDelete) {
            toast({ title: "Access Denied", description: "You do not have permission to delete entries.", variant: "destructive" });
            return;
        }
        try {
            const { error } = await supabase.from(table).delete().eq('id', id);
            if (error) throw error;
            toast({ title: "Deleted", description: "Entry removed successfully." });
            fetchData();
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : "An error occurred";
            toast({ title: "Error", description: message, variant: "destructive" });
        }
    };

    return (
        <Tabs defaultValue="colleges">
            <TabsList>
                <TabsTrigger value="colleges">Colleges</TabsTrigger>
                <TabsTrigger value="schools">Schools</TabsTrigger>
            </TabsList>

            <TabsContent value="colleges" className="space-y-6">
                {canEdit && (
                    <Card>
                        <CardHeader><CardTitle>Add College</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Name</Label>
                                    <Input value={newCollege.name} onChange={e => setNewCollege({ ...newCollege, name: e.target.value })} placeholder="MIT" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Location</Label>
                                    <Input value={newCollege.location} onChange={e => setNewCollege({ ...newCollege, location: e.target.value })} placeholder="Boston" />
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <Label>Description</Label>
                                    <Textarea value={newCollege.description} onChange={e => setNewCollege({ ...newCollege, description: e.target.value })} />
                                </div>
                            </div>
                            <Button onClick={handleAddCollege}>Add College</Button>
                        </CardContent>
                    </Card>
                )}

                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {colleges.map(c => (
                                <TableRow key={c.id}>
                                    <TableCell>{c.name}</TableCell>
                                    <TableCell>{c.location}</TableCell>
                                    <TableCell>
                                        {canDelete && (
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete('colleges', c.id)} className="text-red-500">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </TabsContent>

            <TabsContent value="schools" className="space-y-6">
                {/* Same structure for Schools */}
                {canEdit && (
                    <Card>
                        <CardHeader><CardTitle>Add School</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Name</Label>
                                    <Input value={newSchool.name} onChange={e => setNewSchool({ ...newSchool, name: e.target.value })} placeholder="DPS" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Location</Label>
                                    <Input value={newSchool.location} onChange={e => setNewSchool({ ...newSchool, location: e.target.value })} placeholder="Delhi" />
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <Label>Description</Label>
                                    <Textarea value={newSchool.description} onChange={e => setNewSchool({ ...newSchool, description: e.target.value })} />
                                </div>
                            </div>
                            <Button onClick={handleAddSchool}>Add School</Button>
                        </CardContent>
                    </Card>
                )}

                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {schools.map(s => (
                                <TableRow key={s.id}>
                                    <TableCell>{s.name}</TableCell>
                                    <TableCell>{s.location}</TableCell>
                                    <TableCell>
                                        {canDelete && (
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete('schools', s.id)} className="text-red-500">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </TabsContent>
        </Tabs>
    );
};
