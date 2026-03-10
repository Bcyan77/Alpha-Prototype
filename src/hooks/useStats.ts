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
    let es: EventSource;
    let retryTimeout: NodeJS.Timeout;

    const connect = () => {
      es = new EventSource("/api/stats");

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
        retryTimeout = setTimeout(connect, 3000);
      };
    };

    connect();

    return () => {
      es?.close();
      clearTimeout(retryTimeout);
    };
  }, []);

  return { stats, connected };
}
