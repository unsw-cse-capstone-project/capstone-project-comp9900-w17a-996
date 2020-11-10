import React, { useEffect, createElement, useState} from 'react';
import "../styles/moviecard.css";
import 'bootstrap/dist/css/bootstrap.css';
import { Comment, Tooltip, Avatar,Tag} from 'antd';
import moment from 'moment';
import RatingResult from './RatingResult';
import AddReply from '../components/AddReply';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled, MessageOutlined, ThunderboltFilled} from '@ant-design/icons';
import { OmitProps } from 'antd/lib/transfer/ListBody';

const CommentCard = (props) => {

        const [likes, setLikes] = useState(0);
        const [dislikes, setDislikes] = useState(0);
        const [action, setAction] = useState(null);
        const [reply, setReply] = useState(false);
        const [thumbup, setThumbup] = useState(0);
        const [thumbdown, setThumbdown] = useState(0);

        useEffect(() => { 
          fetch("/thumbupordown")
            .then((r) => r.json())
            .then((r) => {
              console.log(r.thumb_count);
              const up = parseInt(r.thumb_count[props.userName].up);
              const down = parseInt(r.thumb_count[props.userName].down);
              console.log("thumbcount:", up,down);
              if (up === null){
                setLikes(0)
                setThumbup(0)
              }
              else{
                setLikes(up)
                setThumbup(up)
              }
              if (down === null){
                setDislikes(0)
                setThumbdown(0)
              }
              else{
                setDislikes(down)
                setThumbdown(down)
              }
              
            });
        },[]);
       
        const like = () => {
            console.log(likes,thumbup);
            if (likes === thumbup){
              console.log('yes')
              setLikes(1 + likes);
              const data = {
                commentuser: props.userName,
                movie: props.title,
                like: '1'
              }
              fetch("/thumbupordown", {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
                })
                  .then(r => console.log(r))
                  .then((data) => {
                    console.log("Success:", data);
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                  });
            }
            if (dislikes > 0 && dislikes === thumbdown){
              setDislikes(dislikes - 1);
            }
            setAction('liked');
  
            
        };

        const dislike = () => {
            if (likes > 0 && likes === thumbup){
              setLikes(likes - 1);
            }
            if (dislikes === thumbdown){
              setDislikes(dislikes + 1);
              const data = {
                commentuser: props.userName,
                movie: props.title,
                like: '0'
              }
              fetch("/thumbupordown", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              })
                .then(r => console.log(r))
                .then((data) => {
                  console.log("Success:", data);
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            }
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
            fetch("/home")
      .then((r) => r.json())
      .then((r) => {
        // this.setState(r);
        console.log("guid:",r.username);
        if (r.username === user) {
            window.location.href = "/#/profile";
        }
        else{
            window.location.href = "/#/otherProfile?username=" + user;
        }
      });
            
        }     
        const replies = [{name:'jiaqi',content:'good'},{name:'Han',content:'bad'}];
        const showReply = replies.map((k,i) => (
            <Comment
                key={i}
                author={<a>{k.name}</a>}
                avatar={
                <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt={k.name}
                />
                }
                content={
                <p>
                    {k.content}
                </p>
                }
            >
                
            </Comment>
        ));
        let createReply = null;
        if (reply === true) {
          createReply = <AddReply user={props.userName} movie={props.title}/>;
        }
        /*
        const CommentList = ({ comments }) => (
            <List
              dataSource={comments}
              header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
              itemLayout="horizontal"
              renderItem={props => <Comment {...props} />}
            />
          );*/
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
                        <p>
                            {props.review}
                        </p>
                        
            }
            datetime={
                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                <span>{props.reviewTime}</span>
                </Tooltip>
            }
            >

                {showReply}
                {createReply}
                
            </Comment>
            
        );
    
    
}

export default CommentCard;