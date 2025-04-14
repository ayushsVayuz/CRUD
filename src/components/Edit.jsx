import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const Edit = () => {
  let navigate = useNavigate();

    const {id} = useParams();
    console.log("checking id of user for edit", id);
    
    const {
      register,
      handleSubmit,
      control,
      formState: { errors },
    } = useForm();
  
    // for getiing image directly not path
    const [image, setImage]=useState(null)
  
  
    console.log("errors", errors);
  
    const onSubmit = async (data) => {
      console.log("onEditSubmit", data);
  
      let formData = new FormData();
      formData.append("name", data?.name);
      formData.append("email", data?.email);
      formData.append("phone", data?.phone);
      formData.append("location", data?.location);
      formData.append("about", data?.about);
      formData.append("image", image);


      const response = await axios.put(
        `https://crud-vip.vercel.app/api/users/${id}`,
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
      console.log("response from edit ", response)
    };
  

  const handleNameChange = ({e,field}) => {
    // console.log("onChange", e.target.value);

    if (!isNaN(e.target.value.trim())) e.target.value = ""

    if (/^[a-zA-Z ]*$/.test(e.target.value)) {
      e.target.value = e.target.value.trimStart();
      e.target.value = e.target.value.replace(/\s+/g, ' ');

      field.onChange(e);
    }
  }

  const handleEmailChange = ({e,field}) => {
    
      e.target.value = e.target.value.trim();

      if (/[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/.test(e.target.value)) {
        field.onChange(e);
      } else if (!/[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/.test(e.target.value) && e.target.value !== " ") {
        field.onChange()
      }
  }
  
  const handlePhoneChange = ({e,field}) => {
    // console.log("onChange", e.target.value);

      if (isNaN(e.target.value.trim())) e.target.value = ""

      if (/^[0-9]*$/.test(e.target.value)) {
        e.target.value = e.target.value.trim();

        field.onChange(e);
  }
}

  const handleLocationChange = ({e,field}) => {
  
      // console.log("onChange", e.target.value);

      if (!isNaN(e.target.value.trim())) e.target.value = ""

      if (/^[a-zA-Z ]*$/.test(e.target.value)) {
        e.target.value = e.target.value.trimStart();
        e.target.value = e.target.value.replace(/\s+/g, ' ');
        field.onChange(e);
      
      }
      
    }
  

  const handleAboutChange = ({e,field}) => {
    
    // console.log("onChange", e.target.value);

    if (!isNaN(e.target.value.trim())) e.target.value = ""

    if (/^[a-zA-Z ]*$/.test(e.target.value)) {
      e.target.value = e.target.value.trimStart();
      e.target.value = e.target.value.replace(/\s+/g, ' ');
      field.onChange(e);
    }
  }

  const handleImageChange = ({e,field}) => {
    // console.log("showing image",e.target.file)
    setImage(e.target.files[0])  
    //  field.onChange(e);
  }
  // console.log("image on edit component",image);

  return (
    <div className="flex justify-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-10  h-140 mt-10 shadow-2xl"
      >
        <h1 className="pt-4 text-center text-blue-600 text-3xl h-17">
          Edit User Data
        </h1>
        <div className="grid grid-rows-3 ">
          <Controller
            name="name"
            control={control}
            render={({ field }) =>
              <input

                maxLength={25}
                {...field}
                type="text"
                className="p-3 w-80 text-lg"
                name="name"
                placeholder="Name"
                onChange={(e) => handleNameChange({e,field})}
              />}
          />


          <Controller
            name="email"
            control={control}
            
            render={({ field }) =>
              <input

                {...field}
                maxLength={30}
                type="text"
                className="p-3 w-80 text-lg"
                name="email"
                placeholder="Email"


                onChange={(e) => {handleEmailChange({e,field})}}

              />
            }
          />

          <Controller
            name="phone"
            control={control}
           
            render={({ field }) =>

              <input
                {...field}
                minLength={10}

                type="tel"
                className="p-3 w-80 text-lg "
                name="phone"
                placeholder="Phone Number"
                onChange={(e) => {handlePhoneChange({e,field})}}

              />
            }
          />

          <Controller
            name="location"
            control={control}
          
            render={({ field }) =>
              <input
                {...field}
                maxLength={20}

                type="text"
                className="p-3 w-80 text-lg "
                name="location"
                placeholder="Location"

                onChange={(e) => {handleLocationChange({e,field})}}
              />
            }
          />

          <Controller
            name="about"
            control={control}
          
            render={({ field }) =>
              <textarea

                {...field}
                maxLength={60}

                type="text"
                className="p-3 w-80 text-lg "
                name="about"
                placeholder="About"

                onChange={(e) => {handleAboutChange({e,field})}}>

              </textarea>
            }
          />

          {/* F.L */}
          {/* <Controller
            name="image"
            control={control}
            // rules={{required: true}}
            render={({ field }) =>
              <input
                {...field}
                type="file"
                className="p-3 w-80 text-lg text-gray-500"
                name="image"

                onChange={(e) => {handleImageChange({e,field})}}
                
              />
            }
          /> */}

        <input type="file" name="image"  className="p-3 w-80 text-lg text-gray-500"  onChange={(e)=> setImage(e.target.files[0])} />


        </div>
        <div className="grid grid-cols-2 mt-5">
          <input type="reset" className="h-17 text-red-600 text-lg" />
          <input
            type="submit"
            className="h-17 text-green-600 text-lg"
            name="submit"
          />
        </div>
      </form>
    </div>
  )
}

export default Edit
