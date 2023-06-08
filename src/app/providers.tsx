'use client';

import { getServerSession } from 'next-auth/next';
import { SessionProvider, getSession } from 'next-auth/react';
import { signIn, signOut, useSession } from "next-auth/react";
import { authOptions } from './api/auth/[...nextauth]/route';

export async function Providers(params = {}) {

    const { session, children } = params

    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )

}