'use client';

import Button from "@/components/Button";
import { GuestHeader, UserHeader } from "@/widgets/Header";
import Footer from "@/widgets/footer";
import { Card } from "@/widgets/news/ui/card";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/react";

export default async function Home() {

  const session = await useSession(authOptions);

  let data = null;

  try {
    let res = await fetch(`http://127.0.0.1:3000/api/news/top-headlines`, {
      cache: "no-store",
    });

    data = await res.json();
  } catch (e) {}

  const Posts = () => {
    if (!data) {
      return "Unexcpted Error! We're unable load the news. please try to refresh the page";
    }

    return (
      <>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Top headlines
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Explore top news around the world from trusted media.
          </p>
        </div>
        <div className="mx-auto mt-10 grid grid-cols-1 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
          <p className="text-gray-500">
            Listing {data.totalResults} top news from the US.
          </p>

          {data.articles.map((post) => (
            <Card post={post} key={uuidv4()} />
          ))}
        </div>
      </>
    );
  };

  return (
    <div>
      {session ? <UserHeader showSettings={true} /> : <GuestHeader />}
      <div className="py-6"></div>
      <div className="container max-w-screen-lg flex flex-wrap items-center justify-between px-6 mx-auto">
        <Posts />
      </div>
      <div className="py-6"></div>
      <Footer />
    </div>
  );
}
