import { getAuthSession } from "@/utils/auth";
import connectDB from "@/utils/connect";
import Post from "@/models/Post";
import { NextResponse } from "next/server";
import { seedCategories } from "../categories/route";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const cat = searchParams.get("cat");
  const POST_PER_PAGE = 10;

  seedCategories()

  try {
    await connectDB();
    
    const query = cat ? { catSlug: cat } : {};
    
    const posts = await Post.find(query)
      .skip(POST_PER_PAGE * (page - 1))
      .limit(POST_PER_PAGE)
      .sort({ createdAt: -1 });
      
    const count = await Post.countDocuments(query);

    return new NextResponse(JSON.stringify({ posts, count }), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }), { status: 500 }
    );
  }
};

// CREATE A POST
export const POST = async (req) => {
  try {
    await connectDB();
    const body = await req.json();
    
    if (!body.userEmail) {
      return new NextResponse(
        JSON.stringify({ message: "Email is required!" }), { status: 401 }
      );
    }

    const post = await Post.create(body);

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }), { status: 500 }
    );
  }
};
