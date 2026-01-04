"use client";

import { useEffect, useRef } from "react";

interface Raindrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  wind: number;
  opacity: number;
  velX: number;
  velY: number;
  thickness: number;
}

interface RainfallProps {
  raindropCount?: number;
  speed?: { min: number; max: number };
  wind?: { min: number; max: number };
  length?: { min: number; max: number };
  thickness?: { min: number; max: number };
  opacity?: { min: number; max: number };
  fps?: number;
  followMouse?: boolean;
  color?: string;
}

const random = (min: number, max: number) => Math.random() * (max - min) + min;

const createRaindrop = (
  canvasWidth: number,
  canvasHeight: number,
  config: {
    length: { min: number; max: number };
    thickness: { min: number; max: number };
    speed: { min: number; max: number };
    wind: { min: number; max: number };
    opacity: { min: number; max: number };
  }
): Raindrop => ({
  x: random(0, canvasWidth),
  y: random(-canvasHeight, 0),
  length: random(config.length.min, config.length.max),
  thickness: random(config.thickness.min, config.thickness.max),
  speed: random(config.speed.min, config.speed.max),
  wind: random(config.wind.min, config.wind.max),
  opacity: random(config.opacity.min, config.opacity.max),
  velX: 0,
  velY: 0,
});

const applyMouseInteraction = (
  drop: Raindrop,
  mouse: { x: number; y: number }
) => {
  const dx = mouse.x - drop.x;
  const dy = mouse.y - drop.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < 100) {
    const force = ((100 - dist) / 100) * 0.002;
    drop.velX += dx * force;
    drop.velY += dy * force;
  }

  drop.velX *= 0.95;
  drop.velY *= 0.95;
};

const updateRaindropPosition = (
  drop: Raindrop,
  canvasWidth: number,
  canvasHeight: number
) => {
  drop.y += drop.speed + drop.velY;
  drop.x += drop.wind + drop.velX;

  if (drop.y > canvasHeight) {
    drop.y = random(-100, -10);
    drop.x = random(0, canvasWidth);
  }
  if (drop.x > canvasWidth + 10) {
    drop.x = -10;
  }
  if (drop.x < -10) {
    drop.x = canvasWidth + 10;
  }
};

const drawRaindrop = (
  ctx: CanvasRenderingContext2D,
  drop: Raindrop,
  color: string
) => {
  ctx.save();
  ctx.globalAlpha = drop.opacity;
  ctx.strokeStyle = color;
  ctx.lineWidth = drop.thickness;
  ctx.lineCap = "round";
  
  ctx.beginPath();
  ctx.moveTo(drop.x, drop.y);
  ctx.lineTo(drop.x + drop.wind * 2, drop.y + drop.length);
  ctx.stroke();
  
  ctx.restore();
};

export function Rainfall({
  raindropCount = 200,
  speed = { min: 15, max: 30 },
  wind = { min: -1, max: 1 },
  length = { min: 10, max: 30 },
  thickness = { min: 1, max: 2 },
  opacity = { min: 0.1, max: 0.5 },
  followMouse = false,
  fps = 60,
  color = "#4a90e2",
}: RainfallProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raindropsRef = useRef<Raindrop[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const abortController = new AbortController();
    const { signal } = abortController;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { signal });

    raindropsRef.current = Array.from({ length: raindropCount }, () =>
      createRaindrop(canvas.width, canvas.height, {
        length,
        thickness,
        speed,
        wind,
        opacity,
      })
    );

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    if (followMouse) {
      window.addEventListener("mousemove", handleMouseMove, { signal });
    }

    let lastTime = 0;
    const frameInterval = 1000 / fps;
    let animationId: number;

    const animate = (currentTime: number) => {
      if (currentTime - lastTime < frameInterval) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      lastTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const drop of raindropsRef.current) {
        if (followMouse) {
          applyMouseInteraction(drop, mouseRef.current);
        }

        updateRaindropPosition(drop, canvas.width, canvas.height);
        drawRaindrop(ctx, drop, color);
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      abortController.abort();
      cancelAnimationFrame(animationId);
    };
  }, [raindropCount, speed, wind, length, thickness, opacity, fps, followMouse, color]);

  return (
    <canvas
      className="pointer-events-none fixed inset-0"
      ref={canvasRef}
      style={{ zIndex: 1000 }}
    />
  );
}
