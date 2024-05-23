import { Navigate, Outlet } from "react-router-dom";
import { getJWTToken } from "../constants/utilities";

const privateRouter = () => {
  const token = getJWTToken();
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default privateRouter;
