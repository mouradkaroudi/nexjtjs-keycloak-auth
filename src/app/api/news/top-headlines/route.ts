import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  const dataReq = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEWS_API_KEY,
      },
    }
  );

  const res = await dataReq.json();

  return NextResponse.json(res);
}
