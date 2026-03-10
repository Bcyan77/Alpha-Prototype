"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MEMBER_IDS } from "@/lib/members-data";
import { MEMBERS } from "@/lib/members-data";

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function MembersPage() {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-indigo-50 to-white px-5 py-8">
      <div className="mx-auto max-w-md">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-xl font-bold text-gray-900"
        >
          성격 유형
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mt-1 text-center text-sm text-gray-500"
        >
          터치해서 자세히 알아보세요
        </motion.p>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mt-6 flex flex-col gap-3"
        >
          {MEMBER_IDS.map((id) => {
            const member = MEMBERS[id];
            return (
              <motion.div key={id} variants={fadeUp}>
                <Link
                  href={`/result/${id}`}
                  className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm transition-all active:scale-[0.98] hover:shadow-md"
                >
                  {/* 아바타 */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-xl font-bold text-indigo-400">
                    {member.name[0]}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">
                        {member.name}
                      </span>
                      <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[11px] font-semibold text-indigo-600">
                        {member.mbti}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-sm text-gray-500">
                      {member.oneLiner}
                    </p>
                    {member.skills.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {member.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="rounded bg-gray-100 px-1.5 py-0.5 text-[11px] text-gray-500"
                          >
                            {skill}
                          </span>
                        ))}
                        {member.skills.length > 3 && (
                          <span className="text-[11px] text-gray-400">
                            +{member.skills.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="shrink-0 text-gray-300"
                  >
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
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
