import { createClient } from "@/utils/supabase/server";

export default async function Notes() {
    const supabase = createClient();
    const { data: plants } = await supabase.from("plants").select();

    return <pre>{JSON.stringify(plants, null, 2)}</pre>;
}
