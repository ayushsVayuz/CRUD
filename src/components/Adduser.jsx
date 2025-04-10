import { useState, useEffect } from 'react';
import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function Adduser() {
  let navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async(data) => {
    console.log("check",data)
    
     let formData = new FormData()
     formData.append("name",data?.name)
     formData.append("email",data?.email)
     formData.append("phone",data?.phone)
     formData.append("location",data?.location)
     formData.append("about",data?.about)
     formData.append("image",data?.image[0])
 
     const response = await axios({
      method: 'post',
      url: 'https://crud-vip.vercel.app/api/users',
      data: formData, // Send FormData
      headers: {
        'Content-Type': 'multipart/form-data', // Ensure correct headers for file upload
      },
    }).catch(function (error) {
       console.log(error.response.data)
   })
 }
   
  //const posturl = 'https://crud-vip.vercel.app/api/users';

  return (
    <div className='flex justify-center h-screen'>
      <form onSubmit={handleSubmit(onSubmit)} className='p-10  h-130 mt-15 shadow-2xl'>
        <h1 className='pt-4 text-center text-blue-600 text-3xl h-17'>User Data</h1>
        <div className='grid grid-rows-3 '>
          <input {...register("name")}  type='text' className='p-3 w-80 text-lg' name='name'    placeholder='Name' maxLength='25' required />
          <input {...register("email")} type='email' className='p-3 w-80 text-lg' name='email'   placeholder='Email' maxLength='25' required />  
          <input {...register("phone")} type='tel' className='p-3 w-80 text-lg ' name='phone'  placeholder='phone Number' minLength='10' required />
          <input {...register("location")} type='text' className='p-3 w-80 text-lg ' name='location'  placeholder='Location'  maxLength='20' required/>
          <input {...register("about")}  type='text' className='p-3 w-80 text-lg ' name='about'    placeholder='About' maxLength='30' required/>
          <input
  {...register("image", { required: true })} // Enforce file upload validation
  type="file"
  className="p-3 w-80 text-lg text-gray-500"
  name="image"
/>
{errors.image && <p className="text-red-600">Image is required</p>}

        </div>
          <div className='grid grid-cols-2 mt-5'>
            <input type='reset' className='h-17 text-red-600 text-lg'/>
            <input type='submit' className='h-17 text-green-600 text-lg' onClick={() => {
              navigate(-1);
            }} name='submit'/>
          </div>
        
      </form>
      
    </div>
  )
}

export default Adduser;


  
   
 
  
  
//  const [data, setData] = useState({
  //   name : '',
  //   email: '',
  //   phone: '',
  //   location: '',
  //   about: '',
  //   file: ''
  //  });
  
    // const handleSubmit = async(event) => {
    //   event.preventDefault();
    //   console.log(data)
    //   try {
    //     const response = await axios.post('https://crud-vip.vercel.app/api/users', data);
    //     console.log("track",response.data);
    //   } catch(error){
    //     console.log(error);
    //   }

    // }

    // onChange={(e) => { setData({ ... data, name : e.target.value}) }}
    // onChange={(e) => { setData({ ... data, email : e.target.value}) }}
    // onChange={(e) => { setData({ ... data, phone : e.target.value}) }}
    // onChange={(e) => { setData({ ... data, location : e.target.value}) }}
    // onChange={(e) => { setData({ ... data, about : e.target.value}) }}
    // onChange={(e) => { setData({ ... data, image : e.target.value}) }} 
    // value={data.name}