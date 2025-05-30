import React from "react";
import * as pkg from 'react-router-dom';
import TotalUsers from "../../components/userComponents/TotalUsers";
import UsersList from "../../components/userComponents/UsersList";
import SearchUsers from "../../components/userComponents/SearchUsers";

const HomePage = () => {

  const { Link } = pkg;
  return (
    <div className="pt-10 px-4 sm:px-8 lg:px-16 xl:px-24 flex justify-center">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="ml-0 sm:ml-10 lg:ml-auto flex justify-center w-full">
            <TotalUsers />
          </div>
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
            <Link
              to="/createUser"
              className="bg-sky-600 hover:bg-sky-800 px-4 py-2 font-medium text-white text-center rounded-3xl w-28 sm:w-32 md:w-32">
              Create User
            </Link>
            <div className="w-full sm:w-auto flex justify-center">
              <SearchUsers />
            </div>
          </div>
        </div>

        <div className="pt-10">
          <UsersList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;