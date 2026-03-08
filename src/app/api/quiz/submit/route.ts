import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { calculateMatch, validateAnswers } from "@/lib/scoring";
import type { QuizSubmitResponse } from "@/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { answers } = body;

    if (!validateAnswers(answers)) {
      return NextResponse.json(
        { error: "유효하지 않은 답변 형식입니다." },
        { status: 400 }
      );
    }

    const matchedMember = calculateMatch(answers);

    const session = await prisma.quizSession.create({
      data: {
        answers: JSON.stringify(answers),
        matchedMember,
      },
    });

    const response: QuizSubmitResponse = {
      sessionId: session.id,
      matchedMember,
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
