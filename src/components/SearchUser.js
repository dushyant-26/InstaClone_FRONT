import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { BACK_END_DOMAIN } from "../appConstants";

function SearchUser() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const fetchUsers = () => {
      fetch(`${BACK_END_DOMAIN}/searchUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          search,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setUsers(data.users);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchUsers();
  }, [search]);

  return (
    <div>
      <FontAwesomeIcon
        icon={faSearch}
        data-bs-toggle="modal"
        data-bs-target=".target2"
      />

      <div
        className="modal fade target2"
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
                Search Users
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setSearch("")}
              ></button>
            </div>
            <div className="modal-body d-block ">
              <div className="mb-3 ">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-100"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="modal-footer justify-content-center">
              {users?.length === 0 && search !== "" ? (
                "User Not Found"
              ) : (
                // eslint-disable-next-line
                <div className="list-group" className="w-100">
                  {users?.map((userDetail, key) => {
                    return (
                      <button
                        type="button"
                        key={key}
                        className="list-group-item list-group-item-action"
                        data-bs-dismiss="modal"
                        onClick={() => {
                          setSearch("");
                          navigate(
                            user._id === userDetail._id
                              ? "/profile"
                              : `/user/${userDetail._id}`,
                            {
                              replace: true,
                            }
                          );
                        }}
                      >
                        {userDetail.username}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchUser;
