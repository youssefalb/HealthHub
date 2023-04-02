import React from "react";
import type { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import prisma from '../../lib/prisma'
import {useSession, signIn, signOut} from 'next-auth/react'

function index() {

  const {data: session} = useSession();
  if (session) {
    return (
    <div>
    <p>Welcome back commander {session.user.email}</p>
    <button onClick={()=> signOut()}>Sign out </button>

    </div>
    )
  } else {
    return (
    <div>
    <p>You are not logged in</p>
    <button onClick={()=> signIn()}>Sign In </button>
    </div>
    
    )
  }
    <h1>Index</h1>
}

export default index;
