import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const SearchUsers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(""); 

  // Handles input change and updates search params
  const handleChange = (e) => {
    let trimmedValue = e.target.value.trimStart().replace(/\s+/g, ' ');
    setSearchQuery(trimmedValue);

    if (trimmedValue.length > 0) {
      setSearchParams({ search: trimmedValue });
    } else {
      setSearchParams({});
    }
  };

  return (
    <form className="font-medium text-sky-800">
      <input 
        type="search" 
        className="w-40 text-center pl-2 border-2 border-white border-b-blue-700" 
        onChange={handleChange}  
        name="search" 
        placeholder="Type to search" 
        value={searchQuery} 
      />
    </form>
  );
};

export default SearchUsers;