import { useSession } from "next-auth/react";
import { useEffect, useCallback, useState } from "react";
import TextInput from '@/components/textInput';
import CustomButton from '@/components/CustomButton';
import { Role } from '@prisma/client';
import { getUserInfo, updateUserInfo, updateUserEmail } from "@/lib/userInfo";

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
        updateUserEmail(userData)

    }
    const fetchData = async () => {
        const response = await getUserInfo()
        const result = await response.json()
        setFirstName(result.data?.firstName)
        setLastName(result.data?.lastName)
        setEmail(result.data?.email)
        setInsuranceId(result.data?.insuranceId)
    }

    useEffect(() => {
        fetchData()
    }, [session])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(role);
    };

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
                        onClick={updateUserNameAndSurname}
                    />
                    <TextInput
                        label="Email*"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <CustomButton
                        buttonText={"Save Changes"}
                        onClick={updateUserEmail}
                    />

                    {role == Role.PATIENT && (
                        <div>
                            <TextInput
                                label="Innsurance Number*"
                                value={insuranceId}
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
