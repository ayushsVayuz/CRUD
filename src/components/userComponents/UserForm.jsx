import { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { handleNameChange, handleAboutChange, handleEmailChange, handleLocationChange, handlePhoneChange } from "../../utils/Utils";
import { FaArrowLeft } from "react-icons/fa";
import userStore from "../../store/Store";
import { toast } from "react-toastify";

const UserForm = ({ updating }) => {

    let navigate = useNavigate();
    const { id } = useParams();
    const { usersData, selectedUser, formLoader, getSpecificUserData, postUserData, updateUserData, formSuccess } = userStore();

    const {
        handleSubmit,
        control,
        setValue,
        getValues,
        watch,
        formState: { errors },
        reset,
    } = useForm({
        mode: "onChange",
        defaultValues: { name: "", email: "", phone: "", location: "", about: "" }
    });

    const [image, setImage] = useState()
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");


    const defaultValues = {
        name: "",
        email: "",
        phone: "",
        location: "",
        about: "",
    };


    function backToHome(e) {
        e.preventDefault();
        navigate("/home")

    }


    //Handle image change
    function handleImageChange(e) {

        let type = e.target.files[0]?.type
        type = String(type)
        console.log("Imagetype", type);
        if (type === "image/png" || type === "image/jpeg" || type === "image/gif" || type === "image/webp" || type === "image/apng") {
            setFileName(e.target.files[0]?.name)
            setFile(URL.createObjectURL(e.target.files[0]));
            setImage(e.target.files[0])

        } else {
            setFileName(null)
            setFile(null);
            setImage(" ")
        }
    }

    if (updating == true) {
        // Fetch specific user data by id
        useEffect(() => {
            (getSpecificUserData(id));
        }, [id])


        // Update form fields with existing user data when selectedUser updates.
        useEffect(() => {

            setValue("name", selectedUser?.name)
            setValue("email", selectedUser?.email)
            setValue("phone", selectedUser?.phone)
            setValue("location", selectedUser?.location)
            setValue("about", selectedUser?.about)
        }, [selectedUser])
    }




    const formData = watch();
    const isValid = Object.keys(errors).length === 0 && Object.values(formData).every(value => value?.trim() !== "");

    // Handles form submission to update user data in the API
    const onSubmit = async (data) => {

        let formData = new FormData();
        formData.append("name", data?.name);
        formData.append("email", data?.email);
        formData.append("phone", data?.phone);
        formData.append("location", data?.location);
        formData.append("about", data?.about);
        formData.append("image", image);

        try {
            console.log("updating", updating)
            if (updating !== true) {
                console.log("formSuccess form usefform", formSuccess);

                await postUserData(formData)
                if (formSuccess) {
                    navigate("/home");
                }

            } else {
                await updateUserData({ formData, id }).then(() => {
                    if (formSuccess) {
                        navigate("/home");
                    }
                })
            }

        } catch (error) {
            toast.error("Error: " + (error?.message || "Something went wrong"));
        }

    };


    return (

        <div className="min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="pl-6 pr-6 pb-6  h-190 mt-5 shadow-2xl bg-white rounded-lg w-full max-w-md mx-auto"
            >
                <div className="flex flex-col gap-2">
                    <div className="flex  items-center">
                        <button
                            onClick={(e) => backToHome(e)}
                            className=" h-15 text-blue-600  hover:text-sky-800 rounded-lg font-medium  transition duration-200"
                        >
                            <FaArrowLeft size={"25px"} />
                        </button>
                        <h1 className="pt-4 w-full text-center font-medium text-blue-600 text-3xl h-17">
                            {updating ? "Update User Details" : "User Data"}
                        </h1>
                    </div>
                    <label className="text-sm font-medium text-gray-700 -mb-1">
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <Controller
                        name="name"
                        control={control}
                        rules={{
                            required: "Full Name is required",
                            minLength: {
                                value: 2,
                                message: "Full Name must be at least 2 characters",
                            },
                        }}
                        render={({ field }) => (
                            <div className="relative">
                                <input
                                    {...field}
                                    type="text"
                                    autoFocus
                                    maxLength={44}
                                    inputMode="text"
                                    className={`p-3 w-full text-base border ${errors.name ? "border-red-500" : "border-blue-500"
                                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="Enter your full name"
                                    onChange={(e) => handleNameChange({ e, field })}
                                />

                                <p className="text-red-500 text-[13px] -mb-1 min-h-[20px]">{errors.name?.message}</p>

                            </div>
                        )}
                    />

                    <label className="text-sm font-medium text-gray-700 -mb-1">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: "Email is required",
                            minLength: {
                                value: 3,
                                message: "Email must be at least 3 characters",
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Invalid email format.",
                            },
                        }}
                        render={({ field }) => (
                            <div className="relative">
                                <input
                                    {...field}
                                    type="text"
                                    autoFocus
                                    maxLength={44}
                                    inputMode="email"
                                    className={`p-3 w-full text-base border ${errors.email ? "border-red-500" : "border-blue-500"
                                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="Enter your email"
                                    onChange={(e) => handleEmailChange({ e, field })}
                                />

                                <p className="text-red-500 text-[13px] -mb-1 min-h-[20px]">{errors.email?.message}</p>

                            </div>
                        )}
                    />


                    <label className="text-sm font-medium text-gray-700 -mb-1">
                        Phone Number <span className="text-red-500">*</span>
                    </label>
                    <Controller
                        name="phone"
                        control={control}
                        rules={{
                            required: "Phone Number is required",
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: "Phone Number must be exactly 10 digits",
                            },
                        }}
                        render={({ field }) => (
                            <div className="relative">
                                <input
                                    {...field}
                                    maxLength={10}
                                    type="tel"
                                    autoFocus
                                    inputMode="numeric"
                                    className={`p-3 w-full text-base border ${errors.phone ? "border-red-500" : "border-blue-500"
                                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="Enter your phone number"
                                    onChange={(e) => handlePhoneChange({ e, field })}
                                />

                                <p className="text-red-500 text-[13px] -mb-1 min-h-[20px]">{errors.phone?.message}</p>

                            </div>
                        )}
                    />

                    <label className="text-sm font-medium text-gray-700 -mb-1">
                        Location <span className="text-red-500">*</span>
                    </label>
                    <Controller
                        name="location"
                        control={control}
                        rules={{
                            required: "Location is required",
                            minLength: {
                                value: 3,
                                message: "Location must be at least 3 characters",
                            },
                        }}
                        render={({ field }) => (
                            <div className="relative">
                                <input
                                    {...field}
                                    type="text"
                                    autoFocus
                                    inputMode="text"
                                    maxLength={44}
                                    className={`p-3 w-full text-base border ${errors.location ? "border-red-500" : "border-blue-500"
                                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="Enter your location"
                                    onChange={(e) => handleLocationChange({ e, field })}
                                />

                                <p className="text-red-500 text-[13px] -mb-1 min-h-[20px]">{errors.location?.message}</p>

                            </div>
                        )}
                    />

                    <label className="text-sm font-medium text-gray-700 -mb-1">
                        About <span className="text-red-500">*</span>
                    </label>
                    <Controller
                        name="about"
                        control={control}
                        rules={{
                            required: "About section is required",
                            minLength: {
                                value: 15,
                                message: "Must be at least 15 characters",
                            },
                        }}
                        render={({ field }) => (
                            <div className="relative">
                                <textarea
                                    {...field}
                                    type="text"
                                    autoFocus
                                    inputMode="text"
                                    maxLength={100}
                                    className={`p-3 w-full text-base border ${errors.about ? "border-red-500" : "border-blue-500"
                                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="Tell us about yourself"
                                    onChange={(e) => handleAboutChange({ e, field })}
                                />

                                <p className="text-red-500 text-[13px] -mb-1 min-h-[20px]">{errors.about?.message}</p>

                            </div>
                        )}
                    />

                    <div className="flex gap-2 h-20 items-center ">
                        <label htmlFor="files" className="btn ml-2">Select Image(Optional)</label>
                        <input type="file" id='files' style={{ 'display': 'none' }} name="image" onChange={handleImageChange} accept="image/*" className="p-3 w-60 text-lg border-2 border-white  text-gray-500" />
                        {
                            fileName ? fileName : <p></p>
                        }
                        {file == null ?
                            <img src={file} className="invisible h-20 w-20 border-white" /> :
                            <div className="flex ml-5 flex-end gap-4">

                                <img src={file} className="h-20 w-20 border-white" />

                                <p className="font-semibold" onClick={(e) => {
                                    setFile(null);
                                    setImage(null);
                                    setFileName(" ")
                                }}>X</p>

                            </div>

                        }
                    </div>

                </div>

                <div className={updating ? ` ` : `grid grid-cols-2 mt-2 gap-5 items-center`}>
                    <input type="reset" onClick={() => reset(defaultValues)} className={updating ? `hidden ` : `h-12 border-2 border-red-700 text-red-700 rounded-2xl font-medium hover:bg-red-700 hover:text-white text-lg`} />
                    {
                        formLoader ? 
                            <div className="flex justify-center h-10 items-center">
                                <div className="border-4 border-solid text-center border-blue-700 border-e-transparent rounded-full animate-spin w-10 h-10"></div>
                            </div>
                        :
                            <button
                                disabled={!isValid}
                                className={` h-12  w-full font-medium text-lg rounded-xl ${!isValid ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} text-white`}
                            >
                                Submit
                            </button>
                    }
                </div>

            </form>
        </div>

    );
}

export default UserForm
