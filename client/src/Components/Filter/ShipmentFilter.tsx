"use client";

import {  useState } from "react";

import SelectInput from "./Inputs/SelectInput";
import Inputs from "./Inputs/Inputs";
import Button from "./Inputs/Button";
import apiClient from "../../Services/apiClient";

interface ShipmentFiltersProps {
  filterValue: (data: any) => void;
  resetValue: (data: any) => void;
}

const defaultForm = {
  waybill: "",
  customer_name: "",
  customer_phone: "",
  status: "",
};

let statusData = [
  { status: "Pending", status_id: "Pending" },
  { status: "In Transit", status_id: "In Transit" },
  { status: "Out for Delivery", status_id: "Out for Delivery" },
  { status: "Delivered", status_id: "Delivered" },
];

const ShipmentFilters: React.FC<ShipmentFiltersProps> = ({
  filterValue,
  resetValue,
}) => {
  const [reset, setReset] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleReset = async () => {
    setForm(defaultForm);
    const res = await apiClient.post("/shipment/filter", form);
    resetValue(res.data);
    setReset(true);
  };

  const handleSelectedStatusChange = (selectedValue: any) => {
    setForm((prevState) => ({ ...prevState, status: selectedValue }));
    setReset(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await apiClient.post("/shipment/filter", form);
    filterValue(res.data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-12/12 p-3  flex gap-4 items-start justify-start m-auto border-blue-300 border-b  rounded  ">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2  mb-3 pb-4 ">
          <Inputs
            responsive
            title="Customer Name:"
            type="text"
            value={form.customer_name}
            name="customer_name"
            onChange={handleInputChange}
          />
          <SelectInput
            mid
            customClass="mr-[96px] max-[850px]:mr-[135px]"
            label="Status"
            instanceId="Status"
            options={statusData}
            prefixId="status_id"
            prefix="status"
            reset={reset}
            setReset={setReset}
            onSelectValueChange={handleSelectedStatusChange}
          />
          <Inputs
            responsive
            title="Phone Number:"
            type="number"
            value={form.customer_phone}
            name="customer_phone"
            onChange={handleInputChange}
          />

          <label className="invisible max-[850px]:visible max-[850px]:hidden" />
          <div className="flex flex-col    min-[850px]:flex-row gap-4">
            <Button label="Search" type="submit" />
            <Button onClick={handleReset} label="Show All" type="reset" />
          </div>
        </div>
      </div>
    </form>
  );
};

export default ShipmentFilters;
