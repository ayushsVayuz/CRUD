import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "../Pagination";
import ConfirmModal from "../ConfirmModel";
import userStore from "../../store/Store";
import TableShimmer from "../shimmer/TableShimmer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";

function UsersList() {
  const [searchParams] = useSearchParams();
  const { getAllUsersLoader, fetchAllUsersData, usersData, deleteUser, updateStatus, statusLoader } = userStore();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loadingItemId, setLoadingItemId] = useState(null);
  const [actionID, setActionID] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [toggleID, setToggleID] = useState(false);


  let searchQuery = searchParams.get("search");
  let pageNumber = Number(searchParams.get("page")) || 1;
  const pageLimit = 6;


  /**
   * Fetches user data based on pagination and search filters.
   */
  console.log(usersData, "usersData12");

  //usersData && usersData?.length === 0 && 
  useEffect(() => {
    fetchAllUsersData({ pageNumber, searchQuery, pageLimit });
  }, [pageNumber, searchQuery, pageLimit]);




  /**
   * @param {string} id - Unique identifier of the user to be deleted.
   */
  const handleDeleteClick = (id) => {
    setSelectedUserId(id);
    setModalOpen(true);
  };

  /**
   * Deletes the selected user and refreshes the list if necessary.
   */
  const handleConfirmDelete = async () => {

    setLoadingItemId(selectedUserId)
    await (deleteUser(selectedUserId, searchParams));
    setLoadingItemId(null)
    selectedUserId(null)
  };


  /**
   * Automatically closes the confirmation modal when loading completes.
  */
  useEffect(() => {
    if (!loadingItemId) {
      setModalOpen(false);
    }
  }, [loadingItemId]);


  const handleToggleChange = async (id, status) => {
    let newStatus = !status;

    const response = await updateStatus({ id, newStatus });
    console.log("response", response);

  }


  return getAllUsersLoader ? (
    <TableShimmer />
  ) : (
    <>

      <div className="overflow-x-auto mx-auto max-w-6xl p-4">
        <table className="w-full  text-sm sm:text-md ">
          <thead className="text-left">
            <tr className="h-12 bg-sky-100 ">
              <th className=" p-2 text-sky-800 text-center">S.No.</th>
              <th className=" p-2 text-sky-800">Name</th>
              <th className=" p-2 text-sky-800">Email</th>
              <th className=" p-2 text-sky-800">Contact</th>
              <th className="p-2 text-sky-800">Status</th>
              <th className=" p-2 text-sky-800 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(usersData) ? (
              usersData.map((data, index) => (
                <tr key={data?._id} className=" h-14  border-b-1 border-gray-300 text-center">
                  <td className="p-2 ">
                    {pageNumber ? index + 1 + (pageNumber - 1) * pageLimit : index + 1}
                  </td>
                  <td className="flex items-center gap-2 p-2">
                    {data?.image?.trim() && data?.image?.trim() !== "null" && data?.image?.trim() !== "undefined" ? (
                      <img className="w-10 h-10 rounded-full object-cover" src={data.image} alt="user-profile" />
                    ) : (
                      <h3 className="text-center p-2 w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        {data?.name?.trim()?.slice(0, 1).toUpperCase()}
                      </h3>
                    )}
                    <p className="text-start font-medium truncate w-36 sm:w-48">{data?.name}</p>
                  </td>
                  <td className="p-2  text-left ">{data?.email}</td>
                  <td className="p-2  text-left ">{data?.phone}</td>
                  <td className="p-2  text-left ">
                   {
                    statusLoader ? // Complete it
                    <div className="flex justify-center h-10 items-center">
                      <div className=" w-4 h-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    :
                    <input type="checkbox" onChange={() => handleToggleChange(data?._id, data?.status)} checked={data?.status} />
                   }
                  </td>
                  <td className="flex flex-row justify-center gap-3 p-2">
                    {
                      actionID !== data?._id ? (

                        <p onClick={() => setActionID(data?._id)}>...</p>
                      ) : (
                        <div className="relative">
                          <button
                            className="absolute top-[-15px] right-[-30px] p-1 text-red-500 hover:text-red-700 text-lg"
                            onClick={() => setActionID(null)}
                          >
                            <FontAwesomeIcon icon={faXmark} className="ml-5" />
                          </button>


                          <ul className="grid grid-cols-3 items-center">
                            <li>


                              <Link
                                to={`/updateUser/${data?._id}`}
                                className=" px-3 py-1  rounded-lg text-sm"
                              >

                                <FontAwesomeIcon icon={faEdit} className="text-sky-700" />
                              </Link></li>
                            <li>
                              {
                                loadingItemId === data?._id ? (
                                  <div className="flex justify-center h-10 items-center">
                                    <div className=" w-4 h-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                  </div>
                                ) : (
                                  <button
                                    type="button"
                                    className=" px-3 py-1 rounded-lg text-sm"
                                    onClick={() => handleDeleteClick(data?._id)}
                                  >
                                    <FontAwesomeIcon icon={faTrash} className="text-sky-700" />

                                  </button>
                                )
                              }</li>
                            <li>
                              <Link
                                to={`/userDetails/${data?._id}`}
                                className=" px-3 py-1 rounded-lg text-sm"
                              >
                                <FontAwesomeIcon icon={faUser} className="text-sky-700" />
                              </Link></li>
                          </ul>
                        </div>
                      )

                    }
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-lg font-medium text-gray-500 p-5">
                  Loading users...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination currentPage={pageNumber} />
      <ConfirmModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onConfirm={handleConfirmDelete} message="Are you sure you want to delete this user?" />
    </>
  );
}

export default UsersList;