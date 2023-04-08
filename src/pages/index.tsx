import React from "react";
import { useSession, signIn, signOut } from 'next-auth/react'
import {useUserContext} from '../../context/user'

function index() {


 // Getting user object using useUserContext Hook
  const { user } = useUserContext();


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
            <p>{user.name}</p>
                <p>You are not logged in</p>
                <button onClick={() => signIn()}>Sign In </button>
            </div>

        )
    }
}

export default index;
