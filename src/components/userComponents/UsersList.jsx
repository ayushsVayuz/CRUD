import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchAllUsersData } from "../../actions/Action";
import ConfirmModal from "../ConfirmModel";

function UsersList() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { usersData, getAllUsersLoader, totalData } = useSelector((state) => state.user);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  let searchQuery = searchParams.get("search") || "";
  let pageNumber = Number(searchParams.get("page")) || 1;
  const pageLimit = 6;

  // Fetches all users list when the page number or search query changes
  useEffect(() => {
    dispatch(fetchAllUsersData({ pageNumber, searchQuery, pageLimit }));
  }, [dispatch, pageNumber, searchQuery, totalData]);


  // Pop up the confirmation modal and store the selected user id for deletion of record
  const handleDeleteClick = (id) => {
    setSelectedUserId(id);
    setModalOpen(true);


  };

  // Confirm deletion of selected user and close the modal
  const handleConfirmDelete = () => {
    dispatch(deleteUser(selectedUserId));
    setModalOpen(false);

  };

  return getAllUsersLoader ? (
    <div className="flex justify-center h-40 items-center">
      <div className="border-4 border-solid text-center border-blue-700 border-e-transparent rounded-full animate-spin w-10 h-10"></div>
    </div>
  ) : (
    <>

      <div className="overflow-x-auto mx-auto max-w-6xl p-4">
        <table className="w-full border border-sky-800 text-sm sm:text-md">
          <thead>
            <tr className="h-12 bg-sky-100">
              <th className="border-2 border-blue-400 p-2 text-sky-800 border-r-2">S.No.</th>
              <th className="border-2 border-blue-400 p-2 text-sky-800">Name</th>
              <th className="border-2 border-blue-400 p-2 text-sky-800">Email</th>
              <th className="border-2 border-blue-400 p-2 text-sky-800">Contact</th>
              <th className="border-2 border-blue-400 p-2 text-sky-800">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(usersData) ? (
              usersData.map((data, index) => (
                <tr key={data._id} className="border-2 h-14 border-blue-400 text-center">
                  <td className="p-2 border-r-2 border-blue-400">
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
                  <td className="p-2 border-2 text-left border-blue-400">{data?.email}</td>
                  <td className="p-2 border-2 text-left border-blue-400">{data?.phone}</td>
                  <td className="flex justify-center gap-3 p-2">
                    <Link
                      to={`/updateUser/${data?._id}`}
                      className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Update
                    </Link>

                      <button
                        type="button"
                        className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                        onClick={() => handleDeleteClick(data?._id)}
                      >
                        Delete
                      </button>
                    
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