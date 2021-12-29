import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateProfilePic } from "../redux/user/userAction";
import { BACK_END_DOMAIN } from "../appConstants";

function EditProfilePic() {
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (url) {
      fetch(`${BACK_END_DOMAIN}/updateProfilePic`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          profilePic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
            return;
          }
          setImage("");
          toast.success(data.message);
          localStorage.setItem("userInfo", JSON.stringify(data.user));
          dispatch(updateProfilePic(url));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line
  }, [url]);
  const updateProfilePicture = () => {
    uploadImage();
  };

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "instaClone");
    data.append("cloud_name", "my-projects-gallery");

    fetch("https://api.cloudinary.com/v1_1/my-projects-gallery/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <button
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target=".target"
      >
        Update Profile Pic
      </button>

      <div
        className="modal fade target"
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
                Update Profile Pic
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.target.reset();
                updateProfilePicture();
              }}
            >
              <div className="modal-body d-block ">
                <div className="mb-3 ">
                  <label htmlFor="formFile" className="form-label">
                    Select Photo from your device
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    name="file"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                  />
                </div>
              </div>
              <div className="modal-footer justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Update Profile Pic
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfilePic;
