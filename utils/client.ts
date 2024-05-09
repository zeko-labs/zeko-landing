import { createClient } from "@supabase/supabase-js";
import { SupabaseClient } from "@supabase/supabase-js";

export default function createSupaClient() {
  // Create a supabase client on the browser with project's credentials
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function addToTable(
  supaInstance: SupabaseClient,
  index: Number,
  address: String
) {
  const { data, error } = await supaInstance.from("AddressTable").insert({
    id: index,
    acc_address: address,
  });
}

export async function checkAddressInTable(
  supaInstance: SupabaseClient,
  address: String
) {
  let { data, error } = await supaInstance
    .from("AddressTable")
    .select("*")
    .eq("acc_address", address);

  return data;
}

export async function getUserCount(supaInstance: SupabaseClient) {
  let { data, error } = await supaInstance.from("AddressTable").select("*");

  return data;
}
