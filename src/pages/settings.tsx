import { useSession } from "next-auth/react";
import { useState } from "react";
import TextInput from '@/components/textInput';
import InsuranceForm from '@/components/InsuranceForm';
import CustomButton from '@/components/CustomButton';
import { Role } from '@prisma/client';
import ProfilePicture from '@/components/ProfilePicture';
import { useEffect } from "react";

const UserSettings = () => {
    const { data: session } = useSession(); // it's not fired everytime, (only once), but I need to declare it to be able to access it

    const role = session?.user?.role;

    const [profileImage, setProfileImage] = useState('');
    useEffect(() => {
        if (session?.user?.image) {
            setProfileImage(session.user.image);
        }
    }, [session?.user?.image]);
    const [idNumber, setIdNumber] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');

    const [email, setEmail] = useState('');

    const [hasInsurance, setHasInsurance] = useState(false);
    const [insuranceNumber, setInsuranceNumber] = useState('');


    const handlePictureClick = (e) => {
        e.preventDefault();
        console.log(session?.user?.image);
    };

    const handleSubmit = (e) => {   
        e.preventDefault();
        console.log(role);
    };

    return (
        <div>
            {/* Cover image with gray overlay */}
            <div className="relative">
                <img src="https://picsum.photos/900" alt="Cover" className="w-full h-40 object-cover" />
                <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
            </div>
            {/* Profile picture with edit icon */}
            <div
                className="relative mx-auto -mt-16 w-32 h-32 rounded-full overflow-hidden border-4 border-white cursor-pointer"
                onClick={handlePictureClick}
            >
            <img
                src={profileImage ? profileImage : "https://avatars.githubusercontent.com/u/72605819?v=4"}
                alt={session?.user?.name}
                className="w-full h-full object-cover"
                />
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

                    <CustomButton
                            buttonText={"Save Changes"}
                            onClick={() => {
                                //Change name and username
                            }}
                        />
                    <TextInput
                        label="Email*"
                        value={idNumber}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <CustomButton
                            buttonText={"Save Changes"}
                            onClick={() => {
                                //Change name and username
                            }}
                        />

                        
                    {role == Role.PATIENT && (
                    // <div>
                    // <InsuranceForm
                    //     hasInsurance={hasInsurance}
                    //     setHasInsurance={setHasInsurance}
                    //     insuranceNumber={insuranceNumber}
                    //     setInsuranceNumber={setInsuranceNumber}
                    // />

                    //       <CustomButton
                    //         buttonText={"Save Changes"}
                    //         onClick={() => {
                    //             //Change name and username
                    //         }}
                    //     />
                    // </div>
                    <div>
                    <TextInput
                        label="Innsurance Number*"
                        value={insuranceNumber}
                        onChange={(e) => setInsuranceNumber(e.target.value)}
                    />
                        <CustomButton
                            buttonText={"Save Changes"}
                            onClick={() => {
                                //Change the insurance number
                            }}
                        />
                    </div>
                    )}

           
                </form>
            </div>
        </div>
    );
};

export default UserSettings;
