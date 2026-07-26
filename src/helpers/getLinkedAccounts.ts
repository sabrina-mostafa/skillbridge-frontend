
import { authClient } from "@/lib/auth-client";

export async function getLinkedAccounts() {
  const result = await authClient.listAccounts();

  return result;
}