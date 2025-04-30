import  React from 'react'
import userStore from '../../store/Store'

const TotalUsers = () => {

      const { totalData} = userStore();

    return (
        <div>
            <p className="font-medium text-sky-800">Total Users: <span className="text-blue-700">{totalData}</span></p>
        </div>
    )
}

export default TotalUsers
