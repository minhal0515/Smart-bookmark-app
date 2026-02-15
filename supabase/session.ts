import { createClient } from "./server";

export async function getSession() {
  const supabase = createClient();
  const { data: { user } } = await (await supabase).auth.getUser();
  return user;
}
