import React, { ReactDOM, MountNode, createElement, useState} from 'react';
import "../styles/moviecard.css";
import 'bootstrap/dist/css/bootstrap.css';
import { Comment, Tooltip, Avatar} from 'antd';
import moment from 'moment';
import RatingResult from './RatingResult';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
const CommentCard = (props) => {

        const [likes, setLikes] = useState(0);
        const [dislikes, setDislikes] = useState(0);
        const [action, setAction] = useState(null);

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
            <span key="comment-basic-reply-to">Reply to</span>,
        ];

        return (
            <Comment
            actions={actions}
            author={<div><a>kaqia</a> <RatingResult rating={props.rating}/></div>}
            avatar={
                <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt={props.userName}
                />
            }
            content={
                    <p>
                        {props.comment}
                    </p>
            }
            datetime={
                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().fromNow()}</span>
                </Tooltip>
            }
            />
        );
    
    
}

export default CommentCard;