"use client";
import Link from "next/link";
import styles from "./authLinks.module.css";
import { useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, logout, loginWithRedirect, user } = useAuth0();

  console.log(isAuthenticated)

  return (
    <>
      {!isAuthenticated ? (
        <span className={styles.link} onClick={() => loginWithRedirect()}>
          Login
        </span>
      ) : (
        <>
          <Link href="/write" className={styles.link}>
            Write
          </Link>
          <Link href="/profile" className={styles.link}>
            Profile
          </Link>
          <span className={styles.link} onClick={() => logout({ returnTo: window.location.origin })}>
            Logout
          </span>
        </>
      )}
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu}>
          <Link href="/">Homepage</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
          {!isAuthenticated ? (
            <span className={styles.link} onClick={() => loginWithRedirect()}>Login</span>
          ) : (
            <>
              <Link href="/write">Write</Link>
              <Link href="/profile">Profile</Link>
              <span className={styles.link} onClick={() => logout({ returnTo: window.location.origin })}>Logout</span>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AuthLinks;
