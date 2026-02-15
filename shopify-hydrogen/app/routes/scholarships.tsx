import { type LoaderFunctionArgs } from 'react-router';
import { useLoaderData, Form, useSubmit, useSearchParams } from 'react-router';
import { createClient } from '@supabase/supabase-js';
import { Button } from '~/components/ui/button';

export async function loader({ request, context }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const search = url.searchParams.get('q') || '';
    const category = url.searchParams.getAll('category');

    // Server-side Supabase client
    // Ensure these Env vars are available in context or process.env
    const supabaseUrl = context.env?.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const supabaseKey = context.env?.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        throw new Error("Supabase credentials missing");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    let query = supabase.from('scholarships').select('*');

    if (search) {
        query = query.or(`name.ilike.%${search}%,provider.ilike.%${search}%`);
    }

    // Basic filtering logic (supabase doesn't support array overlap easily without specific operators, 
    // but for now we'll fetch all and filter in memory or implement better query if needed)
    // Or handle single category filter if supported.

    const { data, error } = await query;

    if (error) {
        console.error("Supabase error:", error);
        throw new Response("Error fetching scholarships", { status: 500 });
    }

    let filteredData = data || [];
    if (category.length > 0) {
        filteredData = filteredData.filter((s: any) =>
            category.some((c: string) => s.category?.includes(c))
        );
    }

    return { scholarships: filteredData, search, category };
}

export default function Scholarships() {
    const { scholarships, search, category } = useLoaderData<typeof loader>();
    const submit = useSubmit();
    const [searchParams] = useSearchParams();

    // Simple client-side search handling via Form or just URL updates

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Scholarships</h1>

            <div className="flex gap-8">
                <aside className="w-64 flex-shrink-0">
                    <h3 className="font-semibold mb-4">Categories</h3>
                    <Form method="get" onChange={(e) => submit(e.currentTarget)}>
                        <input type="hidden" name="q" value={search} />
                        <div className="space-y-2">
                            {['STEM', 'Arts & Humanities', 'Sports', 'Research'].map(cat => (
                                <label key={cat} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="category"
                                        value={cat}
                                        defaultChecked={category.includes(cat)}
                                    />
                                    <span>{cat}</span>
                                </label>
                            ))}
                        </div>
                    </Form>
                </aside>

                <div className="flex-1">
                    <Form method="get" className="mb-6">
                        {category.map(c => <input type="hidden" name="category" value={c} key={c} />)}
                        <div className="flex gap-2">
                            <input
                                type="search"
                                name="q"
                                defaultValue={search}
                                placeholder="Search scholarships..."
                                className="flex-1 border rounded px-3 py-2"
                            />
                            <Button type="submit">Search</Button>
                        </div>
                    </Form>

                    <div className="grid gap-6">
                        {scholarships.map((s: any) => (
                            <div key={s.id} className="border rounded-lg p-6 shadow-sm">
                                <h3 className="text-xl font-bold">{s.name}</h3>
                                <p className="text-gray-600 mb-2">Provider: {s.provider}</p>
                                <div className="flex justify-between items-end mt-4">
                                    <div>
                                        <p className="font-semibold">{s.amount}</p>
                                        <p className="text-sm text-gray-500">{s.amount_type}</p>
                                    </div>
                                    <Button variant="outline">View Details</Button>
                                </div>
                            </div>
                        ))}
                        {scholarships.length === 0 && (
                            <p className="text-gray-500">No scholarships found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
