import { createClient } from "@/supabase/server";
import { Bookmark } from "@/types/bookmark";

export async function getBookmarks(): Promise<Bookmark[]> {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", user.id) // ⭐ IMPORTANT LINE
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}
