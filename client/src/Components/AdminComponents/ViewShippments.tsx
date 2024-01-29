"use client";

import { useEffect, useState } from "react";
import apiClient from "../../Services/apiClient";
import DataGridAdminView from "../DataGrid/admin/DataGridAdminView";
import ShipmentFilters from "../Filter/ShipmentFilter";

export default function ViewAdminShippments() {
  const [requests, setRequests] = useState<[Shippments] | []>([]);

  const getRequests = async () => {
    try {
      const res = await apiClient.get("/shipment");
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
    getRequests();
  }, []);

  return (
    <>
      <div className="w-12/12 m-auto  rounded  mt-10 w-4/5">
        <div className="p-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-blue-700">Shipments:</h2>
          </div>
          <div className="flex justify-end w-1/4 "></div>
        </div>
        <ShipmentFilters filterValue={filters} resetValue={reset} />
      </div>

      <div className="w-12/12 m-auto border-2 shadow-md shadow-gray-300 rounded overflow-x-auto mt-10 w-4/5">
        <DataGridAdminView requests={requests} setRequests={setRequests} />
      </div>
    </>
  );
}
