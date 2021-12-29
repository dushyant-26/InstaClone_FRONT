import React, { useState } from "react";
import { toast } from "react-toastify";
import { BACK_END_DOMAIN } from "../appConstants";

function ForgetPassword() {
  const [email, setEmail] = useState("");

  const submitEmail = () => {
    fetch(`${BACK_END_DOMAIN}/reset-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
          return;
        }
        setEmail("");
        toast.success(data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <a
        href="##"
        style={{ cursor: "pointer" }}
        data-bs-toggle="modal"
        data-bs-target=".target1"
        className="text-decoration-none"
      >
        Forget Password?
      </a>

      <div
        className="modal fade target1"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title " id="staticBackdropLabel">
                Forget Password?
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body d-block ">
              <div className="form-group my-3 ">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  id="email"
                  placeholder="Enter Email"
                />
              </div>
            </div>
            <div className="modal-footer justify-content-center">
              <button
                type="submit"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={submitEmail}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
