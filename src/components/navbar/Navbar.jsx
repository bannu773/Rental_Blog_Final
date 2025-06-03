import React from "react";
import styles from "./navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import AuthLinks from "../authLinks/AuthLinks";
import ThemeToggle from "../themeToggle/ThemeToggle";

const Navbar = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.logo}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Image 
            className={styles.desktopLogo}
            color="white" 
            style={{ backgroundColor: "white", borderRadius: "10px", padding: "17px 0px" }} 
            src="https://rentinstant.s3.ca-central-1.amazonaws.com/rental_blog_img/rentinstant_laptop.png" 
            alt="RentInstant Logo" 
            width={200} 
            height={80} 
          />
          <Image 
            className={styles.mobileLogo}
            color="white" 
            style={{ backgroundColor: "white", borderRadius: "10px", padding: "0px 0px" }} 
            src="https://rentinstant.s3.ca-central-1.amazonaws.com/rental_blog_img/rentinstant.png" 
            alt="RentInstant Logo" 
            width={60} 
            height={60} 
          />
        </Link>
      </div>
      <div className={styles.links}>
        <ThemeToggle />
        <Link href="/" className={styles.link}>Homepage</Link>
        <Link href="/blog" className={styles.link}>Blog</Link>
       
        <AuthLinks />
      </div>
    </nav>
  );
};

export default Navbar;
