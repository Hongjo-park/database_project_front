import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import apiClient from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

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

interface Review {
  review_id: number;
  review_racquet_detail_id: number;
  review_comment: string;
  review_created_at: string;
  user_name: string;
  user_id: number;
}

const RacketReviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // 라켓 상세 ID 가져오기
  const [racquetDetail, setRacquetDetail] = useState<RacquetDetail | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]); // 리뷰 리스트
  const [newComment, setNewComment] = useState(''); // 새로운 리뷰
  const { user } = useAuth(); // AuthContext에서 user 정보 가져오기

  // 라켓 세부 정보 가져오기
  const fetchRacquetDetail = useCallback(async () => {
    try {
      const response = await apiClient.get(`/racquet-details/single`, {
        params: { id },
      });
      setRacquetDetail(response.data);
    } catch (error) {
      console.error('Failed to fetch racquet detail:', error);
    }
  }, [id]);

  // 리뷰 리스트 가져오기
  const fetchReviews = useCallback(async () => {
    try {
      const response = await apiClient.get(`/review/racquet-detail`, {
        params: { racquetDetailId: id },
      });
      setReviews(response.data); // 서버에서 리뷰 데이터를 가져와 상태 업데이트
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  }, [id]);

  // 리뷰 추가 API 호출
  const addReview = async () => {
    if (!racquetDetail) return;
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }
  
    const trimmedComment = newComment.trim();
    if (!trimmedComment) {
      alert('공백 댓글은 등록할 수 없습니다.');
      return;
    }
  
    try {
      const newReview = {
        user_id: user.id,
        racquet_detail_id: racquetDetail.id, // 수정된 필드 이름
        comment: trimmedComment, // 수정된 필드 이름
      };
  
      const response = await apiClient.post('/review', newReview);
  
      setReviews([
        ...reviews,
        {
          ...response.data,
          user_name: user.name, // 현재 로그인한 유저의 이름 추가
        },
      ]);
      setNewComment(''); // 입력 필드 초기화
    } catch (error) {
      // console.error('Failed to add review:', response);
    }
  };

  // 페이지 로드 시 데이터 가져오기
  useEffect(() => {
    if (id) {
      fetchRacquetDetail();
      fetchReviews(); // 페이지 로드 시 서버에서 리뷰 데이터 가져오기
    }
  }, [id, fetchRacquetDetail, fetchReviews]);

  useEffect(() => {
    console.log('Fetched reviews:', reviews); // 디버깅용
  }, [reviews]);

  return (
    <Box sx={{ p: 4 }}>
      {/* 라켓 세부 정보 */}
      {racquetDetail && (
        <Card sx={{ mb: 4, display: 'flex', alignItems: 'center', p: 2 }}>
          <CardMedia
            component="img"
            image={racquetDetail.image_url}
            alt={racquetDetail.name}
            sx={{ width: 200, height: 200, objectFit: 'contain', mr: 2 }}
          />
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2 }}>
              {racquetDetail.name}
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 1 }}>
              {racquetDetail.summary || 'No summary available'}
            </Typography>
            <Typography variant="body2">Head Size: {racquetDetail.head_size}</Typography>
            <Typography variant="body2">Length: {racquetDetail.length}</Typography>
            <Typography variant="body2">Strung Weight: {racquetDetail.strung_weight}</Typography>
            <Typography variant="body2">Balance: {racquetDetail.balance}</Typography>
            <Typography variant="body2">Swingweight: {racquetDetail.swingweight}</Typography>
            <Typography variant="body2">Stiffness: {racquetDetail.stiffness}</Typography>
            <Typography variant="body2">Beam Width: {racquetDetail.beam_width}</Typography>
            <Typography variant="body2">Composition: {racquetDetail.composition}</Typography>
          </CardContent>
        </Card>
      )}

      {/* 리뷰 섹션 */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Reviews
      </Typography>
      <List sx={{ mb: 4 }}>
        {reviews.map((review, index) => (
          <ListItem key={review.review_id || index}>
            <ListItemText
              primary={review.review_comment || 'No comment provided'}
              secondary={`By ${
                review.user_name || 'Unknown'
              } at ${
                review.review_created_at ? new Date(review.review_created_at).toLocaleString() : 'Unknown time'
              }`}
            />
          </ListItem>
        ))}
      </List>

      {/* 리뷰 입력 */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label="Leave a Review"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addReview}
          disabled={!newComment.trim()}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default RacketReviewPage;