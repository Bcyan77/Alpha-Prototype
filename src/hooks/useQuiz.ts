"use client";

import { useState, useCallback } from "react";
import { QUESTIONS } from "@/lib/quiz-data";
import type { QuizSubmitResponse } from "@/types";

export function useQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  const totalQuestions = QUESTIONS.length;
  const currentQuestion = QUESTIONS[currentIndex];
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const selectAnswer = useCallback(
    async (answerIndex: number): Promise<QuizSubmitResponse | null> => {
      const newAnswers = [...answers];
      newAnswers[currentIndex] = answerIndex;
      setAnswers(newAnswers);

      if (isLastQuestion) {
        setIsSubmitting(true);
        try {
          const res = await fetch("/api/quiz/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ answers: newAnswers }),
          });
          if (!res.ok) throw new Error("Submit failed");
          return (await res.json()) as QuizSubmitResponse;
        } catch {
          setIsSubmitting(false);
          return null;
        }
      } else {
        setDirection(1);
        setTimeout(() => setCurrentIndex((i) => i + 1), 300);
        return null;
      }
    },
    [answers, currentIndex, isLastQuestion]
  );

  const goBack = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex]);

  return {
    currentIndex,
    currentQuestion,
    totalQuestions,
    answers,
    isSubmitting,
    direction,
    selectAnswer,
    goBack,
    selectedAnswer: answers[currentIndex] ?? -1,
  };
}
