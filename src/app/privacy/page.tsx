export const metadata = {
  title: "Privacy Policy | CipherLine",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 text-sm leading-relaxed space-y-4">
      <h1 className="text-xl font-bold">Privacy Policy</h1>

      <p>
        CipherLine collects only the data required to operate the game and
        provide core functionality.
      </p>

      <h2 className="font-semibold mt-6">Data Collected</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Discord user ID (when using Discord Activity mode)</li>
        <li>Gameplay progress (attempts, solved status, streaks)</li>
        <li>Optional leaderboard statistics</li>
      </ul>

      <h2 className="font-semibold mt-6">How Data Is Used</h2>
      <p>
        Data is used strictly to power gameplay features such as daily puzzles,
        leaderboards, streak tracking, and activity synchronization.
      </p>

      <h2 className="font-semibold mt-6">Data Sharing</h2>
      <p>
        CipherLine does not sell, rent, or share personal data with third
        parties.
      </p>

      <h2 className="font-semibold mt-6">Storage</h2>
      <p>
        Data is stored securely using server-side storage (Redis / Upstash) and
        is only retained as long as needed for gameplay functionality.
      </p>

      <h2 className="font-semibold mt-6">Deletion</h2>
      <p>
        Users may reset their progress by removing application access or
        contacting support (if provided in the future).
      </p>

      <p className="opacity-60 mt-8">Last updated: 2026</p>
    </div>
  );
}
