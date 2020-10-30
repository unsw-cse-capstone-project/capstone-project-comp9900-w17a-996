import React, { Component, useState } from 'react';
import { Button, Tooltip } from 'antd';
import { UserAddOutlined, CheckOutlined } from '@ant-design/icons';

function FollowAction(f){
    if(f){
        //fetch user/unfollow
    }
    else{
        //fetch user/follow
    }
}

export default function FollowButton(props){
    const [follow, setFollow] = useState(props.follow);

    return(
        <div>
            {follow ? (<Button className="followed" icon={<CheckOutlined />} onClick={() => {
                console.log(props.follow);
                if(follow){
                    setFollow(false);
                }
                else{
                    setFollow(true);
                }
            }}>
                    Followed
                    </Button>) 
                    : <Button className="unfollow" type="primary" icon={<UserAddOutlined />} onClick={() => {
                        console.log(props.follow);
                        if(follow){
                            setFollow(false);
                        }
                        else{
                            setFollow(true);
                        }
                    }}>
                        Follow
                    </Button>
            }
        </div>
    )
}