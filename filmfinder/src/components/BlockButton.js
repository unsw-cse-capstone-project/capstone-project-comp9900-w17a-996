import React, { Component, useState } from 'react';
import { Button, Tooltip } from 'antd';
import { UserAddOutlined,UndoOutlined, StopOutlined } from '@ant-design/icons';

function BlockAction(b){
    if(b){
        //fetch user/block
    }
    else{
        //fetch user/unblock
    }
}

export default function BlockButton(props){
    const [block, setblock] = useState(props.block);

    return(
        <div>
            {block ? (<Button className="blocked" icon={<UndoOutlined />} onClick={() => {
                
                const data = {action: "u", user: props.username};

                console.log(data);
                
                setblock(false);

                fetch("/blockUser", {
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

            }}>
                    Unblock
                    </Button>) 
                    : <Button className="unblock" type="primary" icon={<StopOutlined />} onClick={() => {
                        
                        const data = {action: "b", user: props.username};

                        console.log(data);
                        
                        setblock(true);

                        fetch("/blockUser", {
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

                    }}>
                        Block
                    </Button>
            }
        </div>
    )
}