"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { UserHeader } from "@/widgets/Header";
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation'

export default function Page() {
  const { data, status } = useSession({
    required: true,
    onUnauthenticated() {
      return redirect("/");
    },
  });

  if(status == 'loading') {
    return <LoadingSpinner/>
  }

  return (
    <>
      <UserHeader showSettings={data.user.isAdmin}/>
      <div className="py-6"></div>
      <div className="container max-w-screen-lg px-6 mx-auto">
        <div className="mx-auto border border-gray-200 rounded-2xl p-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Hello, {data.user.name}
          </h1>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Welcome to your news dashboard.
          </p>
        </div>
      </div>
    </>
  );
}
