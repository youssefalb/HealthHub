import React from "react";
import type { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import prisma from '../../lib/prisma'
import { useSession, signIn, signOut } from 'next-auth/react'
import { getToken } from "next-auth/jwt";

function index() {

    //TODO: Sessions are not stored in db when logging via credentials
    const { data: session } = useSession();
    if (session) {
        return (
            <div>
                <p>Welcome back commander {session.user.email}</p>
                <button onClick={() => signOut()}>Sign out </button>

            </div>
        )
    } else {
        return (
            <div>
                <p>You are not logged in</p>
                <button onClick={() => signIn()}>Sign In </button>
            </div>

        )
    }
}

export default index;
