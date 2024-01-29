// useAuth.ts
import { useEffect, useState } from "react";
import { getSession } from "../Services/apiQuery";

const useAuth = (): { authData: AuthData | null; loading: boolean } => {
  const [authData, setAuthData] = useState<AuthData | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        setLoading(true);
        const response = await getSession();
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
