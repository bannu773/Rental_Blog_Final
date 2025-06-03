import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./menuPosts.module.css"

const getData = async () => {
  const res = await fetch("${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts?page=1", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const MenuPosts = async ({ withImage }) => {
  const { posts } = await getData();

  return (
    <div className={styles.items}>
      {posts?.map((post) => (
        <Link href={`/posts/${post.slug}`} className={styles.item} key={post._id}>
          {withImage && post.img && (
            <div className={styles.imageContainer}>
              <Image src={post.img} alt="" fill className={styles.image} />
            </div>
          )}
          <div className={styles.textContainer}>
            <span className={`${styles.category} ${styles[post.catSlug]}`}>
              {post.catSlug}
            </span>
            <h3 className={styles.postTitle}>
              {post.title}
            </h3>
            <div className={styles.detail}>
              <span className={styles.username}>{post.userEmail}</span>
              <span className={styles.date}> - {new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPosts;
