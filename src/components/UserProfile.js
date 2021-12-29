import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BACK_END_DOMAIN } from "../appConstants";
import { updateFollow } from "../redux/user/userAction";

function UserProfile() {
  const [userData, setData] = useState({
    userExist: true,
    user: null,
    posts: null,
  });
  const { userId } = useParams();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    fetch(`${BACK_END_DOMAIN}/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          setData({ ...userData, userExist: false });
          toast.error(result.error);
          return;
        }
        setData({ ...userData, user: result.user[0], posts: result.posts });
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, [userId]);

  const followUser = () => {
    fetch(`${BACK_END_DOMAIN}/follow`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ followId: userId }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          toast.error("Something went wrong");
          return;
        }
        dispatch(updateFollow(result.following, result.followers));
        localStorage.setItem("userInfo", JSON.stringify(result));
        setData((prevUser) => {
          return {
            ...prevUser,
            user: {
              ...prevUser.user,
              followers: [...prevUser.user.followers, result._id],
            },
          };
        });
      })
      .catch((err) => console.log(err));
  };

  const unfollowUser = () => {
    fetch(`${BACK_END_DOMAIN}/unfollow`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ unfollowId: userId }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          toast.error("Something went wrong");
          return;
        }
        dispatch(updateFollow(result.following, result.followers));
        localStorage.setItem("userInfo", JSON.stringify(result));

        setData((prevUser) => {
          const newFollowers = prevUser.user.followers.filter(
            (follower) => follower !== result._id
          );
          return {
            ...prevUser,
            user: {
              ...prevUser.user,
              followers: newFollowers,
            },
          };
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {userData.userExist ? (
        userData.user ? (
          <div style={{ maxWidth: "40%", margin: "0px auto" }}>
            <div className="d-flex justify-content-around my-3 border-bottom py-3">
              <div className="me-3 border profile">
                <img
                  src={userData.user?.profilePic}
                  alt="profile"
                  className="profile"
                />
              </div>
              <div>
                <h1 className="ms-1">{userData.user.username}</h1>
                <h4 className="ms-1">{userData.user.name}</h4>
                <div
                  className="d-flex justify-content-around"
                  style={{ width: "110%" }}
                >
                  <h5>{userData.posts.length} posts</h5>
                  <h5>{userData.user.followers.length} Followers</h5>
                  <h5>{userData.user.following.length} Following</h5>
                </div>
                {userData.user.followers?.includes(user._id) ? (
                  <button className="btn btn-primary" onClick={unfollowUser}>
                    Unfollow
                  </button>
                ) : (
                  <button className="btn btn-primary" onClick={followUser}>
                    Follow
                  </button>
                )}
              </div>
            </div>
            <div className="gallery">
              {userData.posts.map((post) => {
                return <img key={post._id} src={post.photo} alt="post" />;
              })}
            </div>
          </div>
        ) : (
          <h2>Loading...</h2>
        )
      ) : (
        <h2>404 Not Found!</h2>
      )}
    </>
  );
}

export default UserProfile;
