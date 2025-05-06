import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const SearchUsers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();



  /**
  * @param {Event} event - Form submission event.
  */

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchQuery.length > 0) {
      setSearchParams({ search: searchQuery });
    } else {
      setSearchParams({});
    }
  }

  /**
   * @param {Event} e - Input event containing search query.
   */
  const handleSearchChange = (e) => {
    let trimmedValue = e.target.value.trimStart().replace(/\s+/g, ' ');
    console.log("trimmedValue", trimmedValue);
    
    setSearchQuery(trimmedValue)

    if (trimmedValue === "" || trimmedValue === null ) {
      navigate(-1);
      setSearchParams({});
    }

  };

  return (
    <form className="font-medium text-sky-600" onSubmit={handleSubmit}>
      <input
        type="search"
        className="w-40 focus:outline-none focus:ring-0 text-center pl-2 border-2 border-white border-b-sky-600"
        onChange={handleSearchChange}
        name="search"
        placeholder="Type to search"
        value={searchQuery}
      />

      <button className="ml-4" type="submit"><FontAwesomeIcon icon={faSearch} /></button>
    </form>
  );
};

export default SearchUsers;