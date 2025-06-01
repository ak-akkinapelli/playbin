import { NextResponse } from "next/server";
import { fetchAllSongsFromR2 } from "@/lib/r2";

export const runtime = "edge";

export async function GET() {
  try {
    const songs = await fetchAllSongsFromR2();
    return NextResponse.json({ songs });
  } catch (error) {
    console.error("Error fetching songs from R2:", error);
    return NextResponse.json({ error: "Failed to fetch songs from R2" }, { status: 500 });
  }
}
