import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiService from "../service/apiService";
import Loader from "../components/Loader/Loader";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { loginUserData: user } = useSelector((state) => state.login);
  const [technology, setTechnology] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    const fetchTechnology = async () => {
      const response = await apiService.getRequest("technology");
      const techs =
        response?.Technology.filter((x) =>
          user?.technology?.includes(x?._id)
        ) || [];
      setTechnology(techs);
      setIsLoading(false);
    };
    fetchTechnology();
  }, []);

  return (
    <>
      <Loader visible={isLoading} />
      <main>
        <section>
          <div className="section-profile">
            <div className="profile-container">
              <div className="profile-card">
                <div className="container grid grid-two-cols">
                  <div className="profile-image">
                    <img
                      src={`${
                        user?.image
                          ? `http://localhost:3001/${user.image}`
                          : null
                      }`}
                      alt="profile image"
                    />
                  </div>
                  <div className="profile-details">
                    {/* <h1 className="main-heading mb-3">User Details</h1> */}
                    <p className="user-name">{user?.userName}</p>
                    <br />
                    <p>{user?.email}</p>
                    <br />
                    <p>{user?.mobileNumber}</p>
                    <br />
                    <div className="technology-div">
                      {technology.map((item, index) => {
                        return <p key={index}>{item.name}</p>;
                      })}
                    </div>
                    <br />
                    <div>
                      <button
                        type="button"
                        className="btn"
                        style={{ marginRight: "10px" }}
                        onClick={() => {
                          navigate(`/admin/user/${user._id}/edit`);
                        }}
                      >
                        <FaEdit />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Profile;
