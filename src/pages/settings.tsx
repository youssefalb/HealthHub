import { useState } from "react";
import TextInput from '@/components/textInput';
import InsuranceForm from '@/components/InsuranceForm';
import CustomButton from '@/components/CustomButton';

const UserSettings = () => {
    const [idNumber, setIdNumber] = useState('');
    const [hasInsurance, setHasInsurance] = useState(false);
    const [insuranceNumber, setInsuranceNumber] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // submit handler logic
    };

    return (
        <div>
            {/* Cover image with gray overlay */}
            <div className="relative">
                <img src="https://picsum.photos/900" alt="Cover" className="w-full h-40 object-cover" />
                <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
            </div>
            {/* Profile picture with edit icon */}
            <div className="relative mx-auto -mt-16 w-32 h-32 rounded-full overflow-hidden border-4 border-white">
                <img src="https://picsum.photos/200" alt="Profile" className="w-full h-full object-cover" />

            </div>
            <div className="mx-auto max-w-screen-lg my-8 px-4">
                <form onSubmit={handleSubmit}>
                    <TextInput
                        label="Name*"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                    />
                    <TextInput
                        label="Surname*"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                    />
                    <TextInput
                        label="PESEL Number*"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                    />
                    <InsuranceForm
                        hasInsurance={hasInsurance}
                        setHasInsurance={setHasInsurance}
                        insuranceNumber={insuranceNumber}
                        setInsuranceNumber={setInsuranceNumber}
                    />
                    <CustomButton
                        buttonText={"Save Changes"}
                        onClick={() => {
                            //do stuff
                        }}
                    />
                </form>
            </div>
        </div>
    );
};

export default UserSettings;
