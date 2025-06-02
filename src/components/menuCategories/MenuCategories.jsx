import Link from "next/link";
import React from "react";
import styles from "./menuCategories.module.css";

const MenuCategories = () => {
  return (
    <div className={styles.categoryList}>
      <Link
        href="/blog?cat=style"
        className={`${styles.categoryItem} ${styles.style}`}
      >
        Features
      </Link>
      <Link href="/blog" className={`${styles.categoryItem} ${styles.fashion}`}>
        Blog
      </Link>
      <Link href="/blog" className={`${styles.categoryItem} ${styles.food}`}>
        Updates
      </Link>
      <Link href="/blog" className={`${styles.categoryItem} ${styles.travel}`}>
        Events
      </Link>
      <Link href="/blog" className={`${styles.categoryItem} ${styles.culture}`}>
        Community
      </Link>
      <Link href="/blog" className={`${styles.categoryItem} ${styles.coding}`}>
        Company
      </Link>
    </div>
  );
};

export default MenuCategories;
