import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import InputField from "../Inputs/InputField";
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register, verifySentData } from "../../Services/apiQuery";

export default function Register() {
  const methods = useForm();
  const navigate = useNavigate();
  const [responseError, setResponseError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const onSubmit = methods.handleSubmit(async (data) => {
    setisLoading(true);
    if (data.password !== data.confirmpass) {
      setResponseError("Passwords do not match");
      setisLoading(false);
      return;
    }
    try {
      const response = await register(data);
      if (response.statusText === "OK") {
        const data = response.data;
        const responseVerify = await verifySentData(data);
        console.log(responseVerify);
        if (responseVerify.statusText === "OK") {
          navigate("/verification");
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
      <div className="md:w-1/2 bg-white border-1 rounded-lg flex justify-center flex-col p-5">
        <h2 className="text-lg md:text-2xl text-center font-bold mb-2">
          Register Account
        </h2>
        <FormProvider {...methods}>
          <form action="POST" onSubmit={(e) => e.preventDefault()} noValidate>
            <div>
              <div className="mt-4  flex gap-2 justify-between">
                <div className="flex flex-col w-1/3">
                  <InputField
                    label={"Firstname:"}
                    id={"fname"}
                    type={"text"}
                    placeholder={"Enter Firstname"}
                    validation={{
                      required: {
                        value: true,
                        message: "Firstname is required",
                      },
                    }}
                    name={"fname"}
                  />
                </div>
                <div className="flex flex-col w-1/3">
                  <InputField
                    label={"Lastname:"}
                    id={"lname"}
                    type={"text"}
                    placeholder={"Enter Lastname"}
                    validation={{
                      required: {
                        value: true,
                        message: "Lastname is required",
                      },
                    }}
                    name={"lname"}
                  />
                </div>
                <div className="flex flex-col w-1/3">
                  <InputField
                    label={"Mobile number:"}
                    id={"mobilenumber"}
                    type={"number"}
                    placeholder={"Enter Mobile number"}
                    validation={{
                      required: {
                        value: true,
                        message: "mobile number is required",
                      },
                    }}
                    name={"mobilenumber"}
                  />
                </div>
              </div>
              <div className="mt-2  flex gap-2">
                <div className="flex flex-col w-1/2">
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
                <div className="flex flex-col w-1/2">
                  <InputField
                    label={"Birth date:"}
                    id={"dateofbirth"}
                    type={"date"}
                    placeholder={""}
                    validation={{
                      required: {
                        value: true,
                        message: "Date is required",
                      },
                    }}
                    name={"dateofbirth"}
                  />
                </div>
              </div>
              <div className="mt-2  flex gap-2">
                <div className="flex flex-col w-1/2">
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
                <div className="flex flex-col w-1/2">
                  <InputField
                    label={"Confirm Password:"}
                    id={"confirmpass"}
                    type={"password"}
                    placeholder={"***********"}
                    validation={{
                      required: {
                        value: true,
                        message: "Confirm Password is required",
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
                    name={"confirmpass"}
                  />
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  onClick={onSubmit}
                  className="flex justify-center w-full mb-4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
                >
                  {isLoading ? <TailSpin width={28} height={20} /> : "Sign In"}
                </button>
              </div>
              <div
                className={`mt-2 text-center ${
                  responseError ? "block" : "hidden"
                } text-sm md:text-lg font-bold text-red-500`}
              >
                {responseError}
              </div>
              <p className="text-sm font-light mt-4 text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="/"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign Up
                </a>
              </p>
            </div>
          </form>
        </FormProvider>
      </div>
    </section>
  );
}
