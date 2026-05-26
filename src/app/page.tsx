"use client";

import { useEffect, useState } from "react";

function corruptText(text: string, level: number) {
  if (!text) return "";

  const chars = text.split("");

  return chars
    .map((c) => {
      if (c === " ") return " ";

      const chance = Math.random() * 100;

      if (chance < level * 8) {
        const pool = "@#$%&*+=?/\\|[]{}";
        return pool[Math.floor(Math.random() * pool.length)];
      }

      return c;
    })
    .join("");
}

export default function Page() {
  const [puzzle, setPuzzle] = useState<any>(null);

  const [guess, setGuess] = useState("");

  const [feedback, setFeedback] = useState("");

  const [signalState, setSignalState] = useState("STABLE");

  const [history, setHistory] = useState<string[]>([]);

  const [attempts, setAttempts] = useState(0);

  const [shake, setShake] = useState(false);

  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    fetch("/api/daily")
      .then((r) => r.json())
      .then(setPuzzle);
  }, []);

  async function submit() {
    if (!guess.trim()) return;

    const res = await fetch("/api/guess", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: "demo",
        guess,
      }),
    });

    const data = await res.json();

    setFeedback(data.feedback);

    setSignalState(data.signalState);

    setAttempts(data.attempts);

    setHistory((h) => [...h, guess]);

    if (!data.correct) {
      setShake(true);

      setPulse(true);

      setTimeout(() => setShake(false), 200);

      setTimeout(() => setPulse(false), 600);
    } else {
      setPulse(true);

      setTimeout(() => setPulse(false), 1200);
    }

    setGuess("");
  }

  const noiseLevel = Math.min(attempts, 6);

  return (
    <div className={`space-y-6 scan-flicker ${pulse ? "opacity-90" : ""}`}>
      {/* HEADER */}
      <div className="signal-box scanline p-4 rounded-md">
        <div className="flex items-center justify-between text-xs opacity-50 tracking-widest">
          <span>DAILY SIGNAL</span>

          <span className="opacity-70 animate-pulse">ACTIVE</span>
        </div>

        <div className="text-xs opacity-40 mt-1 tracking-widest">
          {puzzle?.date || "syncing transmission..."}
        </div>
      </div>

      {/* PAYLOAD */}
      <div
        className={`signal-box scanline p-6 rounded-md space-y-4 ${
          shake ? "glitch" : ""
        }`}
      >
        <div className="text-xs opacity-50 tracking-widest">
          ENCRYPTED PAYLOAD
        </div>

        <div
          className="text-lg tracking-widest break-words leading-relaxed transition-all duration-300"
          style={{
            opacity: 1 - noiseLevel * 0.12,
            letterSpacing: `${2 + noiseLevel}px`,
            filter: `blur(${noiseLevel * 0.25}px)`,
          }}
        >
          {corruptText(puzzle?.encrypted || "", noiseLevel)}
        </div>

        <div className="text-xs opacity-50 tracking-widest">
          cipher protocol: {puzzle?.cipher}
        </div>
      </div>

      {/* SYSTEM STATUS */}
      <div className="signal-box scanline p-4 rounded-md text-center">
        <div className="text-xs opacity-50 tracking-widest">SYSTEM STATUS</div>

        <div className="text-sm tracking-widest mt-1">
          {feedback || "SIGNAL IDLE"}
        </div>

        <div className="text-xs opacity-40 mt-2">
          signal_state: {signalState}
        </div>

        <div className="text-xs opacity-30 mt-1">
          noise_level: {noiseLevel}/6
        </div>
      </div>

      {/* INPUT LOG */}
      <div className="signal-box scanline p-4 rounded-md">
        <div className="text-xs opacity-50 tracking-widest mb-2">INPUT LOG</div>

        {history.length === 0 && (
          <div className="text-xs opacity-30 tracking-widest animate-pulse">
            INPUT LOG // AWAITING FIRST SIGNAL CAPTURE
          </div>
        )}

        {history.map((h, i) => (
          <div key={i} className="text-sm opacity-70 tracking-widest">
            [{i + 1}] {h}
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="space-y-2">
        <input
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="decode attempt..."
          className="w-full bg-black border border-white/10 p-3 rounded-md outline-none tracking-widest"
        />

        <button
          onClick={submit}
          disabled={!guess.trim()}
          className={`
    w-full p-3 rounded-md tracking-widest transition
    border border-white/10
    ${
      guess.trim()
        ? "hover:bg-white/5 opacity-100"
        : "opacity-30 cursor-not-allowed"
    }
  `}
        >
          {guess.trim() ? "EXECUTE DECRYPTION" : "AWAITING INPUT"}
        </button>
      </div>
    </div>
  );
}
