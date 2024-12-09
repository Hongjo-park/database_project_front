import React from 'react';
import Header from './Header';
import { Box } from '@mui/material';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Box component="main" flex="1 0 auto" display="flex">
        {children}
      </Box>
    </Box>
  );
};

export default Layout;