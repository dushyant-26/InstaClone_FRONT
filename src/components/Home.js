import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as fillHeart,
  faPaperPlane,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { BACK_END_DOMAIN } from "../appConstants";

function Home() {
  const user = useSelector((state) => state.user);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${BACK_END_DOMAIN}/friendPosts`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      })
      .catch((err) => console.log(err));
  }, []);

  const likePost = (id) => {
    fetch(`${BACK_END_DOMAIN}/like`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ postId: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === id) {
            return result;
          }
          return item;
        });

        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const unlikePost = (id) => {
    fetch(`${BACK_END_DOMAIN}/unlike`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ postId: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === id) {
            return result;
          }
          return item;
        });

        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const makeComment = (id, text) => {
    if (text === "") {
      toast.error("Comment cannot be empty");
      return;
    }
    fetch(`${BACK_END_DOMAIN}/comment`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ postId: id, text: text }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === id) {
            return result;
          }
          return item;
        });

        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const deletePost = (postId) => {
    fetch(`${BACK_END_DOMAIN}/deletePost/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          toast.error(result.error);
          return;
        }
        const newData = data.filter((post) => {
          return post._id !== result._id;
        });
        setData(newData);
        toast.success("Post Deleted Successfully!");
      })
      .catch((err) => console.log(err));
  };

  const deleteComment = (id, text) => {
    fetch(`${BACK_END_DOMAIN}/deleteComment`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ postId: id, text: text }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          toast.error("Try again later");
          return;
        }
        const newData = data.map((item) => {
          if (item._id === id) {
            return result;
          }
          return item;
        });

        setData(newData);
        toast.success("Comment Deleted Successfully!");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="home">
      {data.map((post, key) => {
        return (
          <div className="card mx-auto mt-3 post" key={post._id}>
            <h5 className="card-header rounded-top ps-2 fw-bold d-flex">
              <Link
                to={
                  user?._id === post.postedBy._id
                    ? "/profile"
                    : "/user/" + post.postedBy._id
                }
                className="text-decoration-none text-black"
              >
                <img
                  src={post?.postedBy?.profilePic}
                  alt="pic"
                  style={{
                    borderRadius: "50%",
                    height: "30px",
                    width: "30px",
                    marginRight: "10px",
                    border: "1px",
                  }}
                />

                <span className="mt-1">{post.postedBy.username}</span>
              </Link>
              {user?._id === post.postedBy._id && (
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ color: "red", marginLeft: "auto" }}
                  onClick={() => {
                    deletePost(post._id);
                  }}
                />
              )}
            </h5>

            <img
              src={post.photo}
              className="card-img-top"
              style={{ borderRadius: "0px", height: "500px" }}
              alt="post"
            />
            <div className="card-body">
              <div className="card-text">
                {post.likes.includes(user?._id) ? (
                  <FontAwesomeIcon
                    icon={fillHeart}
                    style={{
                      color: "red",
                      marginRight: "5px",
                      fontSize: "1.5em",
                    }}
                    onClick={() => {
                      unlikePost(post._id);
                    }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{
                      marginRight: "5px",
                      fontSize: "1.5em",
                    }}
                    onClick={() => {
                      likePost(post._id);
                    }}
                  />
                )}

                <FontAwesomeIcon
                  icon={faComment}
                  style={{ fontSize: "1.5em" }}
                  onClick={() => {
                    document.getElementById("comment" + key).focus();
                  }}
                />
                <p>
                  {post.likes.length}{" "}
                  {post.likes.length === 1 ? "Like" : "Likes"}
                </p>
                <h6>{post.caption}</h6>
                {post.comments.map((comment, key) => {
                  return (
                    <p key={key}>
                      <span
                        style={{
                          fontWeight: "700",
                          marginRight: "5px",
                          fontSize: "1em",
                        }}
                      >
                        {user?._id !== comment.postedBy._id
                          ? comment.postedBy.username
                          : "You"}
                      </span>
                      {comment.text}
                      {user?._id === comment.postedBy._id ? (
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ color: "red", float: "right" }}
                          onClick={() => {
                            deleteComment(post._id, comment.text);
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </p>
                  );
                })}
                <div className="d-flex">
                  <form
                    style={{ width: "100%" }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      makeComment(post._id, e.target[0].value);
                      e.target[0].value = "";
                    }}
                  >
                    <input
                      type="text"
                      id={"comment" + key}
                      className="commentBox"
                      placeholder="Add a Comment"
                      style={{ width: "95%" }}
                    />
                    <button
                      type="submit"
                      className="default"
                      style={{ width: "5%" }}
                    >
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
