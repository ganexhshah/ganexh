"use client";

import React, { useEffect, useRef, useState } from "react";

interface MarqueeAlongSvgPathProps {
  children: React.ReactNode;
  path: string;
  viewBox?: string;
  baseVelocity?: number;
  showPath?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathStrokeDasharray?: string;
  repeat?: number;
  className?: string;
}

export function MarqueeAlongSvgPath({
  children,
  path,
  viewBox = "0 0 1000 400",
  baseVelocity = 5,
  showPath = true,
  pathColor = "rgba(255, 255, 255, 0.1)",
  pathWidth = 2,
  pathStrokeDasharray,
  repeat = 1,
  className = "",
}: MarqueeAlongSvgPathProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const items = React.Children.toArray(children);
  const totalItems = items.length * repeat;

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [path]);

  useEffect(() => {
    if (!pathLength) return;
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      const speed = isHovered ? baseVelocity * 0.2 : baseVelocity;
      setProgress((prev) => (prev + (speed * delta * 15)) % pathLength);

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [pathLength, baseVelocity, isHovered]);

  const repeatedItems: React.ReactNode[] = [];
  for (let r = 0; r < repeat; r++) {
    repeatedItems.push(...items);
  }

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={viewBox}
        fill="none"
      >
        <path
          ref={pathRef}
          d={path}
          stroke={showPath ? pathColor : "transparent"}
          strokeWidth={pathWidth}
          strokeDasharray={pathStrokeDasharray}
        />
      </svg>

      {pathLength > 0 &&
        repeatedItems.map((child, index) => {
          const itemOffset = (index / totalItems) * pathLength;
          const currentDistance = (progress + itemOffset) % pathLength;
          const point = pathRef.current?.getPointAtLength(currentDistance);

          if (!point) return null;

          return (
            <div
              key={index}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
              style={{
                left: `${(point.x / 1000) * 100}%`,
                top: `${(point.y / 400) * 100}%`,
              }}
            >
              {child}
            </div>
          );
        })}
    </div>
  );
}

