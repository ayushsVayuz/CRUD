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
        className="w-40 pl-2 border-2 border-white border-b-blue-700" 
        onChange={handleChange}  
        name="search" 
        placeholder="Type to search" 
        value={searchQuery} 
      />
      <input 
        type="submit" 
        className={`bg-sky-800 hover:bg-sky-600 text-white ml-2 w-20 border-2 border-sky-800 rounded-3xl ${
          !searchQuery.trim() ? "opacity-50 cursor-not-allowed" : ""
        }`}
        value="Search"
        disabled={!searchQuery.trim()} 
      />
    </form>
  );
};

export default SearchUsers;