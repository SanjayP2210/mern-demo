import { Navigate, Outlet } from "react-router-dom";
import { getJWTToken } from "../constants/utilities";
import { toast } from "react-toastify";

const privateRouter = () => {
  const token = getJWTToken();
  if (!token) {
    toast.error("token not available.please login again");
  }
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default privateRouter;
