import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
} from '@mui/material';
import apiClient from '../utils/api'; // apiClient 불러오기

// API 호출 시 받아올 라켓 데이터 타입 정의
interface Racquet {
  id: number;
  name: string;
  image_url: string;
  manufacturer: string;
}

const RacquetPage: React.FC = () => {
  const { brand } = useParams<{ brand: string }>(); // URL 파라미터로 전달받은 브랜드명
  const navigate = useNavigate(); // URL 변경을 위한 네비게이션
  const [racquets, setRacquets] = useState<Racquet[]>([]);

  // 좌측 브랜드 리스트
  const brandList = ['Wilson', 'Babolat', 'Head', 'Prince', 'Yonex'];

  // API 호출 함수
  const fetchRacquets = async (brandName: string) => {
    try {
      const response = await apiClient.get(`/racquets`, {
        params: { brand: brandName },
      });
      setRacquets(response.data); // 라켓 데이터 상태 업데이트
    } catch (error) {
      console.error('Failed to fetch racquets:', error);
    }
  };

  // URL 변경에 따라 데이터 가져오기
  useEffect(() => {
    if (brand) {
      fetchRacquets(brand); // URL에 해당하는 브랜드 데이터 가져오기
    }
  }, [brand]);

  // 브랜드 클릭 시 URL 변경 및 데이터 호출
  const handleBrandClick = (brandName: string) => {
    navigate(`/racquet/${brandName.toLowerCase()}`); // URL을 변경
  };

  // 라켓 이미지 클릭 시 상세 페이지로 이동
  const handleRacquetClick = (id: number) => {
    navigate(`/racquet-detail/${id}`);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* 좌측 브랜드 리스트 */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 200,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 200,
            boxSizing: 'border-box',
            top: 64, // Header 높이에 맞춤
          },
        }}
      >
        <List>
          {brandList.map((brandName) => (
            <ListItem key={brandName} disablePadding>
              <ListItemButton onClick={() => handleBrandClick(brandName)}>
                <ListItemText primary={brandName} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* 메인 컨텐츠 */}
      <Box sx={{ flex: 1, textAlign: 'center', p: 4, ml: '200px' }}>
        {/* 브랜드명 헤더 */}
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
          {brand ? `${brand.charAt(0).toUpperCase() + brand.slice(1)} Tennis Racquets` : 'Tennis Racquets'}
        </Typography>

        {/* 라켓 목록 */}
        <Grid container spacing={4} justifyContent="center">
          {racquets.map((racquet) => (
            <Grid item key={racquet.id} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardActionArea onClick={() => handleRacquetClick(racquet.id)}>
                  {/* 라켓 이미지 */}
                  <CardMedia
                    component="img"
                    image={racquet.image_url} // Backend에서 제공한 image_url 사용
                    alt={racquet.name}
                    sx={{ height: 350, objectFit: 'cover', p: 0 }}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* 데이터가 없을 경우 메시지 */}
        {racquets.length === 0 && (
          <Typography variant="h6" color="textSecondary" sx={{ mt: 4 }}>
            현재 브랜드의 라켓 정보가 없습니다.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default RacquetPage;