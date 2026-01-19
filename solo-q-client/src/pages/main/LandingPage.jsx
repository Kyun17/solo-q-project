import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import {
  VideoCamera,
  Notebook,
  UsersThree,
  PlayCircle,
  Atom,
  Database,
  Cloud,
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navbar />

      {/* --- Hero Section --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        {/* Background Blobs (Animated) */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"
          style={{ animationDelay: '2s' }}
        ></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-sm text-secondary text-sm font-semibold mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>
            AI 기반 면접 파트너, 히토리데모 런칭!
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold leading-tight mb-8 tracking-tight"
          >
            면접 준비, <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-white">
              혼자서도 완벽하게
            </span>
            <br />
            레벨업 하세요.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            스터디 구할 필요 없이, 웹캠 하나로 실전처럼 연습하세요.
            <br className="hidden md:block" />
            예상 질문 관리부터 모의 면접 녹화, 피드백까지 한 번에 해결해
            드립니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/dashboard"
              className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-full text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/40 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <VideoCamera size={24} weight="fill" />
              모의 면접 체험하기
            </Link>
            <button className="w-full md:w-auto px-8 py-4 bg-slate-800/50 border border-slate-700 backdrop-blur-sm rounded-full text-white font-semibold hover:bg-slate-700 transition-all flex items-center justify-center gap-2">
              <PlayCircle size={24} />
              시연 영상 보기
            </button>
          </motion.div>
        </div>
      </section>

      {/* --- Tech Stack Banner --- */}
      <section className="py-10 border-y border-white/5 bg-black/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 opacity-60">
          <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest hidden md:block">
            Powered by
          </span>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-xl font-bold text-slate-400">
            <div className="flex items-center gap-2">
              <Atom size={24} className="text-blue-400" /> React
            </div>
            <div className="flex items-center gap-2">
              <Database size={24} className="text-green-400" /> Spring Boot
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center text-xs text-white">
                O
              </div>{' '}
              Oracle
            </div>
            <div className="flex items-center gap-2">
              <Cloud size={24} className="text-cyan-400" /> WebRTC
            </div>
          </div>
        </div>
      </section>

      {/* --- Features Section --- */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              합격을 위한 <span className="text-purple-400">HITORI demo</span>
              만의 솔루션
            </h2>
            <p className="text-slate-400">
              면접 준비의 A to Z를 빈틈없이 채워드립니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Notebook size={32} weight="duotone" />,
                title: '나만의 질문 노트',
                desc: '인성, 기술, CS 등 분야별로 예상 질문을 정리하고 태그로 관리하세요.',
                color: 'text-cyan-400',
                bg: 'bg-cyan-400/10',
              },
              {
                icon: <VideoCamera size={32} weight="duotone" />,
                title: 'AI 모의 면접',
                desc: '웹캠을 켜고 랜덤 질문에 답변해보세요. 타이머가 실전 같은 긴장감을 줍니다.',
                color: 'text-purple-400',
                bg: 'bg-purple-400/10',
                highlight: true,
              },
              {
                icon: <UsersThree size={32} weight="duotone" />,
                title: '피드백 커뮤니티',
                desc: '혼자 알기 아까운 답변을 공유하고 현직자, 취준생 동료에게 피드백을 받으세요.',
                color: 'text-lime-400',
                bg: 'bg-lime-400/10',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-3xl bg-slate-800/40 border border-slate-700 backdrop-blur-sm hover:-translate-y-2 transition-transform duration-300 ${
                  feature.highlight
                    ? 'border-purple-500/50 shadow-lg shadow-purple-500/10'
                    : ''
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-12 border-t border-slate-800 bg-slate-950 text-center text-slate-500 text-sm">
        <p>© 2025 HITORIdemo Project. Created for Portfolio.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
