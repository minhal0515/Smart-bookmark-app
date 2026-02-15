// supabase/client.ts — diagnostic version
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  // Detect server runtime
  if (typeof window === "undefined") {
    console.error("!!! createBrowserClient() called on SERVER !!!");
    console.error(new Error("createBrowserClient called on server").stack);
    // Do not throw — just log. But you could throw to stop the process if you want.
  }
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
