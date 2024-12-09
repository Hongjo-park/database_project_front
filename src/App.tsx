import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import RacquetPage from './pages/RacquetPage';
import Layout from './components/Layout'; // Header 포함 가정
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyPage from './pages/MyPage'; // My
import RacquetDetailPage from './pages/RacquetDetailPage';
import RacquetReviewPage from './pages/RacquetReviewPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/racquet/:brand" element={<RacquetPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/racquet-detail/:id" element={<RacquetDetailPage />} />
          <Route path="/racquet-review/:id" element={<RacquetReviewPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
