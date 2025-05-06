import React from 'react';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';
import userStore from '../store/Store';

const Pagination = ({ currentPage }) => {

  const [searchParams, setSearchParams] = useSearchParams();
  const { totalData } = userStore();

  let itemsPerPage = 10;
  const pageCount = Math.ceil((totalData || 1) / itemsPerPage);


  /**
   * @param {Object} event - The pagination event data.
  */
  const handlePageChange = (event) => {
    console.log("event.selected", event.selected);

    setSearchParams(prevParams => ({ ...prevParams, page: event.selected + 1 }));
  }

  return (
    <div className='flex justify-center p-5'>

      <ReactPaginate
        previousLabel={<button
          disabled={Number(searchParams.get("page")) === 1 || !searchParams.get("page")}
          className={`${Number(searchParams.get("page")) === 1 || !searchParams.get("page") ? "text-gray-400 cursor-not-allowed" : " "}`}
        >Previous</button>}
        nextLabel={<button
          disabled={Number(searchParams.get("page")) === pageCount || pageCount == 1}
          className={`${Number(searchParams.get("page")) === pageCount || pageCount == 1 ? "text-gray-400 cursor-not-allowed" : " "}`}
        >Next</button>}
        breakLabel="..."
        activeClassName="bg-blue-500 text-white rounded-lg px-2"
        onPageChange={handlePageChange}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        forcePage={Number(currentPage) - 1}
        className='flex gap-3'
      />
    </div>
  )
}

export default Pagination
