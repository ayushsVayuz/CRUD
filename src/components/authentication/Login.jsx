import React from "react";
import axios from "axios";
import { useNavigate, Link} from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { handleEmailChange, handlePasswordChange } from "../../utils/util";


function Login({setUser}) {
    const navigate = useNavigate();
    const {control, handleSubmit} = useForm();

    // params: data (provided by user to Login ), Checks Api for user's email and password through post request and if found, redirects user to HomePage 
    const handleLogin = async (data) => {
        let formData = {
            email : data?.email,
            password : data?.password
        }

        try {
            const response = await axios.post(
                import.meta.env.VITE_API + `/auth/login`, 
                formData,
                {
                    headers: {
                        "Content-Type":"application/json   ",
                    }
                });
                console.log("res", response)
            if (response.data.success) {
                const expiresAt = Date.now() + 120 * 60 * 1000;
                localStorage.setItem("token", response.data.data.token);
                localStorage.setItem("expiresAt", expiresAt); 
                setUser(true);
                navigate("/home");
            }
        } catch (error) {
            alert("Login failed! Please check your credentials.");
        }
    };


    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit(handleLogin)} className="p-10 h-110 shadow-2xl ">
                <h1 className="pt-4 text-center font-medium text-blue-600 text-3xl h-17">Welcome Back</h1>

                <div className="flex flex-col text-lg w-80">
                <Controller 
                    name="email" 
                    control={control} 
                    rules={{ required: true }}
                    render={({ field }) => 
                    
                        <input 
                        {...field} 
                        maxLength={30}
                        type="text" 
                        className="p-3  border-2 border-white border-b-blue-500"
                        placeholder="Email"
                        onChange={(e) => {handleEmailChange({e,field})}}
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
                        className="p-3  border-2 border-white border-b-blue-500"
                        placeholder="Password"
                        onChange={(e) => {handlePasswordChange({e,field})}}
    
                        />
                    } />

               

                <button className=" mt-10 p-3 w-80 font-medium text-blue-600 text-lg hover:bg-blue-500 hover:text-white border-2 border-blue-500 rounded-xl" >Log in</button>
                    <div className="flex flex-col items-center">
                        <p className=" mt-6">Don't have account</p>
                        <Link to="/signup" className="pl-3 pr-3 pt-1 pb-1 font-medium text-center mt-2 text-blue-600 text-lg hover:bg-blue-500 hover:text-white border-2 border-blue-500 rounded-xl">Sign up</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;