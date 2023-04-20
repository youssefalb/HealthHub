import { sign } from "crypto";
import { SessionContext, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function navBar() {
  const { data: session } = useSession();

  return (
    <header className="bg-white top-0 flex justify-between items-center font-semibold border-b ">
      <div className="ml-8 w-52">
        <img src="/images/logotype.png" alt=""></img>
      </div>

      <div className="mr-10 items-center">
        {session ? (
          <Link href="/">
            <button
              onClick={() => signOut()}
              className="px-8 py-1 text-white bg-blue-500 rounded-2xl mr-2 my-3"
            >
              Logout
            </button>
          </Link>
        ) : (
          <>
            <Link href="/auth/login">
              <button className="px-8 py-1 text-blue-500 bg-white border border-blue-400 rounded-2xl mr-2 my-3">
                Login
              </button>
            </Link>
            <Link href="/auth/register">
              <button className="px-8 py-1 text-blue-500 bg-white border border-blue-400 rounded-2xl mr-2 my-3">
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
