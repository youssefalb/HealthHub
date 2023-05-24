import { useSession } from "next-auth/react";
import { useEffect, useCallback, useState } from "react";
import TextInput from '@/components/textInput';
import CustomButton from '@/components/CustomButton';
import { Role } from '@prisma/client';
import { getUserInfo, updateUserInfo } from "@/lib/userInfo";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const [pesel, setPesel] = useState('');


    const [hasInsurance, setHasInsurance] = useState(false);
    const [insuranceId, setInsuranceId] = useState('');

    const updateUserNameAndSurname = async (e) => {
        e.preventDefault();
        console.log("saveUserNameAndSurname");
        const userData = {
            firstName,
            lastName
        }
        const res = updateUserInfo(userData)
            if ((await res).ok){
            toast.success('Data updated successfully');
        }  
        else{
            toast.error('Failed to update data');
        }

    }

    const updateUserEmail = async (e) => {
        e.preventDefault();
        console.log("saveUserNameAndSurname");

        const userData = {
            email,
        }
        const res =  updateUserInfo(userData)

        if ((await res).ok){
            toast.success('Email updated successfully', { autoClose: 50000 });
        }  
        else{
            toast.error('Failed to update email');
        }
      }
    const updateUserPassword = async (e) => {
        e.preventDefault();
        console.log("saveUserNameAndSurname");
        const userData = {
            newPassword,
            oldPassword
        }
        const res =  updateUserInfo(userData)
        if ((await res).ok){
            toast.success('Password updated successfully', { autoClose: 50000 });
        }
        else{
            toast.error('Failed to update password');
        }
    }

    const updateUserPesel = async (e) => {
        e.preventDefault();
        console.log("saveUserNameAndSurname");
        const userData = {
            pesel,
        }

        const res = updateUserInfo(userData)
        if ((await res).ok){
            toast.success('Pesel updated successfully', { autoClose: 50000 });
        }
        else{
            toast.error('Failed to update pesel');
        }

    }

    const fetchData = async () => {
        const response = await getUserInfo()
        const result = await response.json()
        setFirstName(result.data?.firstName)
        setLastName(result.data?.lastName)
        setEmail(result.data?.email)
        setInsuranceId(result.data?.insuranceId)
        setEmailVerified(result.data?.emailVerified)
        setPesel(result.data?.nationalId)
        setHasInsurance(result.data?.insuranceId ? true : false)
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
                                console.log("response ok");
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
                        <span className="text-green-500 flex mb-2">Email verified</span>
                    ) : (
                        <span className="text-red-500 flex mb-2">Email not verified</span>)}
                    <CustomButton
                        buttonText={"Save Email"}
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
                        buttonText={"Save Password"}
                    />
                </form>

                <form onSubmit={updateUserPesel}>
                    <TextInput
                        label="Pesel*"
                        value={pesel}
                        type='text'
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <CustomButton
                        buttonText={"Save Pesel"}
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
                            buttonText={"Save Insurance Data"}
                            onClick={() => {
                                //Change the insurance number
                            }}
                        />
                    </div>
                )}


            </div>
            <ToastContainer />
        </div>
    );
};

export default UserSettings;
