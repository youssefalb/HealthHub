import SideBar from "./SideBar";
import NavBar from "./NavBar";
import { useSession, getSession } from 'next-auth/react';


export default function Layout({ children }) {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen flex flex-col ">
      <NavBar />
      <div className="flex flex-col md:flex-row flex-1 ">
        <SideBar />
        {(!session || session?.user?.isActive) ?
          (
            <main className="flex-1 max-w-screen-xl mx-auto">{children}</main>

          ) : null}
      </div>
    </div>
  );
}
