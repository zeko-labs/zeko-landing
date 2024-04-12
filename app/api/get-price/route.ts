"use server";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("id");

  const paramsObj = {
    ids: `${query}`,
    vs_currencies: "USD",
    x_cg_demo_api_key: `${process.env.NEXT_PUBLIC_FAUCET_URL!}`,
  };
  const newSearchParams = new URLSearchParams(paramsObj);
  const url = new URL("https://api.coingecko.com/api/v3/simple/price");
  const res = await fetch(`${url.toString()}?${newSearchParams.toString()}`, {
    cache: "force-cache",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  return Response.json({ data });
}
