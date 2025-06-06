"use client";

import Link from "next/link";
import styles from "./comments.module.css";
import Image from "next/image";
import useSWR from "swr";
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from "react";
import LoadingState from "../LoadingState/LoadingState";

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};

const Comments = ({ postSlug }) => {
  const { isAuthenticated, user } = useAuth0();
  const { data, mutate, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments?postSlug=${postSlug}`,
    fetcher
  );

  const [desc, setDesc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({ 
          desc, 
          postSlug,
          userEmail: user.email 
        }),
      });
      mutate();
      setDesc("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Comments</h2>
      {isAuthenticated ? (
        <div className={styles.write}>
          <textarea
            placeholder="Write a comment..."
            className={styles.input}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button 
            className={styles.button} 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </div>
      ) : (
        <Link href="/login">Login to write a comment</Link>
      )}
      <LoadingState isLoading={isLoading}>
        <div className={styles.comments}>
          {data?.map((item) => (
            <div className={styles.comment} key={item._id}>
              <div className={styles.user}>
                {item.userEmail?.image && (
                  <Image
                    src={item.userEmail.image}
                    alt=""
                    width={50}
                    height={50}
                    className={styles.image}
                  />
                )}
                <div className={styles.userInfo}>
                  <span className={styles.username}>{item.userEmail?.name}</span>
                  <span className={styles.date}>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <p className={styles.desc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </LoadingState>
    </div>
  );
};

export default Comments;
