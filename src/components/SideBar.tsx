import { SessionContext, useSession } from "next-auth/react";
import Link from "next/link";

import { Role } from "@prisma/client";

export default function sideBar() {

    const { data: session } = useSession();

    let menuItems = [
    ];
    let path = "/"

    if (session?.user?.role === Role.PATIENT) {
        path = "/patient"
        menuItems = [
            {
                href: "/visits",
                title: "Appointments",
            },
            {
                href: path + "/tests",
                title: "Tests",
            },
            {
                href: path + "/messages",
                title: "Messages",
            },
            {
                href: "/findUs",
                title: "Find Us",
            },
        ];
    }
    else if (session?.user?.role === Role.DOCTOR) {
        path = "/doctor"
        menuItems = [
            {
                href: "/visits",
                title: "Appointments",
            },

        ];
    }
    else if (session?.user?.role === Role.LAB_ASSISTANT) {

    }

    else if (session?.user?.role === Role.LAB_SUPERVISOR) {

    }
    else if (session?.user?.role === Role.RECEPTIONIST) {

    }
    else {
        menuItems = [
            {
                href: "/about",
                title: "About",
            },
            {
                href: "/contact",
                title: "Contact",
            },
        ];
    }



    return (
        <aside className="bg-gray-100 w-full md:w-60">
            {session ? <div className="flex items-center justify-center  rounded-full border-2 border-black w-3/6">
                {/* <img src="/images/logotype.png" alt=""></img> */}
                profile pic here
            </div> : null}
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
