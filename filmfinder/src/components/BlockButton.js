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
                console.log(props.block);
                if(block){
                    setblock(false);
                }
                else{
                    setblock(true);
                }
            }}>
                    Unblock
                    </Button>) 
                    : <Button className="unblock" type="primary" icon={<StopOutlined />} onClick={() => {
                        console.log(props.block);
                        if(block){
                            setblock(false);
                        }
                        else{
                            setblock(true);
                        }
                    }}>
                        Block
                    </Button>
            }
        </div>
    )
}