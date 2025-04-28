import  React from 'react'
import { useSelector } from 'react-redux'

const TotalUsers = () => {

      const { totalData } = useSelector((state) => state.user);

    return (
        <div>
            <p className="font-medium text-sky-800">Total Users: <span className="text-blue-700">{totalData}</span></p>
        </div>
    )
}

export default TotalUsers
