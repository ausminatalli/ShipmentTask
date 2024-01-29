import axios from "axios";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import InputField from "../Inputs/InputField";
import apiClient from "../../Services/apiClient";
import { useParams } from "react-router-dom";

export default function Reset() {
  const methods = useForm();
  const { emailToken } = useParams();
  const navigate = useNavigate();
  const [responseError, setResponseError] = useState("");
  const [isLoading, setisLoading] = useState<Boolean>(false);
  const [tokenStatus, setTokenStatus] = useState<Users | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await apiClient.get(`/auth/checkToken/${emailToken}`);
        if (response.statusText === "OK") setTokenStatus(response.data);
      } catch (error) {
      }
    };

    checkToken();
  }, [emailToken]);
  const onSubmit = methods.handleSubmit(async (data) => {
    setisLoading(true);
    if (data.password !== data.passrepeat) {
      setResponseError("Passwords do not match");
      setisLoading(false);
      return;
    }
    try {
      const response = await apiClient.post(
        `/auth/changepassword/${emailToken}`,
        data
      );
      if (response.statusText === "OK") {
        navigate("/");
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
    <section className="bg-slate-50 h-screen flex justify-center items-center ">
      <div className="md:w-1/3 bg-white border-1 rounded-lg flex justify-center flex-col p-5">
        {tokenStatus === null ? (
          <div className="text-center text-4xl text-red-500 font-bold">
            Link not Supported
          </div>
        ) : (
          <FormProvider {...methods}>
            <h2 className="text-lg md:text-2xl text-center font-bold mb-2">
              Change Password
            </h2>
            <form action="POST" onSubmit={(e) => e.preventDefault()} noValidate>
              <div>
                <div className="mt-2">
                  <InputField
                    label={"Password:"}
                    id={"password"}
                    type={"password"}
                    placeholder={"***********"}
                    validation={{
                      required: {
                        value: true,
                        message: "Password is required",
                      },
                      minLength: {
                        value: 8,
                        message: "min 8 characters",
                      },
                      maxLength: {
                        value: 50,
                        message: "max 50 characters",
                      },
                      pattern: {
                        value: /^(?=.*[A-Z])(?=.*\d)(?=.*[$%^#@!]).*$/,
                        message:
                          "Must have at least one capital letter, one number, and one of special character",
                      },
                    }}
                    name={"password"}
                  />
                </div>
                <div className="mt-2">
                  <InputField
                    label={"Repeat Password:"}
                    id={"passrepeat"}
                    type={"password"}
                    placeholder={"***********"}
                    validation={{
                      required: {
                        value: true,
                        message: "Repeat Password is required",
                      },
                      minLength: {
                        value: 8,
                        message: "min 8 characters",
                      },
                      maxLength: {
                        value: 50,
                        message: "max 50 characters",
                      },
                      pattern: {
                        value: /^(?=.*[A-Z])(?=.*\d)(?=.*[$%^#@!]).*$/,
                        message:
                          "Must have at least one capital letter, one number, and one of special character",
                      },
                    }}
                    name={"passrepeat"}
                  />
                </div>

                <div className="flex justify-center mt-4">
                  <button
                    onClick={onSubmit}
                    className="w-full mb-4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex justify-center"
                  >
                    {isLoading ? <TailSpin width={28} height={20} /> : "Submit"}
                  </button>
                </div>
                <div
                  className={`mt-2 text-center ${
                    responseError ? "block" : "hidden"
                  } text-sm md:text-md font-bold text-red-500`}
                >
                  {responseError}
                </div>
              </div>
            </form>
          </FormProvider>
        )}
      </div>
    </section>
  );
}
