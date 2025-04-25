import { useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { handleNameChange, handleAboutChange, handleEmailChange, handleLocationChange, handlePhoneChange } from "../../utils/Utils";
 

function CreateUser() {

  let navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [image, setImage] = useState(null)


  console.log("errors", errors);

  // params: data (provided by user to create new user record) , Updates Api with new user's data using post request
  const onSubmit = async (data) => {

    let formData = new FormData();
    formData.append("name", data?.name);
    formData.append("email", data?.email);
    formData.append("phone", data?.phone);
    formData.append("location", data?.location);
    formData.append("about", data?.about);
    formData.append("image", image);

    
    const response = await axios.post(
      import.meta.env.VITE_API+`/users`,
      formData, 
      {
        headers: {
        "Content-Type": "multipart/form-data",
        }
      },
    ).catch(function (error) {
      console.log(error.response.data);
    });
    navigate(-1);

  };



  return (
    <div className="flex justify-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="pl-10 pr-10 pt-5 pb-5 h-145 mt-6 shadow-2xl"
      >
        <div className="flex flex-col gap-2">
        <h1 className="pt-4 text-center font-medium text-blue-600 text-3xl h-17">
          User Data
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
  );
}

export default CreateUser;
