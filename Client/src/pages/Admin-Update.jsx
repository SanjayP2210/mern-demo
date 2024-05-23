import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersById, updateUser } from "../reducers/userReducer";
import Loader from "../components/Loader/Loader";

export const AdminUpdate = () => {
  const [data, setData] = useState({
    userName: "",
    email: "",
    mobileNumber: "",
  });
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { userData, isUserUpdated, loading } = useSelector(
    (state) => state.user
  );
  const userID = params.id;

  useEffect(() => {
    dispatch(fetchUsersById(userID));
  }, [userID]);

  useEffect(() => {
    if (userData) setData(userData);
    console.log("userData", userData);
  }, [userData]);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setData({
      ...data,
      [name]: value,
    });
  };

  useEffect(() => {
    if (isUserUpdated) {
      navigate("/admin/users");
    }
  }, [isUserUpdated]);

  // to udpate the data dynamically
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUser(data, userID));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Update User Data</h1>
        </div>
        {/* contact page main  */}
        <div className="container main-container grid grid-two-cols">
          {/* contact form content actual  */}
          <section className="section-form">
            {!data?._id && <>Loading..</>}
            {data?._id && (
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="userName">userName</label>
                  <input
                    type="text"
                    name="userName"
                    id="userName"
                    autoComplete="off"
                    value={data.userName}
                    onChange={handleInput}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email">email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="off"
                    value={data.email}
                    onChange={handleInput}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="mobileNumber">Mobile</label>
                  <input
                    type="mobileNumber"
                    name="mobileNumber"
                    id="mobileNumber"
                    autoComplete="off"
                    value={data.mobileNumber}
                    onChange={handleInput}
                    maxLength={10}
                    required
                  />
                </div>

                <div>
                  <button
                    type="button"
                    className="btn"
                    style={{ marginRight: "10px" }}
                    onClick={() => {
                      navigate("/admin/users");
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit">Update</button>
                </div>
              </form>
            )}
          </section>
        </div>
      </section>
    </>
  );
};
