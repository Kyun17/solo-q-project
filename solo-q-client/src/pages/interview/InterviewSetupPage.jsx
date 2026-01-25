import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import {
  Video,
  Mic,
  CheckCircle,
  PlayCircle,
  ArrowLeft,
  AlertCircle,
} from 'lucide-react';
import Navbar from '../../components/common/Navbar'; // NavbarV2 사용
import { getInterviewQuestions } from '../../api/interviewApi'; // V2 API 사용

const InterviewSetupPage = () => {
  const navigate = useNavigate();
  const webcamRef = useRef(null);

  const [permission, setPermission] = useState(null); // null, 'granted', 'denied'
  const [loading, setLoading] = useState(false);

  // ✅ 사용자 선택 옵션 상태
  const [category, setCategory] = useState('인성');
  const [questionCount, setQuestionCount] = useState(5);

  // 권한 확인
  useEffect(() => {
    const checkPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setPermission('granted');
        // 스트림은 확인용이므로 즉시 정지 (메모리 누수 방지)
        stream.getTracks().forEach((track) => track.stop());
      } catch (err) {
        console.error('권한 확인 실패:', err);
        setPermission('denied');
      }
    };
    checkPermission();
  }, []);

  // ✅ 면접 시작 핸들러
  const handleStart = async () => {
    setLoading(true);
    try {
      // 1. 백엔드에서 질문 리스트 받아오기
      const questions = await getInterviewQuestions(category, questionCount);

      if (!questions || questions.length === 0) {
        alert('해당 조건의 질문이 부족합니다. 다른 카테고리를 선택해주세요.');
        return;
      }

      // 2. 질문 데이터를 가지고 진행 화면으로 이동 (state로 전달)
      navigate('/interview/ing', { state: { questions } });
    } catch (error) {
      console.error(error);
      alert('서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-purple-600 selection:text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="mb-10">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={20} /> 대시보드로 돌아가기
          </button>
          <h1 className="text-3xl md:text-4xl font-bold">
            면접 환경 체크 <span className="text-purple-400">✓</span>
          </h1>
          <p className="text-slate-400 mt-2">
            실전 면접을 시작하기 전, 카메라와 오디오 상태를 확인하고 옵션을
            설정하세요.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* 1. 웹캠 미리보기 */}
          <div className="relative aspect-video bg-black rounded-3xl overflow-hidden border border-slate-700 shadow-2xl group">
            {permission === 'denied' ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-slate-400">
                <AlertCircle size={48} className="mb-4 text-red-500" />
                <p className="font-bold">카메라/마이크 권한이 필요합니다.</p>
                <p className="text-sm mt-2 text-center">
                  브라우저 주소창의 자물쇠 아이콘을 눌러
                  <br />
                  권한을 허용해주세요.
                </p>
              </div>
            ) : (
              <>
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  mirrored={true}
                  className="w-full h-full object-cover"
                />
                {permission === 'granted' && (
                  <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur px-4 py-2 rounded-full flex items-center gap-2 border border-white/10">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-bold text-green-400">
                      Camera Active
                    </span>
                  </div>
                )}
              </>
            )}
          </div>

          {/* 2. 설정 및 시작 버튼 */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="bg-slate-800/40 border border-white/5 p-6 rounded-3xl space-y-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold border-b border-white/5 pb-4">
                면접 옵션 설정
              </h3>

              {/* 카테고리 선택 */}
              <div>
                <label className="block text-slate-400 mb-2 text-sm font-medium">
                  질문 카테고리
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                >
                  <option value="기술">💻 기술 면접</option>
                  <option value="인성">😊 인성 면접</option>
                  <option value="기타">📚 기타 질문</option>
                  {/* ✅ 랜덤 옵션 */}
                  <option value="랜덤">🎲 랜덤 (전체)</option>
                </select>
              </div>

              {/* 문제 수 선택 */}
              <div>
                <label className="block text-slate-400 mb-2 text-sm font-medium">
                  진행할 문제 수
                </label>
                <select
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                >
                  <option value={3}>3문제 (약 3분)</option>
                  <option value={5}>5문제 (약 5분)</option>
                  <option value={10}>10문제 (약 10분)</option>
                  {/* ✅ 전부 옵션 */}
                  <option value={100}>🔥 전부 (최대 100문제)</option>
                </select>
              </div>
            </div>

            {/* 시작 버튼 */}
            <button
              onClick={handleStart}
              disabled={permission !== 'granted' || loading}
              className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl ${
                permission === 'granted'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-purple-500/25'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  질문 생성 중...
                </span>
              ) : (
                <>
                  <PlayCircle size={24} fill="currentColor" />
                  면접 시작하기
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewSetupPage;
