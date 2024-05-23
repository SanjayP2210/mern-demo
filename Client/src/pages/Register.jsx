// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "../reducers/userReducer";

export const Register = () => {
  const dispatch = useDispatch();
  const { isUserAdded } = useSelector((state) => state.user);
  // const users = useSelector((state) => state.users.users);
  // const status = useSelector((state) => state.users.status);
  // const error = useSelector((state) => state.users.error);
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    mobileNumber: "",
  });
  const navigate = useNavigate();

  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };

  useEffect(() => {
    if (isUserAdded) {
      setUser({
        userName: "",
        email: "",
        password: "",
        mobileNumber: "",
      });
      navigate("/login");
    }
  }, [isUserAdded]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("user", user);

    try {
      // const response = await fetch("http://localhost:3001/api/user/register", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(user),
      // });
      // const data = await response.json();
      // if (response.status === 201) {
      //   toast.success(data.message);
      //   storeTokenInLS(data.token);
      //   setUser({
      //     userName: "",
      //     email: "",
      //     password: "",
      //     mobileNumber: "",
      //   });
      //   navigate("/login");
      // } else {
      //   toast.error(data.message);
      // }
      dispatch(addUser(user));
    } catch (error) {
      console.log("getting error while submitting");
      toast.error(error.message);
    }
  };
  return (
    <>
      <section>
        <main>
          <div className="contact-content container">
            <h1 className="main-heading">Registration form</h1>
          </div>
          <div className="section-registration">
            <div className="main-container grid grid-two-cols">
              {/* let tackle registration form  */}
              <div className="registration-form">
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="userName">userName</label>
                    <input
                      type="text"
                      name="userName"
                      placeholder="userName"
                      id="userName"
                      required
                      autoComplete="off"
                      value={user.userName}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="enter your email"
                      id="email"
                      required
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="mobileNumber">mobileNumber</label>
                    <input
                      type="number"
                      name="mobileNumber"
                      placeholder="mobileNumber"
                      id="mobileNumber"
                      required
                      autoComplete="off"
                      value={user.mobileNumber}
                      maxLength={10}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      id="password"
                      required
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>

                  <br />
                  <button type="submit" className="btn btn-submit">
                    Register Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
