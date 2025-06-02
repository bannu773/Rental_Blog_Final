import connectDB from "@/utils/connect";
import Post from "@/models/Post";
import User from "@/models/User";
import Category from "@/models/Category";
import Comment from "@/models/Comment";
import { NextResponse } from "next/server";

// GET SINGLE POST
export const GET = async (req, { params }) => {
  const { slug } = params;

  try {
    await connectDB();
    
    // Find the post
    const post = await Post.findOneAndUpdate(
      { slug },
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!post) {
      return new NextResponse(
        JSON.stringify({ message: "Post not found!" }), { status: 404 }
      );
    }

    // Get user data
    const user = await User.findOne({ email: post.userEmail });
    
    // Get category data
    const category = await Category.findOne({ slug: post.catSlug });
    
    // Get comments with user data
    const comments = await Comment.find({ postSlug: post.slug });
    const commentsWithUsers = await Promise.all(
      comments.map(async (comment) => {
        const commentUser = await User.findOne({ email: comment.userEmail });
        return {
          ...comment.toObject(),
          user: commentUser ? {
            name: commentUser.name,
            email: commentUser.email,
            image: commentUser.image
          } : null
        };
      })
    );

    // Construct the response
    const response = {
      ...post.toObject(),
      user: user ? {
        name: user.name,
        email: user.email,
        image: user.image
      } : null,
      category: category ? {
        title: category.title,
        slug: category.slug
      } : null,
      comments: commentsWithUsers
    };

    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }), { status: 500 }
    );
  }
};
