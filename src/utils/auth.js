import { getSession } from '@auth0/nextjs-auth0';
import connectDB from './connect';
import User from '@/models/User';

export const getAuthSession = async () => {
  try {
    const session = await getSession();
    debugger; 
    console.log(session)
    if (!session) return null;

    await connectDB();

    // Create or update user in database
    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        name: session.user.name,
        image: session.user.picture,
        sub: session.user.sub
      },
      { upsert: true, new: true }
    );

    return { ...session, user };
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
};
