import { React, useState , useEffect} from 'react'
import axios from "axios";


const Totaluser = () => {
    const [userdata, setUserData] = useState([])

    const getUsers = async () => {

        try {
            const response = await axios.get('https://crud-vip.vercel.app/api/users')
            setUserData(response.data) 

        } catch(error ) {
            console.log(error)
        }
    }
    useEffect( () => {
        getUsers()
    }, [])

    return (
        <div>
            <p className="font-medium text-sky-800">Total Users: <span className="text-blue-700">{userdata.totalData}</span></p>
        </div>
    )
}

export default Totaluser
