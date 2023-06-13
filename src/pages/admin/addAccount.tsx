import React, { useState } from "react";
import { Role } from "@prisma/client";
import { Specializations } from "@prisma/client";
import CustomButton from "@/components/CustomButton";
import { addNewUser } from "@/lib/manageUsers";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Checkbox,
    FormControlLabel
} from "@mui/material";

const AddAccount = () => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [pesel, setPesel] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedSpecialization, setSelectedSpecialization] = useState("");
    const [hasInsurance, setHasInsurance] = useState(false);
    const [insurance, setInsurance] = useState(null);

    const roles = Object.values(Role);
    const specializations = Object.values(Specializations);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            email,
            firstName,
            lastName,
            nationalId: pesel,
            role: selectedRole,
            speciality: selectedSpecialization,
            insuranceId: insurance,
        };
        const res = addNewUser(userData)
        if ((await res).ok) {
            toast.success("Account added successfully")
        }
        else {
            toast.error("Could not add account, something went wrong")
        }
    };

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
        setSelectedSpecialization("");
    };

    const handleSpecializationChange = (event) => {
        setSelectedSpecialization(event.target.value);
    };

    const handleInsuranceChange = (event) => {
        setInsurance(event.target.value);
    };

    const handleCheckboxChange = (event) => {
        setHasInsurance(event.target.checked);
    };

    return (
        <div className="mx-auto max-w-screen-lg my-8 px-4">
            <h1 className="text-3xl font-bold mb-6">Add an account</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <FormControl fullWidth>
                    <InputLabel>Role</InputLabel>
                    <Select
                        value={selectedRole}
                        onChange={handleRoleChange}
                        variant="outlined"
                        label="Role"
                        required
                    >
                        {roles.map((role) => (
                            <MenuItem key={role} value={role}>
                                {role}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {selectedRole === Role.DOCTOR && (
                    <FormControl fullWidth>
                        <InputLabel>Specialization</InputLabel>
                        <Select
                            value={selectedSpecialization}
                            onChange={handleSpecializationChange}
                            variant="outlined"
                            required
                        >
                            {specializations.map((specialization) => (
                                <MenuItem key={specialization} value={specialization}>
                                    {specialization}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
                <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <TextField
                    label="First Name"
                    variant="outlined"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <TextField
                    label="Last Name"
                    variant="outlined"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <TextField
                    label="PESEL"
                    variant="outlined"
                    value={pesel}
                    onChange={(e) => setPesel(e.target.value)}
                    required
                />

                {selectedRole == Role.PATIENT && (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={hasInsurance}
                                onChange={handleCheckboxChange}
                                name="hasInsurance"
                                color="primary"
                            />
                        }
                        label="Insurance"
                    />
                )}

                {hasInsurance && selectedRole == Role.PATIENT && (
                    <TextField
                        label="Insurance"
                        variant="outlined"
                        value={insurance}
                        onChange={handleInsuranceChange}
                        required
                    />
                )}
                <CustomButton buttonText={"Add account"} width="full" />
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddAccount;
