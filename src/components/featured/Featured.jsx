import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";

const Featured = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b>Welcome to RentInstant Blog!</b> Your source for rental tips, guides, and updates.
      </h1>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image src="https://rentinstant.s3.ca-central-1.amazonaws.com/rental_blog_img/p1.jpg" alt="" fill className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>Latest Updates & Rental Guides</h1>
          <p className={styles.postDesc}>
            Discover helpful guides, tips, and updates about our rental platform. Learn how to make the most 
            of RentInstant's features, find best practices for renting items, and stay informed about our 
            latest platform improvements and community initiatives.
          </p>
          <button className={styles.button}>Read Latest Posts</button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
