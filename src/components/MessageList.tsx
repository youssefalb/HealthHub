import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import EmptyStateMessage from "./EmptyStateMessage";
import Link from 'next/link';
import MessageCard from "./MessageCard";
import { getOwnMessages } from "@/lib/messages";

export default function MessagesList() {
    const { data: session } = useSession(); 
    const [isLoading, setIsLoading] = useState(true);
    const [messages, setMessages] = useState([]);

    const role = session?.user?.role;

    const fetchData = async () => {
        try {
            const results = await getOwnMessages();
            // const results = {"data": [{"content": "test", "doctorId": "D1"}]}
            setMessages(results["data"]);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    };

    useEffect(() => {
        if (session) {
            fetchData();
        }
    }, [session]);

    if (isLoading) return <p>Loading...</p>;
    return (
        <div className="flex flex-col-reverse gap-4">
            {messages?.length ? (
                messages.map((message) => (
                    <Link key={message.messageId} href={`/messages/${message.messageId}`} >
                        <MessageCard
                            key={message.visitId}
                            message={message}
                            role={role}
                        />
                    </Link>
                ))
            ) : (
                <EmptyStateMessage
                    title="No Messages"
                    description="You don't have any messages, yet."
                />
            )}
        </div>
    );
}
