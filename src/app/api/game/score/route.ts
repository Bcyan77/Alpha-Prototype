import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import type { GameScoreResponse } from "@/types";

export async function POST(request: Request) {
  try {
    const { sessionId, score, nickname } = await request.json();

    if (typeof score !== "number" || score < 0) {
      return NextResponse.json(
        { error: "유효하지 않은 요청입니다." },
        { status: 400 }
      );
    }

    // sessionId가 있으면 기존 세션 사용, 없으면 게스트 세션 생성
    let resolvedSessionId = sessionId;

    if (resolvedSessionId) {
      const session = await prisma.quizSession.findUnique({
        where: { id: resolvedSessionId },
      });
      if (!session) {
        resolvedSessionId = null;
      }
    }

    if (!resolvedSessionId) {
      const guestSession = await prisma.quizSession.create({
        data: { answers: "[]", matchedMember: "guest" },
      });
      resolvedSessionId = guestSession.id;
    }

    // 기존 점수가 있으면 업데이트, 없으면 생성
    await prisma.gameScore.upsert({
      where: { sessionId: resolvedSessionId },
      update: {
        score,
        nickname: nickname || "익명",
      },
      create: {
        sessionId: resolvedSessionId,
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
