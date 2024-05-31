import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUsersById, updateUser } from "../reducers/userReducer";
import { addUser, resetState } from "../reducers/authReducer.js";
import apiService from "../service/apiService.js";
import UploadImage from "../components/UploadImage/UploadImage";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Loader from "../components/Loader/Loader.jsx";

const animatedComponents = makeAnimated();

export const UserForm = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    mobileNumber: "",
    technology: [],
    isAdmin: false,
  });
  const [technology, setTechnology] = useState([]);
  const [image, setImage] = useState(null);
  const { userData, isUserUpdated, loading } = useSelector(
    (state) => state.user
  );
  const { isAdmin, isLoggedIn } = useSelector((state) => state.auth);
  const { loginUserData, isUserAdded } = useSelector((state) => state.auth);
  const roleOptions = [
    { label: "Admin", value: true },
    { label: "User", value: false },
  ];
  const userID = params?.id;

  useEffect(() => {
    if (!isEdit) return;
    dispatch(fetchUsersById(userID));
    setImage(null);
  }, [userID]);

  useEffect(() => {
    if (userData) {
      setImage(userData?.image);
      const ids = userData?.technology?.map((x) => x._id);
      setData({
        ...userData,
        technology: ids,
      });
    }
  }, [userData]);

  useEffect(() => {
    if (technology?.length > 0) {
      const filterdList =
        userData?.technology?.map((x) => {
          return { label: x.name, value: x.name, _id: x._id };
        }) || [];
      console.log("filterdList", filterdList);
      setSelectedTechnology(filterdList);
    }
  }, [technology]);

  useEffect(() => {
    const fetchTechnology = async () => {
      const response = await apiService.getRequest("technology");
      setTechnology(
        response?.Technology.map((x) => {
          return { label: x.name, value: x.name, _id: x._id };
        }) || []
      );
    };
    fetchTechnology();
  }, []);

  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({
      ...data,
      [name]: value,
    });
  };

  useEffect(() => {
    if (isUserUpdated) {
      toast.success("User Updated Successfully");
      navigate("/admin/users");
    }
  }, [isUserUpdated]);

  useEffect(() => {
    if (isUserAdded) {
      setData({
        userName: "",
        email: "",
        password: "",
        mobileNumber: "",
      });
      dispatch(resetState());
      navigate("/login");
    }
  }, [isUserAdded]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("data", data);

    try {
      if (selectedTechnology?.length === 0) {
        toast.error("select any technology");
        return;
      } else {
        const slectedIds = selectedTechnology?.map((x) => x._id);
        console.log("slectedIds", slectedIds);
      }
      if (!image) {
        toast.error("User Image is required");
        return;
      }
      const formData = new FormData();
      const formKeys = Object.keys(data);
      formKeys.forEach((key) => {
        formData.append(key, data[key]);
      });
      formData.append("image", image);
      if (isEdit) {
        dispatch(updateUser({ formData: formData, userID: userData?._id }));
      } else {
        dispatch(addUser(formData));
      }
    } catch (error) {
      console.log("getting error while submitting");
      toast.error(error.message);
    }
  };

  const [selectedTechnology, setSelectedTechnology] = useState([]);
  const onSelectRole = (newValue, actionMeta) => {
    console.log("newValue", newValue);
    setData({
      ...data,
      isAdmin: newValue.value,
    });
  };

  const onSelectTechnologies = (newValue, actionMeta) => {
    switch (actionMeta.action) {
      case "remove-value":
      case "pop-value":
        if (actionMeta.removedValue.isFixed) {
          return;
        }
        break;
      case "clear":
        newValue = technology.filter((v) => v.isFixed);
        break;
    }
    console.log("newValue", newValue);
    setSelectedTechnology(newValue);
    setData({
      ...data,
      technology: newValue.map((x) => x._id),
    });
  };

  const renderButton = () => {
    let content = <></>;
    if (isEdit) {
      content = (
        <>
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
          <button type="submit" className="btn btn-submit">
            Update
          </button>
        </>
      );
    } else {
      content = (
        <button type="submit" className="btn btn-submit">
          Register Now
        </button>
      );
    }
    return content;
  };

  return (
    <>
      <Loader visible={loading} />
      <section>
        <main>
          <div className="container">
            <div className="contact-content">
              <h1 className="main-heading">
                {isEdit ? "User Form" : "Registration form"}
              </h1>
            </div>
            <div className="section-registration">
              <div className="main-container grid grid-two-cols">
                {/* let tackle registration form  */}
                <div className="registration-form">
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="userName">User Name</label>
                      <input
                        type="text"
                        name="userName"
                        placeholder="userName"
                        id="userName"
                        required
                        autoComplete="off"
                        value={data.userName}
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
                        value={data.email}
                        onChange={handleInput}
                      />
                    </div>
                    <div>
                      <label htmlFor="mobileNumber">mobile Number</label>
                      <input
                        type="number"
                        name="mobileNumber"
                        placeholder="mobileNumber"
                        id="mobileNumber"
                        required
                        autoComplete="off"
                        value={data.mobileNumber}
                        maxLength={10}
                        onChange={handleInput}
                      />
                    </div>
                    {!isLoggedIn && (
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
                    )}
                    {isAdmin && (
                      <div>
                        <label htmlFor="authorId">Role</label>
                        <Select
                          id="isAdmin"
                          name="isAdmin"
                          value={
                            data?.isAdmin ? roleOptions[0] : roleOptions[1]
                          }
                          options={roleOptions}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              backgroundColor: "black",
                              borderColor: state.isFocused ? "grey" : "white",
                              fontSize: "14px",
                              container: "black",
                            }),
                          }}
                          theme={(theme) => ({
                            ...theme,
                            borderRadius: 8,
                            colors: {
                              ...theme.colors,
                              primary25: "#b5b5b55e",
                              primary: "#b5b5b55e",
                            },
                          })}
                          onChange={onSelectRole}
                          className="react-select-container"
                          classNamePrefix="react-select"
                        />
                      </div>
                    )}
                    <div>
                      <label htmlFor="authorId">Technology</label>
                      <Select
                        id="technology"
                        name="technology"
                        value={selectedTechnology}
                        closeMenuOnSelect={true}
                        components={animatedComponents}
                        isMulti
                        options={technology}
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            backgroundColor: "black",
                            borderColor: state.isFocused ? "grey" : "white",
                            fontSize: "14px",
                            container: "black",
                            fontColor: "blue",
                            color: "blue",
                          }),
                        }}
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: 8,
                          colors: {
                            ...theme.colors,
                            primary25: "#b5b5b55e",
                            primary: "white",
                          },
                        })}
                        onChange={onSelectTechnologies}
                        className="react-select-container"
                        classNamePrefix="react-select"
                      />
                    </div>
                    <div>
                      <br />
                      <UploadImage
                        setImage={setImage}
                        image={userData?.image || null}
                        data={userData}
                      />
                      {/* <UploadImage setImage={setImage} image={null} data={null} /> */}
                    </div>
                    <br />
                    {renderButton()}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
