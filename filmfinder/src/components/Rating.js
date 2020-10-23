import { Rate } from 'antd';
import React, { Component } from 'react';


class Rating extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
      }
    toAddComment = (value) => {
        this.setState({ value });
        setTimeout(() => {
            this.props.parent.getRating(this,this.state.value);
        }, 1000);
    }
  

    render(){
        const { value } = this.state;
        return ( 
            <Rate allowHalf defaultValue={0} onChange={this.toAddComment} value={value}/>
        )
    }
}
export default Rating;