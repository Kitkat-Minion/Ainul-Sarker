"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./rocketScroll.module.css";
import { PiRocketLaunchThin } from "react-icons/pi";
export default function DiagonalRocketScroll() {
  const pathRef = useRef();
  const rocketRef = useRef();
  const [pathLength, setPathLength] = useState(0);
  const [progress, setProgress] = useState(0);
  const [smokeTrail, setSmokeTrail] = useState([]);

  useEffect(() => {
    const path = pathRef.current;
    if (path) setPathLength(path.getTotalLength());

    const handleScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY;
      const percent = scrollable ? scrollY / scrollable : 0;
      setProgress(percent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const path = pathRef.current;
    if (!path || !pathLength) return;

    const currentPoint = path.getPointAtLength(pathLength * progress);
    const nextPoint = path.getPointAtLength(
      Math.min(pathLength, pathLength * progress + 2)
    );

    const dx = nextPoint.x - currentPoint.x;
    const dy = nextPoint.y - currentPoint.y;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    rocketRef.current?.setAttribute(
      "transform",
      `translate(${currentPoint.x - 24}, ${
        currentPoint.y - 24
      }) rotate(${angle})`
    );

    // Create 3 mini points between rocket and next
    const steps = 1;
    const newSmoke = Array.from({ length: steps }, (_, i) => {
      const t = i / steps;
      return {
        id: `${Date.now()}-${i}`,
        x: currentPoint.x + dx * t,
        y: currentPoint.y + dy * t,
      };
    });

    setSmokeTrail((prev) => [...prev.slice(-100), ...newSmoke]);
  }, [progress, pathLength]);

  return (
    <div className={styles.rocketTrack}>
      <svg className={styles.svg} viewBox="0 0 1000 700">
        <path
          ref={pathRef}
          d="
        M -300 200
        C 100 0, 400 600, 800 400
        S 1300 800, 1600 600
      "
          fill="none"
          stroke="transparent"
        />

        {/* Smoke Trail */}
        {smokeTrail.map((smoke) => (
          <circle
            key={smoke.id}
            cx={smoke.x}
            cy={smoke.y}
            r="8"
            className={styles.smoke}
          />
        ))}

        {/* Realistic Rocket SVG (Following Direction) */}
        {/* <g ref={rocketRef}>
          <path
            d="M0 -10 L4 0 L0 10 L-4 0 Z"
            fill="url(#rocketGradient)"
            stroke="#00eaff"
            strokeWidth="1"
            filter="url(#glow)"
          />
        </g> */}
        <foreignObject
          ref={rocketRef}
          width="48"
          height="48"
          x="0"
          y="0"
          className={styles.rocketIconWrapper}
        >
          <div className={styles.rocketIconInner}>
            <PiRocketLaunchThin className={styles.rocketIcon} />
          </div>
        </foreignObject>

        <defs>
          <linearGradient
            id="rocketGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#00eaff" />
            <stop offset="100%" stopColor="#8a2be2" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
}
