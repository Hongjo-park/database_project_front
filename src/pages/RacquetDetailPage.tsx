import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
  Button,
} from '@mui/material';
import apiClient from '../utils/api'; // apiClient 불러오기

// API 호출 시 받아올 라켓 세부 데이터 타입 정의
interface RacquetDetail {
  id: number;
  name: string;
  image_url: string;
  summary: string;
  head_size: string;
  length: string;
  strung_weight: string;
  balance: string;
  swingweight: string;
  stiffness: string;
  beam_width: string;
  composition: string;
  power_level: string;
  stroke_style: string;
  swing_speed: string;
  color: string;
}

const RacquetDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // URL 파라미터로 전달받은 라켓 id
  const navigate = useNavigate();
  const [racquetDetails, setRacquetDetails] = useState<RacquetDetail[]>([]);

  // 좌측 브랜드 리스트
  const brandList = ['Wilson', 'Babolat', 'Head', 'Prince', 'Yonex'];

  // API 호출 함수
  const fetchRacquetDetails = async (racquetId: string) => {
    try {
      const response = await apiClient.get(`/racquet-details`, {
        params: { racquetId },
      });
      setRacquetDetails(response.data); // 라켓 세부 데이터 상태 업데이트
    } catch (error) {
      console.error('Failed to fetch racquet details:', error);
    }
  };

  // URL 파라미터에 따라 데이터 가져오기
  useEffect(() => {
    if (id) {
      fetchRacquetDetails(id); // URL에 전달된 id를 사용
    }
  }, [id]);

  // 브랜드 클릭 시 RacketPage로 이동
  const handleBrandClick = (brandName: string) => {
    navigate(`/racquet/${brandName.toLowerCase()}`);
  };

  // Review 버튼 클릭 시 이동
  const handleReviewClick = (id: number) => {
    navigate(`/racquet-review/${id}`); // 라켓 리뷰 페이지로 이동
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', mt: 2 }}>
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
        <Box sx={{ flex: 1, textAlign: 'left', p: 4, ml: '200px' }}>
          {/* 브랜드명 헤더 */}
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
            Racquet Details
          </Typography>

          {/* 라켓 세부 목록 */}
          <Grid container spacing={35} justifyContent="left">
            {racquetDetails.map((detail) => (
              <Grid item key={detail.id} xs={12} sm={6} md={4} lg={3}>
                <Card sx = {{ width: 250 }}>
                  <CardActionArea>
                    {/* 라켓 이미지 */}
                    <CardMedia
                      component="img"
                      image={detail.image_url} // Backend에서 제공한 image_url 사용
                      alt={detail.name}
                      sx={{ height: 330, width: '100%', objectFit: 'contain', p: 1 }}
                    />
                    {/* 라켓 정보 */}
                    <CardContent>
                      <Typography variant="subtitle1" textAlign="center" gutterBottom>
                        {detail.name}
                      </Typography>
                      {/* <Typography variant="body2" color="textSecondary" textAlign="center">
                        {detail.summary || 'No summary available'}
                      </Typography> */}
                    </CardContent>
                  </CardActionArea>
                  {/* Review 버튼 */}
                  <Box sx={{ textAlign: 'center', pb: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleReviewClick(detail.id)}
                    >
                      Review
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* 데이터가 없을 경우 메시지 */}
          {racquetDetails.length === 0 && (
            <Typography variant="h6" color="textSecondary" sx={{ mt: 4 }}>
              세부 라켓 정보가 없습니다.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default RacquetDetailPage;