import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center gap-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-indigo-700 text-center">Welcome back!</h1>
        <p className="text-lg text-gray-600 text-center max-w-md">Glad to see you again. Manage guest requests easily from your dashboard.</p>
        <a
          href="/dashboard/requests"
          className="mt-4 px-8 py-3 bg-indigo-600 text-white rounded-full text-lg font-semibold shadow hover:bg-indigo-700 transition-colors"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}
