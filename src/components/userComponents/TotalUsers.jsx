import { React, useState , useEffect} from 'react'
import axios from "axios";


const TotalUsers = () => {
    const [userData, setUserData] = useState([])

    // No parameter, returns all users data to get the value of totalData from Api through get request
    const getTotalUsers = async () => {

        try {
            const response = await axios.get(import.meta.env.VITE_API +`/users`)
            setUserData(response.data) 


        } catch(error ) {
            console.log(error)
        }
    }
    
    // It is used to trigger getTotalUsers function
    useEffect( () => {
        getTotalUsers()
    }, [])

    return (
        <div>
            <p className="font-medium text-sky-800">Total Users: <span className="text-blue-700">{userData.totalData}</span></p>
        </div>
    )
}

export default TotalUsers
