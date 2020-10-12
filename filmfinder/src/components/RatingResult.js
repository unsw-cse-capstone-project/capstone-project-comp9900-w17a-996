import { Rate } from 'antd';
import React from 'react';

class RatingResult extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        let rating = parseFloat(this.props.rating);
        console.log(rating);
        return (
            <div>
                <Rate disabled allowHalf defaultValue={0} value={rating}/>
            </div>
        )
    }
}
export default RatingResult;