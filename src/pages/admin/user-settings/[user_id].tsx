import { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField } from "@mui/material";
import { uploadImage } from "@/lib/cloudinary";
import { banUser, getUserInfoWithId, unbanUser, updateUserInfo } from "@/lib/manageUsers";
import { useRouter } from "next/router";
import PopupDialog from "@/components/PopupDialog";

const AdminUserSettings = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const { user_id } = router.query;

    const [confirmBanUserPopUpShown, setConfirmBanUserPopUpShown] = useState(false);
    const [confirmUnbanUserPopUpShown, setConfirmUnbanUserPopUpShown] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [emailVerified, setEmailVerified] = useState('');
    const [nationalId, setPesel] = useState('');
    const [image, setImage] = useState('');
    const [activeState, setActiveState] = useState(false);
    const [insuranceId, setInsuranceId] = useState(null);



    useEffect(() => {
        const fetchData = async () => {
            if (user_id) {
                const response = await getUserInfoWithId(user_id);
                const result = await response.json();
                console.log(result);
                setEmail(result.data.email);
                setEmailVerified(result.data.emailVerified);
                setFirstName(result.data.firstName);
                setLastName(result.data.lastName);
                setPesel(result.data.nationalId);
                setImage(result.data.image);
                setActiveState(result.data.isActive);
                setInsuranceId(result.data.patient?.insuranceId);
                setUser(result.data);
            }
        };

        fetchData();
    }, [user_id, image]);

    const handlePictureChange = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            uploadImage(file)
                .then(async url => {
                    console.log(url);
                    setImage(url);
                    const userData = {
                        image: url,
                    };
                    const res = updateUserInfo(userData, user_id)
                    if ((await res).ok) {
                        toast.success('Profile picture updated successfully');
                    }

                })
                .catch(error => {
                    console.error('Error uploading file:', error);
                    toast.error('Failed to update profile picture');
                });
        }
    };

    const updateUserNameAndSurname = async (e) => {
        e.preventDefault();
        const userData = {
            firstName,
            lastName
        }
        const res = updateUserInfo(userData, user_id)
        if ((await res).ok) {
            toast.success('Data updated successfully');
        }
        else {
            toast.error('Failed to update data');
        }
        console.log(userData)
    }

    //TODO: After email change resend verification
    //also there may be implications with google OA accounts
    const updateUserEmail = async (e) => {
        e.preventDefault();
        const userData = {
            email,
        }
        const res = updateUserInfo(userData, user_id)

        if ((await res).ok) {
            toast.success('Email updated successfully');
        }
        else {
            toast.error('Failed to update email');
        }
    }

    const updateUserPesel = async (e) => {
        e.preventDefault();
        const userData = {
            nationalId,
        }
        const res = updateUserInfo(userData, user_id)
        if ((await res).ok) {
            toast.success('Pesel updated successfully');
        }
        else {
            toast.error('Failed to update pesel');
        }
    }
    const updateUserInsurance = async (e) => {
        e.preventDefault();
        const userData = {
            insuranceId,
        }
        const res = updateUserInfo(userData, user_id)
        if ((await res).ok) {
            toast.success('Insurance data updated successfully');
        }
        else {
            toast.error('Failed to update insurance data');
        }
    }


    const handleBanClick = () => {
        setConfirmBanUserPopUpShown(true);
    }

    const handleUnbanClick = () => {
        setConfirmUnbanUserPopUpShown(true);
    }

    const handleBanUser = async () => {
        setConfirmBanUserPopUpShown(false);
        const response = await banUser(user_id.toString());
        if (response.success) {
            toast.success("User has been banned successfully.");
            setActiveState(false);

        } else {
            toast.error("Failed to ban user. Please try again.");
        }
    };

    const handleUnbanUser = async () => {
        setConfirmUnbanUserPopUpShown(false);
        const response = await unbanUser(user_id.toString());
        if (response.success) {
            toast.success("User has been unbanned successfully.");
            setActiveState(true);
        } else {
            toast.error("Failed to unban user. Please try again.");
        }
    };

    if (!user) {
        return <div>Loading user data...</div>;
    }

    return (
        <div>
            <PopupDialog
                open={confirmBanUserPopUpShown}
                onClose={() => setConfirmBanUserPopUpShown(false)}
                title="Are you sure!"
                message="Before that. Are you sure you want to ban this user?"
                onConfirm={handleBanUser}
            />
            <PopupDialog
                open={confirmUnbanUserPopUpShown}
                onClose={() => setConfirmUnbanUserPopUpShown(false)}
                title="Are you sure!"
                message="Before that. Are you sure you want to unban this user?"
                onConfirm={handleUnbanUser}
            />
            <div className="relative">
                <img src="https://picsum.photos/900" alt="Cover" className="w-full h-40 object-cover" />
                <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
            </div>
            {/* Profile picture with edit icon */}
            <div className="relative mx-auto -mt-16 w-32 h-32 rounded-full overflow-hidden border-4 border-white hover:cursor-pointer">
                <label htmlFor="profileImageInput" className="w-full h-full">
                    <img
                        src={image ? user.image : "https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg"}
                        alt={user.firstName + " " + user.lastName}
                        className="w-full h-full object-cover"
                    />
                    <input
                        id="profileImageInput"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePictureChange}
                    />
                </label>

            </div>
            <div className="flex justify-center">
                {activeState ? (
                    <span onClick={handleBanClick} className="cursor-pointer mr-2">
                        <CustomButton buttonText="Ban User" color="red" />
                    </span>
                ) : (
                    <span onClick={handleUnbanClick} className="cursor-pointer mr-2">
                        <CustomButton buttonText="Unban User" color="green" />
                    </span>
                )}
            </div>
            <div className="mx-auto max-w-screen-lg my-8 px-4">
                <form onSubmit={updateUserNameAndSurname}>
                    <div className="my-6">
                        <TextField
                            fullWidth
                            required
                            label="Name"
                            name="firstName"
                            value={firstName}
                            onChange={(v) => setFirstName(v.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <TextField
                            fullWidth
                            required
                            label="Surname"
                            name="lastName"
                            value={lastName}
                            onChange={(v) => setLastName(v.target.value)}
                        />
                    </div>

                    <CustomButton buttonText="Save Changes" />
                </form>
                <form onSubmit={updateUserEmail}>
                    <div className="my-10">
                        <TextField
                            fullWidth
                            required
                            label="Email"
                            name="email"
                            value={email}
                            type="email"
                            onChange={(v) => setEmail(v.target.value)}
                        />
                        {emailVerified ? (
                            <span className="text-green-500 flex my-2">Email verified</span>
                        ) : (
                            <span className="text-red-500 flex my-2">Email not verified</span>
                        )}
                        <CustomButton buttonText="Save Email" />
                    </div>

                </form>

                <form onSubmit={updateUserPesel}>
                    <div className="mt-10 mb-4">
                        <TextField
                            fullWidth
                            required
                            label="Pesel"
                            name="nationalId"
                            value={nationalId}
                            type="text"
                            onChange={(v) => setPesel(v.target.value)}
                        />
                    </div>
                    <CustomButton buttonText="Save Pesel" />
                </form>

                {insuranceId && (
                    <form onSubmit={updateUserInsurance}>

                        <div>
                            <div className="mt-10 mb-4">
                                <TextField
                                    fullWidth
                                    required
                                    label="Innsurance Number"
                                    value={insuranceId}
                                    type={"text"}
                                    onChange={(v) => setInsuranceId(v.target.value)}
                                />
                            </div>
                            <CustomButton
                                buttonText={"Save Insurance Data"}
                            />
                        </div>
                    </form>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default AdminUserSettings;
