"use client";
import { createClient } from "@/supabase/client";

export async function addBookmark(title: string, url: string) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

const payload = {
  title,
  url,
  user_id: user.id,
};

console.log("INSERTING:", payload);

await supabase.from("bookmarks").insert(payload);

}
export async function deleteBookmark(id: string) {
    const supabase = createClient();
    const {error } = await supabase.from("bookmarks").delete().eq("id", id);
    if (error) throw error;
}
