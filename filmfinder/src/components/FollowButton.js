import React, { Component, useEffect, useState } from "react";
import { Button, Tooltip } from "antd";
import { UserAddOutlined, CheckOutlined, SecurityScanTwoTone } from "@ant-design/icons";

function FollowAction(f) {
  if (f) {
    //fetch user/unfollow
  } else {
    //fetch user/follow
  }
}

export default function FollowButton(props) {
  const [follow, setFollow] = useState(props.follow);

  useEffect(() => { 
    fetch("/followUser")
      .then((r) => r.json())
      .then((r) => {
        
        console.log("Follow state:", r);
        if (r.isfollower) {
          setFollow('1');
        }
        else {
          setFollow(undefined);
        }
      });
  },[]);

  console.log("Child Data: ", follow);
  // console.log("***",props.username);

  return (
    <div>
      {follow ? (
        <Button
          className="followed"
          icon={<CheckOutlined />}
          onClick={() => {
            console.log("Follow");

            setFollow(false);
            const data = { action: "u", user: props.username };
            console.log(data);

            fetch("/followUser", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              })
                .then((response) => console.log(response))
                .then((data) => {
                  console.log("Success:", data);
                })
                .catch((error) => {
                  console.error("Error:", error);
                });

            // console.log(0);
          }}
        >
          Followed
        </Button>
      ) : (
        <Button
          className="unfollow"
          type="primary"
          icon={<UserAddOutlined />}
          onClick={() => {
            console.log("Unfollow");

            setFollow(true);
            // console.log(3);

            const data = { action: "f", user: props.username };
            console.log(data);

            fetch("/followUser", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
              .then((response) => console.log(response))
              .then((data) => {
                console.log("Success:", data);
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          }}
        >
          Follow
        </Button>
      )}
    </div>
  );
}
