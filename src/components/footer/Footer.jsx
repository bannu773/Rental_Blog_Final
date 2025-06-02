import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <Image
            className={styles.desktopLogo}
            color="white"
            style={{ backgroundColor: "white", borderRadius: "10px", padding: "17px 0px" }}
            src="https://rentinstant.s3.ca-central-1.amazonaws.com/rental_blog_img/rentinstant_laptop.png"
            alt="RentInstant Logo"
            width={200}
            height={80}
          />
          
        </div>
        <p className={styles.desc}>
          Your go-to resource for everything about RentInstant. Find detailed guides, feature updates,
          rental tips, and community stories. Stay informed about our platform's latest developments
          and learn how to make the most of your rental experience.
        </p>
        <div className={styles.icons}>
          <Image src="/facebook.png" alt="" width={18} height={18} />
          <Image src="/instagram.png" alt="" width={18} height={18} />
          <Image src="/tiktok.png" alt="" width={18} height={18} />
          <Image src="/youtube.png" alt="" width={18} height={18} />
        </div>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Links</span>
          <Link href="/">Homepage</Link>
          <Link href="/">Blog</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Categories</span>
          <Link href="/">Guides</Link>
          <Link href="/">Features</Link>
          <Link href="/">Updates</Link>
          <Link href="/">Community</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Social</span>
          <Link href="/">Facebook</Link>
          <Link href="/">Instagram</Link>
          <Link href="/">Tiktok</Link>
          <Link href="/">Youtube</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
