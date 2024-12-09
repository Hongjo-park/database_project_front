import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const MyPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Typography variant="h5" align="center">
          로그인이 필요합니다.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Typography variant="h4" sx={{ mb: 4, color: '#4a90e2' }}>
          마이페이지
        </Typography>
        <Typography variant="h6" sx={{ mb: 2 }}>
          이름: {user.name}
        </Typography>
        <Typography variant="h6" sx={{ mb: 2 }}>
          이메일: {user.email}
        </Typography>
      </Box>
    </Container>
  );
};

export default MyPage;