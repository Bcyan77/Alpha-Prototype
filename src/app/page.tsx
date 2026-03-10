"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { useStats } from "@/hooks/useStats";
import { MEMBERS } from "@/lib/members-data";
import { MEMBER_IDS } from "@/lib/members-data";
import type { StatsData, MemberId } from "@/types";
import Image from "next/image";

// --- 슬라이드 정의 ---

type Slide =
  | { type: "landing" }
  | { type: "stats" }
  | { type: "title"; title: string; subtitle: string }
  | { type: "members" }
  | { type: "direction"; title: string; items: string[] }
  | {
      type: "milestone";
      title: string;
      semesters: { label: string; items: string[] }[];
    };


const slides: Slide[] = [
  { type: "landing" },
  { type: "stats" },
  { type: "title", title: "Team Fossil", subtitle: "다양한 배경, 하나의 방향" },
  { type: "members" },
  {
    type: "direction",
    title: "팀 방향성",
    items: [
      "다양한 성격과 기술 스택의 조합",
      "미디어아트부터 게임까지, 폭넓은 스펙트럼",
      "각자의 개성을 살린 협업",
    ],
  },
  {
    type: "milestone",
    title: "로드맵",
    semesters: [
      {
        label: "1학기",
        items: ["팀 빌딩 & 방향 설정", "개인 프로젝트 탐색", "기술 스택 공유"],
      },
      {
        label: "2학기",
        items: ["팀 프로젝트 본격 시작", "프로토타입 제작", "최종 발표 & 전시"],
      },
    ],
  },
];

// --- 메인 컴포넌트 ---

function renderSlideContent(
  slide: Slide,
  stats: StatsData,
  connected: boolean
) {
  switch (slide.type) {
    case "landing":
      return <LandingSlide />;
    case "stats":
      return <StatsSlide stats={stats} connected={connected} />;
    case "title":
      return <TitleSlide slide={slide} />;
    case "members":
      return <MembersSlide />;
    case "direction":
      return <DirectionSlide slide={slide} />;
    case "milestone":
      return <MilestoneSlide slide={slide} />;
  }
}

export default function PresentationPage() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(0);
  const { stats, connected } = useStats();
  const total = slides.length;

  const go = useCallback(
    (d: 1 | -1) => {
      setCurrent((c) => {
        const next = c + d;
        if (next < 0 || next >= total) return c;
        setDir(d);
        return next;
      });
    },
    [total]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        go(1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [go]);

  return (
    <div
      className="relative flex h-dvh flex-col bg-[#0f0f1a] text-white select-none"
      onClick={() => go(1)}
    >
      {/* 슬라이드 콘텐츠 */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-16">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={current}
            custom={dir}
            initial={{ opacity: 0, x: dir * 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -100 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute flex w-full max-w-[90vw] flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {renderSlideContent(slides[current], stats, connected)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 하단 네비게이션 */}
      <div className="flex items-center justify-between px-16 py-6">
        <button
          onClick={(e) => {
            e.stopPropagation();
            go(-1);
          }}
          disabled={current === 0}
          className="rounded-full px-4 py-2 text-sm text-gray-400 transition-colors hover:text-white disabled:invisible"
        >
          ← 이전
        </button>

        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setDir(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={`h-2 rounded-full transition-all ${
                i === current
                  ? "w-6 bg-indigo-400"
                  : "w-2 bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            go(1);
          }}
          disabled={current === total - 1}
          className="rounded-full px-4 py-2 text-sm text-gray-400 transition-colors hover:text-white disabled:invisible"
        >
          다음 →
        </button>
      </div>
    </div>
  );
}

// --- 슬라이드 컴포넌트들 ---

function LandingSlide() {
  const [quizUrl, setQuizUrl] = useState("");

  useEffect(() => {
    setQuizUrl(`${window.location.origin}/quiz`);
  }, []);

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="text-center">
        <h1 className="text-6xl font-black tracking-tight">
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Alpha Prototype
          </span>
        </h1>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-2xl shadow-indigo-500/20">
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
      </div>

      <div className="text-center">
        <p className="text-xl font-semibold text-gray-200">
          QR을 스캔하여 참여하세요
        </p>
        <p className="mt-2 text-sm text-gray-500">
          모바일에서 성격 테스트를 진행합니다
        </p>
      </div>
    </div>
  );
}

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

function StatsSlide({
  stats,
  connected,
}: {
  stats: StatsData;
  connected: boolean;
}) {
  const maxCount = Math.max(...Object.values(stats.memberCounts), 1);

  return (
    <div className="flex w-full flex-col">
      {/* 헤더 */}
      <div className="text-center">
        <h2 className="text-4xl font-black">
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            실시간 참여 현황
          </span>
        </h2>
        <div className="mt-3 flex items-center justify-center gap-3">
          <span
            className={`h-2 w-2 rounded-full ${connected ? "bg-green-400" : "bg-red-400"}`}
          />
          <span className="text-5xl font-black text-white">
            <AnimatedNumber value={stats.totalParticipants} />
          </span>
          <span className="text-lg text-gray-400">명 참여</span>
        </div>
      </div>

      {/* 메인 */}
      <div className="mt-8 grid grid-cols-2 gap-8">
        {/* 팀원별 매칭 */}
        <div className="rounded-2xl bg-white/5 p-6">
          <h3 className="mb-4 text-lg font-bold text-gray-300">
            팀원별 매칭 결과
          </h3>
          <div className="flex flex-col gap-3">
            {MEMBER_IDS.map((id) => {
              const count = stats.memberCounts[id];
              const width = maxCount > 0 ? (count / maxCount) * 100 : 0;
              return (
                <div key={id} className="flex items-center gap-3">
                  <span className="w-16 text-right text-sm font-semibold text-gray-300">
                    {MEMBERS[id].name}
                  </span>
                  <div className="flex-1">
                    <div className="h-7 overflow-hidden rounded-lg bg-white/5">
                      <motion.div
                        className="flex h-full items-center rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-3"
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

        {/* 미니게임 랭킹 */}
        <div className="rounded-2xl bg-white/5 p-6">
          <h3 className="mb-4 text-lg font-bold text-gray-300">
            미니게임 랭킹
          </h3>
          {stats.gameRanking.length === 0 ? (
            <p className="text-sm text-gray-500">아직 기록이 없습니다</p>
          ) : (
            <div className="flex flex-col gap-2">
              {stats.gameRanking.slice(0, 5).map((entry, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 rounded-xl px-4 py-2.5 ${i < 3 ? "bg-white/5" : ""}`}
                >
                  <span
                    className={`w-7 text-center text-base font-black ${
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

      {/* 인기/희소 */}
      <div className="mt-6 flex justify-center gap-6">
        {stats.mostPicked && (
          <div className="rounded-xl bg-indigo-500/20 px-5 py-3">
            <p className="text-xs text-indigo-300">가장 많은 유형</p>
            <p className="mt-1 text-base font-bold text-white">
              {stats.mostPicked.name}{" "}
              <span className="text-indigo-300">
                ({stats.mostPicked.count}표)
              </span>
            </p>
          </div>
        )}
        {stats.leastPicked && (
          <div className="rounded-xl bg-purple-500/20 px-5 py-3">
            <p className="text-xs text-purple-300">가장 적은 유형</p>
            <p className="mt-1 text-base font-bold text-white">
              {stats.leastPicked.name}{" "}
              <span className="text-purple-300">
                ({stats.leastPicked.count}표)
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function TitleSlide({
  slide,
}: {
  slide: { title: string; subtitle: string };
}) {
  return (
    <div className="text-center">
      <h1 className="text-7xl font-black">
        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          {slide.title}
        </span>
      </h1>
      <p className="mt-6 text-2xl text-gray-400">{slide.subtitle}</p>
    </div>
  );
}

function MembersSlide() {
  return (
    <div className="w-full">
      <h2 className="mb-3 text-center text-4xl font-black">
        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          팀원 소개
        </span>
      </h2>
      <div className="flex w-full gap-4">
        {MEMBER_IDS.map((id, i) => {
          const member = MEMBERS[id];
          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-1 flex-col items-center gap-2"
            >
              <div className="w-full overflow-hidden rounded-2xl bg-white">
                <Image
                  src={member.photo}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="max-h-[75vh] w-full object-contain"
                />
              </div>

              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">{member.name}</h3>
                <span className="rounded-full bg-indigo-500 px-2.5 py-0.5 text-xs font-bold">
                  {member.mbti}
                </span>
              </div>

              {member.skills.length > 0 && (
                <div className="flex flex-wrap justify-center gap-1">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {member.direction && (
                <p className="text-center text-xs text-indigo-300">
                  {member.direction}
                </p>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function DirectionSlide({
  slide,
}: {
  slide: { title: string; items: string[] };
}) {
  return (
    <div className="text-center">
      <h2 className="text-5xl font-black">
        <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          {slide.title}
        </span>
      </h2>
      <div className="mt-10 flex flex-col gap-6">
        {slide.items.map((item, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="text-2xl text-gray-300"
          >
            {item}
          </motion.p>
        ))}
      </div>
    </div>
  );
}

function MilestoneSlide({
  slide,
}: {
  slide: {
    title: string;
    semesters: { label: string; items: string[] }[];
  };
}) {
  return (
    <div className="w-full">
      <h2 className="text-center text-5xl font-black">
        <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          {slide.title}
        </span>
      </h2>
      <div className="mt-12 grid grid-cols-2 gap-12">
        {slide.semesters.map((sem, si) => (
          <motion.div
            key={si}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: si * 0.2 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-8"
          >
            <h3 className="text-2xl font-bold text-indigo-400">{sem.label}</h3>
            <ul className="mt-6 space-y-4">
              {sem.items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-lg text-gray-300"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-sm font-bold text-indigo-400">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
