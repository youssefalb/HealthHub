//here the patient, doctor and recept. can see  appointments and make a new reservation

import MessageList from "@/components/MessageList";

export default function messagePage() {
    return (
        <div className="mx-auto max-w-screen-lg my-8 px-4">
            <h1 className="text-3xl font-bold mb-6">My messages</h1>
            <MessageList />
        </div>
    );
}
