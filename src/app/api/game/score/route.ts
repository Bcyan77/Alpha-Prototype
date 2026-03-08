import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import type { GameScoreResponse } from "@/types";

export async function POST(request: Request) {
  try {
    const { sessionId, score, nickname } = await request.json();

    if (!sessionId || typeof score !== "number" || score < 0) {
      return NextResponse.json(
        { error: "유효하지 않은 요청입니다." },
        { status: 400 }
      );
    }

    // 세션 존재 확인
    const session = await prisma.quizSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      return NextResponse.json(
        { error: "세션을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // 기존 점수가 있으면 업데이트, 없으면 생성
    await prisma.gameScore.upsert({
      where: { sessionId },
      update: {
        score,
        nickname: nickname || "익명",
      },
      create: {
        sessionId,
        score,
        nickname: nickname || "익명",
      },
    });

    // 순위 계산
    const higherScores = await prisma.gameScore.count({
      where: { score: { gt: score } },
    });
    const totalPlayers = await prisma.gameScore.count();

    const response: GameScoreResponse = {
      rank: higherScores + 1,
      totalPlayers,
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
