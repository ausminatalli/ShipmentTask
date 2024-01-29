"use client";

import { useEffect, useState } from "react";
import DataGridView from "../../DataGrid/user/DataGridView";
import apiClient from "../../../Services/apiClient";
import AddModel from "../../Model/Model";
import AddShipments from "./AddShipment";

import ShipmentFilters from "../../Filter/ShipmentFilter";
import useAuth from "../../../Hooks/useAuth";

export default function ViewShippments() {
  const { authData } = useAuth();
  const [requests, setRequests] = useState<[Shippments] | []>([]);
  const [openModel, setOpenModel] = useState(false);
  const getRequests = async () => {
    try {
      const ownerid = authData?.id;
      const res = await apiClient.get(`/shipment/${ownerid}`);
      if (res.statusText === "OK") {
        setRequests(res.data);
      }
    } catch (err) {}
  };
  const filters = (data: any) => {
    setRequests(data);
  };

  const reset = () => {
    getRequests();
  };
  useEffect(() => {
    if (authData) {
      getRequests();
    }
  }, [authData]);

  return (
    <>
      <div className="w-12/12 m-auto  rounded  mt-10 w-4/5">
        <div className="p-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-blue-700">Shipments:</h2>
          </div>
          <div className="flex justify-end w-1/4 ">
            <button
              onClick={() => setOpenModel(true)}
              className="mb-4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
            >
              Add
            </button>
          </div>
        </div>
        <ShipmentFilters filterValue={filters} resetValue={reset} />
      </div>

      <div className="w-12/12 m-auto border-2 shadow-md shadow-gray-300 rounded overflow-x-auto mt-10 w-4/5">
        <DataGridView requests={requests} setRequests={setRequests} />
      </div>
      {openModel && (
        <AddModel
          onClose={() => setOpenModel(false)}
          content={
            <AddShipments requests={requests} setRequests={setRequests} />
          }
        />
      )}
    </>
  );
}
