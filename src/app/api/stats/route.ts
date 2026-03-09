import { prisma } from "@/lib/db";
import { MEMBERS } from "@/lib/members-data";
import { MEMBER_IDS } from "@/lib/members-data";
import type { MemberId, StatsData } from "@/types";

export const dynamic = "force-dynamic";

async function getStats(): Promise<StatsData> {
  const sessions = await prisma.quizSession.findMany({
    select: { matchedMember: true },
  });

  const memberCounts: Record<MemberId, number> = {
    yeonjae: 0,
    hongkyung: 0,
    hyerin: 0,
    sungjin: 0,
    hyunjun: 0,
  };

  for (const s of sessions) {
    const id = s.matchedMember as MemberId;
    if (id in memberCounts) memberCounts[id]++;
  }

  const totalParticipants = sessions.length;

  let mostPicked: StatsData["mostPicked"] = null;
  let leastPicked: StatsData["leastPicked"] = null;

  if (totalParticipants > 0) {
    let maxCount = -1;
    let minCount = Infinity;

    for (const id of MEMBER_IDS) {
      if (memberCounts[id] > maxCount) {
        maxCount = memberCounts[id];
        mostPicked = { id, name: MEMBERS[id].name, count: maxCount };
      }
      if (memberCounts[id] < minCount) {
        minCount = memberCounts[id];
        leastPicked = { id, name: MEMBERS[id].name, count: minCount };
      }
    }
  }

  const gameScores = await prisma.gameScore.findMany({
    orderBy: { score: "desc" },
    take: 10,
    select: { nickname: true, score: true },
  });

  return {
    totalParticipants,
    memberCounts,
    mostPicked,
    leastPicked,
    gameRanking: gameScores,
  };
}

export async function GET() {
  const encoder = new TextEncoder();

  let interval: NodeJS.Timeout;
  let timeout: NodeJS.Timeout;
  let closed = false;

  const stream = new ReadableStream({
    async start(controller) {
      const send = async () => {
        if (closed) return;
        try {
          const stats = await getStats();
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(stats)}\n\n`)
          );
        } catch {
          // 에러 무시
        }
      };

      await send();

      interval = setInterval(send, 2000);

      timeout = setTimeout(() => {
        closed = true;
        clearInterval(interval);
        controller.close();
      }, 600000);
    },
    cancel() {
      closed = true;
      clearInterval(interval);
      clearTimeout(timeout);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
