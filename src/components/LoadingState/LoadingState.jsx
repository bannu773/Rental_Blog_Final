"use client";

import { Spin } from 'antd';
import { useState, useEffect } from 'react';
import styles from './LoadingState.module.css';

const LoadingState = ({ children, isLoading }) => {
  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <Spin size="large" />
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default LoadingState; 