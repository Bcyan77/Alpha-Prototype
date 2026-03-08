# Alpha-Prototype

청중이 QR코드를 스캔하여 성격 테스트 퀴즈에 참여하고, 자신과 닮은 팀원을 매칭 받는 인터랙티브 팀 소개 웹사이트.
웹 자체가 프레젠테이션이며, PPT 없이 발표를 진행합니다.

## 기술 스택

| 구분 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 (App Router, standalone) |
| 언어 | TypeScript |
| 스타일링 | Tailwind CSS 4 |
| 애니메이션 | Framer Motion |
| DB | Prisma + SQLite |
| 실시간 통신 | SSE (Server-Sent Events) |
| QR 생성 | qrcode.react |
| 배포 | Docker |

## 빠른 시작

### 사전 요구 사항

- [Docker](https://www.docker.com/) 설치

### 개발 모드

```bash
git clone https://github.com/Bcyan77/Alpha-Prototype.git
cd Alpha-Prototype
docker-compose --profile dev up --build
```

`http://localhost:3000`에서 접속. 소스 코드 변경 시 자동 반영 (Hot Reload).

첫 실행 후 DB 초기화가 필요합니다:

```bash
docker exec alpha-prototype-dev-1 npx prisma db push
```

### 프로덕션 모드

```bash
docker-compose --profile prod up --build
```

DB 초기화가 자동으로 실행됩니다.

## 로컬 실행 (Docker 없이)

### 사전 요구 사항

- Node.js 20+
- npm

```bash
git clone https://github.com/Bcyan77/Alpha-Prototype.git
cd Alpha-Prototype
npm install
npx prisma db push
npm run dev
```

`http://localhost:3000`에서 접속.

## 사용자 플로우

### PC (발표자)

`/` 페이지에서 슬라이드 프레젠테이션 진행:

1. **랜딩** — QR 코드 표시, 청중에게 스캔 유도
2. **실시간 통계** — 참여 현황, 매칭 결과, 게임 랭킹 (SSE로 자동 갱신)
3. **팀 소개** — 팀원별 프로필, 팀 방향성, 로드맵

키보드 `←` `→` 또는 하단 버튼으로 슬라이드 전환.

### 모바일 (청중)

1. QR 스캔 → `/quiz` — 5문제 성격 테스트
2. `/result/[memberId]` — 매칭된 팀원 프로필 + 공룡 미니게임
3. `/members` — 전체 팀원 목록

## 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx                    # 슬라이드 프레젠테이션 (PC)
│   ├── quiz/page.tsx               # 퀴즈 (모바일)
│   ├── result/[memberId]/page.tsx  # 결과 + 미니게임 (모바일)
│   ├── members/page.tsx            # 전체 팀원 (모바일)
│   └── api/
│       ├── quiz/submit/route.ts    # 퀴즈 제출 API
│       ├── game/score/route.ts     # 게임 점수 API
│       └── stats/route.ts          # SSE 통계 API
├── components/game/                # Canvas 미니게임
├── hooks/                          # useQuiz, useStats, useScrollDetect
├── lib/                            # 데이터, 매칭 알고리즘, DB
└── types/                          # TypeScript 타입
```

## API

| 메서드 | 경로 | 설명 |
|--------|------|------|
| POST | `/api/quiz/submit` | 퀴즈 답변 제출 → 매칭 결과 반환 |
| POST | `/api/game/score` | 미니게임 점수 제출 → 랭킹 반환 |
| GET | `/api/stats` | SSE 실시간 통계 스트림 |
