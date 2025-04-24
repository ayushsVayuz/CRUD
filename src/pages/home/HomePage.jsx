import React from 'react'
import { Link } from 'react-router-dom';
import TotalUsers from '../../components/userComponents/TotalUsers';
import UsersList from '../../components/userComponents/UsersList';
import SearchUsers from '../../components/userComponents/SearchUsers';


const HomePage = () => {

  return (
    <div className="pt-15 ">
            <div className="grid grid-cols-2 gap-10 ml-60 mr-60 text-[20px]">
                <div className="w-40 "><TotalUsers/></div>
                <div className="grid grid-cols-2 ">
                    <Link  to="/createUser" className="w-30 font-medium text-sky-800 text-center border-2 border-sky-800 rounded-3xl">Create User</Link>
                    <div><SearchUsers/></div>
                </div>
            </div>

            <div className="pt-10">
                <UsersList />
            </div>
    </div>
  );
}

export default HomePage;
