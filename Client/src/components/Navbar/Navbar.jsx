import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const { isAdmin, isLoggedIn } = useSelector((state) => state.login);

  return (
    <>
      <header>
        <div className="container">
          <div className="logo-brand">
            <NavLink to="/">Mern Demo</NavLink>
          </div>

          <nav>
            <ul>
              <li>
                <NavLink to="/"> Home </NavLink>
              </li>
              <li>
                <NavLink to="/book"> Book </NavLink>
              </li>
              <li>
                <NavLink to="/author"> Author </NavLink>
              </li>
              {isAdmin ? (
                <>
                  <li>
                    <NavLink to="/admin/contacts"> Contact </NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin/users">Users</NavLink>
                  </li>
                </>
              ) : (
                <li>
                  <NavLink to="/contact"> Contact </NavLink>
                </li>
              )}
              {isLoggedIn ? (
                <li>
                  <NavLink to="/logout">Logout</NavLink>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/register"> Register </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login"> Login </NavLink>
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
