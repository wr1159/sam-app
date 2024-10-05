import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const supabase = createClient();
    const {
        latitude,
        longitude,
        image,
    }: { latitude: number; longitude: number; image: string } =
        await req.json();

    if (!latitude || !longitude || !image) {
        return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Convert base64 image to Blob
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    const fileName = `${Date.now()}.jpg`;

    // Upload image to Supabase storage
    const { data, error } = await supabase.storage
        .from("plant-images")
        .upload(fileName, buffer, { contentType: "image/jpeg" });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/plant-images/${fileName}`;

    // Insert into database
    const { error: dbError } = await supabase.from("plants").insert({
        latitude,
        longitude,
        image_url: imageUrl,
    });

    if (dbError) {
        return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Upload successful" }, { status: 201 });
}
