"use client";

import { use } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { MEMBERS } from "@/lib/members-data";
import { useScrollDetect } from "@/hooks/useScrollDetect";
import DinoGame from "@/components/game/DinoGame";
import type { MemberId } from "@/types";
import Link from "next/link";

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function GameSection({ sessionId }: { sessionId: string }) {
  const { ref, isVisible } = useScrollDetect(0.3);

  return (
    <motion.div variants={fadeUp} className="mt-12 w-full" ref={ref}>
      <div className="mb-4 text-center">
        <p className="text-sm font-bold text-gray-700">미니게임</p>
        <p className="text-xs text-gray-400">장애물을 피하세요!</p>
      </div>
      {isVisible ? (
        <DinoGame sessionId={sessionId} />
      ) : (
        <div className="flex h-[200px] items-center justify-center rounded-xl border-2 border-dashed border-gray-200">
          <p className="text-sm text-gray-400">스크롤하여 게임을 시작하세요</p>
        </div>
      )}
    </motion.div>
  );
}

export default function ResultPage({
  params,
}: {
  params: Promise<{ memberId: string }>;
}) {
  const { memberId } = use(params);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sid");

  const member = MEMBERS[memberId as MemberId];
  if (!member) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <p className="text-gray-500">잘못된 결과 페이지입니다.</p>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-gradient-to-b from-indigo-50 via-white to-pink-50">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="mx-auto flex max-w-md flex-col items-center px-5 py-8"
      >
        {/* 헤더 */}
        <motion.p
          variants={fadeUp}
          className="text-sm font-medium text-indigo-500"
        >
          당신과 닮은 팀원은...
        </motion.p>

        {/* 캐릭터 이미지 */}
        <motion.div
          variants={fadeUp}
          className="mt-4 flex h-48 w-48 items-center justify-center overflow-hidden rounded-3xl bg-indigo-100 shadow-lg"
        >
          <div className="flex h-full w-full items-center justify-center text-6xl text-indigo-300">
            {member.name[0]}
          </div>
        </motion.div>

        {/* 이름 + 한줄 소개 */}
        <motion.h1
          variants={fadeUp}
          className="mt-5 text-2xl font-bold text-gray-900"
        >
          {member.name}
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-1 text-sm text-gray-500">
          {member.oneLiner}
        </motion.p>

        {/* MBTI 태그 */}
        <motion.div variants={fadeUp} className="mt-4">
          <span className="inline-block rounded-full bg-indigo-500 px-4 py-1.5 text-sm font-bold text-white shadow-sm">
            {member.mbti}
          </span>
        </motion.div>

        {/* 특징 리스트 */}
        <motion.ul
          variants={fadeUp}
          className="mt-6 w-full space-y-2.5 rounded-2xl bg-white p-5 shadow-sm"
        >
          {member.traits.map((trait, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-[15px] text-gray-700"
            >
              <span className="mt-0.5 text-indigo-400">•</span>
              {trait}
            </li>
          ))}
        </motion.ul>

        {/* 스킬 태그 */}
        {member.skills.length > 0 && (
          <motion.div
            variants={fadeUp}
            className="mt-4 flex flex-wrap justify-center gap-2"
          >
            {member.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
              >
                {skill}
              </span>
            ))}
          </motion.div>
        )}

        {/* 추구 방향 */}
        {member.direction && (
          <motion.div
            variants={fadeUp}
            className="mt-4 w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 p-4 text-center shadow-sm"
          >
            <p className="text-xs font-medium text-indigo-100">추구 방향</p>
            <p className="mt-1 text-sm font-bold text-white">
              {member.direction}
            </p>
          </motion.div>
        )}

        {/* 팀원 전체 보기 링크 */}
        <motion.div variants={fadeUp} className="mt-6">
          <Link
            href="/members"
            className="inline-flex items-center gap-1 rounded-full border-2 border-indigo-200 px-5 py-2.5 text-sm font-semibold text-indigo-600 transition-colors hover:bg-indigo-50"
          >
            팀원 전체 보기
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 12L10 8L6 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.div>

        {/* 미니게임 */}
        {sessionId && <GameSection sessionId={sessionId} />}
      </motion.div>
    </div>
  );
}
