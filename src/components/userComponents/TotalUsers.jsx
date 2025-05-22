import  React from 'react'
import userStore from '../../store/Store'

const TotalUsers = () => {

    const { totalData} = userStore();

    return (
        <div>
            <p className="font-medium text-sky-600">Total Users: <span className="text-sky-600 ">{totalData}</span></p>
        </div>
    )
}

export default TotalUsers
