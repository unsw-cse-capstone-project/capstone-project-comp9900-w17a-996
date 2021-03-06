import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
import React, { Component } from 'react';


const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    //header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);
//add a reply to the comment
class AddReply extends Component {

  state = {
    comments: [],
    submitting: false,
    value: ''
  };

  // submit the content of reply to back-end
  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });
    let v = '';
    setTimeout(() => {
      console.log(this.state.value);
      console.log(this.props.user);
      const data = {
        commentuser: this.props.commentuser,
        movie: this.props.movie,
        comment: this.state.value
      }
      fetch("/replyReview", {
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
      this.setState({
        submitting: false,
        value: '',
        // comments: [
        //   {
        //     author: this.props.user,
        //     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        //     content: <p>{this.state.value}</p>,
        //     datetime: moment().fromNow(),
        //   },
        //   ...this.state.comments,
        // ],
      });

      this.props.setPare();
    
    }, );
    
  };

    handleChange = e => {
      this.setState({
        value: e.target.value,
      });
    };


    render() {
      const { comments, submitting, value} = this.state;
      return (
        <>
          {comments.length > 0 && <CommentList comments={comments} />}
          <Comment
            avatar={
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
              />
            
            }
            content={
              <Editor
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                submitting={submitting}
                value={value}
              />
            }
          />
        </>
      );
    }
}

export default AddReply;