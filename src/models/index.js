import mongoose from 'mongoose';

// Import all models
import User from './User';
import Post from './Post';
import Comment from './Comment';
import Category from './Category';

// Export all models
export {
  User,
  Post,
  Comment,
  Category
};

// Export mongoose instance
export default mongoose; 