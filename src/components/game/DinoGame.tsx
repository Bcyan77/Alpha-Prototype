"use client";

import { useRef, useEffect, useState, useCallback } from "react";

interface DinoGameProps {
  sessionId?: string;
  onScoreSubmit?: (rank: number, total: number) => void;
}

// 게임 상수
const CANVAS_W = 360;
const CANVAS_H = 200;
const GROUND_Y = 160;
const GRAVITY = 0.6;
const JUMP_FORCE = -11;
const DINO_W = 30;
const DINO_H = 36;
const OBSTACLE_W = 18;
const OBSTACLE_MIN_H = 24;
const OBSTACLE_MAX_H = 44;
const INITIAL_SPEED = 2.67;
const SPEED_INCREMENT = 0.0013;
const MIN_SPAWN_INTERVAL = 60;
const MAX_SPAWN_INTERVAL = 120;

interface Obstacle {
  x: number;
  h: number;
}

type GameState = "idle" | "playing" | "gameover" | "submitted";

export default function DinoGame({ sessionId, onScoreSubmit }: DinoGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameStateRef = useRef<GameState>("idle");
  const [gameState, setGameState] = useState<GameState>("idle");
  const [score, setScore] = useState(0);
  const [nickname, setNickname] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [rankInfo, setRankInfo] = useState<{
    rank: number;
    total: number;
  } | null>(null);
  const animFrameRef = useRef<number>(0);

  // 게임 변수 refs
  const dinoYRef = useRef(GROUND_Y - DINO_H);
  const velYRef = useRef(0);
  const isJumpingRef = useRef(false);
  const obstaclesRef = useRef<Obstacle[]>([]);
  const speedRef = useRef(INITIAL_SPEED);
  const frameCountRef = useRef(0);
  const scoreRef = useRef(0);
  const nextSpawnRef = useRef(80);

  const resetGame = useCallback(() => {
    dinoYRef.current = GROUND_Y - DINO_H;
    velYRef.current = 0;
    isJumpingRef.current = false;
    obstaclesRef.current = [];
    speedRef.current = INITIAL_SPEED;
    frameCountRef.current = 0;
    scoreRef.current = 0;
    nextSpawnRef.current = 80;
    setScore(0);
    setRankInfo(null);
  }, []);

  const jump = useCallback(() => {
    if (!isJumpingRef.current) {
      velYRef.current = JUMP_FORCE;
      isJumpingRef.current = true;
    }
  }, []);

  const startGame = useCallback(() => {
    resetGame();
    gameStateRef.current = "playing";
    setGameState("playing");
  }, [resetGame]);

  const handleInteraction = useCallback(() => {
    const state = gameStateRef.current;
    if (state === "idle" || state === "gameover" || state === "submitted") {
      startGame();
    } else if (state === "playing") {
      jump();
    }
  }, [startGame, jump]);

  // 터치/키 이벤트
  useEffect(() => {
    const canvas = canvasRef.current;

    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        handleInteraction();
      }
    };

    const handleTouch = (e: TouchEvent) => {
      e.preventDefault();
      handleInteraction();
    };

    window.addEventListener("keydown", handleKey);
    canvas?.addEventListener("touchstart", handleTouch, { passive: false });
    canvas?.addEventListener("mousedown", handleInteraction);

    return () => {
      window.removeEventListener("keydown", handleKey);
      canvas?.removeEventListener("touchstart", handleTouch);
      canvas?.removeEventListener("mousedown", handleInteraction);
    };
  }, [handleInteraction]);

  // 게임 루프
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const drawDino = (y: number) => {
      ctx.fillStyle = "#4f46e5";
      // 몸통
      ctx.fillRect(40, y, DINO_W, DINO_H);
      // 눈
      ctx.fillStyle = "#fff";
      ctx.fillRect(58, y + 6, 6, 6);
      ctx.fillStyle = "#1e1b4b";
      ctx.fillRect(60, y + 8, 3, 3);
      // 다리
      ctx.fillStyle = "#4f46e5";
      const legOffset =
        gameStateRef.current === "playing"
          ? Math.sin(frameCountRef.current * 0.3) * 4
          : 0;
      ctx.fillRect(44, y + DINO_H, 6, 8 + legOffset);
      ctx.fillRect(56, y + DINO_H, 6, 8 - legOffset);
    };

    const drawObstacle = (obs: Obstacle) => {
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(obs.x, GROUND_Y - obs.h, OBSTACLE_W, obs.h);
      // 상단 장식
      ctx.fillStyle = "#dc2626";
      ctx.fillRect(obs.x - 2, GROUND_Y - obs.h, OBSTACLE_W + 4, 4);
    };

    const loop = () => {
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      // 배경
      ctx.fillStyle = "#fafafa";
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      // 바닥
      ctx.fillStyle = "#d1d5db";
      ctx.fillRect(0, GROUND_Y, CANVAS_W, 2);

      // 바닥 패턴
      ctx.fillStyle = "#e5e7eb";
      for (let i = 0; i < CANVAS_W; i += 20) {
        const offset =
          gameStateRef.current === "playing"
            ? (frameCountRef.current * speedRef.current) % 20
            : 0;
        ctx.fillRect(((i - offset) % CANVAS_W + CANVAS_W) % CANVAS_W, GROUND_Y + 6, 8, 2);
      }

      const state = gameStateRef.current;

      if (state === "idle") {
        drawDino(GROUND_Y - DINO_H);
        ctx.fillStyle = "#6b7280";
        ctx.font = "bold 16px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("터치하여 시작!", CANVAS_W / 2, CANVAS_H / 2 - 10);
      } else if (state === "playing") {
        // 물리
        velYRef.current += GRAVITY;
        dinoYRef.current += velYRef.current;
        if (dinoYRef.current >= GROUND_Y - DINO_H) {
          dinoYRef.current = GROUND_Y - DINO_H;
          velYRef.current = 0;
          isJumpingRef.current = false;
        }

        // 장애물 생성
        frameCountRef.current++;
        nextSpawnRef.current--;
        if (nextSpawnRef.current <= 0) {
          const h =
            OBSTACLE_MIN_H +
            Math.random() * (OBSTACLE_MAX_H - OBSTACLE_MIN_H);
          obstaclesRef.current.push({ x: CANVAS_W + 10, h });
          nextSpawnRef.current =
            MIN_SPAWN_INTERVAL +
            Math.random() * (MAX_SPAWN_INTERVAL - MIN_SPAWN_INTERVAL);
        }

        // 장애물 이동
        obstaclesRef.current = obstaclesRef.current
          .map((o) => ({ ...o, x: o.x - speedRef.current }))
          .filter((o) => o.x > -OBSTACLE_W);

        // 충돌 체크
        const dinoLeft = 40;
        const dinoRight = 40 + DINO_W - 4;
        const dinoTop = dinoYRef.current + 4;
        const dinoBottom = dinoYRef.current + DINO_H;

        for (const obs of obstaclesRef.current) {
          if (
            dinoRight > obs.x + 2 &&
            dinoLeft < obs.x + OBSTACLE_W - 2 &&
            dinoBottom > GROUND_Y - obs.h + 2 &&
            dinoTop < GROUND_Y
          ) {
            gameStateRef.current = "gameover";
            setGameState("gameover");
            setScore(scoreRef.current);
            break;
          }
        }

        // 속도 증가
        speedRef.current += SPEED_INCREMENT;

        // 점수
        scoreRef.current = Math.floor(frameCountRef.current / 6);
        setScore(scoreRef.current);

        // 렌더
        for (const obs of obstaclesRef.current) drawObstacle(obs);
        drawDino(dinoYRef.current);

        // 점수 표시
        ctx.fillStyle = "#374151";
        ctx.font = "bold 14px monospace";
        ctx.textAlign = "right";
        ctx.fillText(String(scoreRef.current).padStart(5, "0"), CANVAS_W - 10, 24);
      } else {
        // gameover or submitted
        for (const obs of obstaclesRef.current) drawObstacle(obs);
        drawDino(dinoYRef.current);

        ctx.fillStyle = "#374151";
        ctx.font = "bold 14px monospace";
        ctx.textAlign = "right";
        ctx.fillText(String(scoreRef.current).padStart(5, "0"), CANVAS_W - 10, 24);

        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
        ctx.fillStyle = "#ef4444";
        ctx.font = "bold 18px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", CANVAS_W / 2, CANVAS_H / 2 - 16);
        ctx.fillStyle = "#6b7280";
        ctx.font = "13px sans-serif";
        ctx.fillText("터치하여 재시작", CANVAS_W / 2, CANVAS_H / 2 + 6);
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  const handleSubmitScore = async () => {
    if (!nickname.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/game/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          score,
          nickname: nickname.trim(),
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setRankInfo({ rank: data.rank, total: data.totalPlayers });
        gameStateRef.current = "submitted";
        setGameState("submitted");
        onScoreSubmit?.(data.rank, data.totalPlayers);
      }
    } catch {
      // 무시
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetry = () => {
    startGame();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        className="w-full max-w-[360px] rounded-xl border-2 border-gray-200 bg-gray-50"
        style={{ touchAction: "none" }}
      />

      {gameState === "gameover" && (
        <div className="flex w-full max-w-[360px] flex-col gap-3">
          <p className="text-center text-lg font-bold text-gray-800">
            점수: {score}
          </p>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임 입력"
            maxLength={10}
            className="rounded-xl border-2 border-gray-200 px-4 py-3 text-center text-sm outline-none focus:border-indigo-400"
          />
          <button
            onClick={handleSubmitScore}
            disabled={submitting || !nickname.trim()}
            className="rounded-xl bg-indigo-500 py-3 text-sm font-bold text-white transition-colors hover:bg-indigo-600 disabled:opacity-50"
          >
            {submitting ? "기록 중..." : "점수 기록"}
          </button>
        </div>
      )}

      {gameState === "submitted" && rankInfo && (
        <div className="flex w-full max-w-[360px] flex-col items-center gap-3">
          <p className="text-lg font-bold text-indigo-600">
            현재 {rankInfo.rank}등! (총 {rankInfo.total}명)
          </p>
          <button
            onClick={handleRetry}
            className="rounded-xl border-2 border-indigo-200 px-6 py-3 text-sm font-bold text-indigo-600 transition-colors hover:bg-indigo-50"
          >
            다시 하기
          </button>
        </div>
      )}
    </div>
  );
}
