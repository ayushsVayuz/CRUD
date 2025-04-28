import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { handleNameChange, handleEmailChange, handlePhoneChange, handlePasswordChange } from "../../utils/Utils";
import { registerUser, authenticateUser } from "../../actions/Action";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.user);
    const [showPassword, setShowPassword] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onChange" });

    // Handle user signup and automatic login when successfully registered
    const handleSignup = async (data) => {
        let formData = {
            fullName: data?.fullName,
            email: data?.email,
            phoneNumber: data?.phoneNumber,
            password: data?.password,
        };

        try {
            const result = await dispatch(registerUser(formData)).unwrap();
            if (result?.success) {

                const loginResult = await dispatch(authenticateUser({
                    email: formData.email,
                    password: formData.password,
                })).unwrap();

                if (loginResult?.data?.token) {
                    localStorage.setItem("token", loginResult.data.token);
                    navigate("/home");
                } else {
                    toast.error("Login failed. Please log in manually.");
                    navigate("/login");
                }
        }
        } catch (error) {
            toast.error("Error: " + (error?.message || "Something went wrong"));
        }
    };

    return ( 
        
        loading ? (
            <div className="flex justify-center h-screen items-center">
                <div className="border-4 border-solid text-center border-blue-700 border-e-transparent rounded-full animate-spin w-10 h-10"></div>
            </div>
        ) : (
            <>
            <Helmet>
                <title>SignUp | CRUD</title>
            </Helmet>
            <div className="min-h-screen flex items-center justify-center">
                <form onSubmit={handleSubmit(handleSignup)} className="pl-6 pr-6 pt-1 pb-5 shadow-2xl bg-white rounded-lg w-full max-w-md mx-auto">
                    <h1 className="text-center text-blue-600 text-3xl font-medium">Create Account</h1>

                    <div className="flex flex-col space-y-4 mt-6">
                        
                    <label className="text-sm font-medium text-gray-700 mb-1" >
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <Controller
                        name="fullName"
                        control={control}
                        rules={{
                            required: "Full Name is required",
                            minLength: {
                                value: 3,
                                message: "Full Name must be at least 3 characters",
                            },
                        }}
                        render={({ field }) => (
                            <div className="relative">
                                <input
                                    {...field}
                                    type="text"
                                    autoFocus
                                    inputMode="text"
                                    className={`p-3 w-full text-base border ${
                                        errors.fullName ? "border-red-500" : "border-blue-500"
                                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="Enter your full name"
                                    onChange={(e) => handleNameChange({ e, field })}
                                />

                                {errors.fullName && (
                                    <span className="absolute right-3 top-3 text-red-500 text-lg group">
                                        ⚠️
                                        <span className="absolute bottom-0 left-0 bg-red-500 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition">
                                            {errors.fullName?.message}
                                        </span>
                                    </span>
                                )}
                            </div>
                        )}
                    />
                        
                        <label className="text-sm font-medium text-gray-700 mb-1">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid email format. Must start with at least 3 characters",
                                },
                            }}
                            render={({ field }) => (
                                <div className="relative">
                                    <input
                                        {...field}
                                        type="text"
                                        autoFocus
                                        inputMode="email"
                                        className={`p-3 w-full text-base border ${
                                            errors.email ? "border-red-500" : "border-blue-500"
                                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        placeholder="Enter your email"
                                        onChange={(e) => handleEmailChange({ e, field })}
                                    />

                                    {errors.email && (
                                        <span className="absolute right-3 top-3 text-red-500 text-lg group">
                                            ⚠️
                                            <span className="absolute bottom-0 left-0 bg-red-500 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition">
                                                {errors.email?.message}
                                            </span>
                                        </span>
                                    )}
                                </div>
                            )}
                        />

                        
                    <label className="text-sm font-medium text-gray-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                    </label>
                    <Controller
                        name="phoneNumber"
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
                                    className={`p-3 w-full text-base border ${
                                        errors.phoneNumber ? "border-red-500" : "border-blue-500"
                                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="Enter your phone number"
                                    onChange={(e) => handlePhoneChange({ e, field })}
                                />

                                {errors.phoneNumber && (
                                    <span className="absolute right-3 top-3 text-red-500 text-lg group">
                                        ⚠️
                                        <span className="absolute bottom-0 left-0 bg-red-500 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition">
                                            {errors.phoneNumber?.message}
                                        </span>
                                    </span>
                                )}
                            </div>
                        )}
                    />
                    
                    <label className="text-sm font-medium text-gray-700 mb-1">
                             Password <span className="text-red-500">*</span>
                         </label>
                         <Controller
                             name="password"
                             control={control}
                             rules={{
                                 required: "Password is required",
                                 minLength: {
                                     value: 8,
                                     message: "Password must be at least 8 characters",
                                 },
                             }}
                             render={({ field }) => (
                                 <div className="relative">
                                     <input
                                         {...field}
                                         type={showPassword ? "text" : "password"}
                                         autoFocus
                                         inputMode="text"
                                         className={`p-3 w-full text-base border ${
                                             errors.password ? "border-red-500" : "border-blue-500"
                                         } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                         placeholder="Enter your password"
                                         onChange={(e) => handlePasswordChange({ e, field })}
                                     />
 
                                  
                                     <span
                                         className="absolute right-10 top-4 cursor-pointer text-gray-600"
                                         onClick={() => setShowPassword((prev) => !prev)}
                                     >
                                         {showPassword ? <FaEyeSlash /> : <FaEye />}
                                     </span>
 
                                     {errors.password && (
                                         <span className="absolute right-3 top-3 text-red-500 text-lg group">
                                             ⚠️
                                             <span className="absolute bottom-0 left-0 bg-red-500 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition">
                                                 {errors.password?.message}
                                             </span>
                                         </span>
                                     )}
                                 </div>
                             )}
                         />                   
                        

                      
                        <button
                            disabled={Object.keys(errors).length > 0}
                            className={`mt-6 p-3 w-full font-medium text-lg rounded-xl transition duration-200 ease-in-out ${
                                Object.keys(errors).length > 0 
                                ? "bg-gray-400 cursor-not-allowed text-white" 
                                : "bg-blue-500 hover:bg-blue-600 text-white"
                            }`}
                            >
                            Sign Up
                        </button>
                   
                        <div className="flex flex-col items-center">
                            <p>Already have an account?</p>
                            <Link to="/login" className="mt-2 px-4 py-2 font-medium text-blue-600 text-lg border-2 border-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition">
                                Log In
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
            </>
        )
       
    );
}

export default Signup;