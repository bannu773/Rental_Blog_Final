import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  image: String,
  sub: {
    type: String,
    unique: true,
    sparse: true
  },
  bio: {
    type: String,
    maxlength: 500
  },
  website: String,
  location: String,
  profileViews: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual populate for posts
UserSchema.virtual('posts', {
  ref: 'Post',
  localField: 'email',
  foreignField: 'userEmail'
});

// Virtual populate for comments
UserSchema.virtual('comments', {
  ref: 'Comment',
  localField: 'email',
  foreignField: 'userEmail'
});

// Virtual for posts count
UserSchema.virtual('postsCount', {
  ref: 'Post',
  localField: 'email',
  foreignField: 'userEmail',
  count: true
});

// Virtual for comments count
UserSchema.virtual('commentsCount', {
  ref: 'Comment',
  localField: 'email',
  foreignField: 'userEmail',
  count: true
});

// Add indexes for better query performance
UserSchema.index({ email: 1 });
UserSchema.index({ sub: 1 });
UserSchema.index({ createdAt: -1 });

export default mongoose.models.User || mongoose.model('User', UserSchema);