import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, deleteUser } from "../../actions/Action";

function UsersList() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { userData, loading } = useSelector((state) => state.user);

  let searchQuery = searchParams.get("search") || "";
  let pageNumber = parseInt(searchParams.get("page")) || 1;
  const pageLimit = 6;

  // Fetch data from the API through Redux
  useEffect(() => {
    dispatch(fetchUserData({ pageNumber, searchQuery, pageLimit }));
  }, [pageNumber, searchQuery]);

  // Handle delete functionality, when user wants to delete data
  const handleDelete = async (id) => {
    dispatch(deleteUser(id));
    
  };

  const currentPage = pageNumber;

  return loading ? (
    <div className="flex justify-center h-100 items-center">
      <div className="border-4 border-solid text-center border-blue-700 border-e-transparent rounded-full animate-spin w-10 h-10"></div>
    </div>
  ) : (
    <div className="h-100 ml-60 mr-60">
      <table className="ml-5 h-auto border border-Sky-800">
        <thead>
          <tr className="h-10">
            <th className="border-2 border-blue-400 w-20 font-medium text-sky-800">S.No.</th>
            <th className="border-2 border-blue-400 w-60 font-medium text-sky-800">Name</th>
            <th className="border-2 border-blue-400 w-60 font-medium text-sky-800">Email</th>
            <th className="border-2 border-blue-400 w-60 font-medium text-sky-800">Contact</th>
            <th className="border-2 border-blue-400 w-60 font-medium text-sky-800">Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((data, index) => (
            <tr key={data._id} className="border-2 h-15 border-blue-400">
              <td className="h-10 border-2 text-center border-blue-400">
                {(index + 1) + (currentPage - 1) * pageLimit}
              </td>
              <td className="pl-2 h-15 flex flex-row items-center gap-2">
                {data?.image?.trim() &&
                data?.image?.trim() !== "null" &&
                data?.image?.trim() !== "undefined" ? (
                  <img className="w-8 h-10 text-center rounded-3xl" src={data.image} alt="user-profile" />
                ) : (
                  <h3 className="text-center p-2 w-8 h-10 bg-gray-300 rounded-3xl">
                    {data?.name?.trim()?.slice(0, 1).toUpperCase()}
                  </h3>
                )}
                <p className="h-auto w-auto text-start">{data?.name}</p>
              </td>
              <td className="border-2 p-3 border-blue-400">{data?.email}</td>
              <td className="border-2 p-3 border-blue-400">{data?.phone}</td>
              <td className="flex flex-row justify-center align-start gap-5 p-2">
                <Link
                  to={`/updateUser/${data?._id}`}
                  className="p-1 text-center rounded-3xl bg-green-700 w-18 text-white"
                >
                  Update
                </Link>
                <button
                  type="button"
                  className="p-1 bg-red-700 w-18 rounded-3xl text-white"
                  onClick={() => handleDelete(data?._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination totalData={userData.length} />
    </div>
  );
}

export default UsersList;
