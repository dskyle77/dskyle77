"use client";

import { motion, type Variants } from "motion/react";

type RevealDirection = "up" | "down" | "left" | "right" | "scale" | "fade";

type RevealProps = {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
};

const directions: Record<
  RevealDirection,
  { x?: number; y?: number; scale?: number }
> = {
  up: { y: 30 },
  down: { y: -30 },
  left: { x: -40 },
  right: { x: 40 },
  scale: { scale: 0.92 },
  fade: {},
};

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.4,
  distance = 24,
  className,
}: RevealProps) {
  const offset = directions[direction];

  // If delay is passed as step index (>= 1), scale to fast stagger seconds (e.g., 1 -> 0.05s, 2 -> 0.10s)
  const computedDelay = delay >= 1 ? delay * 0.05 : delay;

  const initial = {
    opacity: 0,
    ...(offset.x !== undefined ? { x: (offset.x / 40) * distance } : {}),
    ...(offset.y !== undefined ? { y: (offset.y / 30) * distance } : {}),
    ...(offset.scale !== undefined ? { scale: offset.scale } : {}),
  };

  const variants: Variants = {
    hidden: initial,
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration,
        delay: computedDelay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.1,
      }}
    >
      {children}
    </motion.div>
  );
}
