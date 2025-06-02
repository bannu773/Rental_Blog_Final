import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  desc: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true,
    ref: 'User'
  },
  postSlug: {
    type: String,
    required: true,
    ref: 'Post'
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add indexes for better query performance
CommentSchema.index({ postSlug: 1, createdAt: -1 });
CommentSchema.index({ userEmail: 1 });

export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema); 