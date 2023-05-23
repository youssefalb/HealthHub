import { useSession } from "next-auth/react";
import { useEffect, useCallback , useState} from "react";
import TextInput from '@/components/textInput';
import CustomButton from '@/components/CustomButton';
import { Role } from '@prisma/client';

const UserSettings = () => {
    const { data: session } = useSession(); // it's not fired everytime, (only once), but I need to declare it to be able to access it

    const role = session?.user?.role;

    const [profileImage, setProfileImage] = useState('');
    useEffect(() => {
        if (session?.user?.image) {
            setProfileImage(session.user.image);
        }
    }, [session?.user?.image]);

    const handlePictureChange = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setProfileImage(event.target.result.toString());
                console.log(session?.user?.image);
            };
            reader.readAsDataURL(file);
        }
    }, []);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [email, setEmail] = useState('');

    const [hasInsurance, setHasInsurance] = useState(false);
    const [insuranceNumber, setInsuranceNumber] = useState('');


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
            <div className="relative mx-auto -mt-16 w-32 h-32 rounded-full overflow-hidden border-4 border-white hover:cursor-pointer"
            >

                <label htmlFor="profileImageInput" className="w-full h-full">
                    {profileImage ? (
                        <img
                            src={profileImage}
                            alt={session?.user?.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="flex items-center justify-center w-full h-full">
                            Upload Picture
                        </span>
                    )}
                    <input
                        id="profileImageInput"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePictureChange}
                    />
                </label>
            </div>
            <div className="mx-auto max-w-screen-lg my-8 px-4">
                <form onSubmit={handleSubmit}>
                    <TextInput
                        label="Name*"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextInput
                        label="Surname*"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />

                    <CustomButton
                        buttonText={"Save Changes"}
                        onClick={() => {
                            //Change name and username
                        }}
                    />
                    <TextInput
                        label="Email*"
                        value={email}
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
