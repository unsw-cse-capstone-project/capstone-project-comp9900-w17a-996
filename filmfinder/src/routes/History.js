import React, { Component } from "react";
import Navbar from "../components/NavBar";
import { Table, Button, Space, Rate, Modal, Input } from "antd";

const { Column } = Table;
const { TextArea } = Input;


class History extends Component {

  constructor(props) {
    super(props);
    this.myRating = React.createRef();
    this.myRef = React.createRef();
  }

  state = {
    ModalText: "Content of the modal",
    editLoading: false,
    deleteLoading:false,
    data: [
        // {
        //   key: "1",
        //   movieName: "My People, my hometown",
        //   reviewTime: "18:03 01/08/2020",
        //   rating: "4",
        //   review: "Not bad",
        //   editVisible: false,
        //   deleteVisible: false,
        // },
        // {
        //   key: "2",
        //   movieName: "Batman",
        //   reviewTime: "23:43 25/07/2020",
        //   rating: "3",
        //   review: "All good",
        //   editVisible: false,
        //   deleteVisible: false,
        // },
        // {
        //   key: "3",
        //   movieName: "Jonny English",
        //   reviewTime: "20:43 15/07/2020",
        //   rating: "5",
        //   review: "Funny one",
        //   editVisible: false,
        //   deleteVisible: false,
        // },
      ],
  };

  showEditModal(id) {
    //   console.log(this.state.data.length);
      for (let i = 0; i < this.state.data.length; i++){
        // console.log(this.state.data[i].key);
          if (this.state.data[i].key === id){
            console.log(this.state.data[i].editVisible);
            let refData = this.state;
            refData.data[i].editVisible = true;
            this.setState(refData);
            // this.state.data[i].editVisible = true;
            };
          }
  };

  showDeleteModal(id) {
    //   console.log(this.state.data.length);
      for (let i = 0; i < this.state.data.length; i++){
        // console.log(this.state.data[i].key);
          if (this.state.data[i].key === id){
            console.log(this.state.data[i].deleteVisible);
            let refData = this.state;
            refData.data[i].deleteVisible = true;
            this.setState(refData);
            };
          }
  };

  handleEditOk(ev, id) {
    console.log(this.myRef.current.state.value);
    

    for (let i = 0; i < this.state.data.length; i++){
      // console.log(this.state.data[i].key);
        if (this.state.data[i].key === id){
          
          console.log(this.state.data[i].movieName);

          const data = {
            "editedReview": this.myRef.current.state.value,
            "editedRating": this.myRating.current.state.value,
            "movieTitle": this.state.data[i].movieName,
            "operator": 'e'
          }
      
          fetch("/history", {
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

          this.setState({
            ModalText: "The modal will be closed after two seconds",
            editLoading: true,
          });
          
          setTimeout(() => {
            let refData = this.state;
            // refData.data[i].rating = this.myRating.current.state.value;
          refData.editLoading = false;
          refData.data[i].editVisible = false;
          this.setState(refData);
          this.renderAgain();
          // window.location.href = "/#/movie?title=" + title;
          }, 1000);

          console.log(this.state);
          //this.state.data[i].editVisible = true;
          };
        }
    
  };

  handleDeleteOk(id) {
    for (let i = 0; i < this.state.data.length; i++){
      // console.log(this.state.data[i].key);
        if (this.state.data[i].key === id){
          
          console.log(this.state.data[i].movieName);

          const data = {
            "movieTitle": this.state.data[i].movieName,
            "operator": 'd'
          }
          
          fetch("/history", {
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

          this.setState({
            ModalText: "The modal will be closed after two seconds",
            deleteLoading: true,
          });
          
          setTimeout(() => {
            let refData = this.state;
          refData.deleteLoading = false;
          refData.data[i].deleteVisible = false;
          this.setState(refData);
          this.renderAgain();
          }, 1000);

          
          // this.state.data[i].editVisible = true;
          };
        }
    
  };

  handleEditCancel(id) {
    for (let i = 0; i < this.state.data.length; i++){
      if (this.state.data[i].key === id){
        console.log("Clicked cancel button");
        console.log(this.state.data[i].editVisible);
        let refData = this.state;
        refData.data[i].editVisible = false;
        this.setState(refData);
    }
  }

  };

  handleDeleteCancel(id) {
    for (let i = 0; i < this.state.data.length; i++){
      if (this.state.data[i].key === id){
        console.log("Clicked cancel button");
        console.log(this.state.data[i].deleteVisible);
        let refData = this.state;
        refData.data[i].deleteVisible = false;
        this.setState(refData);
    }
  }

  };

  componentWillMount() {
    fetch("/history")
      .then((r) => r.json())
      .then((r) => {
        this.setState(r);
      });
  }

  // componentWillUpdate() {
  //   fetch("/history")
  //     .then((r) => r.json())
  //     .then((r) => {
  //       this.setState(r);
  //     });
  // }

  renderAgain() {
    fetch("/history")
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        this.setState(r);
      });
  }

  render() {
    
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
                <Rate defaultValue={record.rating} value={record.rating}/>
              )}
            />

            {/* <Column
              title="Rating"
              dataIndex="rating"
              key="rating"      
              render={(text, record) => (
              <h1>{record.rating}</h1>
              )}
            /> */}
            
            <Column title="Review Content" dataIndex="review" key="review" />

            <Column
              title="Action"
              dataIndex="action"
              key="action"
              render={(text, record) => (
                <Space size="middle">
                  
                  <Modal
                    title="Edit review"
                    visible={record.editVisible}
                    onOk={(ev) => this.handleEditOk(ev, record.key)}
                    confirmLoading={this.state.editLoading}
                    onCancel={() => this.handleEditCancel(record.key)}
                  >
                      {/* <h1>{record.key}</h1> */}
                      <Rate defaultValue={record.rating} ref={this.myRating}></Rate>
                    <TextArea rows={4} defaultValue={record.review} ref={this.myRef} />
                  </Modal>

                  <Modal
                    title="Delete confirm"
                    visible={record.deleteVisible}
                    onOk={() => this.handleDeleteOk(record.key)}
                    confirmLoading={this.state.deleteLoading}
                    onCancel={() => this.handleDeleteCancel(record.key)}
                  >
                      {/* <h1>{record.key}</h1> */}
                    <p>Are you sure to delete?</p>
                  </Modal>

                  <Button type="primary" onClick={() => this.showEditModal(record.key)}>
                    Edit
                  </Button>

                    
                  <Button type="primary" danger onClick={() => this.showDeleteModal(record.key)}>
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
