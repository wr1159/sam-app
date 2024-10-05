import { NextResponse } from "next/server";
import { Plant } from "@/types/plants";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
    const supabase = createClient();
    const { data, error } = await supabase.from("plants").select("*");

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
}
