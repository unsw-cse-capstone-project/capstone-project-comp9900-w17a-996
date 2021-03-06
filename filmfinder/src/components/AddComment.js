import { Comment, Avatar, Form, Button, List, Input, message } from 'antd';
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
// add a new comment to the movie
class AddComment extends Component {
  state = {
    username: '',
    comments: [],
    submitting: false,
    value: '',
    rating: 0
  };

  componentDidMount() {
    fetch("/home")
      .then((r) => r.json())
      .then((r) => {
        this.setState(r);
      });
  }
  //if not login
  warning = () => {
    message.warning('Please login to access this feature!');
  };
  //submit the content of comment to the back-end
  handleSubmit(movieTitle) {
    if (this.state.username === "") {
      this.warning();
      return;
    }

    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });

    const data = {
      movieTitle: movieTitle,
      rating: this.state.rating,
      review: this.state.value,
    }

    fetch("/checkReview", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
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

    setTimeout(() => {
      console.log(this.state);

      console.log(data);

      

      this.setState({
        submitting: false,
        value: '',
        rating: 0,
        // comments: [
        //   {
        //     userName: '',
        //     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        //     comment: this.state.value,
        //     rating: this.state.rating,
        //     datetime: moment().fromNow(),
        //   },
        //   ...this.state.comments,
        // ],
      });

      this.props.setPare();
    }, 1000);

    // window.location.href = "/#/movie?title=" + movieTitle;
  };

    handleChange = e => {
      this.setState({
        title: e.target.title,
        value: e.target.value,
      });
    };
    // get the rating from the Rating component
    getRating = (rates) => {
      //console.log(rates.state.value);
      this.setState({
           rating: rates.state.value
      })
    }

    render() {
      const {title} = this.props;
      const { comments, submitting, value,rating} = this.state;
      console.log(this.state.comments);
      return (
        <>
          {comments.length > 0 && <CommentCard {...this.state.comments[0]}/>}
          <Rating parent={ this }/>
      {/* <h3>Title is {this.props.title}</h3> */}
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
                onSubmit={() => this.handleSubmit(title)}
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