import { SessionContext, useSession } from "next-auth/react";
import Link from "next/link";

import { Role } from "@prisma/client";
import ProfilePicture from "@/components/ProfilePicture";

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
  } else if (session?.user?.role === Role.DOCTOR) {
    path = "/doctor";
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
      ])
      .reverse();
  } else if (session?.user?.role === Role.LAB_ASSISTANT) {
    menuItems = menuItems
      .concat([
        {
          href: "/tests",
          title: "My Tests",
        },
        {
          href: "/all-tests",
          title: "Tests",
        },
      ])
      .reverse();
  } else if (session?.user?.role === Role.LAB_SUPERVISOR) {
    menuItems = menuItems
      .concat([
        {
          href: "/tests",
          title: "My Tests",
        },
        {
          href: "/all-tests",
          title: "Tests",
        },
      ])
      .reverse();
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
        <div className="flex items-center py-4 px-4 flex-col">
          <ProfilePicture
            src={session.user?.image ? session.user?.image : "https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg"}
            alt={session?.user?.name}
            size={5}
          />
          <div>
            <h2 className="text-xs font-bold">{session?.user?.name}</h2>
            {/* <p className="text-xs text-gray-500">{session?.user?.email}</p> */}
          </div>
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
