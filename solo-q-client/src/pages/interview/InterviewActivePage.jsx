import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Webcam from 'react-webcam';
import { ArrowRight, StopCircle, Volume2, VolumeX } from 'lucide-react';
import { saveInterviewResult } from '../../api/interviewApi'; // 경로 확인 필요

const TIME_LIMIT = 300;

const InterviewActivePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  // ✅ 전달받은 질문 리스트
  const questions = location.state?.questions || [];

  // 상태 관리
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [isTtsOn, setIsTtsOn] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);

  // ⚠️ 예외 처리
  useEffect(() => {
    if (questions.length === 0) {
      alert('질문 데이터가 없습니다. 설정 페이지로 이동합니다.');
      navigate('/interview');
    }
  }, [questions, navigate]);

  // 전체 시간 타이머
  useEffect(() => {
    const totalTimer = setInterval(() => {
      setTotalElapsedTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(totalTimer);
  }, []);

  // 질문별 타이머
  useEffect(() => {
    if (questions.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNext();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentQIndex, questions]);

  // TTS 실행
  useEffect(() => {
    if (questions.length === 0) return;

    if (isTtsOn) {
      const text = questions[currentQIndex].content;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 1.0;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  }, [currentQIndex, isTtsOn, questions]);

  // 🎥 녹화 시작 함수 (Webcam 로드 완료 시 호출)
  const handleUserMedia = useCallback((stream) => {
    if (!stream) return;

    try {
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9,opus', // 또는 "video/webm"
      });

      // 데이터가 들어올 때마다 chunks에 저장
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('녹화 시작 실패:', error);
    }
  }, []);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state === 'recording'
      ) {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  // 다음 질문으로 이동
  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setTimeLeft(TIME_LIMIT);
    } else {
      handleFinishInterview();
    }
  };

  // 🛑 면접 종료 및 저장 처리
  const handleFinishInterview = async () => {
    // 녹화 중지
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== 'inactive'
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }

    // 녹화 데이터 생성 대기 (약간의 지연 필요)
    // onstop 이벤트 대신 간단하게 처리하기 위해 잠시 대기 후 Blob 생성
    setTimeout(async () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      const videoUrl = URL.createObjectURL(blob);

      // 1. 백엔드 전송 (결과 데이터)
      try {
        await saveInterviewResult({
          totalSeconds: totalElapsedTime,
          questionCount: questions.length,
        });

        // 2. 결과 페이지로 이동 (영상 URL 전달)
        navigate('/interview/finished', {
          state: {
            result: {
              totalSeconds: totalElapsedTime,
              questionCount: questions.length,
            },
            recordedVideoUrl: videoUrl, // ✅ 생성된 비디오 URL 전달
          },
        });
      } catch (error) {
        console.error(error);
        alert('결과 저장 중 오류가 발생했습니다.');
        // 에러 발생 시에도 영상은 살려서 이동
        navigate('/interview/finished', {
          state: {
            result: {
              totalSeconds: totalElapsedTime,
              questionCount: questions.length,
            },
            recordedVideoUrl: videoUrl,
          },
        });
      }
    }, 500); // 0.5초 대기 후 처리
  };

  if (questions.length === 0) return null;

  const radius = 24;
  const isUrgent = timeLeft <= 10;

  return (
    <div className="relative h-[100dvh] w-full bg-black overflow-hidden">
      {/* 웹캠 배경 */}
      <div className="absolute inset-0 z-0">
        <Webcam
          ref={webcamRef}
          audio={true}
          mirrored={true}
          className="w-full h-full object-cover"
          onUserMedia={handleUserMedia} // ✅ 웹캠 로드되면 녹화 시작
        />
      </div>

      {/* 상단 정보 바 */}
      <div className="absolute top-0 left-0 right-0 z-50 p-6 flex justify-between items-start pointer-events-none">
        <div className="bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 pointer-events-auto">
          <div className="relative w-3 h-3">
            <div
              className={`absolute top-0 left-0 w-full h-full bg-red-500 rounded-full ${isRecording ? 'animate-ping opacity-75' : ''}`}
            ></div>
            <div
              className={`relative w-3 h-3 rounded-full ${isRecording ? 'bg-red-500' : 'bg-gray-400'}`}
            ></div>
          </div>
          <span className="text-xs font-bold text-white tracking-wider">
            {isRecording ? 'REC' : 'READY'}
          </span>
        </div>

        <div className="flex gap-3 pointer-events-auto">
          <button
            onClick={() => setIsTtsOn(!isTtsOn)}
            className={`p-2.5 rounded-full backdrop-blur-md border transition-all ${isTtsOn ? 'bg-purple-600/80 border-purple-500 text-white' : 'bg-black/40 border-white/10 text-slate-400'}`}
          >
            {isTtsOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          <div className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-sm font-bold text-slate-200">
            질문 {currentQIndex + 1} / {questions.length}
          </div>
        </div>
      </div>

      {/* 질문 오버레이 */}
      <div className="absolute bottom-24 left-0 right-0 px-6 pb-4 flex justify-center z-40 pointer-events-none">
        <div className="max-w-4xl w-full bg-black/60 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden pointer-events-auto">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-purple-500/50 blur-md"></div>
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
                  {questions[currentQIndex].category}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white leading-tight drop-shadow-md">
                "{questions[currentQIndex].content}"
              </h2>
            </div>

            <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="28"
                  cy="28"
                  r="22"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  className="text-slate-700/50"
                />
                <circle
                  cx="28"
                  cy="28"
                  r="22"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  className={`transition-all duration-1000 ease-linear ${isUrgent ? 'text-red-500' : 'text-purple-400'}`}
                  strokeDasharray={2 * Math.PI * 22}
                  strokeDashoffset={
                    2 * Math.PI * 22 -
                    (timeLeft / TIME_LIMIT) * (2 * Math.PI * 22)
                  }
                  strokeLinecap="round"
                />
              </svg>
              <span
                className={`absolute text-lg font-bold ${isUrgent ? 'text-red-400 animate-pulse' : 'text-white'}`}
              >
                {timeLeft}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 컨트롤 바 */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black via-black/90 to-transparent z-50 flex items-center justify-center gap-6 px-6">
        <button
          onClick={handleFinishInterview}
          className="w-14 h-14 rounded-full bg-slate-800/80 hover:bg-red-500/20 hover:text-red-500 text-slate-400 flex items-center justify-center transition-all backdrop-blur-md border border-white/10 group"
          title="면접 중단"
        >
          <StopCircle
            size={24}
            weight="fill"
            className="group-hover:scale-110 transition-transform"
          />
        </button>

        <div className="h-8 w-px bg-white/10 mx-2"></div>

        <button
          onClick={handleNext}
          className="px-8 py-3.5 rounded-full bg-white text-slate-950 font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center gap-2"
        >
          {currentQIndex < questions.length - 1 ? '다음 질문' : '면접 종료'}
          <ArrowRight size={20} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};

export default InterviewActivePage;
