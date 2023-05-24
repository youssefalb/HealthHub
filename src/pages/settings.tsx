import { useSession } from "next-auth/react";
import { useEffect, useCallback, useState } from "react";
import TextInput from '@/components/textInput';
import CustomButton from '@/components/CustomButton';
import { Role } from '@prisma/client';
import { getUserInfo, updateUserInfo} from "@/lib/userInfo";

const UserSettings = () => {
    const { data: session } = useSession(); // it's not fired everytime, (only once), but I need to declare it to be able to access it

    const role = session?.user?.role;
    const [image, setImage] = useState('');
    useEffect(() => {
        if (session?.user?.image) {
            setImage(session.user.image);
        }
    }, [session?.user?.image]);



    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [emailVerified, setEmailVerified] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');

    const [hasInsurance, setHasInsurance] = useState(false);
    const [insuranceId, setInsuranceId] = useState('');

    const updateUserNameAndSurname = () => {
        console.log("saveUserNameAndSurname");
        const userData = {
            firstName,
            lastName
        }
        updateUserInfo(userData)

    }

    const updateUserEmail = () => {
        console.log("saveUserNameAndSurname");
        const userData = {
            email,
        }
        updateUserInfo(userData)
        fetchData()
    }
    const updateUserPassword = () => {
        console.log("saveUserNameAndSurname");
        const userData = {
            newPassword,
            oldPassword
        }
        updateUserInfo(userData)        
    }

    const fetchData = async () => {
        const response = await getUserInfo()
        const result = await response.json()
        setFirstName(result.data?.firstName)
        setLastName(result.data?.lastName)
        setEmail(result.data?.email)
        setInsuranceId(result.data?.insuranceId)
        setEmailVerified(result.data?.emailVerified)
    }

    useEffect(() => {
        fetchData()
    }, [session])


    const handlePictureChange = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageData = event.target.result.toString();
                setImage(imageData);

                const userData = {
                    image: imageData,
                };
                console.log(userData);

                updateUserInfo(userData)
                    .then((response) => {
                        if (response.ok) {
                            console.log('User data updated successfully');
                        } else {
                            console.error('Failed to update user data');
                        }
                    })
                    .catch((error) => {
                        console.error('Failed to update user data:', error);
                    });
            };
            reader.readAsDataURL(file);
        }
    }, []);

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
                    {image ? (
                        <img
                            src={image}
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
                <form onSubmit={updateUserNameAndSurname}>
                    <TextInput
                        label="Name*"
                        value={firstName}
                        type={"text"}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextInput
                        label="Surname*"
                        value={lastName}
                        type={"text"}
                        onChange={(e) => setLastName(e.target.value)}
                    />

                    <CustomButton
                        buttonText={"Save Changes"}
                    />
                </form>
                <form onSubmit={updateUserEmail}>
                    <TextInput
                        label="Email*"
                        value={email}
                        type='email'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailVerified ? (
                        <span className="text-green-500 flex mb-0.5">Email verified</span>
                    ): ( 
                        <span className="text-red-500 flex mb-0.5">Email not verified</span>)}                    
                    <CustomButton
                        buttonText={"Save Changes"}
                    />
                </form>

                <form onSubmit={updateUserPassword}>
                    <TextInput
                        label="Old Password*"
                        value={oldPassword}
                        type='password'
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <TextInput
                        label="New Password*"
                        value={newPassword}
                        type='password'
                        onChange={(e) => setNewPassword(e.target.value)}
                    />             
                    <CustomButton
                        buttonText={"Save Changes"}
                    />
                </form>

                    {role == Role.PATIENT && (
                        <div>
                            <TextInput
                                label="Innsurance Number*"
                                value={insuranceId}
                                type={"text"}
                                onChange={(e) => setInsuranceId(e.target.value)}
                            />
                            <CustomButton
                                buttonText={"Save Changes"}
                                onClick={() => {
                                    //Change the insurance number
                                }}
                            />
                        </div>
                    )}


            </div>
        </div>
    );
};

export default UserSettings;
