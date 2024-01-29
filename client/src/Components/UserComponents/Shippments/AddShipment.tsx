import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import InputField from "../../Inputs/InputField";
import ImageUploader from "../Upload/ImageUploader";
import SubmitBtn from "../../Inputs/SubmitBtn";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";
import { createShipment, sendWaybillRequest } from "../../../Services/apiQuery";

interface AddShipmentsProps {
  setRequests: any;
  requests: any;
}
const AddShipments: React.FC<AddShipmentsProps> = ({
  requests,
  setRequests,
}) => {
  const methods = useForm();
  const { authData } = useAuth();
  const [responseError, setResponseError] = useState("");
  const [secureUrl, setSecureUrl] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState(false);

  const handleUploadSuccess = (url: string) => {
    setSecureUrl(url);
  };
  const onSubmit = methods.handleSubmit(async (data) => {
    setisLoading(true);
    if (data.password !== data.confirmpass) {
      setResponseError("Passwords do not match");
      setisLoading(false);
      return;
    }
    try {
      const response = await createShipment(
        data,
        secureUrl as string,
        authData
      );

      if (response.statusText === "OK") {
        setRequests([...requests, response.data]);
        const sendWaybill = await sendWaybillRequest(response.data);
        if (sendWaybill.statusText === "OK") {
          toast.success("Waybill sent to email");
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error;

        if (response) {
          setResponseError(response.data.message);
        }
      } else {
        setResponseError("Something went wrong");
      }
    }
    setisLoading(false);
  });
  return (
    <section className=" h-full w-full   ">
      <div className="  flex-col p-5">
        <h2 className="text-lg md:text-2xl text-center font-bold">
          Register Account
        </h2>
        <FormProvider {...methods}>
          <form action="POST" onSubmit={(e) => e.preventDefault()} noValidate>
            <div>
              <div className="mt-4  flex gap-2 justify-between">
                <div className="flex flex-col w-1/2">
                  <InputField
                    label={"Customer Name:"}
                    id={"customer_name"}
                    type={"text"}
                    placeholder={"Enter Name"}
                    validation={{
                      required: {
                        value: true,
                        message: "Name is required",
                      },
                    }}
                    name={"customer_name"}
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <InputField
                    label={"Customer phone:"}
                    id={"customer_phone"}
                    type={"number"}
                    placeholder={"Enter Phone number"}
                    validation={{
                      required: {
                        value: true,
                        message: "phone number is required",
                      },
                    }}
                    name={"customer_phone"}
                  />
                </div>
              </div>
              <div className="mt-2  flex gap-2 ">
                <div className="flex flex-col w-3/4">
                  <InputField
                    label={"Customer Address:"}
                    id={"customer_address"}
                    type={"text"}
                    placeholder={"Enter Address"}
                    validation={{
                      required: {
                        value: true,
                        message: "Address is required",
                      },
                    }}
                    name={"customer_address"}
                  />
                </div>

                <div className=" w-1/4 flex justify-center items-center mt-6">
                  <ImageUploader onUploadSuccess={handleUploadSuccess} />
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <SubmitBtn
                  onClick={onSubmit}
                  isLoading={isLoading}
                  label="Add Shipment"
                />
              </div>
              <div
                className={`mt-2 text-center ${
                  responseError ? "block" : "hidden"
                } text-sm md:text-lg font-bold text-red-500`}
              >
                {responseError}
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </section>
  );
};
export default AddShipments;
