import React , { useState } from "react"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { handleNameChange, handleEmailChange, handlePhoneChange, handlePasswordChange } from "../../utils/util";

function Signup() {
    const navigate = useNavigate();
    const {control, handleSubmit } = useForm();
    const [isAuthenticated, setAuthenticated] = useState(false);
    
    // params: data (provided by user to Signup ), Updates Api with user's Signup data then redirects user to HomePage using post request
    const handleSignup = async (data) => {
        
        let formData = {
            fullName : data?.fullName,
            email : data?.email,
            phoneNumber : data?.phoneNumber,
            password : data?.password
        }
        

        try {
            const response = await axios.post(
                import.meta.env.VITE_AUTH +`/auth/signup`, 
                formData, 
                {
                    headers: { "Content-Type": " application/json" }
                });

                if (response.data.success) {
                    const expiresAt = Date.now() + 60 * 60 * 1000; 
                    localStorage.setItem("token", response.data.data.token);
                    localStorage.setItem("expiresAt", expiresAt);
        
                    setAuthenticated(true);
                    navigate("/home");
                }
        
        } catch (error) {
            console.log(error.response?.data);
            alert("Signup failed! Please try again.",);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit(handleSignup)} className="p-10 h-120 shadow-2xl " >
            <h1 className="pt-4 text-center font-medium text-blue-600 text-3xl h-17">Create Account</h1>

                <div className="flex flex-col w-80 text-lg ">
                <Controller 
                    name="fullName" 
                    control={control} 
                    rules={{ required: true }}
                    render={({ field }) =>

                        <input 
                        {...field} 
                        maxLength={25}
                        type="text" 
                        className="p-3 border-2 border-white border-b-blue-500"
                        placeholder="Full Name" 
                        onChange={(e) => {handleNameChange({e,field})}}                                          
                        />
                    } />

                <Controller 
                    name="email" 
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => 
                    
                        <input 
                        {...field} 
                        maxLength={30}
                        type="text" 
                        className="p-3 border-2 border-white border-b-blue-500"
                        placeholder="Email" 
                        onChange={(e) => {handleEmailChange({e,field})}}
                        />
                    } />

                <Controller 
                    name="phoneNumber" 
                    control={control} 
                    rules={{ required: true }}
                    render={({ field }) => 
                    
                        <input 
                        {...field} 
                        maxLength={10}
                        type="tel" 
                        className="p-3 border-2 border-white border-b-blue-500"
                        placeholder="Phone Number"
                        onChange={(e) => {handlePhoneChange({e,field})}} 
                        />
                    } />

                <Controller 
                    name="password" 
                    control={control} 
                    rules={{ required: true }}
                    render={({ field }) => 
                    
                        <input 
                        {...field} 
                        minLength={8}
                        maxLength={10}
                        type="password" 
                        className="p-3 border-2 border-white border-b-blue-500"
                        placeholder="Password" 
                        onChange={(e) => {handlePasswordChange({e,field})}}
                        />
                    } />

                <button className=" mt-10 p-3 font-medium text-blue-600 hover:bg-blue-500 hover:text-white border-2 border-blue-500 rounded-xl" >Sign up</button>
                </div>
            </form>
        </div>
    );
}

export default Signup;