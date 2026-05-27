export const metadata = {
  title: "Terms of Service | CipherLine",
};

export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 text-sm leading-relaxed space-y-4">
      <h1 className="text-xl font-bold">Terms of Service</h1>

      <p>
        By using CipherLine, you agree to the following terms and conditions.
      </p>

      <h2 className="font-semibold mt-6">Usage Rules</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Do not abuse, exploit, or spam the game system</li>
        <li>Do not attempt automated solving or botting</li>
        <li>Do not interfere with leaderboards or progress tracking</li>
      </ul>

      <h2 className="font-semibold mt-6">Service Availability</h2>
      <p>
        CipherLine is provided as-is. Availability, uptime, and puzzle
        continuity are not guaranteed.
      </p>

      <h2 className="font-semibold mt-6">Game Data</h2>
      <p>
        Game progress, streaks, and leaderboard scores may be reset or modified
        at any time without notice.
      </p>

      <h2 className="font-semibold mt-6">Fair Use</h2>
      <p>
        Any attempt to manipulate the system, including automated guessing or
        backend exploitation, may result in restricted access.
      </p>

      <h2 className="font-semibold mt-6">Changes</h2>
      <p>These terms may be updated as the application evolves.</p>

      <p className="opacity-60 mt-8">Last updated: 2026</p>
    </div>
  );
}
