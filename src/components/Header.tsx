import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ color: 'inherit', textDecoration: 'none', fontWeight: 'bold' }}
        >
          Tennis Racket Review
        </Typography>

        {/* 우측: 로그인 상태에 따른 버튼 표시 */}
        <Box>
          {isAuthenticated ? (
            <>
              <Button
                component={Link}
                to="/mypage"
                color="primary"
                variant="outlined"
                sx={{ mr: 1 }}
              >
                마이페이지
              </Button>
              <Button
                onClick={handleLogout}
                color="primary"
                variant="outlined"
                sx={{ mr: 1 }}
              >
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                color="primary"
                variant="outlined"
                sx={{ mr: 1 }}
              >
                로그인
              </Button>
              <Button
                component={Link}
                to="/register"
                color="primary"
                variant="outlined"
                sx={{ mr: 1 }}
              >
                회원가입
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
