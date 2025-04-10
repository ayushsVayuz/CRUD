import axios from "axios";
import React from "react";
import { useState , useEffect } from "react";



function Table() {

    const [user, setUser] = useState([])

    const getUsers = async () => {

        try {
        const response = await axios.get('https://crud-vip.vercel.app/api/users?page=1&limit=5&search=')
           
        setUser(response.data.data) 
        
        // id : response.data.data[0]._id,
                // name : response.data.data[0].name,
                // email : response.data.data[0].email,
                // phone : response.data.data[0].phone,
                // location : response.data.data[0].location,
                // about : response.data.data[0].about,
                // image : response.data.data[0].image  
         
        }catch(error ) {
            console.log(error)
        }
    }
    useEffect( () => {
        getUsers()
    }, [])
    console.log(user);
        return(
            <div className="h-80 ml-60 mr-60 ">
                <table className="mt-10 ml-5 h-80 border-1 border-black-400">
                    <thead>
                        <tr>
                            <th className="border-1 border-black-400 w-20">S.no.</th>
                            <th className="border-1 border-black-400 w-60">Name</th>
                            <th className="border-1 border-black-400 w-60">Email</th>
                            <th className="border-1 border-black-400 w-60">Contact</th>
                            <th className="border-1 border-black-400 w-60">Action</th>
                        </tr>
                    </thead>
                    { user.map((data, index) => (
                        <tbody>
                            <td key={index} className="border-1 border-black-400">{index+1}</td>
                            <td className="border-1 border-black-400" >{data?.name}</td>
                            <td className="border-1 border-black-400">{data.email}</td>
                            <td className="border-1 border-black-400">{data.phone}</td>
                            <td className="border-1 border-black-400"></td>
                        </tbody>

                    ))}
                    
                </table>
            </div>
        );
}

export default Table;