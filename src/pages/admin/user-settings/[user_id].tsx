import { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField } from "@mui/material";
import { uploadImage } from "@/lib/cloudinary";
import { getUserInfoWithId, updateUserInfo } from "@/lib/manageUsers";
import { useRouter } from "next/router";



const AdminUserSettings = () => {
    const [user, setUser] = useState(null);
    const router = useRouter();
    const { user_id } = router.query


    useEffect(() => {
        const fetchData = async () => {
            const response = await getUserInfoWithId(user_id);
            const result = await response.json();
            setUser(result.data);
        };

        fetchData();
    }, [user]);

    const handlePictureChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const imageUrl = await uploadImage(file);
                const updatedUser = { ...user, image: imageUrl };
                await updateUserInfo(updatedUser, user_id);
                setUser(updatedUser);
                toast.success("Profile picture updated successfully");
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUserInfo(user_id, user);
            toast.success("User data updated successfully");
        } catch (error) {
            toast.error("Failed to update user data");
        }
    };

    const handleInputChange = (e) => {
        setUser((prevUser) => ({
            ...prevUser,
            [e.target.name]: e.target.value,
        }));
    };

    if (!user) {
        return <div>Loading user data...</div>;
    }

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
                    <img
                        src={user.image ? user.image : "https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg"}
                        alt={user?.name}
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
            <div className="mx-auto max-w-screen-lg my-8 px-4">
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                        <TextField
                            fullWidth
                            required
                            label="Name"
                            value={user.firstName}
                            type={"text"}
                        // onChange={(v) => setFirstName(v.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <TextField
                            fullWidth
                            required
                            label="Surname"
                            value={user.lastName}
                            type={"text"}
                        // onChange={(v) => setLastName(v.target.value)}
                        />
                    </div>

                    <CustomButton
                        buttonText={"Save Changes"}
                    />
                </form>
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                        <TextField
                            fullWidth
                            required
                            label="Email"
                            value={user.email}
                            type='email'
                        // onChange={(v) => setEmail(v.target.value)}
                        />
                    </div>
                    {user.emailVerified ? (
                        <span className="text-green-500 flex mb-2">Email verified</span>
                    ) : (
                        <span className="text-red-500 flex mb-2">Email not verified</span>)}
                    <CustomButton
                        buttonText={"Save Email"}
                    />
                </form>

                <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                        <TextField
                            fullWidth
                            required
                            label="Old Password"
                            // value={oldPassword}
                            type='password'
                        // onChange={(v) => setOldPassword(v.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <TextField
                            fullWidth
                            required
                            label="New Password"
                            // value={newPassword}
                            type='password'
                        // onChange={(v) => setNewPassword(v.target.value)}
                        />
                    </div>
                    <CustomButton
                        buttonText={"Save Password"}
                    />
                </form>

                <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                        <TextField
                            fullWidth
                            required
                            label="Pesel"
                            value={user.nationalId}
                            type='text'
                        // onChange={(v) => setPesel(v.target.value)}
                        />
                    </div>
                    <CustomButton
                        buttonText={"Save Pesel"}
                    />
                </form>

            </div>
            <ToastContainer />
        </div>
    );
};

export default AdminUserSettings;
