"use client";

import { useEffect, useState } from "react";
import type { StatsData } from "@/types";

const EMPTY_STATS: StatsData = {
  totalParticipants: 0,
  memberCounts: {
    yeonjae: 0,
    hongkyung: 0,
    hyerin: 0,
    sungjin: 0,
    hyunjun: 0,
  },
  mostPicked: null,
  leastPicked: null,
  gameRanking: [],
};

export function useStats() {
  const [stats, setStats] = useState<StatsData>(EMPTY_STATS);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const es = new EventSource("/api/stats");

    es.onopen = () => setConnected(true);

    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as StatsData;
        if (data.totalParticipants !== undefined) {
          setStats(data);
        }
      } catch {
        // 파싱 실패 무시
      }
    };

    es.onerror = () => {
      setConnected(false);
      es.close();
      // 3초 후 재연결
      setTimeout(() => {
        setConnected(false);
      }, 3000);
    };

    return () => es.close();
  }, []);

  return { stats, connected };
}
