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

  handleTitle(title) {
    const data = {
      title: title,
    };

    fetch("/movieDetail", {
      method: "POST",
      headers: {
        Accept: "application/json",
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

    window.location.href = "/#/movie?title=" + title;
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <Table dataSource={this.state.data}>
            <Column title="Movie" dataIndex="movieName" key="movieName" render={(text, record) => (
              <h6 onClick={() => this.handleTitle(record.movieName)}>{record.movieName}</h6>
              )}/>
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
