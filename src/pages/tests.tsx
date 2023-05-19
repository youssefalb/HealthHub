//here the patient sees a list of his past tests results and can view them or download them as pdf
import TestsList from "@/components/TestsList";


export default function testsPage() {
    return (
        <div>
            <h1 className='text-4xl font-sans'>My Tests</h1>
            <TestsList />
        </div>
    )
}   