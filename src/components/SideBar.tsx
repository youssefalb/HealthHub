import { SessionContext, useSession } from "next-auth/react";
import Link from "next/link";

import { Role } from "@prisma/client";

export default function sideBar() {
  const { data: session } = useSession();

  let menuItems = [
    {
      href: "/about",
      title: "About",
    },
    {
      href: "/contact",
      title: "Contact",
    },
    {
      href: "/locations",
      title: "Find Us",
    },
  ];

  let path = "/";

  if (session?.user?.role === Role.PATIENT) {
    console.log("user is patient");

    path = "/patient";
    menuItems = menuItems
      .concat([
        {
          href: "/tests",
          title: "Tests",
        },
        {
          href: "/visits",
          title: "Appointments",
        },
        {
          href: "/profile/messages",
          title: "Messages",
        },
      ])
      .reverse();
    console.log(menuItems);
  } else if (session?.user?.role === Role.DOCTOR) {
    path = "/doctor";
    menuItems = menuItems
      .concat([
        {
          href: "/visits",
          title: "Appointments",
        },
      ])
      .reverse();
  } else if (session?.user?.role === Role.LAB_ASSISTANT) {
  } else if (session?.user?.role === Role.LAB_SUPERVISOR) {
  } else if (session?.user?.role === Role.RECEPTIONIST) {
  } else {
    // menuItems = [
    //     {
    //         href: "/about",
    //         title: "About",
    //     },
    //     {
    //         href: "/contact",
    //         title: "Contact",
    //     },
    //     {
    //         href: "/locations",
    //         title: "Find Us",
    //     },
    // ];
  }

  return (
    <aside className="bg-gray-100 w-full md:w-60">
      {session ? (
        <div className="flex items-center justify-center  rounded-full border-2 border-black w-3/6">
          {/* <img src="/images/logotype.png" alt=""></img> */}
          profile pic here
        </div>
      ) : null}
      <nav>
        <ul>
          {menuItems.map(({ href, title }) => (
            <li className="m-2" key={title}>
              <Link href={href} passHref>
                <div
                  className="flex p-2 bg-gray-50 hover:bg-gray-200 cursor-pointer rounded-lg
                     "
                >
                  <span className="font-semibold text-gray-600 mx-6 text-sm">
                    {title}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
