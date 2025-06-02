import connectDB from "@/utils/connect";
import { Category } from "@/models";
import { NextResponse } from "next/server";

// Initial categories data
const initialCategories = [
  {
    slug: "style",
    title: "Style",
    img: "/style.png"
  },
  {
    slug: "fashion",
    title: "Fashion",
    img: "/fashion.png"
  },
  {
    slug: "food",
    title: "Food",
    img: "/food.png"
  },
  {
    slug: "travel",
    title: "Travel",
    img: "/travel.png"
  },
  {
    slug: "culture",
    title: "Culture",
    img: "/culture.png"
  },
  {
    slug: "technology",
    title: "Technology",
    img: "/tech.png"
  }
];

export const GET = async () => {
  try {
    await connectDB();
    const categories = await Category.find().sort({ title: 1 });

    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }), { status: 500 }
    );
  }
};

export const POST = async (req) => {
  try {
    await connectDB();
    const body = await req.json();

    // Check if category already exists
    const existingCategory = await Category.findOne({ slug: body.slug });
    if (existingCategory) {
      return new NextResponse(
        JSON.stringify({ message: "Category already exists!" }), 
        { status: 400 }
      );
    }

    const newCategory = await Category.create(body);
    return new NextResponse(JSON.stringify(newCategory), { status: 201 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }), 
      { status: 500 }
    );
  }
};

// Function to seed initial categories
export const seedCategories = async () => {
  try {
    await connectDB();
    
    // Check if categories already exist
    const existingCategories = await Category.find();
    if (existingCategories.length > 0) {
      console.log("Categories already seeded");
      return;
    }

    // Insert initial categories
    await Category.insertMany(initialCategories);
    console.log("Categories seeded successfully");
  } catch (err) {
    console.error("Error seeding categories:", err);
  }
};
