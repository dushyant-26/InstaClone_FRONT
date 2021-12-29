import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserTie,
  faEnvelope,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { BACK_END_DOMAIN } from "../appConstants";

function SignUp() {
  const [details, setDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      navigate("/", { replace: true });
    }
    // eslint-disable-next-line
  }, []);
  const updateDetails = (e) => {
    const { name, value } = e.target;

    setDetails({
      ...details,
      [name]: value,
    });
  };

  const validateUsername = async (e) => {
    try {
      var result = await fetch(`${BACK_END_DOMAIN}/validateUsername`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: e ? e.target.value : details.username,
        }),
      });
      result = await result.json();
      if (result.error) {
        toast.error(result.error);
        return { usernameAvailable: false };
      }
      return { usernameAvailable: true };
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const checkValidations = async () => {
    const { username, name, email, password, cpassword } = details;

    const emailRegex = new RegExp(
      "^[a-zA-Z0-9\\._]+[a-zA-Z0-9]+@[a-zA-Z0-9]+[a-zA-Z0-9-]*(?:\\.[a-zA-Z0-9]+)*$"
    );
    if (!username || !name || !email || !password || !cpassword) {
      return {
        message: "Please Complete all the Fields",
        error: true,
        showError: true,
      };
    }

    var result = await validateUsername();
    if (!result.usernameAvailable) {
      return {
        message: "Username already taken",
        error: true,
        showError: false,
      };
    }

    if (!emailRegex.test(email)) {
      return { message: "Invalid Email Address", error: true, showError: true };
    }
    if (password.length < 6) {
      return {
        message: "Password length should be 6 or more.",
        error: true,
        showError: true,
      };
    }
    if (password !== cpassword) {
      return {
        message: "Passwords doesn't match",
        error: true,
        showError: true,
      };
    }
    return { message: "Ok", error: false };
  };

  const submitDetails = async () => {
    var result = await checkValidations();

    if (result.error) {
      if (result.showError) {
        toast.error(result.message);
      }
      return;
    }

    fetch(`${BACK_END_DOMAIN}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
          return;
        }
        toast.success(data.message);
        navigate("/signin", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="loginSection container-fluid">
      <div className="row my-5" style={{ height: "700px" }}>
        <div className="col-md-6 col-lg-4 ms-auto offset-lg-2 me-0 my-5">
          <img
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
            alt=""
            width="100%"
            height="100%"
            style={{ borderRadius: "5px" }}
            className=""
          />
        </div>
        <div className="col-md-6 col-lg-4  ms-0 me-auto my-5">
          <div className="card text-center">
            <h1 className="card-header insta-font">Instagram</h1>
            <div className="card-body">
              <div className="mb-3 input-group ">
                <span className="input-group-text " id="basic-addon1">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <div className="form-floating flex-grow-1">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput1"
                    name="username"
                    value={details.username}
                    onChange={updateDetails}
                    onBlur={validateUsername}
                    placeholder="Enter Username"
                  />

                  <label for="floatingInput1">Username</label>
                </div>
              </div>
              <div className="mb-3 input-group">
                <span className="input-group-text" id="basic-addon1">
                  <FontAwesomeIcon icon={faUserTie} />
                </span>
                <div className="form-floating flex-grow-1">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput2"
                    name="name"
                    value={details.name}
                    onChange={updateDetails}
                    placeholder="Enter your Name"
                  />
                  <label for="floatingInput2">Full Name</label>
                </div>
              </div>
              <div className="mb-3 input-group">
                <span className="input-group-text" id="basic-addon1">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <div className="form-floating flex-grow-1">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput3"
                    name="email"
                    value={details.email}
                    onChange={updateDetails}
                    placeholder="name@example.com"
                  />
                  <label for="floatingInput3">Email address</label>
                </div>
              </div>
              <div className="mb-3 input-group">
                <span className="input-group-text" id="basic-addon1">
                  <FontAwesomeIcon icon={faKey} />
                </span>
                <div className="form-floating flex-grow-1">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="floatingPassword1"
                    placeholder="Password"
                    value={details.password}
                    onChange={updateDetails}
                  />
                  <label for="floatingPassword1">Password</label>
                </div>
              </div>
              <div className="mb-3 input-group">
                <span className="input-group-text" id="basic-addon1">
                  <FontAwesomeIcon icon={faKey} />
                </span>
                <div className="form-floating flex-grow-1">
                  <input
                    type="password"
                    name="cpassword"
                    className="form-control"
                    id="floatingPassword2"
                    value={details.cpassword}
                    onChange={updateDetails}
                    placeholder="Password"
                  />
                  <label for="floatingPassword2">Confirm Password</label>
                </div>
              </div>
              <button
                className="btn btn-primary w-100 mb-3"
                onClick={submitDetails}
              >
                SignUp
              </button>
              <div className="d-flex">
                <div className="col-5">
                  <hr />
                </div>
                <div className="col-2">OR</div>
                <div className="col-5">
                  <hr />
                </div>
              </div>
              <button className="btn btn-primary w-100 my-3">
                <FontAwesomeIcon icon={faFacebookSquare} /> Log In with Facebook
              </button>
            </div>
            <div className="card-footer text-muted">
              Already have an account?{" "}
              <Link to="/signin" className="text-decoration-none">
                <span className="font-weight-bolder">SignIn</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
