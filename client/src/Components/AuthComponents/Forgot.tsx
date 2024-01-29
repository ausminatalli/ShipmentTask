import axios from "axios";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import InputField from "../Inputs/InputField";
import { forgotPassword, sendResetEmail } from "../../Services/apiQuery";

export default function Forgot() {
  const methods = useForm();
  const navigate = useNavigate();
  const [responseError, setResponseError] = useState("");
  const [isLoading, setisLoading] = useState<Boolean>(false);
  const onSubmit = methods.handleSubmit(async (data) => {
    setisLoading(true);
    try {
      const response = await forgotPassword(data);
      if (response.statusText === "OK") {
        const sendEmail = await sendResetEmail(response.data);
        if (sendEmail.statusText === "OK") {
          navigate("/resetmessage");
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
    <section className="bg-slate-50 h-screen flex justify-center items-center ">
      <div className="md:w-1/3 bg-white border-1 rounded-lg flex justify-center flex-col p-5">
        <h2 className="text-lg md:text-2xl text-center font-bold mb-2">
          Forgot Password
        </h2>
        <FormProvider {...methods}>
          <form action="POST" onSubmit={(e) => e.preventDefault()} noValidate>
            <div>
              <div className="mt-2">
                <InputField
                  label={"Email:"}
                  id={"email"}
                  type={"email"}
                  placeholder={"Enter Email"}
                  validation={{
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                    pattern: {
                      value: /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Invalid email address",
                    },
                  }}
                  name={"email"}
                />
              </div>
              <div className="flex justify-end mt-1">
                <a
                  href="/"
                  className="text-sm font-bold text-blue-600 hover:underline dark:text-blue-500 mt-1"
                >
                  Sign In?
                </a>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  onClick={onSubmit}
                  className="w-full mb-4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex justify-center"
                >
                  {isLoading ? <TailSpin width={28} height={20} /> : "Submit"}
                </button>
              </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="./register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
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
      </div>
    </section>
  );
}
