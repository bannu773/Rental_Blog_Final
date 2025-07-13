import { NextResponse } from 'next/server';
import User from '@/models/User';
import connectDB from '@/utils/connect';
import { getSession } from '@auth0/nextjs-auth0';

export async function GET(request) {
  try {
    await connectDB();
    // Here, you would extract the user from the session or request headers
    // For demo, let's use a query param (in real app, use session/cookie)
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({
      id: user._id,
      email: user.email,
      name: user.name,
      image: user.image
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { email, name, image } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const user = await User.findOneAndUpdate(
      { email },
      { 
        name: name || undefined,
        image: image || undefined
      },
      { new: true, runValidators: true }
    );

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      id: user._id,
      email: user.email,
      name: user.name,
      image: user.image
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}