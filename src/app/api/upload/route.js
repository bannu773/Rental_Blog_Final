import { NextResponse } from "next/server";
import { uploadToS3 } from "@/utils/s3";

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");
  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }
  const fileName = `${Date.now()}-${file.name}`;
  try {
    const url = await uploadToS3(file, fileName);
    return NextResponse.json({ url });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 