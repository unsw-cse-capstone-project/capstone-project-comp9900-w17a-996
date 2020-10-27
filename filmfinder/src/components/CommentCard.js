import React, { ReactDOM, MountNode, createElement, useState} from 'react';
import "../styles/moviecard.css";
import 'bootstrap/dist/css/bootstrap.css';
import { Comment, Tooltip, Avatar,Tag} from 'antd';
import moment from 'moment';
import RatingResult from './RatingResult';
import AddReply from '../components/AddReply';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled, MessageOutlined} from '@ant-design/icons';

const CommentCard = (props) => {

        const [likes, setLikes] = useState(0);
        const [dislikes, setDislikes] = useState(0);
        const [action, setAction] = useState(null);
        const [reply, setReply] = useState(false);

        const like = () => {
            setLikes(1);
            setDislikes(0);
            setAction('liked');
        };

        const dislike = () => {
            setLikes(0);
            setDislikes(1);
            setAction('disliked');
        };
        const addReply = () => {
            console.log(reply);
            if(reply === true){
                setReply(false);
            }
            else{
                setReply(true);
            }
        }
        const actions = [
            <Tooltip key="comment-basic-like" title="Like">
            <span onClick={like}>
                {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                <span className="comment-action">{likes}</span>
            </span>
            </Tooltip>,
            <Tooltip key="comment-basic-dislike" title="Dislike">
            <span onClick={dislike}>
                {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
                <span className="comment-action">{dislikes}</span>
            </span>
            </Tooltip>,
            <span key="comment-basic-reply-to" onClick={addReply}>Reply to</span>,
        ];

        const goOtherProfile = (user) => {
            window.location.href = "/#/otherProfile?username=" + user;
        }       

        return (
            <Comment
            actions={actions}
            author={<div><a>{props.userName}</a> <RatingResult rating={props.rating}/></div>}
            avatar={
                <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt={props.userName}
                onClick={() => (goOtherProfile(props.userName))}
                />
            }
            content={
                    <div id='toReply'>
                        <p>
                            {props.review}
                        </p>
                        {createElement(reply === true ? AddReply : MessageOutlined)}
                    </div>
            }
            datetime={
                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                <span>{props.reviewTime}</span>
                </Tooltip>
            }
            />
            
        );
    
    
}

export default CommentCard;