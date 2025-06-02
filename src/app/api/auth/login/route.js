import { NextResponse } from 'next/server';
import User from '@/models/User';
import connectDB from '@/utils/connect';


export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { email, name, image, sub } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Find or create user
    let user = await User.findOne({ email });
    
    if (!user) {
      user = await User.create({
        email,
        name,
        image,
        sub
      });
    } else {
      // Update existing user if needed
      user.name = name || user.name;
      user.image = image || user.image;
      user.sub = sub || user.sub;
      await user.save();
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        image: user.image
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 