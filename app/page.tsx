import { getSession } from "@/supabase/session";
import { redirect } from "next/navigation";
import AuthButton from "@/components/AuthButton";

export default async function Home() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold tracking-tight">
        Smart Bookmark Micro Challenge
      </h1>

      <AuthButton />
    </main>
  );
}
