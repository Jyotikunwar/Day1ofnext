"use client";

import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch("/api/logout", {
      method: "POST",
    });

    if (res.ok) {
      router.push("/login");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">
        Welcome to Dashboard 🎉
      </h1>

      <button
        onClick={handleLogout}
        className="mt-6 rounded-lg bg-red-500 px-4 py-2 text-white"
      >
        Logout
      </button>
    </div>
  );
}