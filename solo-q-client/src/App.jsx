import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/main/LandingPage';
import './App.css'
import DashboardPage from './pages/main/DashboardPage';
import LoginPage from './pages/auth/LoginPage';

function App(props) {
  return (
    <BrowserRouter>
      <Routes>
        {/* 메인 랜딩 페이지 */}
        <Route path="/" element={<LandingPage />} />

        {/* 추후 추가될 경로들 (미리 구조만 잡아둠) */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<div className="text-white text-center mt-20">회원가입 페이지 (준비중)</div>} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/interview" element={<div className="text-white text-center mt-20">모의 면접 (준비중)</div>} />
        <Route path="/note" element={<div className="text-white text-center mt-20">질문 노트 (준비중)</div>} />
        <Route path="/community" element={<div className="text-white text-center mt-20">커뮤니티 (준비중)</div>} />

        {/* 404 페이지 */}
        <Route path="*" element={<div className="text-white text-center mt-20">404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;