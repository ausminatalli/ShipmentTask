import { useNavigate } from "react-router-dom";
import apiClient from "../Services/apiClient";

const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await apiClient.get("/auth/logout");
      if (response.statusText === "OK") {
        navigate("/");
      }
    } catch (error) {
      // throw error;
    }
  };

  return { logout };
};

export default useLogout;
