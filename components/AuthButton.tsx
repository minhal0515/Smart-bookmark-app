"use client";

import { signInWithGoogle, signOut } from "@/supabase/auth";
import { useEffect, useState } from "react";
import { createClient } from "@/supabase/client";

export default function AuthButton() {
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  if (user) {
    return (
      <button
        onClick={signOut}
        className="px-6 py-3 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    );
  }

  return (
    <button
      onClick={signInWithGoogle}
      className="px-6 py-3 bg-black text-white rounded"
    >
      Login with Google
    </button>
  );
}
