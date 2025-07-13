import { NextResponse } from 'next/server';
import User from '@/models/User';
import Post from '@/models/Post';
import Comment from '@/models/Comment';
import connectDB from '@/utils/connect';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Get user stats
    const postsCount = await Post.countDocuments({ userEmail: email });
    const commentsCount = await Comment.countDocuments({ userEmail: email });
    
    // Get total views from all user's posts
    const userPosts = await Post.find({ userEmail: email }, 'views');
    const totalViews = userPosts.reduce((sum, post) => sum + (post.views || 0), 0);

    // Get user profile views (increment by 1 for this request)
    const user = await User.findOneAndUpdate(
      { email },
      { $inc: { profileViews: 1 } },
      { new: true }
    );

    const profileViews = user?.profileViews || 0;

    return NextResponse.json({
      posts: postsCount,
      comments: commentsCount,
      views: totalViews,
      profileViews: profileViews
    });
    
  } catch (error) {
    console.error('Stats fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}