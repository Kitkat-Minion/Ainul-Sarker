"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import RotatingStars from "./RotatingStars";
import { useState, useEffect, useRef } from "react";
import { useTexture } from "@react-three/drei";
import GlobePhoto from "../../public/Images/globe.png"; // Adjust the path as necessary

const DEFAULT_SPEED = 0.001;

function SpinningGlobe({ velocityRef, scaleRef }) {
  const mesh = useRef();
  //   const imageTexture = useTexture(null);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += velocityRef.current;
      velocityRef.current += (DEFAULT_SPEED - velocityRef.current) * 0.02;

      const currentScale = mesh.current.scale.x;
      const nextScale = currentScale + (scaleRef.current - currentScale) * 0.1;
      mesh.current.scale.set(nextScale, nextScale, nextScale);
    }
  });

  return (
    <group ref={mesh}>
      {/* Outer wireframe globe */}
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial wireframe color="#779fa1" />
      </mesh>

      {/* Image plane inside the globe */}
      {/* <mesh position={[0, 0, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={imageTexture} transparent />
      </mesh> */}
    </group>
  );
}

export default function Globe() {
  const velocityRef = useRef(DEFAULT_SPEED);
  const scaleRef = useRef(1);
  const [targetScale, setTargetScale] = useState(1);

  // Keep ref in sync with target scale
  useEffect(() => {
    scaleRef.current = targetScale;
  }, [targetScale]);

  useEffect(() => {
    const handleScroll = (e) => {
      // Zoom with vertical scroll
      const zoomFactor = e.deltaY > 0 ? 0.95 : 1.05;
      setTargetScale((prev) => Math.min(1.3, Math.max(0.7, prev * zoomFactor)));

      // Spin speed change with horizontal scroll
      const spinDelta = e.deltaX * 0.0001;
      if (spinDelta !== 0) {
        velocityRef.current += spinDelta;
      }
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, []);

  return (
    <div className="w-screen h-screen fixed top-0 left-0 z-0">
      <Canvas camera={{ position: [0, 0, 7], fov: 75 }}>
        <RotatingStars />
        <ambientLight intensity={1} />
        <SpinningGlobe velocityRef={velocityRef} scaleRef={scaleRef} />
      </Canvas>
    </div>
  );
}
