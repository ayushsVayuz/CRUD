import React from 'react'
import { useSearchParams } from "react-router-dom";

const SearchUsers = () => {
  
  const [searchParams, setSearchParams] = useSearchParams();

  // params: event(user action), returns searchParams which contains searched value to get desired result.
  const handleChange = (e) => {
    e.target.value = e.target.value.trimStart();
    e.target.value = e.target.value.replace(/\s+/g, ' ');
    setSearchParams({search:e.target.value})
  }

  return (
    <form  className="font-medium text-sky-800">
      
      <input type='search' className='w-40 pl-2 border-2 border-white border-b-blue-700' onChange={handleChange}  name='search' placeholder='Type to search' />
      <input type="submit" className="ml-2 w-20 border-2 border-sky-800 rounded-3xl" value="Search" />
        
    </form>
  )
}

export default SearchUsers
