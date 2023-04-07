import React from "react";
import { useSession, signIn, signOut } from 'next-auth/react'

function index() {

    //TODO: Sessions are not stored in db when logging via credentials
    const { data: session } = useSession();
    if (session) {
        return (
            <div>
                <p>Welcome back commander {session.user.name}</p>
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
