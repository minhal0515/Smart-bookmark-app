"use client";

import { useState } from "react";
import { addBookmark } from "@/lib/bookmarks-client";
import { useRouter } from "next/navigation";

export default function AddBookmarkForm() {
  
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await addBookmark(title, url);

    setTitle("");
    setUrl("");
    setLoading(false);

    router.refresh(); 
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        required
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border px-3 py-2 rounded"
      />
      <input
        required
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border px-3 py-2 rounded w-72"
      />
      <button  disabled={loading} className="bg-black text-white px-4 rounded">
        {loading ? "This will take a moment..." : "Add"}
      </button>
    </form>
  );
}

