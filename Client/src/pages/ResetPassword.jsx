import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader/Loader";
import apiService from "../service/apiService";
import { getJWTToken } from "../constants/utilities";
import { useSelector } from "react-redux";

function ResetPassword() {
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const JWTToken = getJWTToken();
  const { loginUserData, isLoggedIn } = useSelector((state) => state.auth);
  const [data, setData] = useState({
    token: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!params?.token && !JWTToken) {
      if (JWTToken) {
        setData({ token: params.token });
      } else {
        toast.error("Invalid Token");
        navigate("/login");
      }
    } else {
      setData({ token: params.token });
    }
    setLoading(false);
  }, [params]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (data?.password !== data?.confirmPassword) {
        toast.error("password and confirm password does not matched");
        return;
      }
      setLoading(true);
      const payload = data;
      if (JWTToken) {
        payload.JWTToken = JWTToken;
        payload.email = loginUserData.email;
      }
      const response = await apiService.postRequest(
        "user/reset-password",
        payload
      );
      if (!response.isError) {
        toast.success(response.message);
        setLoading(false);
        navigate("/login");
      } else {
        setLoading(false);
      }
    } catch (error) {
      toast.error("error while reset password", error);
      setLoading(false);
    }
  };
  return (
    <>
      <Loader visible={loading} />
      <section>
        <main>
          <div className="container">
            <div className="contact-content">
              <h1 className="main-heading">Reset Password</h1>
            </div>
            {/* <h1 className="main-heading mb-3">login form</h1> */}
            <div className="section-registration">
              <div className="main-container grid grid-two-cols">
                {/* let tackle registration form  */}
                <div className="registration-form">
                  <form onSubmit={handleSubmit}>
                    {JWTToken && (
                      <div>
                        <label htmlFor="password">Old password</label>
                        <input
                          type="password"
                          name="oldPassword"
                          placeholder="oldPassword"
                          id="oldPassword"
                          required
                          autoComplete="off"
                          value={data.oldPassword}
                          onChange={handleInput}
                        />
                      </div>
                    )}
                    <div>
                      <label htmlFor="password">password</label>
                      <input
                        type="password"
                        name="password"
                        placeholder="password"
                        id="password"
                        required
                        autoComplete="off"
                        value={data.password}
                        onChange={handleInput}
                      />
                    </div>

                    <div>
                      <label htmlFor="confirmPassword">confirm password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="confirmPassword"
                        id="confirmPassword"
                        required
                        autoComplete="off"
                        value={data.confirmPassword}
                        onChange={handleInput}
                      />
                    </div>

                    <br />
                    <button type="submit" className="btn btn-submit">
                      Reset Password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}

export default ResetPassword;
