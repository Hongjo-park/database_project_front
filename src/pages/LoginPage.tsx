import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import apiClient from '../utils/api'; // Axios 인스턴스 사용
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const { id, accessToken, name, email: userEmail } = response.data;
      login({ id, name, email: userEmail }); // AuthContext의 login 호출
      localStorage.setItem('accessToken', accessToken); // 토큰 저장
      setError('');
      setSuccess('로그인에 성공했습니다!');
      setTimeout(() => navigate('/'), 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || '로그인에 실패했습니다.');
    }
  };

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
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '100%',
            maxWidth: '400px',
          }}
        >
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            LOG IN
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;