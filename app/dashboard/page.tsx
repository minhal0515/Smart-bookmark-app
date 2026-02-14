import { getSession } from "@/supabase/session";
import { redirect } from "next/navigation";
import AddBookmarkForm from "@/components/AddBookmarkForm";
import BookmarkList from "@/components/BookmarkList";
import { getBookmarks } from "@/lib/bookmarks-server";
import LogoutButton from "@/components/LogOutButton";


export default async function Dashboard() {
  const session = await getSession();
  if (!session) redirect("/");

  const bookmarks = await getBookmarks();

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">
        Your Bookmarks
      </h1>

      <AddBookmarkForm  />

      <BookmarkList data={bookmarks} />
      <div className="flex justify-end mb-4">
  <LogoutButton />
</div>

    </div>
  );
}
