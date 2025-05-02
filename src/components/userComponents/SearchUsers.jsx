import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const SearchUsers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");




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
    setSearchQuery(trimmedValue)
  };

  return (
    <form className="font-medium text-sky-800" onSubmit={handleSubmit}>
      <input
        type="search"
        className="w-40 text-center pl-2 border-2 border-white border-b-blue-700"
        onChange={handleSearchChange}
        name="search"
        placeholder="Type to search"
        value={searchQuery}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchUsers;