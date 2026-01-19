import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useNavigate,
  Link,
} from 'react-router-dom';
import LandingPage from './pages/main/LandingPage';
import './App.css';
import DashboardPage from './pages/main/DashboardPage';
import LoginPage from './pages/auth/LoginPage';
import InterviewActivePage from './pages/interview/InterviewActivePage';
import InterviewSetupPage from './pages/interview/InterviewSetupPage';
import InterviewResultPage from './pages/interview/InterviewResultPage';
import QuestionNotePage from './pages/note/QuestionNotePage';
import CommunityPage from './pages/community/CommunityPage';
import SignupPage from './pages/auth/SignupPage';
import useAuthStore from './store/useAuthStore';

// ---------------------------------------------------------
// 1. 보안 가드 컴포넌트 (PrivateRoute)
// ---------------------------------------------------------
const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

// ---------------------------------------------------------
// 2. 공개 접근 제한 컴포넌트 (PublicRoute)
// ---------------------------------------------------------
const PublicRoute = () => {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
};
// ---------------------------------------------------------
// Main App Component
// ---------------------------------------------------------
function App() {
  const { logout } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = payload.exp * 1000;
        const now = Date.now();

        // 만료 시간이 지났다면?
        if (now > expirationTime) {
          alert('세션이 만료되었습니다.');
          logout(); // 로그아웃 처리
          window.location.href = '/login';
        }
      } catch (e) {
        // 토큰이 깨졌거나 이상하면 그냥 로그아웃
        logout();
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* === 누구나 접근 가능한 페이지 === */}
        <Route path="/" element={<LandingPage />} />

        {/* === 로그인 안 한 사람만 접근 가능한 페이지 (PublicRoute) === */}
        <Route element={<PublicRoute />}>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
        </Route>

        {/* === [중요] 로그인한 사람만 접근 가능한 페이지 (PrivateRoute) === */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* 면접 관련 페이지들 */}
          <Route path="/interview" element={<InterviewSetupPage />} />
          <Route path="/interview/ing" element={<InterviewActivePage />} />
          <Route path="/interview/finished" element={<InterviewResultPage />} />

          {/* 기타 기능 페이지들 */}
          <Route path="/note" element={<QuestionNotePage />} />

          {/* 커뮤니티 페이지들 */}
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/community/:postId" element={<CommunityPage />} />
        </Route>

        {/* === 404 페이지 === */}
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-gray-900 text-white p-10 text-center">
              404 Not Found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
