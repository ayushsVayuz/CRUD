import { useState, useEffect } from "react"
import React from 'react'
import axios from "axios";
import { useSearchParams } from "react-router-dom";


const Searchuser = () => {
  
    const [searchparams, setSearchParams] = useSearchParams();
    const [users, setUsers] = useState([]);


  const handleChange = (e) => {
    setSearchParams({search:e.target.value})
  }

  return (
    <form  className="font-medium text-sky-800">
      <input type='search' className='w-40 text-center pl-2 border-2 border-white border-b-blue-700' onChange={handleChange}  name='search' placeholder='Type to search' />
      
      <input type="submit" className="ml-2 w-20 border-2 border-sky-800 rounded-3xl" value="Search" />
        
    </form>
  )
}

export default Searchuser
