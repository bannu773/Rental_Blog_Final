"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";

const LoaderContext = createContext({ show: () => {}, hide: () => {}, loading: false });

export const useLoader = () => useContext(LoaderContext);

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleStop = () => setLoading(false);

    router.events?.on("routeChangeStart", handleStart);
    router.events?.on("routeChangeComplete", handleStop);
    router.events?.on("routeChangeError", handleStop);

    return () => {
      router.events?.off("routeChangeStart", handleStart);
      router.events?.off("routeChangeComplete", handleStop);
      router.events?.off("routeChangeError", handleStop);
    };
  }, [router]);

  const value = {
    show: () => setLoading(true),
    hide: () => setLoading(false),
    loading,
  };

  return (
    <LoaderContext.Provider value={value}>
      {loading && <Loader />}
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderProvider; 