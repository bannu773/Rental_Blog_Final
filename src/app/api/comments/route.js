import { getAuthSession } from "@/utils/auth";
import connectDB from "@/utils/connect";
import { Comment, User } from "@/models";
import { NextResponse } from "next/server";

// GET ALL COMMENTS OF A POST
export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const postSlug = searchParams.get("postSlug");

  try {
    await connectDB();
    const comments = await Comment.find({ postSlug })
      .sort({ createdAt: -1 });

    // Manually populate user data
    const populatedComments = await Promise.all(
      comments.map(async (comment) => {
        const user = await User.findOne({ email: comment.userEmail });
        return {
          ...comment.toObject(),
          userEmail: user ? {
            name: user.name,
            email: user.email,
            image: user.image
          } : null
        };
      })
    );

    return new NextResponse(JSON.stringify(populatedComments), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }), { status: 500 }
    );
  }
};

// CREATE A COMMENT
export const POST = async (req) => {
  try {
    await connectDB();
    const body = await req.json();
    
    if (!body.userEmail) {
      return new NextResponse(
        JSON.stringify({ message: "Email is required!" }), { status: 401 }
      );
    }

    // Verify user exists
    const user = await User.findOne({ email: body.userEmail });
    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "User not found!" }), { status: 404 }
      );
    }

    const comment = await Comment.create(body);

    return new NextResponse(JSON.stringify(comment), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }), { status: 500 }
    );
  }
};
