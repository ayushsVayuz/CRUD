import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import userStore from '../../store/Store';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedUser, getSpecificUserData, getSpecificUserLoader } = userStore();

  useEffect(() => {
    getSpecificUserData(id); 
  }, [id]);

  return (
    <div className=" h-auto mt-10 flex  justify-center">
      {getSpecificUserLoader ? (
        <div className="flex justify-center h-100 items-center">
          <div className="border-4 border-solid text-center border-blue-700 border-e-transparent rounded-full animate-spin w-10 h-10"></div>
        </div>
      ) : (
        <div className="pl-6 pr-6 pb-6 h-auto mt-5 shadow-2xl bg-white rounded-lg w-full max-w-md mx-auto">


          <div className="mt-4 space-y-3">
            <div className="relative bg-sky-500 w-full m-auto max-w-sm h-25 rounded-lg flex justify-center items-end pb-4"></div>
            {selectedUser?.image && (
              <div className="flex justify-center ">
                {selectedUser?.image?.trim() && selectedUser?.image?.trim() !== "null" && selectedUser?.image?.trim() !== "undefined" ? (
                  <img src={selectedUser.image} alt="User Profile" className="absolute top-40 transform translate-y-1/2 h-24 w-24 rounded-full shadow-md object-cover border-4 border-white" />
                ) : (
                  <h3 className="absolute top-40 transform translate-y-1/2 text-center p-2 w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-xl font-semibold border-4 border-white">
                    {selectedUser?.name?.trim()?.slice(0, 1).toUpperCase()}
                  </h3>
                )}

              </div>

            )}

            <div className="mt-17 flex gap-10">

              <div className="flex flex-col gap-6 opacity-40">
                <p>Name:</p>
                <p>Email:</p>
                <p>Phone Number:</p>
                <p>Location:</p>
                <p>About:</p>
              </div>

              <div className="flex flex-col gap-6 ">
                <p className="text-gray-700">
                  {selectedUser?.name}
                </p>
                <p  className="text-gray-700">
                  {selectedUser?.email}
                </p>
                <p className="text-gray-700">
                  {selectedUser?.phone}
                </p>
                <p className="text-gray-700">
                  {selectedUser?.location}
                </p>
                <p className="text-gray-700">
                  {selectedUser?.about}
                </p>
              </div>

            </div>


          </div>

          <div className="flex mt-6 ">
            <button
              onClick={() => navigate(-1)}
              className="text-blue-600 pl-5 pr-5 p-2  hover:text-white hover:bg-sky-600 rounded-lg outline-2  font-medium transition duration-200"
            >
              Back
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
