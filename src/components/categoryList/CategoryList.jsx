import React from "react";
import styles from "./categoryList.module.css";
import Link from "next/link";
import Image from "next/image";
import LoadingState from "../LoadingState/LoadingState";
import { Suspense } from "react";

const getData = async () => {
  const res = await fetch("https://rental-blog-final-s2ob.vercel.app/api/categories", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const CategoryList = async () => {
  const data = await getData();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Explore Categories</h1>
        <p className={styles.subtitle}>Discover content that matters to you</p>
      </div>
      <Suspense fallback={<LoadingState isLoading={true} />}>
        <div className={styles.categories}>
          {data?.map((item) => (
            <Link
              href={`/blog?cat=${item.slug}`}
              className={styles.category}
              key={item._id}
            >
              <div className={styles.categoryContent}>
                {item.img && (
                  <div className={styles.imageWrapper}>
                    <Image
                      src={item.img}
                      alt={item.title}
                      width={48}
                      height={48}
                      className={styles.image}
                    />
                  </div>
                )}
                <h3 className={styles.categoryTitle}>{item.title}</h3>
        
              </div>
            </Link>
          ))}
        </div>
      </Suspense>
    </div>
  );
};

export default CategoryList;
