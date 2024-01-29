import { useNavigate } from "react-router-dom";
import { loggingOut } from "../Services/apiQuery";

const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await loggingOut();
      if (response.statusText === "OK") {
        navigate("/");
      }
    } catch (error) {
      throw error;
    }
  };

  return { logout };
};

export default useLogout;
