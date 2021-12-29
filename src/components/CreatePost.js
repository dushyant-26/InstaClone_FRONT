import React, { useState, useEffect } from "react";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { BACK_END_DOMAIN } from "../appConstants";

function CreatePost() {
  const [caption, setCaption] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (url) {
      fetch(`${BACK_END_DOMAIN}/createPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          caption,
          url,
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
          setTimeout(() => window.location.reload(), 3000);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line
  }, [url]);

  const submitPost = () => {
    uploadImage();
  };

  const uploadImage = () => {
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
      <FontAwesomeIcon
        icon={faPlusSquare}
        data-bs-toggle="modal"
        data-bs-target=".target0"
      />

      <div
        className="modal fade target0"
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
                Create Post
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
                submitPost();
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

                  <textarea
                    placeholder="caption..."
                    style={{ width: "100%", height: "100% !important" }}
                    value={caption}
                    onChange={(e) => {
                      setCaption(e.target.value);
                    }}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Upload Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
