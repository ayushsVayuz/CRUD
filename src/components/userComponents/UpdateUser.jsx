import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { handleNameChange, handleAboutChange, handleEmailChange, handleLocationChange, handlePhoneChange } from "../../utils/Utils";
import { getSpecificUserData , updateUserData } from "../../actions/Action";
import { useDispatch, useSelector } from "react-redux";

const UpdateUser = () => {

  let navigate = useNavigate();

    const {id} = useParams();
    const {usersData, loading  } = useSelector((state) => state.user);  
    const dispatch = useDispatch();
    
    
    const {
      handleSubmit,
      control, 
      setValue,
      getValues,
      formState: { errors },
    } = useForm();
  
    const [image, setImage] = useState(null)
    
  

  // Fetch specific user data
  useEffect( () => {
    dispatch(getSpecificUserData(id));
  }, [dispatch, id])

  // params: userData(data of user with particular id), Update form inputs with existing user data.
 
  useEffect( () => {
    
    setValue("name",usersData?.name)
    setValue("email",usersData?.email)
    setValue("phone",usersData?.phone)
    setValue("location",usersData?.location)
    setValue("about",usersData?.about)
  }, [usersData])

    console.log("errors", errors);
  
    // params: data (Changed data of the user to modify record), Update the changes done by user in the Api through put request
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
    loading ?
    <div className="flex justify-center h-100 items-center">
      <div className="border-4 border-solid text-center border-blue-700 border-e-transparent rounded-full animate-spin w-10 h-10"></div>
    </div>
  : 
    <div className="flex justify-center h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="pl-10 pr-10 pt-5 pb-5 h-145 mt-6 shadow-2xl"
        >
          <div className="flex flex-col gap-2">
          <h1 className="pt-4 text-center font-medium text-blue-600 text-3xl h-17">
            Update User Details
          </h1>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) =>
                
                <input
                  maxLength={25}
                  {...field}
                  type="text"
                  className="p-3 w-80 text-lg border-2 border-white border-b-blue-500"
                  placeholder="Name"
                  onChange={(e) => handleNameChange({e,field})}
                />
              }
            />
  
  
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field }) =>
                
                <input
                  {...field}
                  maxLength={30}
                  type="text"
                  className="p-3 w-80 text-lg border-2 border-white border-b-blue-500"
                  placeholder="Email"
                  onChange={(e) => {handleEmailChange({e,field})}}
  
                />
              }
            />
  
            <Controller
              name="phone"
              control={control}
              rules={{ required: true }}
              render={({ field }) =>
  
                <input
                  {...field}
                  maxLength={10}
                  type="tel"
                  className="p-3 w-80 text-lg border-2 border-white border-b-blue-500"
                  placeholder="Phone Number"
                  onChange={(e) => {handlePhoneChange({e,field})}}
  
                />
              }
            />
  
            <Controller
              name="location"
              control={control}
              rules={{ required: true }}
              render={({ field }) =>
               
                <input
                  {...field}
                  maxLength={20}
                  type="text"
                  className="p-3 w-80 text-lg border-2 border-white border-b-blue-500"
                  placeholder="Location"
                  onChange={(e) => {handleLocationChange({e,field})}}
                />
              }
            />
  
            <Controller
              name="about"
              control={control}
              rules={{ required: true }}
              render={({ field }) =>
                
                <textarea
                  {...field}
                  maxLength={60}
                  type="text"
                  className="p-3 w-80 text-lg border-2 border-white border-b-blue-500"
                  placeholder="About"
                  onChange={(e) => {handleAboutChange({e,field})}}>
                </textarea>
              }
            />
  
            <input type="file" name="image"  className="p-3 w-80 text-lg border-2 border-white  text-gray-500"  onChange={(e)=> setImage(e.target.files[0])} />
          </div>
  
          <div className="grid grid-cols-2 mt-2 gap-5">
            <input type="reset" className="h-12 border-2 border-red-700 text-red-700 rounded-2xl font-medium hover:bg-red-700 hover:text-white text-lg" />
            <input type="submit" className="h-12 border-2 border-green-700 text-green-700 rounded-2xl font-medium hover:bg-green-700 hover:text-white text-lg" name="submit" />
          </div>
        
        </form>
      </div>
  )
}

export default UpdateUser
