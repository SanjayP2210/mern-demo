import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, removeUser } from "../reducers/userReducer";
// import Loader from "../components/Loader/Loader";
import Loader from "../components/Loader/Loader";
import { FaEdit, FaTrash } from "react-icons/fa";

export const User = () => {
  const [userList, setUserList] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, users, status, isUserDeleted } = useSelector(
    (state) => {
      return state.user;
    }
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    if (!loading && users) {
      setUserList(users || []);
    }
  }, [users]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (isUserDeleted) {
      dispatch(fetchUsers());
    }
  }, [isUserDeleted]);

  return (
    <>
      <Loader // Type of spinner
        visible={loading}
      />
      {status != "loading" && (
        <section>
          <div className="contact-content container">
            <h1 className="main-heading">User List</h1>
          </div>
          <div className="container">
            <table className="table border">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile Number</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {status != "loading" &&
                  userList.map((data) => (
                    <tr key={data?._id.toString()}>
                      <td>{data?.userName}</td>
                      <td>{data?.email}</td>
                      <td>{data?.mobileNumber}</td>
                      <td>{data?.isAdmin ? "Admin" : "User"}</td>
                      <td>
                        <button
                          style={{ marginRight: "10px" }}
                          className="btn btn-primary"
                          onClick={() => {
                            navigate(`/admin/user/${data._id}/edit`);
                          }}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            // deleteUser(data?._id.toString());
                            dispatch(removeUser(data?._id));
                          }}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </>
  );
};
