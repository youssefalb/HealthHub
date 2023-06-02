import { getTestDetails } from "@/lib/tests";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Test() {

    const [test, setTest] = useState({})

    const router = useRouter()
    const { id } = router.query
    const { data: session } = useSession()

    const fetchData = async () => {
        if (session?.user) {
            const res = await getTestDetails(session.user?.role, id)
            setTest(res['data'])
        }
    }

    useEffect(() => {
        fetchData()
    }, [session])

    return (
        <div className="mx-auto max-w-screen-lg my-8 px-4">
            <h1 className="text-3xl font-bold mb-6">Test details</h1>
            {test &&
            <h1>Hello {test['doctorNote']}</h1>}
        </div>
    );
}