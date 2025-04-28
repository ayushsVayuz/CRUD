import { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { handleNameChange, handleAboutChange, handleEmailChange, handleLocationChange, handlePhoneChange } from "../../utils/Utils";
import { getSpecificUserData , updateUserData } from "../../actions/Action";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import { Helmet } from 'react-helmet-async';

const UpdateUser = () => {

  let navigate = useNavigate();

    const {id} = useParams();
    const {usersData, selectedUser, loading  } = useSelector((state) => state.user);  
    const dispatch = useDispatch();
    
    
    const {
      handleSubmit,
      control, 
      setValue,
      getValues,
      formState: { errors },
    } = useForm({ mode: "onChange" });
  
    const [image, setImage] = useState(null)

    
  

  // Fetch specific user data by id
  useEffect( () => {
    dispatch(getSpecificUserData(id));
  }, [dispatch, id])


    // Update form fields with existing user data when selectedUser updates.
    useEffect( () => {
    
    setValue("name",selectedUser?.name)
    setValue("email",selectedUser?.email)
    setValue("phone",selectedUser?.phone)
    setValue("location",selectedUser?.location)
    setValue("about",selectedUser?.about)
  }, [selectedUser])

    console.log("errors", errors);
  

  // Handles form submission to update user data in the API
    const onSubmit = async (data) => {
  
      let formData = new FormData();
      formData.append("name", data?.name);
      formData.append("email", data?.email);
      formData.append("phone", data?.phone);
      formData.append("location", data?.location);
      formData.append("about", data?.about);
      formData.append("image", image);


       dispatch(updateUserData({formData, id}));
      navigate(-1);
      
    };


  return (
     loading ? (
     <div className="flex justify-center h-100 items-center">
       <div className="border-4 border-solid text-center border-blue-700 border-e-transparent rounded-full animate-spin w-10 h-10"></div>
     </div>
     ) : 
     <>
        <Helmet>
            <title>Update User | CRUD</title>
        </Helmet>
     <div className="min-h-screen flex items-center justify-center">
       <form
         onSubmit={handleSubmit(onSubmit)}
         className="pl-6 pr-6 pb-6  h-170 mt-5 shadow-2xl bg-white rounded-lg w-full max-w-md mx-auto"
       >
         <div className="flex flex-col gap-2">
         <div className="flex  items-center">
            <button  className="h-15 text-blue-600  hover:text-sky-800 rounded-lg font-medium  transition duration-200" 
                    onClick={ (e) => {
                        e.preventDefault(); 
                        navigate("/home");
                    } 
                    }>
                <FaArrowLeft size={"25px"} />
            </button>
            <h1 className="pt-4 w-full text-center font-medium text-blue-600 text-3xl h-17">
            Update User Details
            </h1>
        </div>
             <label className="text-sm font-medium text-gray-700 mb-1">
                 Full Name <span className="text-red-500">*</span>
             </label>
             <Controller
                 name="name"
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
                                 errors.name ? "border-red-500" : "border-blue-500"
                             } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                             placeholder="Enter your full name"
                             onChange={(e) => handleNameChange({ e, field })}
                         />
 
                         {errors.name && (
                             <span className="absolute right-3 top-3 text-red-500 text-lg group">
                                 ⚠️
                                 <span className="absolute bottom-0 left-0 bg-red-500 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition">
                                     {errors.name?.message}
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
                             className={`p-3 w-full text-base border ${
                                 errors.phone ? "border-red-500" : "border-blue-500"
                             } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                             placeholder="Enter your phone number"
                             onChange={(e) => handlePhoneChange({ e, field })}
                         />
 
                         {errors.phone && (
                             <span className="absolute right-3 top-3 text-red-500 text-lg group">
                                 ⚠️
                                 <span className="absolute bottom-0 left-0 bg-red-500 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition">
                                     {errors.phone?.message}
                                 </span>
                             </span>
                         )}
                     </div>
                 )}
             />
 
             <label className="text-sm font-medium text-gray-700 mb-1">
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
                             maxLength={20}
                             className={`p-3 w-full text-base border ${
                                 errors.location ? "border-red-500" : "border-blue-500"
                             } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                             placeholder="Enter your location"
                             onChange={(e) => handleLocationChange({ e, field })}
                         />
 
                         {errors.location && (
                             <span className="absolute right-3 top-3 text-red-500 text-lg group">
                                 ⚠️
                                 <span className="absolute bottom-0 left-0 bg-red-500 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition">
                                     {errors.location?.message}
                                 </span>
                             </span>
                         )}
                     </div>
                 )}
             />
 
             <label className="text-sm font-medium text-gray-700">
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
                             maxLength={80}
                             className={`p-3 w-full text-base border ${
                                 errors.about ? "border-red-500" : "border-blue-500"
                             } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                             placeholder="Tell us about yourself"
                             onChange={(e) => handleAboutChange({ e, field })}
                         />
 
                         {errors.about && (
                             <span className="absolute right-3 top-3 text-red-500 text-lg group">
                                 ⚠️
                                 <span className="absolute bottom-0 left-0 bg-red-500 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition">
                                     {errors.about?.message}
                                 </span>
                             </span>
                         )}
                     </div>
                 )}
             />
 
           <input type="file" name="image"  className="p-3 w-80 text-lg border-2 border-white  text-gray-500"  onChange={(e)=> setImage(e.target.files[0])} />
         </div>
         
         
         <input 
                type="submit"
                disabled={Object.keys(errors).length > 0} 
                className={`h-12 w-full border-2 border-green-700 text-green-700 rounded-2xl font-medium text-lg transition duration-200 ease-in-out ${
                    Object.keys(errors).length > 0 
                    ? "bg-gray-400 cursor-not-allowed text-white" 
                    : "hover:bg-green-700 hover:text-white"
                }`} 
                name="submit" 
            />         
       
       </form>
     </div>
     </>
   );
}

export default UpdateUser
