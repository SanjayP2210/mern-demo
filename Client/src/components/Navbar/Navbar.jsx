import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";
import { useSelector } from "react-redux";
import { LogoutSVG } from "../../assets/images/svg/LogoutSVG.jsx";
import { LoginSVG } from "../../assets/images/svg/LoginSVG.jsx";

export const Navbar = () => {
  const { isAdmin, isLoggedIn } = useSelector((state) => state.login);
  const location = useLocation();
  console.log("location", location);
  return (
    <>
      <header>
        <div className="nav-container">
          <div className="logo-brand">
            <NavLink to="/">
              <h3>MERN Demo</h3>
            </NavLink>
          </div>
          <nav>
            <ul>
              <li>
                <NavLink to="/"> Home </NavLink>
              </li>
              {isLoggedIn ? (
                <>
                  <li>
                    <NavLink
                      className={
                        location.pathname.includes("book") ? "active" : ""
                      }
                      activeclassname="active"
                      to="/book"
                    >
                      {" "}
                      Book{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      activeclassname="active"
                      className={
                        location.pathname.includes("author") ? "active" : ""
                      }
                      to="/author"
                    >
                      {" "}
                      Author{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/contact"
                      activeclassname="active"
                      className={
                        location.pathname.includes("contact") ? "active" : ""
                      }
                    >
                      {" "}
                      Contact{" "}
                    </NavLink>
                  </li>
                  {isAdmin && (
                    <li>
                      <NavLink
                        to="/admin/users"
                        activeclassname="active"
                        className={
                          location.pathname.includes("user") ? "active" : ""
                        }
                      >
                        Users
                      </NavLink>
                    </li>
                  )}
                  <li>
                    <NavLink to="/profile" activeclassname="active">
                      {" "}
                      Profile{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/logout" className="tooltip">
                      {" "}
                      <span className="tooltip-text ">Log Out</span>
                      <LogoutSVG height="22px" width="22px" />{" "}
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/contact"
                      activeclassname="active"
                      className={
                        location.pathname.includes("contact") ? "active" : ""
                      }
                    >
                      {" "}
                      Contact{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/register"> Register </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login" className="tooltip">
                      {" "}
                      <span className="tooltip-text ">Sign In</span>
                      <LoginSVG height="22px" width="22px" />{" "}
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
