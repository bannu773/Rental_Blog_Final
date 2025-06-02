"use client";
import { useAuth0 } from '@auth0/auth0-react';
import styles from "./loginPage.module.css";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const router = useRouter();

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (isAuthenticated) {
    router.push("/");
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.socialButton} onClick={() => loginWithRedirect()}>
          Sign in with Auth0
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
