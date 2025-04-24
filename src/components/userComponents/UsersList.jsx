import axios from "axios";
import React from "react";
import { useState , useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "../Pagination";



function UsersList() {

    const [user, setUser] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalData, setTotalData] =  useState();
    const [loading, setLoading] =  useState(true);

    let searchQuery = searchParams.get('search');
    let pageNumber =  searchParams.get('page');

    
    // params: pageNumber(current page), limit(number of users per page), search(searched value), and returns users data according to the provided parameters using get request
    const getUsers = async () => {

        try {

           const response = await axios.get(import.meta.env.VITE_API + `/users`,{
                params:{
                    page: pageNumber,
                    limit:6,
                    search: searchQuery
                }
           }) 
            setUser(response.data.data)
            setTotalData(response.data.totalData)
            setLoading(false)
        
        }catch(error ) {
            console.log(error)
            setLoading(false)
           
        }
      

    }

    //Triggers getUsers function whenever pageNumber or searchQuery changes
    useEffect( () => {
        getUsers()
    }, [pageNumber,searchQuery]) 

    let currentPage;

    pageNumber === null ? currentPage = 1 : currentPage = pageNumber
    const pageLimit = 6;
    


    // params: id of desired user, removes desired user data from Api through delete request and Updates it 
    const handleDelete = async(id) => {

        try
        {        
            const response = await axios.delete(import.meta.env.VITE_API + `/users/${id}`)            
            setUser(user.filter(u => u._id !== id));
            
        } catch(error) {
            console.log(error);
        }
    }
    
        return(
            loading ?
            <div className="flex justify-center h-100 items-center">
                <div className="border-4 border-solid text-center border-blue-700 border-e-transparent rounded-full animate-spin w-10 h-10"></div>
            </div>
            :
            <div className="h-100 ml-60 mr-60">
                <table className=" ml-5 h-auto border border-Sky-800">
                    <thead>
                        <tr className="h-10">
                            <th className="border-2 border-blue-400 w-20 font-medium text-sky-800">S.No.</th>
                            <th className="border-2 border-blue-400 w-60 font-medium text-sky-800">Name</th>
                            <th className="border-2 border-blue-400 w-60 font-medium text-sky-800">Email</th>
                            <th className="border-2 border-blue-400 w-60 font-medium text-sky-800">Contact</th>
                            <th className="border-2 border-blue-400 w-60 font-medium text-sky-800">Action</th>
                        </tr>
                    </thead>
                    
                
                    { user.map((data, index ) => (
                        <tbody className="border-2 h-15 border-blue-400" >
                            <td  className="h-10 border-2 text-center border-blue-400"> {
                                (index + 1) + ((currentPage - 1) * pageLimit)} </td>
                            <td className="pl-2 h-15 flex flex-row items-center gap-2" >
                        
                                {

                                    data?.image?.trim() && data?.image?.trim() !=="null" && data?.image?.trim() !=="undefined" ? <img className="w-8 h-10 text-center rounded-3xl" src={data?.image}  /> : <h3 className="text-center p-2 w-8 h-10 bg-gray-300 rounded-3xl"> {data?.name?.trim()?.slice(0,1).toUpperCase()} </h3> 
                                }
                            
                                <p className="h-auto w-auto text-start">{data?.name}</p>
                            </td>
                            <td className="border-2 p-3 border-blue-400">{data?.email}</td>
                            <td className="border-2 p-3 border-blue-400">{data?.phone}</td>
                            <td className="flex flex-row justify-center align-start gap-5 p-2">
                                <Link to={`/updateUser/${data?._id}`} className="p-1 text-center rounded-3xl bg-green-700 w-18 text-white">Update</Link>
                                <button type="button" className=" p-1 bg-red-700 w-18 rounded-3xl text-white" onClick={(e) => handleDelete(data?._id)}>Delete</button>
                            </td>
                           
                        </tbody>

                    ))}
                    
                </table>
                <Pagination totalData = {totalData} />

            </div>
        );
}

export default UsersList;