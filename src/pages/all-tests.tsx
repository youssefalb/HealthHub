// tech and super see all tests 
import TestsList from "@/components/TestsList";


export default function testsPage() {
    return (
        <div className="mx-auto max-w-screen-lg my-8 px-4">
            <h1 className="text-3xl font-bold mb-6">All Tests</h1>
            <TestsList 
                techFetchAll={true}
            />
        </div>
    )
}   
