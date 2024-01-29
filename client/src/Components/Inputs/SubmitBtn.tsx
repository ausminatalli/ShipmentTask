import { FC, ReactNode, MouseEvent } from "react";
import { TailSpin } from "react-loader-spinner";

interface SubmitButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  isLoading: boolean;
  label: ReactNode;
}

const SubmitBtn: FC<SubmitButtonProps> = ({ onClick, isLoading, label }) => {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center  w-full mb-4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 `}
    >
      {isLoading ? <TailSpin width={28} height={20} /> : label}
    </button>
  );
};

export default SubmitBtn;
