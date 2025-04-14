import axios from "axios";
import React from "react";
import { useState , useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
import Pagination from "./Pagination";



function Table() {

    const [user, setUser] = useState([]);
    const [searchparams, setSearchParams] = useSearchParams();
    const [totalData, setTotalData] =  useState();
    
    let searchquery = searchparams.get('search');
    let pagequery =  searchparams.get('page');

    
    
    const getUsers = async () => {
      

        console.log("checking page number",pagequery)
        // console.log("searchparamsontable",searchquery )


        try {

        //    const  response =  query === null ? await axios.get(`https://crud-vip.vercel.app/api/users?page=1&limit=5&search=`) : await axios.get(`https://crud-vip.vercel.app/api/users?page=1&limit=5&search=${query}`) 
           const response = await axios.get(`https://crud-vip.vercel.app/api/users`,{
                params:{
                    page: pagequery,
                    limit:6,
                    search: searchquery
                }
           }) 
          

        //    console.log("checking get",response.data)
            setUser(response.data.data)
            setTotalData(response.data.totalData)
            
        
        }catch(error ) {
            console.log(error)
        }
    }
    useEffect( () => {
        getUsers()
    }, [pagequery,searchquery]) // these are put here so that whenever there is a change in these two it will run again
    
  


    const handleDelete = async(id) => {

        // console.log("Id of deleting data",id);

        try
        {        
            const response = await axios.delete(`https://crud-vip.vercel.app/api/users/${id}`)
            // console.log("checking response", response)
            
            setUser(user.filter(u => u._id !== id));
            
           
        } catch(error) {
            console.log(error);
        }
    }
    



    console.log("Users on table",user);
        return(
            <div className=" h-100 ml-60 mr-60 ">
                <table className=" ml-5 h-auto border border-Sky-800">
                    <thead>
                        <tr className="h-10">
                            <th className="border-2 border-blue-400 w-20 font-medium text-sky-800">S.no.</th>
                            <th className="border-2 border-blue-400 w-60 font-medium text-sky-800">Name</th>
                            <th className="border-2 border-blue-400 w-60 font-medium text-sky-800">Email</th>
                            <th className="border-2 border-blue-400 w-60 font-medium text-sky-800">Contact</th>
                            <th className="border-2 border-blue-400 w-60 font-medium text-sky-800">Action</th>
                        </tr>
                    </thead>
                    { user.map((data, index) => (
                        <tbody  className="border-2 h-15 border-blue-400" >
                            <td key={index} className="h-10 border-2 text-center border-blue-400">{index+1}</td>
                            <td className="  pl-2 h-15 flex flex-row items-center gap-2" >
                        
                                    
                                    {/* here null is a string */}
                                    {/* here we used first, data?.image?.trim() to know if there is data or not  */}
                                {
                                    data?.image?.trim() && data?.image?.trim() !=="null" && data?.image?.trim() !=="undefined" ? <img  className=" w-8 h-10  text-center rounded-3xl" src={data?.image}  /> : <h3 className="text-center p-2  w-8 h-10 bg-gray-300 rounded-3xl ">{data?.name?.trim()?.slice(0,1).toUpperCase()}</h3> 
                                }
                            
                                <p className=" h-auto w-auto text-start">{data?.name}</p>
                            </td>
                            <td className="border-2 p-3 border-blue-400">{data?.email}</td>
                            <td className="border-2 p-3 border-blue-400">{data?.phone}</td>
                            <td className="flex flex-row  justify-center  align-start gap-5 p-2">
                                <Link to={`/Edit/${data?._id}`} className="p-1 text-center rounded-3xl bg-green-700 w-18 text-white " >Edit</Link>
                                <button type="button" className=" p-1 bg-red-700 w-18 rounded-3xl text-white" onClick={(e) => handleDelete(data?._id)}>Delete</button>
                            </td>
                        </tbody>

                    ))}
                    
                </table>
                <Pagination totalData ={totalData} />
                

            </div>
        );
}

export default Table;