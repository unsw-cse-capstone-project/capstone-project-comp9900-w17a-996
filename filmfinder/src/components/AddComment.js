import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
import React, { Component } from 'react';
import CommentCard from '../components/CommentCard';
import Rating from '../components/Rating';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
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

class AddComment extends Component {
  state = {
    comments: [],
    submitting: false,
    value: '',
    rating: 0
  };

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });

    setTimeout(() => {
      //console.log(this.state.rating);
      this.setState({
        submitting: false,
        value: '',
        rating: 0,
        comments: [
          {
            userName: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            comment: this.state.value,
            rating: this.state.rating,
            datetime: moment().fromNow(),
          },
          ...this.state.comments,
        ],
      });
    }, 1000);
  };

    handleChange = e => {
      this.setState({
        value: e.target.value,
      });
    };

    getRating = (rates) => {
      //console.log(rates.state.value);
      this.setState({
           rating: rates.state.value
      })
    }

    render() {
      const { comments, submitting, value,rating} = this.state;
      return (
        <>
          {comments.length > 0 && <CommentCard {...this.state.comments[0]} />}
          <Rating parent={ this }/>
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

export default AddComment;