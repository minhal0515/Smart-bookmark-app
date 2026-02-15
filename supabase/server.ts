// supabase/server.ts — diagnostic version
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          // Diagnostic: print who tried to write cookies and the stack trace.
          try {
            console.error("===== SUPABASE setAll CALLED =====");
            console.error("Cookies to set:", JSON.stringify(cookiesToSet, null, 2));
            // capture stack
            const err = new Error("stack");
            console.error(err.stack);
            // ALSO print process/req info to help tie to request
            console.error("NODE PID", process.pid, "NOW", new Date().toISOString());
            // Optionally: print request url if available via cookieStore (no direct URL here)
          } catch (e) {
            console.error("error logging setAll", e);
          }
          // IMPORTANT: No-op (do not attempt to write) so Next doesn't throw here.
        },
      },
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    }
  );
}
