export type MemberId = "yeonjae" | "hongkyung" | "hyerin" | "sungjin" | "hyunjun";

export interface MemberProfile {
  id: MemberId;
  name: string;
  mbti: string;
  oneLiner: string;
  traits: string[];
  photo: string;
  character: string;
  cakeIcon: string;
  skills: string[];
  direction: string;
}

export interface QuizQuestion {
  id: number;
  title: string;
  subtitle: string;
  answers: QuizAnswer[];
}

export interface QuizAnswer {
  text: string;
  description: string;
  memberId: MemberId;
}

export interface QuizSubmitRequest {
  answers: number[];
}

export interface QuizSubmitResponse {
  sessionId: string;
  matchedMember: MemberId;
}

export interface GameScoreRequest {
  sessionId: string;
  score: number;
  nickname: string;
}

export interface GameScoreResponse {
  rank: number;
  totalPlayers: number;
}

export interface StatsData {
  totalParticipants: number;
  memberCounts: Record<MemberId, number>;
  mostPicked: { id: MemberId; name: string; count: number } | null;
  leastPicked: { id: MemberId; name: string; count: number } | null;
  gameRanking: { nickname: string; score: number }[];
}
