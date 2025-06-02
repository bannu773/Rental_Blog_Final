"use client";

import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext, useEffect, useState } from "react";
import { ConfigProvider } from 'antd';

const themeConfig = {
  token: {
    colorPrimary: '#AD1E24',
    colorLink: '#AD1E24',
    colorLinkHover: '#8B171C',
  },
  components: {
    Button: {
      colorPrimary: '#AD1E24',
      colorPrimaryHover: '#8B171C',
    },
    Menu: {
      colorPrimary: '#AD1E24',
    },
  },
};

const ThemeProvider = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) {
    return (
      <ConfigProvider theme={themeConfig}>
        <div className={theme}>{children}</div>
      </ConfigProvider>
    );
  }
};

export default ThemeProvider;
