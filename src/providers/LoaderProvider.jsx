"use client";

import React, { createContext, useContext, useState } from "react";

const LoaderContext = createContext({ show: () => {}, hide: () => {}, loading: false });

export const useLoader = () => useContext(LoaderContext);

export const LoaderProvider = ({ children }) => {
  // Loader logic removed for instant navigation
  const value = {
    show: () => {},
    hide: () => {},
    loading: false,
  };

  return (
    <LoaderContext.Provider value={value}>
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderProvider; 