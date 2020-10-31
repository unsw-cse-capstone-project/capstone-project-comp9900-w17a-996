import React, { Component } from "react";
import { Table, Rate } from "antd";
const { Column } = Table;

class OtherReview extends Component {
  state = {
    data: [
      {
        movieName: "1",
        reviewTime: "2020",
        rating: 2,
        review: "ya",
      },
      {
        movieName: "2",
        reviewTime: "2019",
        rating: 3,
        review: "No",
      },
    ],
  };

  componentDidMount() {
    setTimeout(() => {fetch("/otherReview")
    .then((r) => {
      console.log(r);
      return r.json();
    })
    .then((r) => {
      // this.setState(r);
      console.log(r);
    });},1000);
    
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
