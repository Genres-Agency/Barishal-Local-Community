"use server";

import { cookies } from "next/headers";

export async function getAuthTokens() {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("accessToken")?.value;
  // const refreshToken = (await cookieStore).get("refreshToken")?.value;

  return { accessToken };
}
