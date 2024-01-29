import { toast } from "react-toastify";
import { useCallback, useEffect, useState } from "react";
import { getShipmentByWaybill } from "../../../Services/apiQuery";

interface TrackShipmentProps {
  waybill: string;
}

const TrackShipment: React.FC<TrackShipmentProps> = ({ waybill }) => {
  const [color, setColor] = useState(0);
  const handleUpdate = useCallback(async () => {
    try {
      const response = await getShipmentByWaybill(waybill);
      if (response.statusText === "OK") {
        if (response.data === null) {
          setColor(getStatusColor("0"));
        } else {
          setColor(getStatusColor(response.data.status));
        }
      }
    } catch (error) {
      toast.error("Fetch Failed");
    }
  }, [waybill]);

  const getStatusColor = (status: string) => {
    if (status === "Pending") {
      return 1;
    } else if (status === "In Transit") {
      return 2;
    } else if (status === "Out for Delivery") {
      return 3;
    } else if (status === "Delivered") {
      return 4;
    }
    return 0;
  };

  useEffect(() => {
    handleUpdate();
  }, [waybill, handleUpdate]);
  return (
    <div>
      {color === 0 ? (
        <div className="flex justify-center h-screen items-center">
          <p className="font-bold text-lg md:text-3xl">No shipment found</p>
        </div>
      ) : (
        <div className="max-w-xl mx-auto my-4 border-b-2 pb-4">
          <div className="flex flex-col md:flex-row pb-3">
            <div className="flex-1"></div>

            <div className="flex-1">
              <div
                className={`w-10 h-10 ${
                  color >= 1 ? "bg-green-300" : "bg-white"
                } border-2 border-grey-light mx-auto rounded-full text-lg text-black flex items-center`}
              >
                <span className="text-black text-center w-full">
                  <img
                    src={"/check.svg"}
                    alt="Check"
                    className="fill-current "
                  />
                </span>
              </div>
              <div className="w-full text-xs content-center text-center font-bold">
                Pending{" "}
              </div>
            </div>

            <div className="w-1/6 align-center items-center align-middle content-center flex">
              <div className="w-full bg-grey-light rounded items-center align-middle align-center flex-1">
                <div className="bg-green-light w-full text-xs leading-none py-1 text-center text-grey-darkest rounded "></div>
              </div>
            </div>

            <div className="flex-1">
              <div
                className={`w-10 h-10 ${
                  color >= 2 ? "bg-green-300" : "bg-white"
                } border-2 border-grey-light mx-auto rounded-full text-lg text-black flex items-center`}
              >
                <span className="text-black text-center w-full">
                  <img
                    src={"/check.svg"}
                    alt="Check"
                    className="fill-current "
                  />
                </span>
              </div>
              <div className="w-full text-xs content-center text-center font-bold">
                In Transit{" "}
              </div>
            </div>

            <div className="w-1/6 align-center items-center align-middle content-center flex">
              <div className="w-full bg-grey-light rounded items-center align-middle align-center flex-1">
                <div className="bg-green-light w-1/5 text-xs leading-none py-1 text-center text-grey-darkest rounded "></div>
              </div>
            </div>

            <div className="flex-1">
              <div
                className={`w-10 h-10 ${
                  color >= 3 ? "bg-green-300" : "bg-white"
                } border-2 border-grey-light mx-auto rounded-full text-lg text-black flex items-center`}
              >
                <span className="text-black text-center w-full">
                  <img
                    src={"/check.svg"}
                    alt="Check"
                    className="fill-current "
                  />
                </span>
              </div>
              <div className="w-full text-xs content-center text-center font-bold">
                Out for Delievery{" "}
              </div>
            </div>

            <div className="w-1/6 align-center items-center align-middle content-center flex">
              <div className="w-full bg-grey-light rounded items-center align-middle align-center flex-1">
                <div className="bg-green-light w-0 text-xs leading-none py-1 text-center text-grey-darkest rounded "></div>
              </div>
            </div>

            <div className="flex-1">
              <div
                className={`w-10 h-10 ${
                  color >= 4 ? "bg-green-300" : "bg-white"
                } border-2 border-grey-light mx-auto rounded-full text-lg text-black flex items-center`}
              >
                <span className="text-black text-center w-full">
                  <img
                    src={"/check.svg"}
                    alt="Check"
                    className="fill-current "
                  />
                </span>
              </div>
              <div className="w-full text-xs content-center text-center font-bold">
                Delievered{" "}
              </div>
            </div>
            <div className="flex-1"></div>
          </div>
        </div>
      )}
    </div>
  );
};
export default TrackShipment;
