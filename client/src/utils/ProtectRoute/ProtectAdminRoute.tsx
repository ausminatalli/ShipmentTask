import { Navigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

export type ProtectedRouteProps = {
  outlet: JSX.Element;
};

export default function ProtectedAdminRoute({ outlet }: ProtectedRouteProps) {
  const { authData, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }
  if (authData?.isAdmin) {
    return outlet;
  } else {
    return <Navigate to={{ pathname: "/" }} />;
  }
}
