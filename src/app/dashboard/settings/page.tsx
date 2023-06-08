"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import DefaultErrorPage from "next/error";
import { UserHeader } from "@/widgets/Header";

export default function Settings() {

  const { data, status } = useSession();

  if(status !== "authenticated") {
    redirect('/')
  }

  if (!data?.user.isAdmin) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <>
      <UserHeader showSettings={data.user.isAdmin} />
      <div className="py-6"></div>
      <div className="container max-w-screen-lg px-6 mx-auto">
        <form>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Settings
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    API endpoint
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="https://"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
