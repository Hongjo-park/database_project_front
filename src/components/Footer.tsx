import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ textAlign: 'center', p: 2, bgcolor: '#f2f2f2', mt: 'auto' }}>
      <Typography variant="body2" color="text.secondary">
        Tennis Racket Review.
      </Typography>
    </Box>
  );
};

export default Footer;