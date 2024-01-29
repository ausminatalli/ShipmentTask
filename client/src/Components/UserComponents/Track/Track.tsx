import { useState } from "react";
import TrackShipment from "./TrackShipment";

export default function Track() {
  const [waybill, setWaybill] = useState("");

  return (
    <div className="w-full h-full bg-gray-50 ">
      <div className="w-11/12 m-auto pt-10 ">
        <div className="bg-white p-4 flex gap-4 items-center rounded-xl shadow-xl">
          <h1 className="font-didact-gothic font-bold md:text-xl text-md ">
            Enter Your Waybill receipt :
          </h1>

          <input
            className="border-2 w-1/2 rounded p-1 "
            type="text"
            onChange={(e) => setWaybill(e.target.value)}
          />
        </div>
      </div>
      {<TrackShipment waybill={waybill} />}
    </div>
  );
}
