import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { LogoutUser } from "../constants/utilities";
import { useDispatch } from "react-redux";
import { logoutUser } from "../reducers/authReducer";

export const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    LogoutUser();
    dispatch(logoutUser());
  }, [LogoutUser]);

  return <Navigate to="/login" />;
};
