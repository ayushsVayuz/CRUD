import axios from "axios";
import React from "react";
import { useState , useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";



function Table() {

    const [user, setUser] = useState([]);
    const [queryparams] = useSearchParams();
    
    const getUsers = async () => {
        

        const query = queryparams.get('search');
        // console.log("searchparamsontable",query )


        try {

           const  response =  query === null ? await axios.get(`https://crud-vip.vercel.app/api/users?page=1&limit=5&search=`) : await axios.get(`https://crud-vip.vercel.app/api/users?page=1&limit=5&search=${query}`) 

           
            setUser(response.data.data) 
        
        }catch(error ) {
            console.log(error)
        }
    }
    useEffect( () => {
        getUsers()
    }, [])


    const handleDelete = async(id) => {

        // console.log("Id of deleting data",id);

        try
        {        
            const response = await axios.delete(`https://crud-vip.vercel.app/api/users/${id}`)
            console.log("checking res", response)
            
            setUser(user.filter(u => u._id !== id));
            
           
        } catch(error) {
            console.log(error);
        }
    }


    console.log("Users",user);
        return(
            <div className="h-80 ml-60 mr-60 ">
                <table className="mt-10 ml-5 h-auto border border-black-400">
                    <thead>
                        <tr>
                            <th className="border-1 h-5 border-black-400 w-20">S.no.</th>
                            <th className="border-1 border-black-400 w-60">Name</th>
                            <th className="border-1 border-black-400 w-60">Email</th>
                            <th className="border-1 border-black-400 w-60">Contact</th>
                            <th className="border-1 border-black-400 w-60">Action</th>
                        </tr>
                    </thead>
                    { user.map((data, index) => (
                        <tbody  className="h-1 border" >
                            <td key={index} className="border-1 h-10 border-black-400">{index+1}</td>
                            <td className="  h-10 grid grid-cols-2" >
                        
                                    
                                    {/* here null is a string */}
                                    {/* here we used first, data?.image?.trim() to know if there is data or not  */}
                                {
                                    data?.image?.trim() && data?.image?.trim() !=="null" && data?.image?.trim() !=="undefined" ? <img  className="h-10" src={data?.image}  /> : <h3>{data?.name?.trim()?.slice(0,1)}</h3> 
                                }
                            
                                <p className="h-auto">{data?.name}</p>
                            </td>
                            <td className="border-1 h-auto border-black-400">{data?.email}</td>
                            <td className="border-1 h-10 border-black-400">{data?.phone}</td>
                            <td className="grid grid-cols-2  gap-5 p-2 h-10">
                                <Link to={`/Edit/${data?._id}`} className="text-center bg-green-500" >Edit</Link>
                                <button type="button" className="bg-red-500 " onClick={(e) => handleDelete(data?._id)}>Delete</button>
                            </td>
                        </tbody>

                    ))}
                    
                </table>
            </div>
        );
}

export default Table;