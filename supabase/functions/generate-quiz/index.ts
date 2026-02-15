// supabase/functions/generate-quiz/index.ts (Example Code)

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const supabase = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        );

        // 1. Get OpenRouter Key from DB
        const { data: settings } = await supabase
            .from('admin_settings')
            .select('value')
            .eq('key', 'OPENROUTER_API_KEY')
            .single();

        if (!settings?.value) {
            throw new Error("OpenRouter API Key not configured in Admin Panel");
        }

        const { educationLevel, interests } = await req.json();

        // 2. Call OpenRouter
        const prompt = `Generate 5 multiple-choice psychometric questions for a student who has finished ${educationLevel}. 
    Interests: ${interests}.
    Return ONLY a JSON array with this format:
    [{ "question": "...", "options": [{ "label": "...", "value": 10 }, { "label": "...", "value": 5 }] }]`;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${settings.value}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "openai/gpt-3.5-turbo", // or any cheap model
                messages: [{ role: "user", content: prompt }]
            })
        });

        const aiData = await response.json();
        const questions = JSON.parse(aiData.choices[0].message.content);

        return new Response(JSON.stringify(questions), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }
});
