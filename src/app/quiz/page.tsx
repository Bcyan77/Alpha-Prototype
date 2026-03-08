"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuiz } from "@/hooks/useQuiz";

export default function QuizPage() {
  const router = useRouter();
  const {
    currentIndex,
    currentQuestion,
    totalQuestions,
    isSubmitting,
    direction,
    selectAnswer,
    goBack,
    selectedAnswer,
  } = useQuiz();
  const [showAnalyzing, setShowAnalyzing] = useState(false);

  const handleSelect = async (answerIdx: number) => {
    const result = await selectAnswer(answerIdx);
    if (result) {
      setShowAnalyzing(true);
      setTimeout(() => {
        router.push(`/result/${result.matchedMember}?sid=${result.sessionId}`);
      }, 2000);
    }
  };

  if (showAnalyzing) {
    return <AnalyzingScreen />;
  }

  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="flex min-h-dvh flex-col bg-gradient-to-b from-indigo-50 to-white px-5 py-6">
      {/* 상단 진행 바 */}
      <div className="mb-2 flex items-center gap-3">
        {currentIndex > 0 && (
          <button
            onClick={goBack}
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100"
            aria-label="이전 질문"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M12.5 15L7.5 10L12.5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        <div className="flex-1">
          <div className="h-2 overflow-hidden rounded-full bg-gray-200">
            <motion.div
              className="h-full rounded-full bg-indigo-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>
        <span className="text-sm font-medium text-gray-400">
          {currentIndex + 1}/{totalQuestions}
        </span>
      </div>

      {/* 질문 + 선택지 */}
      <div className="flex flex-1 flex-col justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction * 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -80 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="flex flex-col gap-6"
          >
            {/* 질문 텍스트 */}
            <div className="text-center">
              <h2 className="text-xl font-bold leading-snug text-gray-900">
                {currentQuestion.title}
              </h2>
              {currentQuestion.subtitle && (
                <p className="mt-2 text-sm text-gray-500">
                  {currentQuestion.subtitle}
                </p>
              )}
            </div>

            {/* 선택지 */}
            <div className="flex flex-col gap-3">
              {currentQuestion.answers.map((answer, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isSubmitting}
                  className={`group relative w-full rounded-2xl border-2 px-5 py-4 text-left transition-all duration-200 active:scale-[0.98] ${
                    selectedAnswer === idx
                      ? "border-indigo-500 bg-indigo-50 shadow-md"
                      : "border-gray-200 bg-white hover:border-indigo-300 hover:shadow-sm"
                  } disabled:opacity-60`}
                >
                  <span className="block text-[15px] font-semibold text-gray-800">
                    {answer.text}
                  </span>
                  {answer.description && (
                    <span className="mt-1 block text-[13px] text-gray-500">
                      {answer.description}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function AnalyzingScreen() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-5">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-6"
      >
        {/* 로딩 스피너 */}
        <div className="relative h-16 w-16">
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-indigo-200"
            style={{ borderTopColor: "#6366f1" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="text-center">
          <motion.p
            className="text-lg font-bold text-gray-800"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            분석 중...
          </motion.p>
          <p className="mt-2 text-sm text-gray-500">
            당신과 닮은 팀원을 찾고 있어요
          </p>
        </div>
      </motion.div>
    </div>
  );
}
