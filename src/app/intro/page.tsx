"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MEMBERS } from "@/lib/members-data";
import { MEMBER_IDS } from "@/lib/members-data";

const slides = [
  // 0: 타이틀
  {
    type: "title" as const,
    title: "Alpha Team",
    subtitle: "다양한 배경, 하나의 방향",
  },
  // 1~5: 팀원 개별 소개
  ...MEMBER_IDS.map((id) => ({
    type: "member" as const,
    memberId: id,
  })),
  // 6: 팀 방향성
  {
    type: "direction" as const,
    title: "팀 방향성",
    items: [
      "다양한 성격과 기술 스택의 조합",
      "미디어아트부터 게임까지, 폭넓은 스펙트럼",
      "각자의 개성을 살린 협업",
    ],
  },
  // 7: 마일스톤
  {
    type: "milestone" as const,
    title: "로드맵",
    semesters: [
      {
        label: "1학기",
        items: ["팀 빌딩 & 방향 설정", "개인 프로젝트 탐색", "기술 스택 공유"],
      },
      {
        label: "2학기",
        items: [
          "팀 프로젝트 본격 시작",
          "프로토타입 제작",
          "최종 발표 & 전시",
        ],
      },
    ],
  },
];

export default function IntroPage() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = slides.length;

  const go = useCallback(
    (dir: 1 | -1) => {
      const next = current + dir;
      if (next < 0 || next >= total) return;
      setDirection(dir);
      setCurrent(next);
    },
    [current, total]
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

  const slide = slides[current];

  return (
    <div
      className="relative flex h-dvh flex-col bg-[#0f0f1a] text-white select-none"
      onClick={() => go(1)}
    >
      {/* 슬라이드 콘텐츠 */}
      <div className="flex flex-1 items-center justify-center px-16">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, x: direction * 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -100 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex w-full max-w-5xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {slide.type === "title" && <TitleSlide slide={slide} />}
            {slide.type === "member" && <MemberSlide memberId={slide.memberId} />}
            {slide.type === "direction" && <DirectionSlide slide={slide} />}
            {slide.type === "milestone" && <MilestoneSlide slide={slide} />}
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

        {/* 도트 인디케이터 */}
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setDirection(i > current ? 1 : -1);
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

function MemberSlide({ memberId }: { memberId: string }) {
  const member = MEMBERS[memberId as keyof typeof MEMBERS];

  return (
    <div className="flex w-full items-center gap-16">
      {/* 좌: 이미지 플레이스홀더 */}
      <div className="flex h-72 w-72 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10">
        <span className="text-8xl font-black text-indigo-400/50">
          {member.name[0]}
        </span>
      </div>

      {/* 우: 정보 */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-4xl font-black text-white">{member.name}</h2>
          <span className="rounded-full bg-indigo-500 px-4 py-1 text-sm font-bold">
            {member.mbti}
          </span>
        </div>

        <p className="text-lg text-gray-400">{member.oneLiner}</p>

        <ul className="mt-2 space-y-2">
          {member.traits.map((trait, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-300">
              <span className="mt-1 text-indigo-400">•</span>
              {trait}
            </li>
          ))}
        </ul>

        {member.skills.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {member.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-gray-300"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {member.direction && (
          <div className="mt-2 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 px-5 py-3 border border-white/10">
            <p className="text-xs text-indigo-300">추구 방향</p>
            <p className="mt-0.5 font-bold text-white">{member.direction}</p>
          </div>
        )}
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
            className="rounded-2xl bg-white/5 p-8 border border-white/10"
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
