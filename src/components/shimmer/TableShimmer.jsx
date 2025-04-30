import React from 'react'

const TableShimmer = () => {
  return (
    <div>
       <div className="overflow-x-auto  mx-auto max-w-6xl p-4">
       <table className="w-full border border-sky-800 text-sm sm:text-md">
       <thead>
            <tr className="h-12 bg-sky-100">
              <th className="border-2 border-blue-400 p-2  border-r-2"></th>
              <th className="border-2 border-blue-400 p-2 ">
                <div className='bg-gray-500'></div>
              </th>
              <th className="border-2 border-blue-400 p-2 "></th>
              <th className="border-2 border-blue-400 p-2 "></th>
              <th className="border-2 border-blue-400 p-2 "></th>
            </tr>
          </thead>
          <tbody>
                <tr  className="border-2 h-14 border-blue-400 text-center">
                  <td className=" border-r-2  w-20 border-blue-400">  </td>
                  <td className="w-95 gap-2 p-2">
                    <img className="w-10 h-10 rounded-full object-cover" />
                    <p className="text-start font-medium truncate w-36 sm:w-48"></p>
                     </td>
                  <td className="p-2 border-2 w-65 border-blue-400"></td>
                  <td className="p-2 border-2 w-35 border-blue-400"></td>
                  <td className="flex justify-center gap-3 p-2">
                    <button className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm" > </button>
                    <button className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm"> </button>
                  </td>
                </tr>  
               
               
          </tbody>
        </table>
        </div>
    </div>
  )
}

export default TableShimmer
