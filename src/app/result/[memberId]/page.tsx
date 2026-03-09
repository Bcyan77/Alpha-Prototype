"use client";

import { use } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { MEMBERS } from "@/lib/members-data";
import { useScrollDetect } from "@/hooks/useScrollDetect";
import DinoGame from "@/components/game/DinoGame";
import type { MemberId } from "@/types";
import Link from "next/link";
import Image from "next/image";

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

        {/* 팀원 프로필 이미지 */}
        <motion.div
          variants={fadeUp}
          className="mt-4 w-full overflow-hidden rounded-3xl shadow-lg"
        >
          <Image
            src={member.photo}
            alt={member.name}
            width={430}
            height={430}
            className="h-auto w-full"
            priority
          />
        </motion.div>

        {/* 인스타그램 링크 */}
        <motion.a
          variants={fadeUp}
          href={`https://instagram.com/${member.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-90"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
          @{member.instagram}
        </motion.a>

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
