import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Save, Loader2, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SystemSettingsProps {
  role: string;
}

export const SystemSettings = ({ role }: SystemSettingsProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);

  // Fetch existing key on mount
  useEffect(() => {
    const fetchKey = async () => {
      if (role !== 'owner') return;
      try {
        const { data, error } = await supabase
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .from('admin_settings' as any)
          .select('value')
          .eq('key', 'OPENROUTER_API_KEY')
          .maybeSingle();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (data) setApiKey((data as any).value);
      } catch (err) {
        console.error("Error fetching settings:", err);
      }
    };
    fetchKey();
  }, [role]);

  const handleSave = async () => {
    setLoading(true);
    try {
      if (!apiKey.trim()) throw new Error("API Key cannot be empty");

      const { error } = await supabase
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .from('admin_settings' as any)
        .upsert({
          key: 'OPENROUTER_API_KEY',
          value: apiKey,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Settings Saved",
        description: "OpenRouter API Key has been updated securely.",
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An error occurred";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (role !== 'owner') {
    return (
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">Access Denied</CardTitle>
          <CardDescription>Only Owners can access System Settings.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-purple-500" />
            AI Configuration
          </CardTitle>
          <CardDescription>
            Configure the AI Brain (OpenRouter) for dynamic quiz and career generation.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>OpenRouter API Key</Label>
            <div className="flex gap-2">
              <Input
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-or-v1-..."
                className="font-mono"
              />
              <Button variant="outline" size="icon" onClick={() => setShowKey(!showKey)}>
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Required for generating personalized quizzes and results.
              Get your key from <a href="https://openrouter.ai/keys" target="_blank" className="text-primary hover:underline">openrouter.ai</a>.
            </p>
          </div>

          <Button onClick={handleSave} disabled={loading} className="w-full sm:w-auto">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Save Configuration
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
