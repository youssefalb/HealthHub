//here the patient sees a list of his past tests results and can view them or download them as pdf
import TestsList from "@/components/TestsList";

export default function testsPage() {

    return (
        <div className="mx-auto max-w-screen-lg my-8 px-4">
            <h1 className="text-3xl font-bold mb-6">My Tests</h1>
            <TestsList
            />
        </div>
    )
}   
