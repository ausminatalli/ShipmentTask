import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Outlet,
} from "react-router-dom";
import Login from "./Components/AuthComponents/Login";
import Nav from "./Components/Layouts/main/Nav";
import Register from "./Components/AuthComponents/Register";
import AdminNav from "./Components/Layouts/admin/AdminNav";
import "react-toastify/dist/ReactToastify.css";
import UserNav from "./Components/Layouts/user/UserNav";
import ViewShippments from "./Components/UserComponents/Shippments/ViewShipments";
import ToastProvider from "./utils/ToastProvider";
import ViewAdminShippments from "./Components/AdminComponents/ViewShipments";
import Track from "./Components/UserComponents/Track/Track";
import Forgot from "./Components/AuthComponents/Forgot";
import Verification from "./Components/AuthComponents/Verfication";
import ForgotMessage from "./Components/AuthComponents/ForgotMessage";
import ViewUsers from "./Components/AdminComponents/ViewUsers";
import Reset from "./Components/AuthComponents/Reset";
import ProtectedAdminRoute from "./utils/ProtectRoute/ProtectAdminRoute";
import ProtectedUserRoute from "./utils/ProtectRoute/ProtectUserRoute";

function AdminLayout() {
  return (
    <>
      <AdminNav />
      <ToastProvider>
        <Outlet />
      </ToastProvider>
    </>
  );
}
function MainLayout() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

function UserLayout() {
  return (
    <>
      <UserNav />
      <ToastProvider>
        <Outlet />
      </ToastProvider>
    </>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="track" element={<Track />} />
        <Route path="forgotpassword" element={<Forgot />} />
        <Route path="verification" element={<Verification />} />
        <Route path="resetmessage" element={<ForgotMessage />} />
        <Route path="/reset/:emailToken" element={<Reset />} />
      </Route>

      <Route
        path="/admin"
        element={<ProtectedAdminRoute outlet={<AdminLayout />} />}
      >
        <Route index element={<ViewAdminShippments />} />
        <Route path="users" element={<ViewUsers />} />
      </Route>

      <Route
        path="/user"
        element={<ProtectedUserRoute outlet={<UserLayout />} />}
      >
        <Route index element={<ViewShippments />} />
        <Route path="track" element={<Track />} />
      </Route>
    </>
  )
);
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
