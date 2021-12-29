import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BACK_END_DOMAIN } from "../appConstants";

function PasswordResetUI() {
  const { resetPasswordToken } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const changePassword = () => {
    if (password.length < 6) {
      toast.error("Password length should be 6 or more.");
      return;
    }
    if (password !== cpassword) {
      toast.error("Password doesn't match!");
      return;
    }
    fetch(`${BACK_END_DOMAIN}/updatePassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, resetPasswordToken }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          toast.error(result.error);
          return;
        }
        toast.success(result.message);
        navigate("/signin");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch(`${BACK_END_DOMAIN}/validateResetPasswordToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resetPasswordToken }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          setError(result.error);
          return;
        }
      })
      .catch((err) => console.log(err));
  }, [resetPasswordToken]);
  return (
    <div>
      <div className="card mt-5 mx-auto pass">
        <h5 className="card-header">Reset Password</h5>
        {error ? (
          <h5 className="ms-3">{error}</h5>
        ) : (
          <div className="card-body">
            <div className="card-text">
              <div className="form-group my-3">
                <label for="password">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  id="pass"
                  placeholder="Enter Password"
                />
              </div>
              <div className="form-group my-3">
                <label for="cpassword">Confirm Password</label>
                <input
                  type="password"
                  value={cpassword}
                  onChange={(e) => setCPassword(e.target.value)}
                  className="form-control"
                  id="cpass"
                  placeholder="Re-Enter your Password"
                />
              </div>
            </div>
            <div>
              <button className="btn btn-primary" onClick={changePassword}>
                Reset Password
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PasswordResetUI;
