"use client";

import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [quizUrl, setQuizUrl] = useState("");

  useEffect(() => {
    const origin = window.location.origin;
    setQuizUrl(`${origin}/quiz`);
  }, []);

  return (
    <div className="flex h-dvh items-center justify-center bg-[#0f0f1a] text-white">
      <div className="flex flex-col items-center gap-10">
        {/* 팀 이름 */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-6xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Alpha Team
            </span>
          </h1>
          <p className="mt-3 text-lg text-gray-400">인터랙티브 팀 소개</p>
        </motion.div>

        {/* QR 코드 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-3xl bg-white p-6 shadow-2xl shadow-indigo-500/20"
        >
          {quizUrl ? (
            <QRCodeSVG
              value={quizUrl}
              size={240}
              level="M"
              bgColor="#ffffff"
              fgColor="#1e1b4b"
            />
          ) : (
            <div className="h-[240px] w-[240px]" />
          )}
        </motion.div>

        {/* 안내 문구 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <p className="text-xl font-semibold text-gray-200">
            QR을 스캔하여 참여하세요
          </p>
          <p className="mt-2 text-sm text-gray-500">
            모바일에서 성격 테스트를 진행합니다
          </p>
        </motion.div>
      </div>
    </div>
  );
}
