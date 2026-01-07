import React, { useEffect, useState } from 'react';
import Navbar from '../../components/common/Navbar';
import HeaderSection from '../../components/dashboard/HeaderSection';
import RecommendBanner from '../../components/dashboard/RecommendBanner';
import QuickMenuGrid from '../../components/dashboard/QuickMenuGrid';
import { getDashboardData } from '../../api/dashboardApi'; // API 함수 임포트

const DashboardPage = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("🚀 API 호출 시작!"); // 👈 이 로그가 뜨는지 확인!
                const data = await getDashboardData();
                console.log("📦 받아온 데이터:", data); // 👈 데이터 확인
                setDashboardData(data);
            } catch (error) {
                // 에러 시 (로그인 안 됨 등) 일단 가짜 데이터나 에러 메시지 처리
                console.log("데이터 로드 실패, 기본값 사용");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
                로딩중...
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-20 bg-slate-950 text-white">
            <Navbar />

            <div className="pt-24">
                {/* API에서 받은 데이터를 props로 넘겨줌 */}
                <HeaderSection data={dashboardData} />
                <RecommendBanner data={dashboardData?.todayQuestion} />
                <QuickMenuGrid data={dashboardData} />
            </div>

            <div className="text-center text-slate-600 text-sm pt-8 border-t border-white/5 mx-6">
                <p>© 2025 Solo-Q. All rights reserved.</p>
            </div>
        </div>
    );
};

export default DashboardPage;
