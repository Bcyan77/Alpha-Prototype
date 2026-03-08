"use client";

import { motion } from "framer-motion";
import { useStats } from "@/hooks/useStats";
import { MEMBERS } from "@/lib/members-data";
import { MEMBER_IDS } from "@/lib/members-data";
import Link from "next/link";

function AnimatedNumber({ value }: { value: number }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {value}
    </motion.span>
  );
}

export default function StatsPage() {
  const { stats, connected } = useStats();

  const maxCount = Math.max(...Object.values(stats.memberCounts), 1);

  return (
    <div className="flex min-h-dvh flex-col bg-[#0f0f1a] px-12 py-10 text-white">
      {/* 헤더 */}
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black"
        >
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            실시간 참여 현황
          </span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-3 flex items-center justify-center gap-3"
        >
          <span
            className={`h-2 w-2 rounded-full ${connected ? "bg-green-400" : "bg-red-400"}`}
          />
          <span className="text-5xl font-black text-white">
            <AnimatedNumber value={stats.totalParticipants} />
          </span>
          <span className="text-lg text-gray-400">명 참여</span>
        </motion.div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="mt-10 grid flex-1 grid-cols-2 gap-8">
        {/* 좌: 팀원별 매칭 결과 */}
        <div className="rounded-2xl bg-white/5 p-8">
          <h2 className="mb-6 text-xl font-bold text-gray-300">
            팀원별 매칭 결과
          </h2>
          <div className="flex flex-col gap-4">
            {MEMBER_IDS.map((id) => {
              const count = stats.memberCounts[id];
              const width = maxCount > 0 ? (count / maxCount) * 100 : 0;
              return (
                <div key={id} className="flex items-center gap-4">
                  <span className="w-20 text-right text-sm font-semibold text-gray-300">
                    {MEMBERS[id].name}
                  </span>
                  <div className="flex-1">
                    <div className="h-8 overflow-hidden rounded-lg bg-white/5">
                      <motion.div
                        className="flex h-full items-center rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-3"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.max(width, 2)}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      >
                        {count > 0 && (
                          <span className="text-xs font-bold text-white">
                            {count}
                          </span>
                        )}
                      </motion.div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 우: 미니게임 랭킹 */}
        <div className="rounded-2xl bg-white/5 p-8">
          <h2 className="mb-6 text-xl font-bold text-gray-300">
            미니게임 랭킹
          </h2>
          {stats.gameRanking.length === 0 ? (
            <p className="text-sm text-gray-500">아직 기록이 없습니다</p>
          ) : (
            <div className="flex flex-col gap-3">
              {stats.gameRanking.map((entry, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 rounded-xl px-4 py-3 ${
                    i < 3 ? "bg-white/5" : ""
                  }`}
                >
                  <span
                    className={`w-8 text-center text-lg font-black ${
                      i === 0
                        ? "text-yellow-400"
                        : i === 1
                          ? "text-gray-300"
                          : i === 2
                            ? "text-amber-600"
                            : "text-gray-500"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="flex-1 text-sm font-semibold text-gray-200">
                    {entry.nickname}
                  </span>
                  <span className="font-mono text-sm font-bold text-indigo-300">
                    {entry.score.toLocaleString()}점
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 하단: 인기/희소 + 네비게이션 */}
      <div className="mt-8 flex items-end justify-between">
        <div className="flex gap-8">
          {stats.mostPicked && (
            <div className="rounded-xl bg-indigo-500/20 px-6 py-4">
              <p className="text-xs text-indigo-300">가장 인기 많은 팀원</p>
              <p className="mt-1 text-lg font-bold text-white">
                {stats.mostPicked.name}{" "}
                <span className="text-indigo-300">
                  ({stats.mostPicked.count}표)
                </span>
              </p>
            </div>
          )}
          {stats.leastPicked && (
            <div className="rounded-xl bg-purple-500/20 px-6 py-4">
              <p className="text-xs text-purple-300">가장 희소한 팀원</p>
              <p className="mt-1 text-lg font-bold text-white">
                {stats.leastPicked.name}{" "}
                <span className="text-purple-300">
                  ({stats.leastPicked.count}표)
                </span>
              </p>
            </div>
          )}
        </div>

        <Link
          href="/intro"
          className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-8 py-4 text-lg font-bold text-white shadow-lg transition-transform hover:scale-105"
        >
          팀 소개로
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="transition-transform group-hover:translate-x-1"
          >
            <path
              d="M7.5 15L12.5 10L7.5 5"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
