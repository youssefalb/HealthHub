import React from "react";
import { useSession, signIn, signOut } from 'next-auth/react'
import {useUserContext, useUpdateUserContext} from '../../context/user'

function index() {


 // Getting user object using useUserContext Hook
    const user = useUserContext();
    const setUser = useUpdateUserContext(); 

// we have data retrieved from global context, and can be used 

    console.log("user1: " + user.name);
    const { data: session } = useSession();
    if (session) {
        setUser(session.user)
        console.log("user 22: " + user.name)
        return (
            <div>
                <p>{session.user.name} + {user.name} hekllooooo </p>
            <p>Welcome back commander {session.user.name}</p>
                <button onClick={() => signOut()}>Sign out </button>

            </div>
        )
    } else {
        return (
            <div>
            <p>USER: {user.name}</p>
                <p>You are not logged in</p>
                <button onClick={() => signIn()}>Sign In </button>
            </div>

        )
    }
}

export default index;
