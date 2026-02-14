import { getSession } from "@/supabase/session";
import { redirect } from "next/navigation";
import AuthButton from "@/components/AuthButton";

export default async function Home() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="flex h-screen items-center justify-center">
      <AuthButton />
    </main>
  );
}
