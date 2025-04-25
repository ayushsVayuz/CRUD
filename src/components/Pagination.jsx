import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Pagination = (props) => {
    
    const [itemOffset , setItemOffset] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();

    const {totalData } = useSelector((state) => state.user);


    let itemPerPage = 6;
    
    
    const pageCount = Math.ceil(totalData/itemPerPage);

    // params: event(user action), returns searchParams for desired page number and set value of itemOffset for next page in sequence
    const handlePageChange = (event) => {
        
        const newOffset = (event.selected * itemPerPage) % totalData; 
        
        setItemOffset(newOffset);
        setSearchParams({page:event.selected+1});
       
    } 

    return(
    <div className='flex justify-center p-5'>
        
            <ReactPaginate
                breakLabel="..."
                nextLabel='Next >'
                onPageChange={handlePageChange}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< Previous" 
                className='flex gap-3'
            />
    </div>
  )
}

export default Pagination
