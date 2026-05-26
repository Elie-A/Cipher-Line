"use client";

import { useEffect, useState } from "react";
import { useDiscordUser } from "@/lib/discord/useDiscordUser";

function corruptText(text: string, level: number) {
  if (!text) return "";

  const pool = "@#$%&*+=?/\\|[]{}";

  return text
    .split("")
    .map((c) => {
      if (c === " ") return " ";
      return Math.random() < level * 0.12
        ? pool[Math.floor(Math.random() * pool.length)]
        : c;
    })
    .join("");
}

export default function Page() {
  const { userId, isLoggedIn } = useDiscordUser();

  const [puzzle, setPuzzle] = useState<any>(null);
  const [guess, setGuess] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");
  const [shake, setShake] = useState(false);

  async function loadDaily() {
    const res = await fetch("/api/daily");
    const data = await res.json();
    setPuzzle(data);
  }

  useEffect(() => {
    loadDaily();
  }, []);

  async function submit() {
    const res = await fetch("/api/guess", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId ?? "guest",
        guess,
      }),
    });

    const data = await res.json();

    setFeedback(data.correct ? "SIGNAL STABILIZED" : "DISTORTION INCREASED");

    setHistory((h) => [...h, guess]);

    if (!data.correct) {
      setShake(true);
      setTimeout(() => setShake(false), 180);
    }

    if (data.solved) {
      setPuzzle((p: any) => ({ ...p, solved: true }));
    }

    setGuess("");
  }

  const solved = puzzle?.solved === true;
  const noiseLevel = solved ? 0 : Math.min(history.length, 6);

  const signalState = solved
    ? "DECODED"
    : noiseLevel > 4
      ? "CRITICAL"
      : noiseLevel > 2
        ? "DISTORTED"
        : "STABLE";

  const signalClass =
    signalState === "DECODED"
      ? "text-green-400"
      : signalState === "CRITICAL"
        ? "text-red-500 animate-pulse blur-[1px]"
        : signalState === "DISTORTED"
          ? "text-yellow-400 animate-pulse"
          : "text-cyan-300";

  return (
    <div className={`font-mono space-y-6 p-4 ${shake ? "animate-pulse" : ""}`}>
      {/* HEADER */}
      <div className="border border-white/10 p-4 rounded">
        <div className="flex justify-between text-xs opacity-60">
          <span>CIPHERLINE</span>
          <span className="opacity-70">
            {isLoggedIn ? "DISCORD SYNC ACTIVE" : "GUEST MODE"}
          </span>
        </div>

        <div className="text-xs opacity-40 mt-1">
          {puzzle?.date ?? "loading..."}
        </div>

        <div className={`text-xs mt-2 ${signalClass}`}>
          difficulty: {puzzle?.difficulty ?? "unknown"}
        </div>
      </div>

      {/* PAYLOAD */}
      <div className="border border-white/10 p-6 rounded space-y-3">
        <div className="text-xs opacity-50">ENCRYPTED PAYLOAD</div>

        <div
          className="text-lg tracking-widest break-words transition-all duration-300"
          style={{
            opacity: 1 - noiseLevel * 0.12,
            letterSpacing: `${2 + noiseLevel}px`,
            filter: `blur(${noiseLevel * 0.25}px)`,
          }}
        >
          {solved
            ? puzzle?.answer
            : corruptText(puzzle?.encrypted || "", noiseLevel)}
        </div>

        <div className="text-xs opacity-50">
          cipher protocol: {puzzle?.cipher ?? "unknown"}
        </div>
      </div>

      {/* STATUS */}
      <div className="border border-white/10 p-4 rounded text-center">
        <div className="text-xs opacity-50">SYSTEM STATUS</div>
        <div className={`text-sm mt-1 ${signalClass}`}>{signalState}</div>
        <div className="text-xs opacity-40 mt-2">
          noise_level: {noiseLevel}/6
        </div>
      </div>

      {/* INPUT LOG */}
      <div className="border border-white/10 p-4 rounded">
        <div className="text-xs opacity-50 mb-2">INPUT LOG</div>

        {history.length === 0 && (
          <div className="text-xs opacity-30">
            awaiting first signal capture
          </div>
        )}

        {history.map((h, i) => (
          <div key={i} className="text-sm opacity-70">
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
          className="w-full bg-black border border-white/10 p-3 rounded outline-none"
        />

        <button
          onClick={submit}
          className="w-full p-3 border border-white/10 hover:bg-white/5 transition"
        >
          EXECUTE DECRYPTION
        </button>
      </div>

      {/* FEEDBACK */}
      {feedback && (
        <div className="text-center text-xs opacity-60">{feedback}</div>
      )}
    </div>
  );
}
