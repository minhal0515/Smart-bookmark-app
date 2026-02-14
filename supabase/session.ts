import { createClient } from "./server";

export async function getSession() {
  const supabase = createClient();
  const { data } = await (await supabase).auth.getSession();
  return data.session;
}
