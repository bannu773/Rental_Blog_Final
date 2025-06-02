import { ConfigProvider, theme } from 'antd';

export const themeConfig = {
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

export const ThemeProvider = ({ children }) => {
  return (
    <ConfigProvider theme={themeConfig}>
      {children}
    </ConfigProvider>
  );
}; 