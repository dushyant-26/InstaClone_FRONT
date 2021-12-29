import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { useDispatch } from "react-redux";
import { saveUser } from "../redux/user/userAction";
import ForgetPassword from "./ForgetPassword";
import { BACK_END_DOMAIN } from "../appConstants";

function SignIn() {
  const [details, setDetails] = useState({});
  const dispatch = useDispatch();
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

  const submitDetails = () => {
    fetch(`${BACK_END_DOMAIN}/signin`, {
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

        localStorage.setItem("jwt", data.jwt);
        localStorage.setItem("userInfo", JSON.stringify(data.userInfo));
        dispatch(saveUser(data.userInfo));
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="loginSection container-fluid">
      <div className="row ">
        <div className="col-md-6 col-lg-3 ms-auto offset-lg-3 col-sm-5 me-0 my-5">
          <img
            src="https://cdn.shopify.com/s/files/1/0276/1297/1043/products/il_1140xN.2173201100_8fcj_1_360x.jpg?v=1597824224"
            alt=""
            width="100%"
            height="475px"
            style={{ borderRadius: "5px" }}
            className=""
          />
        </div>
        <div className="col-md-6 col-lg-4 col-sm-7 me-auto my-5">
          <div className="card text-center">
            <h1 className="card-header insta-font">Instagram</h1>
            <div className="card-body">
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
                    value={details.email ? details.email : ""}
                    onChange={updateDetails}
                    placeholder="name@example.com"
                  />
                  <label htmlFor="floatingInput3">Email address</label>
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
                    value={details.password ? details.password : ""}
                    onChange={updateDetails}
                  />
                  <label htmlFor="floatingPassword1">Password</label>
                </div>
              </div>
              <button
                className="btn btn-primary w-100 mb-3"
                onClick={submitDetails}
              >
                Log In
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
              <ForgetPassword />
            </div>
            <div className="card-footer text-muted">
              Don't have an account?{" "}
              <Link to="/signup" className="text-decoration-none">
                <span className="font-weight-bolder">SignUp</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
