// useAuth.ts
import { useEffect, useState } from "react";
import apiClient from "../Services/apiClient";

const useAuth = (): { authData: AuthData | null; loading: boolean } => {
  const [authData, setAuthData] = useState<AuthData | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/auth/session");
        setAuthData({
          isAdmin: response.data.isAdmin,
          id: response.data.id,
        });
        setLoading(false);
      } catch (error) {
        setAuthData(null);
        setLoading(false);
      }
    };

    fetchAuthData();
  }, []);

  return { authData, loading };
};

export default useAuth;
