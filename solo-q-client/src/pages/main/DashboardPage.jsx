import React from 'react';
import Navbar from '../../components/common/Navbar';
import HeaderSection from '../../components/dashboard/HeaderSection';
import RecommendBanner from '../../components/dashboard/RecommendBanner';
import QuickMenuGrid from '../../components/dashboard/QuickMenuGrid';

const DashboardPage = () => {
    return (
        <div className="min-h-screen pb-20 bg-[#020617] text-white font-sans selection:bg-purple-600 selection:text-white">
            <Navbar />

            <div className="pt-24">
                <HeaderSection />
                <RecommendBanner />
                <QuickMenuGrid />
            </div>

            <div className="text-center text-slate-600 text-sm pt-8 border-t border-white/5 mx-6">
                <p>© 2025 Solo-Q. All rights reserved.</p>
            </div>
        </div>
    );
};

export default DashboardPage;