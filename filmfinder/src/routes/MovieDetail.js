import React, { Component } from "react";
import { Modal, Checkbox } from "antd";
import { Link } from "react-router-dom";
import "../styles/movie.css";
import PmRibbon from "pm-ribbon";
import "bootstrap/dist/css/bootstrap.css";
import MovieCard from "../components/MovieCard";
import Tabs from "../components/Tabs";
import { Layout, Button, Divider } from "antd";
import PlusOutlined from "@ant-design/icons/PlusOutlined";
import ShareAltOutlined from "@ant-design/icons/ShareAltOutlined";
import RatingResult from "../components/RatingResult";
import CommentCard from "../components/CommentCard";
import AddComment from "../components/AddComment";
import RecommendList from "../components/RecommendList";
import { WindowsOutlined } from "@ant-design/icons";
import NavBar from "../components/NavBar";
import copy from "copy-to-clipboard"; 
const { Header, Footer, Sider, Content } = Layout;

const plainOptions = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.myWish = React.createRef();
    this.state = {
      ModalText: "Please select the wishlist(s) to add:",
      visible: false,
      shareVisible: false,
      confirmLoading: false,
      title: "",
      director: "",
      cast: "",
      genre: "",
      language: "",
      date: "",
      rating: "",
      url: "",
      user: [],
      thumb_count: {},
      login_user:'',
      reply: {}
    };
  }

  setPare = () => {
    setTimeout(() => {
      console.log("My child is calling me.");
      fetch("/checkReview")
        .then((r) => {
          console.log('review',r);
          return r.json();
        })
        .then((r) => {
          const reviews = r;
          fetch("/thumbupordown")
            .then((r) => {
              return r.json();
            })
            .then(r => {
              const thumbcounts = r.thumb_count;
              const loginUser = r.login_user;
              fetch("/replyReview")
                .then((r) => r.json())
                .then((r) => {
                    console.log(r)
                    this.setState({
                      reply: r.reply,
                      thumb_count: thumbcounts,
                      login_user: loginUser,
                      user: reviews.user,
                      rating: reviews.rating
                    });
                })
              console.log(r);
            });
          //this.setState(r);
          console.log(r);
        });
    },500)
    
    
    
  };
  
  setPare2 = (title) => {
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

    setTimeout(() => {
      fetch("/movieDetail")
        .then((r) => {
          console.log(r);
          return r.json();
        })
        .then((r) => {
          this.setState(r.movie);
          console.log(r);
        });

      fetch("/checkReview")
        .then((r) => {
          console.log('review',r);
          return r.json();
        })
        .then((r) => {
          this.setState(r);
          console.log(r);
        });
    }, 500);
  };
  setPare3 = () => {
    console.log('update thumbupordown')
    fetch("/thumbupordown")
      .then((r) => r.json())
      .then(r => {
        this.setState({
          thumb_count: r.thumb_count,
          login_user: r.login_user
        });
        console.log(r);
      });
  }
  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });

    const data = {
      title: this.state.title,
      type: this.myWish,
    };

    fetch("/addtoWishList", {
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

    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel = () => {
    console.log("Clicked cancel button");
    this.setState({
      visible: false,
    });
  };

  componentDidMount() {
    const query = this.props.location.search;
    let title = query.split("=")[1];
    title = title.replace(/\%20/g, ' ');
    console.log("CCCCC", title);

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
      
    
    setTimeout(() => {
      fetch("/movieDetail")
      .then((r) => {
        console.log(r);
        return r.json();
      })
      .then((r) => {
        this.setState(r.movie);
        console.log(r);
      });

      fetch("/checkReview")
      .then((r) => {
        console.log('review',r);
        return r.json();
      })
      .then((r) => {
        const reviews = r;
        fetch("/thumbupordown")
          .then((r) => {
            return r.json();
          })
          .then(r => {
            const thumbcounts = r.thumb_count;
            const loginUser = r.login_user;
            fetch("/replyReview")
              .then((r) => r.json())
              .then((r) => {
                  console.log(r)
                  this.setState({
                    reply: r.reply,
                    thumb_count: thumbcounts,
                    login_user: loginUser,
                    user: reviews.user,
                    rating: reviews.rating
                  });
              })
            console.log(r);
          });
        //this.setState(r);
        console.log(r);
      });
    
    }, 500);
  }

  addToWishlist = () => {
    console.log("123");

    this.setState({
      visible: true,
    });
  };

  onChange(checkedValues) {
    this.myWish = checkedValues;
    console.log("checked = ", checkedValues);
  }

  showShare = () => {
    this.setState({
      shareVisible: true,
    });

    copy("http://localhost:3000/#/movie" + this.props.location.search);
    };

  shareOk = (e) => {
    console.log(e);
    this.setState({
      shareVisible: false,
    });
  };

  shareCancel = (e) => {
    console.log(e);
    this.setState({
      shareVisible: false,
    });
  };

  // componentDidMount(){
  //     fetch('/app')
  //         .then(r => r.json())
  //         .then(r => {
  //             this.setState(r);
  //         })
  // }
  
  render() {
    console.log(this.state.title)
    const comments = this.state.user;
    console.log('comments',comments,this.state.thumb_count,this.state.reply);
    const commentItems = comments.map((commentItem) => (
      <CommentCard {...commentItem} title={this.state.title} login_user={this.state.login_user} thumbcount={this.state.thumb_count[commentItem.userName]} reply={this.state.reply[commentItem.userName]} setPare={this.setPare}/>
    ));
    const { visible, confirmLoading, ModalText } = this.state;

    return (
      <div>
        <Layout className="layout">
          <NavBar></NavBar>
          {/* <Header className="header">header</Header> */}
          <Layout className="mainContent">
            <Content
              className="wrapper"
              style={{ padding: "0 150px", marginTop: 64 }}
            >
              <Layout className="detailmain">
                <Content className="left">
                  <div className="detailAndComments">
                    <div className="detail">
                      <MovieCard {...this.state} />
                    </div>
                    <Divider orientation="left">Comments</Divider>
                    <div className="comments">
                      <br />
                      <ul>{commentItems}</ul>
                      <AddComment
                        title={this.state.title}
                        setPare={this.setPare}
                      />
                    </div>
                  </div>
                </Content>
                <Sider
                  className="sider"
                  style={{
                    overflow: "auto",
                    height: "700px",
                  }}
                >
                  <div className="ratingwishshare">
                    <div className="rating">
                      <Divider orientation="left">Rating</Divider>
                      <div className="result">
                        <div className="text">
                          <span>{this.state.rating}</span>
                        </div>
                        <div className="rate">
                          <RatingResult rating={this.state.rating} />
                          <p>{this.state.user.length} people rated</p>
                        </div>
                      </div>
                    </div>
                    <div className="wishShare">
                      <div className="wish">
                        <Button
                          onClick={this.addToWishlist}
                          type="primary"
                          block
                        >
                          <div>
                            <PlusOutlined
                              style={{ fontSize: "25px", marginRight: "10px" }}
                            />
                            Add to Wishlist
                          </div>
                        </Button>
                      </div>
                      <br />
                      <div className="share">
                        <Button type="primary" block onClick={this.showShare}>
                          <div>
                            <ShareAltOutlined
                              style={{ fontSize: "25px", marginRight: "10px" }}
                            />
                            Share Me!
                          </div>
                        </Button>
                        <Modal
                          title="Share Me Now"
                          visible={this.state.shareVisible}
                          onOk={this.shareOk}
                          onCancel={this.shareCancel}
                        >
                          <p>The url has been copied to your clipboard.</p>
                          <p>Paste to share with your friends</p>
                          
                        </Modal>
                      </div>
                    </div>
                  </div>
                  <div className="tabs">
                    <Tabs />
                  </div>
                  <Divider orientation="left">Recommend List</Divider>
                  <div className="recommendMovies">
                    <RecommendList setPare2={this.setPare2} />
                  </div>
                </Sider>
              </Layout>
            </Content>
          </Layout>
          <Footer className="footer">footer</Footer>
        </Layout>
        <Modal
          title="Select your wishlist"
          visible={visible}
          onOk={this.handleOk.bind(this)}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel.bind(this)}
        >
          <p>{ModalText}</p>
          <Checkbox.Group
            options={plainOptions}
            onChange={this.onChange.bind(this)}
            ref={this.myWish}
          />
        </Modal>
      </div>
    );
  }
}

export default MovieDetail;
