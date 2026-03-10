import type { MemberId } from "@/types";
import { QUESTIONS } from "./quiz-data";
import { MEMBER_IDS } from "./members-data";

export function calculateMatch(answers: number[]): MemberId {
  const scores: Record<MemberId, number> = {
    yeonjae: 0,
    hongkyung: 0,
    hyerin: 0,
    sungjin: 0,
    hyunjun: 0,
  };

  answers.forEach((answerIdx, questionIdx) => {
    const question = QUESTIONS[questionIdx];
    if (question && question.answers[answerIdx]) {
      const memberId = question.answers[answerIdx].memberId;
      if (Array.isArray(memberId)) {
        memberId.forEach((id) => (scores[id] += 1));
      } else {
        scores[memberId] += 1;
      }
    }
  });

  const maxScore = Math.max(...Object.values(scores));
  const topMembers = MEMBER_IDS.filter((id) => scores[id] === maxScore);

  return topMembers[Math.floor(Math.random() * topMembers.length)];
}

export function validateAnswers(answers: unknown): answers is number[] {
  if (!Array.isArray(answers)) return false;
  if (answers.length !== QUESTIONS.length) return false;
  return answers.every(
    (a, i) => typeof a === "number" && a >= 0 && a < QUESTIONS[i].answers.length
  );
}
