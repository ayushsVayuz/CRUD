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
            <p>Total Users: {userdata.totalData} </p>
        </div>
    )
}

export default Totaluser
