"use client";
import { Bookmark } from "@/types/bookmark";
import {deleteBookmark} from "@/lib/bookmarks-client";
import { useRouter } from "next/navigation";
import {createClient} from "@/supabase/client";
import {useEffect, useRef} from "react";
export default function BookmarkList({ data }: { data: Bookmark[] }) {
  const router = useRouter();
  function safeHostname(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return "Invalid URL";
  }
}

useEffect(() => {
  const supabase = createClient();

  let channel: any;

  const setup = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      console.log("No session yet — waiting...");
      return;
    }

    console.log("Session ready — subscribing");

    channel = supabase
      .channel("bookmarks-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookmarks" },
        () => router.refresh()
      )
      .subscribe();
  };

  setup();

  return () => {
    if (channel) supabase.removeChannel(channel);
  };
}, []);




    if (!data.length) {
    return <p className="text-gray-500">No bookmarks yet. Add your first one above.</p> 
    ;
  }
    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this bookmark?")) return;
        await deleteBookmark(id);
        router.refresh();
    }
  return (
    <div className="space-y-3">
      {data.map((b) => (
        <div
  key={b.id}
  className="border p-4 rounded flex justify-between items-center"
>
  <div>
    <a
      href={b.url}
      target="_blank"
      className="font-medium hover:underline block"
    >
      {b.title}
    </a>

    <p className="text-sm text-green-500">{safeHostname(b.url)}</p>
  </div>

  <div className="flex items-center gap-4">
    <span className="text-sm text-gray-400">
      {new Date(b.created_at).toLocaleDateString("en-US")}
    </span>

    <button
      onClick={() => handleDelete(b.id)}
      className="text-red-500 text-sm hover:underline"
    >
      Delete
    </button>
  </div>
</div>

      ))}
    </div>
  );
}
