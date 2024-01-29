"use client";

import { useEffect, useState } from "react";
import DataGridUserView from "../DataGrid/admin/DataGridUserView";
import UsersFilters from "../Filter/UserFilter";
import { getUsers } from "../../Services/apiQuery";
import { toast } from "react-toastify";

export default function ViewUsers() {
  const [requests, setRequests] = useState<[Users] | []>([]);

  const getRequests = async () => {
    try {
      const res = await getUsers();
      if (res.statusText === "OK") {
        setRequests(res.data);
      }
    } catch (err) {
      toast.error("User data fetch Failed");
    }
  };

  const filters = (data: any) => {
    setRequests(data);
  };

  const reset = () => {
    getRequests();
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <>
      <div className="w-12/12 m-auto  rounded  mt-10 w-4/5">
        <div className="p-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-blue-700">Users:</h2>
          </div>
          {/* <div className="flex justify-end w-1/4 ">
            <button className="mb-4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">
              Add
            </button>
          </div> */}
        </div>
        <UsersFilters filterValue={filters} resetValue={reset} />
      </div>

      <div className="w-9/12 m-auto border-2 shadow-md shadow-gray-300 rounded overflow-x-auto mt-10">
        <DataGridUserView requests={requests} setRequests={setRequests} />
      </div>
    </>
  );
}
