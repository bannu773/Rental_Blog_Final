import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  img: String
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual populate for posts
CategorySchema.virtual('posts', {
  ref: 'Post',
  localField: 'slug',
  foreignField: 'catSlug'
});

// Add index for better query performance
CategorySchema.index({ slug: 1 });

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

export default Category; 