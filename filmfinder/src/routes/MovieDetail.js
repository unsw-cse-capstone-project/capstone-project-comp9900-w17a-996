import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import "../styles/movie.css";
import PmRibbon from 'pm-ribbon';
import 'bootstrap/dist/css/bootstrap.css';
import MovieCard from '../components/MovieCard'
import Tabs from '../components/Tabs';
import { Layout, Button, Divider} from 'antd';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import ShareAltOutlined from '@ant-design/icons/ShareAltOutlined';
import RatingResult from '../components/RatingResult';
import CommentCard from '../components/CommentCard';
import RecommendList from '../components/RecommendList';
import { WindowsOutlined } from '@ant-design/icons';
const { Header, Footer, Sider, Content} = Layout;
const addToWishlist = () =>{
    console.log('123');
    window.location.href="/#/wishList";
}
class MovieDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: "",
            genre: "",
            releaseDate: "",
            cost: "",
            rating: "",
            reviewers: "",
            user: {
                userName: "",
                rating: "",
                comment: ""
            }
        };
    }
    componentDidMount(){
        fetch('/app')
            .then(r => r.json())
            .then(r => {
                this.setState(r);
            })
    }
    render(){
        return (
            <div>
                <Layout className="layout">
                    <Header className="header">header</Header>
                        <Layout className="mainContent">     
                            <Content className="wrapper" style={{ padding: '0 150px', marginTop: 64 }}>
                                <Layout className="detailmain">
                                    <Content className="left">
                                          <div className="detailAndComments">
                                              <div className="detail">
                                                  <MovieCard {...this.state} />
                                              </div >
                                              <Divider orientation="left">Comments</Divider>
                                              <div className="comments">
                                                  <br />
                                                  <CommentCard {...this.state.user}/>
                                                  <CommentCard {...this.state.user}/>
                                                  <CommentCard {...this.state.user}/>
                                                  <CommentCard {...this.state.user}/>
                                                  <CommentCard {...this.state.user}/>
                                                  <CommentCard {...this.state.user}/>
                                                  <CommentCard {...this.state.user}/>
                                                  <CommentCard {...this.state.user}/>
                                              </div>
                                          </div>
                                    </Content>
                                    <Sider className="sider" style={{
                                        overflow: 'auto',
                                        height: '700px',
                                    }}>
                                        <div className="ratingwishshare">
                                            <div className="rating">
                                                <Divider orientation="left">Rating</Divider>
                                                <div className="result">
                                                    <div className="text"><span>{this.state.rating}</span></div>
                                                    <div className="rate"><RatingResult rating={this.state.rating}/><p>{this.state.reviewers} people rated</p></div>
                                                </div>
                                            </div>
                                            <div className="wishShare">
                                                <div className="wish">
                                                    <Button onClick={addToWishlist} type="primary" block><div><PlusOutlined style={{fontSize:'25px', marginRight:'10px'}}/>Add to Wishlist</div></Button>
                                                    
                                                </div>
                                                <br />
                                                <div className="share">
                                                <Button type="primary" block><div><ShareAltOutlined style={{fontSize:'25px', marginRight:'10px'}}/>Add to Wishlist</div></Button>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="tabs">
                                            <Tabs />
                                        </div>
                                        <Divider orientation="left">Recommend List</Divider>
                                        <div className="recommendMovies">
                                            <RecommendList />
                                        </div>
                                    </Sider>
                                </Layout>
                            </Content>
                        </Layout>
                    <Footer className='footer'>footer</Footer>
                </Layout>
            </div>
        )
    }
}

export default MovieDetail;