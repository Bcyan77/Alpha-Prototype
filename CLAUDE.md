# Project Guidelines

## 언어
- 기본 답변은 한국어로 작성할 것

## Git
- git 관련 사항(커밋 메시지, PR, contributors 등)에 Claude를 포함시키지 말 것

# currentDate
Today's date is 2026-03-08.

---

# 프로젝트 개요

## 프로젝트명
Alpha-Prototype — 인터랙티브 팀 소개 웹사이트

## 목적
팀 소개 발표에서 청중이 QR코드를 스캔하여 접속, 성격 테스트 형식의 퀴즈를 통해 자신과 닮은 팀원을 매칭 받는 인터랙티브 웹사이트

## 팀 구성

| 이름 | ID | MBTI |
|------|-----|------|
| 김연재 | yeonjae | 미정 |
| 김홍경 | hongkyung | ESFJ |
| 황혜린 | hyerin | 미정 |
| 오성진 | sungjin | T성향 |
| 오현준 | hyunjun | INFJ |

---

# 기술 스택

| 구분 | 기술 | 비고 |
|------|------|------|
| 프레임워크 | Next.js 15+ (App Router) | `output: "standalone"` 설정 |
| 언어 | TypeScript | strict 모드 |
| 스타일링 | Tailwind CSS 4+ | 유틸리티 기반 |
| 애니메이션 | Framer Motion | 페이지/질문 전환 |
| ORM/DB | Prisma + SQLite | 단일 컨테이너, 경량 |
| 실시간 통신 | SSE (Server-Sent Events) | 통계 대시보드용 |
| 차트 | Recharts | 통계 시각화 |
| QR 생성 | qrcode.react | 랜딩 페이지용 |
| 배포 | Docker + GCP | docker-compose 기반 |

---

# 사용자 플로우

웹 자체가 프레젠테이션이며, PPT는 사용하지 않음.

### PC 프레젠테이션 흐름 (발표자)
```
랜딩(/) → [청중 설문 대기] → 통계(/stats) → 팀 소개(/intro)
```

### 모바일 흐름 (청중)
```
QR 스캔 → 퀴즈(/quiz) → 결과(/result/[memberId]) → 미니게임(결과 하단)
```

### 페이지 목록
1. **랜딩 (/)** [PC] — QR 코드 표시 + 팀 이름
2. **퀴즈 (/quiz)** [모바일] — 5문제, 각 5선택지, 자동 전환
3. **결과 (/result/[memberId])** [모바일] — 매칭 팀원 프로필 + 하단 공룡 미니게임
4. **전체 팀원 (/members)** [모바일] — 5명 카드 그리드
5. **통계 (/stats)** [PC] — 실시간 결과 집계
6. **팀 소개 (/intro)** [PC] — 팀원 소개 + 팀 방향성 등 발표 콘텐츠

---

# 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx                    # 랜딩
│   ├── quiz/page.tsx               # 퀴즈
│   ├── result/[memberId]/page.tsx  # 결과 + 미니게임
│   ├── members/page.tsx            # 전체 팀원
│   ├── stats/page.tsx              # 통계 대시보드
│   ├── intro/page.tsx              # 팀 소개 (프레젠테이션)
│   └── api/
│       ├── quiz/submit/route.ts    # POST: 퀴즈 제출
│       ├── game/score/route.ts     # POST: 게임 점수
│       └── stats/route.ts          # GET: SSE 통계
├── components/
│   ├── ui/         # Button, Card, ProgressBar 등
│   ├── quiz/       # QuizContainer, QuestionCard, AnswerOption
│   ├── result/     # MemberProfile, CharacterDisplay, MbtiTag
│   ├── game/       # DinoGame(Canvas), ScoreSubmit
│   └── stats/      # MemberBarChart, GameRanking, LiveCounter
├── lib/
│   ├── db.ts               # Prisma 클라이언트 싱글톤
│   ├── quiz-data.ts         # 퀴즈 질문/답변/매핑 데이터
│   ├── members-data.ts      # 팀원 프로필 데이터
│   └── scoring.ts           # 매칭 알고리즘
├── hooks/
│   ├── useQuiz.ts
│   ├── useScrollDetect.ts
│   └── useStats.ts          # SSE 실시간 통계
└── types/
    └── index.ts
```

---

# 개발 워크플로우

## Docker 기반 개발
- 로컬 개발: `docker-compose up` 또는 `npm run dev`
- 프로덕션 빌드: `docker-compose up --build`
- DB 초기화: `npx prisma db push`

## API 규칙
- `POST /api/quiz/submit` — `{ answers: number[] }` → `{ sessionId, matchedMember }`
- `POST /api/game/score` — `{ sessionId, score, nickname }` → `{ rank, totalPlayers }`
- `GET /api/stats` — SSE 스트림 (2초 간격)

## 매칭 알고리즘
- 5문제 × 5선택지, 각 선택지가 1명의 팀원에 매핑
- 답변마다 해당 팀원 +1점, 최고 점수 = 매칭 결과 (동점 시 랜덤)

---

# 디자인 원칙

## UX 흐름
- 웹 자체가 프레젠테이션 (PPT 없음)
- **PC**(QR 표시) → **모바일**(청중 설문) → **PC**(결과 집계 → 팀 소개)
- 반응형 웹이 아님. PC용 페이지와 모바일용 페이지가 명확히 분리됨

## 모바일 페이지 (/quiz, /result/[memberId], /members)
- 청중이 QR 스캔 후 접속하는 설문/결과 페이지
- 모바일 전용: 375px ~ 430px 기준, 세로 레이아웃
- 터치 타겟 44px 이상
- 가로 스크롤 없음, 자연스러운 세로 스크롤

## PC 페이지 (/, /stats)
- 발표자가 프레젠테이션에서 사용하는 페이지
- 16:9 데스크톱 전용, 대형 화면 최적화
- 랜딩(/): QR 코드 표시 + 팀 이름
- 통계(/stats): 실시간 결과 집계
- 팀 소개(/intro): 팀원 소개 + 팀 방향성 등 발표 콘텐츠
- 다크 테마, 큰 폰트, 네온 강조색

## 공통
- **톤**: 밝고 캐주얼
- **애니메이션**: 진입(페이드인 0.3s), 전환(슬라이드 0.4s), 강조(스케일 0.2s)

---

# 코딩 컨벤션

- 컴포넌트: PascalCase (예: `QuizContainer.tsx`)
- 훅: camelCase `use` 접두사 (예: `useQuiz.ts`)
- 데이터 파일: kebab-case 또는 camelCase (예: `quiz-data.ts`)
- 타입: `types/index.ts`에 공통 타입 정의
- 서버 컴포넌트 기본, 클라이언트 필요 시 `"use client"` 명시
- import alias: `@/*` (src 기준)
