import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Pagination = ({currentPage}) => {
    
    const [itemOffset , setItemOffset] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();

    const {totalData } = useSelector((state) => state.user);


    let itemPerPage = 6;
    
    
    const pageCount = Math.ceil((totalData || 1) / itemPerPage);


    // Handles page changes with page number provided from search params 
    const handlePageChange = (event) => {
        setSearchParams(prevParams => ({ ...prevParams, page: event.selected + 1 }));    
    } 

    return(
    <div className='flex justify-center p-5'>
        
            <ReactPaginate
                breakLabel="..."
                nextLabel='Next >'
                activeClassName="bg-blue-500 text-white rounded-lg px-2"
                onPageChange={handlePageChange}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                forcePage={Number(currentPage) - 1}
                previousLabel="< Previous" 
                className='flex gap-3'
            />
    </div>
  )
}

export default Pagination
