import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BACK_END_DOMAIN } from "../appConstants";
import EditProfilePic from "./EditProfilePic";

function Profile() {
  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    fetch(`${BACK_END_DOMAIN}/myPosts`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPosts(result);
      });
  }, []);
  return (
    <div style={{ maxWidth: "40%", margin: "0px auto" }}>
      <div className="d-flex justify-content-around my-3 border-bottom py-3">
        <div className="me-3 profile border mb-5">
          <img src={user?.profilePic} alt="profile" className="profile" />
          <EditProfilePic />
        </div>
        <div>
          <h1 className="ms-1">{user ? user.username : "Loading..."}</h1>
          <h4 className="ms-1">{user?.name}</h4>
          <div
            className="d-flex justify-content-around"
            style={{ width: "110%" }}
          >
            <h5>{posts.length} posts</h5>
            <h5>{user?.followers ? user.followers.length : "0"} Followers</h5>
            <h5>{user?.following ? user.following.length : "0"} Following</h5>
          </div>
        </div>
      </div>
      <div className="gallery">
        {posts.map((post) => {
          return <img key={post._id} src={post.photo} alt="post" />;
        })}
      </div>
    </div>
  );
}

export default Profile;
