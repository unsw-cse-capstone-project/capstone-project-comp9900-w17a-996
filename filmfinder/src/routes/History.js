import React, { Component } from "react";
import Navbar from "../components/NavBar";
import { Table, Button, Space, Rate, Modal, Input } from "antd";

const { Column } = Table;
const { TextArea } = Input;

class History extends Component {
  state = {
    ModalText: "Content of the modal",
    // visible: false,
    confirmLoading: false,
    data: [
        {
          key: "1",
          movieName: "My People, my hometown",
          reviewTime: "18:03 01/08/2020",
          rating: "4",
          review: "Not bad",
          visible: false,
        },
        {
          key: "2",
          movieName: "Batman",
          reviewTime: "23:43 25/07/2020",
          rating: "3",
          review: "All good",
          visible: false,
        },
        {
          key: "3",
          movieName: "Jonny English",
          reviewTime: "20:43 15/07/2020",
          rating: "5",
          review: "Funny one",
          visible: false,
        },
      ],
  };

  showModal(id) {
      
    //   console.log(this.state.data.length);
      for (let i = 0; i < this.state.data.length; i++){
        // console.log(this.state.data[i].key);
          if (this.state.data[i].key === id){
            console.log(this.state.data[i].visible);
            let refData = this.state;
            refData.data[i].visible = true;
            this.setState(refData);
            // this.state.data[i].visible = true;
            };
          }
  };

  handleOk(id) {

    for (let i = 0; i < this.state.data.length; i++){
      // console.log(this.state.data[i].key);
        if (this.state.data[i].key === id){

          this.setState({
            ModalText: "The modal will be closed after two seconds",
            confirmLoading: true,
          });
          
          setTimeout(() => {
            let refData = this.state;
          refData.confirmLoading = false;
          refData.data[i].visible = false;
          this.setState(refData);
          }, 1000);

          
          // this.state.data[i].visible = true;
          };
        }
    
  };

  handleCancel(id) {
    for (let i = 0; i < this.state.data.length; i++){
      if (this.state.data[i].key === id){
        console.log("Clicked cancel button");
        console.log(this.state.data[i].visible);
        let refData = this.state;
        refData.data[i].visible = false;
        this.setState(refData);
    }
  }

  };

  componentWillMount() {
    fetch("/history")
      .then((r) => r.json())
      .then((r) => {
        this.setUser(r.username);
      });
  }

  render() {
    const { confirmLoading } = this.state;
    return (
      <React.Fragment>
        <Navbar />
        <br />
        <div className="ml-4">
          <h3>My Review History</h3>
          <br />
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
                <Rate disabled defaultValue={record.rating} />
              )}
            />
            <Column title="Review Content" dataIndex="review" key="review" />

            <Column
              title="Action"
              dataIndex="action"
              key="action"
              render={(text, record) => (
                <Space size="middle">
                  <h3>传值为{record.key}</h3>
                  <Modal
                    title="Edit review"
                    visible={record.visible}
                    onOk={() => this.handleOk(record.key)}
                    confirmLoading={confirmLoading}
                    onCancel={() => this.handleCancel(record.key)}
                  >
                      <h1>{record.key}</h1>
                    <TextArea rows={4} defaultValue={record.review} />
                  </Modal>

                  {/* <Button type="primary">Edit</Button> */}
                  <Button type="primary" onClick={() => this.showModal(record.key)}>
                    测试Edit~
                  </Button>

                    
                  <Button type="primary" danger>
                    Delete
                  </Button>
                </Space>
              )}
            />
          </Table>
        </div>
      </React.Fragment>
    );
  }
}

export default History;
