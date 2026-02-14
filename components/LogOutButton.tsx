"use client";
import {signOut} from "@/supabase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await signOut();
    router.push("/"); // or login page
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="text-sm bg-red-800 text-white px-3 py-1 rounded"
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}