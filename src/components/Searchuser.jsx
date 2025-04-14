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
    <form >
      <input type='search' className='w-40' onChange={handleChange}  name='search' placeholder='Type to search' />
      
      <input type="submit" className="ml-2" value="Search" />
        
    </form>
  )
}

export default Searchuser
