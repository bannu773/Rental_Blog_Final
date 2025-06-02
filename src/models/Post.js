import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  img: String,
  views: {
    type: Number,
    default: 0
  },
  catSlug: {
    type: String,
    required: true,
    ref: 'Category'
  },
  userEmail: {
    type: String,
    required: true,
    ref: 'User'
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual populate for comments
PostSchema.virtual('comments', {
  ref: 'Comment',
  localField: 'slug',
  foreignField: 'postSlug'
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema); 