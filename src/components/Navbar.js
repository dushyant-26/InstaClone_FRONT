import React from "react";
import { Link } from "react-router-dom";
import CreatePost from "./CreatePost";
import { faHome, faCompass } from "@fortawesome/free-solid-svg-icons";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../redux/user/userAction";
import SearchUser from "./SearchUser";
import { toast } from "react-toastify";

function Navbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const logout = () => {
    localStorage.clear();
    dispatch(deleteUser());
    toast.success("Logged Out Successfully");
  };
  const activeClass = "nav-link active";
  const nonActiveClass = "nav-link";
  const path = window.location.pathname;

  return user ? (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid navUpdate">
          <Link className="navbar-brand" to="/">
            <h1 className="my-0">Instagram</h1>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <div className="nav-link">
                  <SearchUser />
                </div>
              </li>
              <li className="nav-item">
                <Link
                  className={path === "/" ? activeClass : nonActiveClass}
                  aria-current="page"
                  to="/"
                >
                  <FontAwesomeIcon icon={faHome} />
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={path === "/chat" ? activeClass : nonActiveClass}
                  to="/chat"
                >
                  <FontAwesomeIcon icon={faFacebookMessenger} />
                </Link>
              </li>
              <li className="nav-item">
                <div className="nav-link">
                  <CreatePost />
                </div>
              </li>
              <li className="nav-item">
                <Link
                  className={path === "/explore" ? activeClass : nonActiveClass}
                  to="/explore"
                >
                  <FontAwesomeIcon icon={faCompass} />
                </Link>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={user?.profilePic}
                    alt="pic"
                    style={{
                      borderRadius: "50%",
                      height: "30px",
                      width: "30px",
                      border: "1px",
                    }}
                  />
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Saved
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/signin">
                      <button className="default" onClick={logout}>
                        LogOut
                      </button>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  ) : (
    <></>
  );
}

export default Navbar;
