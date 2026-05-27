"use client";

import { useEffect, useState } from "react";
import "./trailer.css";

const scenes = [
  "INITIALIZING SIGNAL...",
  "CONNECTING TO CIPHERLINE NODE",
  "ENCRYPTION LAYER: ACTIVE",
  "DECRYPTION PROTOCOL LOADED",
  "SYSTEM CORRUPTION DETECTED",
  "REALITY DISTORTION RISING",
  "SIGNAL COLLAPSE IMMINENT",
  "CIPHERLINE",
];

export default function TrailerPage() {
  const [index, setIndex] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const [shake, setShake] = useState(false);
  const [boot, setBoot] = useState(true);

  // This flags when the sequence reaches the final "CIPHERLINE" scene index
  const isFinalLogo = index === scenes.length - 1;

  useEffect(() => {
    const t = setTimeout(() => setBoot(false), 1800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (boot) return;

    const interval = setInterval(() => {
      setGlitch(true);
      setShake(true);

      setTimeout(() => {
        setIndex((i) => Math.min(i + 1, scenes.length - 1));
        setGlitch(false);
        setShake(false);
      }, 160);
    }, 1500);

    return () => clearInterval(interval);
  }, [boot]);

  const currentText = scenes[index];

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-black font-mono text-[#f4f4f5] select-none m-0 p-0 box-border z-0">
      <Noise />
      <Scanlines />
      <Vignette />

      {boot && <BootSequence />}

      {!boot && (
        <div className="absolute inset-0 flex items-center justify-center p-4 box-border">
          {/* PHASE 1: TEXT GLITCH SEQUENCER */}
          {!isFinalLogo && (
            <div className="relative flex items-center justify-center gap-[0.35em] text-2xl md:text-4xl font-mono text-center select-none">
              {/* Background Red Glitch Layer */}
              <div
                className={`absolute inset-0 flex items-center justify-center gap-[0.35em] text-[#ef4444] z-10 pointer-events-none opacity-90 ${glitch ? "glitch-left" : "opacity-0"}`}
              >
                {currentText.split("").map((char, i) => (
                  <span
                    key={`red-${i}`}
                    className={char === " " ? "w-[0.35em]" : ""}
                  >
                    {char}
                  </span>
                ))}
              </div>

              {/* Background Blue Glitch Layer */}
              <div
                className={`absolute inset-0 flex items-center justify-center gap-[0.35em] text-[#60a5fa] z-10 pointer-events-none opacity-90 ${glitch ? "glitch-right" : "opacity-0"}`}
              >
                {currentText.split("").map((char, i) => (
                  <span
                    key={`blue-${i}`}
                    className={char === " " ? "w-[0.35em]" : ""}
                  >
                    {char}
                  </span>
                ))}
              </div>

              {/* Main Center Visible Text Layer */}
              <div
                className={`relative flex items-center justify-center gap-[0.35em] text-[#67e8f9] z-20 ${glitch ? "glitch-main" : ""} ${shake ? "shake" : ""}`}
              >
                {currentText.split("").map((char, i) => (
                  <span
                    key={`main-${i}`}
                    className={char === " " ? "w-[0.35em]" : ""}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* PHASE 2: FINAL LOGO IMAGE REVEAL */}
          {isFinalLogo && (
            <div className="relative w-72 h-72 md:w-[450px] md:h-[450px] select-none">
              {/* Background Red Glitch Layer (Simulated Chromatic Aberration) */}
              <img
                src="/CipherLine.png"
                alt="Logo Red Glitch"
                className={`absolute inset-0 w-full h-full object-contain mix-blend-screen glitch-image-red z-10 pointer-events-none opacity-80 ${glitch ? "glitch-left" : "opacity-0"}`}
              />

              {/* Background Blue Glitch Layer (Simulated Chromatic Aberration) */}
              <img
                src="/CipherLine.png"
                alt="Logo Blue Glitch"
                className={`absolute inset-0 w-full h-full object-contain mix-blend-screen glitch-image-blue z-10 pointer-events-none opacity-80 ${glitch ? "glitch-right" : "opacity-0"}`}
              />

              {/* Main Vector Asset Layer */}
              <img
                src="/CipherLine.png"
                alt="CipherLine Final Logo"
                className={`relative w-full h-full object-contain z-20 transition-all duration-200 ${glitch ? "glitch-image-main" : ""} ${shake ? "shake" : ""}`}
              />
            </div>
          )}
        </div>
      )}

      <div className="footer">
        cipherline.exe • unstable build • signal integrity compromised
      </div>
    </div>
  );
}

function BootSequence() {
  const lines = [
    "booting cipherline kernel...",
    "loading encryption modules...",
    "syncing puzzle state...",
    "injecting signal distortion...",
    "handshake complete",
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center text-[#4ade80] text-sm tracking-widest z-30">
      <div>
        {lines.map((l, i) => (
          <div key={i} className="my-1">
            &gt; {l}
          </div>
        ))}
      </div>
    </div>
  );
}

function Noise() {
  return <div className="noise" />;
}
function Scanlines() {
  return <div className="scanlines" />;
}
function Vignette() {
  return <div className="vignette" />;
}
