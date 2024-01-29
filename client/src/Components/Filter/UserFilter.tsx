"use client";

import { useEffect, useState } from "react";

import axios from "axios";
import SelectInput from "./Inputs/SelectInput";
import Inputs from "./Inputs/Inputs";
import Button from "./Inputs/Button";
import apiClient from "../../Services/apiClient";

interface ShipmentFiltersProps {
  filterValue: (data: any) => void;
  resetValue: (data: any) => void;
}

const defaultForm = {
  email: "",
  mobilenumber: "",
};

const UsersFilters: React.FC<ShipmentFiltersProps> = ({
  filterValue,
  resetValue,
}) => {
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
    const res = await apiClient.post("/user/filter", form);
    resetValue(res.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await apiClient.post("/user/filter", form);
    filterValue(res.data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-12/12 p-3  flex gap-4 items-start justify-start m-auto border-blue-300 border-b  rounded  ">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2  mb-3 pb-4 content-center	 ">
          <Inputs
            responsive
            title="Email:"
            type="text"
            value={form.email}
            name="email"
            onChange={handleInputChange}
          />

          <Inputs
            responsive
            title="Phone:"
            type="number"
            value={form.mobilenumber}
            name="mobilenumber"
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

export default UsersFilters;
