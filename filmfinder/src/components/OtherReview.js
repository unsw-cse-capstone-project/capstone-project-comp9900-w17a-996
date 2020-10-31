import React, { Component } from "react";
import { Table, Rate } from "antd";
const { Column } = Table;

class OtherReview extends Component {
  state = {
    data: [
      
    ],
  };

  componentDidMount() {
    setTimeout(() => {
      fetch("/otherReview")
    .then((r) => {
      console.log(r);
      return r.json();
    })
    .then((r) => {
      this.setState(r);
      console.log(r);
    });
    },500);
  
    
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <Table dataSource={this.state.data}>
            <Column title="Movie" dataIndex="movieName" key="movieName" />
            <Column
              title="Review Time"
              dataIndex="reviewTime"
              key="reviewTime"
            />

            <Column
              title="Rating"
              dataIndex="rating"
              key="rating"
              render={(text, record) => (
                <Rate
                  disabled
                  allowHalf
                  defaultValue={0}
                  value={parseFloat(record.rating)}
                />
              )}
            />

            <Column title="Review Content" dataIndex="review" key="review" />
          </Table>
        </div>
      </React.Fragment>
    );
  }
}

export default OtherReview;
