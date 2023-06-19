import CustomButton from "@/components/CustomButton";
import Label from "@/components/Label";
import { getMessage } from "@/lib/messages";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Message() {

    const [message, setMessage] = useState({})

    const router = useRouter()
    const { id } = router.query
    const { data: session } = useSession()

    const fetchData = async () => {
        if (session?.user) {
            const res = await getMessage(id.toString())
            setMessage(res['data'])
        }
    }

    useEffect(() => {
        fetchData()
    }, [session])


    return (
        <div className='flex flex-col justify-center'>

            <h1 className="text-3xl font-bold mb-6">Message</h1>

            {message['dateCreated'] &&
                <div className="w-full md:w-1/2 px-4 mb-4">
                    <Label name="Date" value={new Date(message['dateCreated']).toLocaleString()} />
                </div>
            }

            {message['doctor'] &&
                <div className="w-full md:w-1/2 px-4 mb-4 ">
                    <Label name="Message from" value={message['doctor'].user.firstName + message['doctor'].user.lastName} />
                </div>
            }

            {message['content'] &&
                <div className="w-full md:w-1/2 px-4 mb-4">
                    <Label name="Content" value={message['content']} />
                </div>
            }

            <div className="flex flex-row gap-2 md:gap-8 items-stretch">
                <CustomButton
                    buttonText="Back to Messages"
                    onClick={() => {
                        router.push("/messages")
                    }}
                />
            </div>

        </div>
    );
}
