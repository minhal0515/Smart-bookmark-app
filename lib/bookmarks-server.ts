import { createClient } from "@/supabase/server";
import { Bookmark } from "@/types/bookmark";

export async function getBookmarks(): Promise<Bookmark[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}
