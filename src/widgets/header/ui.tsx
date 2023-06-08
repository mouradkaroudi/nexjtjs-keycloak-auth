"use client";
import { LoginButton } from "@/features/auth/auth-with-keycloak/ui";
import { LogoutButton } from "@/features/auth/logout";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

const Logo = () => {
  return (
    <a href="/" className="text-gray-500">
      <span className="font-bold text-black">Nextjs</span> / with-keycloeak
    </a>
  );
};

export const GuestHeader = () => {
  return (
    <div className="border-b border-gray-200">
      <div className="container max-w-screen-lg flex flex-wrap items-center justify-between px-6 mx-auto">
        <div className="w-full flex justify-between h-14 items-center">
          <Logo />
          <div>
            <LoginButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export const UserHeader = ({ showSettings = false }) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn('keycloak'); // Force sign in to hopefully resolve error
    }
  }, [session]);

  return (
    <div className="border-b border-gray-200">
      <div className="container max-w-screen-lg flex flex-wrap items-center justify-between px-6 mx-auto">
        <div className="w-full flex justify-between h-14 items-center">
          <Logo />
          <div className="flex gap-6 items-center">
            <Link
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              href={"/dashboard"}
            >
              Account
            </Link>

            {showSettings && (
              <Link
                href="/dashboard/settings"
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>

                <span className="sr-only">Icon description</span>
              </Link>
            )}
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
};
