"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./menuCategories.module.css";

const colors = [
  "#57c4ff31",
  "#da85c731",
  "#7fb88133",
  "#ff795736",
  "#ffb04f45",
  "#5e4fff31"
];

const MenuCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.categoryList}>
      {categories.map((cat, idx) => (
        <Link
          key={cat.slug}
          href={`/blog?cat=${cat.slug}`}
          className={styles.categoryItem}
          style={{ backgroundColor: colors[idx % colors.length] }}
        >
          {cat.title}
        </Link>
      ))}
    </div>
  );
};

export default MenuCategories;
