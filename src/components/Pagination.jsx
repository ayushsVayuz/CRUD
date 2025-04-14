import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';

const Pagination = (props) => {
    
    const [itemOffset , setItemOffset] = useState(0);
    const [searchparams, setSearchParams] = useSearchParams();

    let itemPerPage = 6;
    let totalData = props.totalData;

     console.log("total data from pagination", totalData)
     console.log("itemPerPage from pagination", itemPerPage)

    
    const pageCount = Math.ceil(totalData/itemPerPage);
    //   console.log("page count", pageCount)

    const handlePageChange = (event) => {
        
        const newOffset = (event.selected * itemPerPage) % totalData; 
        
        setItemOffset(newOffset);
        setSearchParams({page:event.selected+1});
       
    } 

    console.log("checking in pagination",searchparams )
  
    return(
    <div className='flex  justify-center p-5'>
        
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
