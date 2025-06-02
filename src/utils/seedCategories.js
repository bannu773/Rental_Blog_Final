import '../models';  // This will register all models
import { seedCategories } from '../app/api/categories/route';

// Run the seeding function
seedCategories()
  .then(() => {
    console.log('Seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  }); 