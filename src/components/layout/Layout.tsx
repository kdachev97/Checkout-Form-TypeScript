import React, { ReactNode } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './Theme';

interface LayoutProps {
  children: ReactNode;
}
const Layout = ({
  children,
}: LayoutProps) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);

export default Layout;
