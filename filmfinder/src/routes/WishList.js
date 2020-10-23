import React, { Component } from 'react';
import "../styles/wishList.css";
import "../styles/movie.css";
import { Layout, Button, Divider, Menu, Breadcrumb} from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import poster from '../My perple, My Homeland(2020).jpg';
import recom1 from '../rec1.jpg';
import recom2 from '../rec2.jpg';
import recom3 from '../rec3.jpg';
import recom4 from '../rec4.jpg';
import recom5 from '../rec5.jpg';
import recom6 from '../rec6.jpg';
import recom7 from '../rec7.jpg';
import recom8 from '../rec8.jpg';
import {Image} from 'antd';
import { getKeyThenIncreaseKey } from 'antd/lib/message';
import NavBar from "../components/NavBar";
const { Header, Footer, Sider, Content} = Layout;
class WishList extends Component{
    constructor(props){
        super(props);
        this.state={
            Absurdist: [], 
            Action: [],
            Adventure: ['Clouds'],
            Comedy: [],
            Crime: [],
            Drama: [],
            Fantasy: [],
            Historical: [],
            Horror: [],
            "Science\xa0fiction": [],
            movieList: [],
            genre: 'genre',
        }
    }

    componentDidMount(){
        fetch("/wishlist")
      .then((r) => r.json())
      .then((r) => {
          console.log(r);
        this.setState(r);
      })
    }

    handleClickByDelete(index){
        let arr = this.state.movieList;
        arr.splice(index, 1);
        this.setState({
            movieList: this.state.movieList
        })
    }

    menuChangeByClick(e){
        let index = Number(e.key);
        console.log(index);

        // let mList = this.state;
        // mList.splice(index,1);
        
        if (index === 1){
            let newList = this.state.Absurdist;
            this.setState({
                movieList: newList,
                genre: 'Absurdist'
            })
        }else if (index === 2){
            let newList = this.state.Action;
            this.setState({
                movieList: newList,
                genre: 'Action'
            })
        }
        else if (index === 3){
            let newList = this.state.Adventure;
            this.setState({
                movieList: newList,
                genre: 'Adventure'
            })
        }
        else if (index === 4){
            let newList = this.state.Comedy;
            this.setState({
                movieList: newList,
                genre: 'Comedy'
            })
        }
        else if (index === 5){
            let newList = this.state.Crime;
            this.setState({
                movieList: newList,
                genre: 'Crime'
            })
        }
        else if (index === 6){
            let newList = this.state.Drama;
            this.setState({
                movieList: newList,
                genre: 'Drama'
            })
        }
        else if (index === 7){
            let newList = this.state.Fantasy;
            this.setState({
                movieList: newList,
                genre: 'Fantasy'
            })
        }
        else if (index === 8){
            let newList = this.state.Historical;
            this.setState({
                movieList: newList,
                genre: 'Historical'
            })
        }
        else if (index === 9){
            let newList = this.state.Horror;
            this.setState({
                movieList: newList,
                genre: 'Horror'
            })
        }
        else if (index === 10){
            let newList = this.state["Science fiction"];
            this.setState({
                movieList: newList,
                genre: 'Science fiction'
            })
        }
    }

    gotoDetail(title){
        window.location.href = "/#/movie?title=" + title;
    }

    render(){
        const movieList = this.state.movieList;
        const movies = movieList.map((movie) => 
            {
                return (
                    <div onClick={() => (this.gotoDetail(movie))}>
                        <h5>{movie}</h5>
                        <Button type="primary">Delete</Button>
                    </div>
                )
            }
        //     return(<div className="movieItem" key={i}>
        //         <div className="movie">
                        
        //             {/* <div className="wishmage">
        //                 <Image width='100%' height="100%" src={k} className="wishPoster"/>
        //             </div>
        //             <Button type="primary" onClick={this.handleClickByDelete.bind(this,i)}>delete</Button> */}
        //         </div>
        //     </div>
        // )})
    )


        return(
            <div>
                
                <Layout className="layout">
                <NavBar></NavBar>
                    {/* <Header>header</Header> */}
                    <Layout className="wishMainLayout">
                        <Sider className="wishSider">
                            <Menu theme="dark" mode='inline'>
                                <Menu.Item key="1" onClick={this.menuChangeByClick.bind(this)}>Absurdist</Menu.Item>
                                <Menu.Item key="2" onClick={this.menuChangeByClick.bind(this)}>Action</Menu.Item>
                                <Menu.Item key="3" onClick={this.menuChangeByClick.bind(this)}>Adventure</Menu.Item>
                                <Menu.Item key="4" onClick={this.menuChangeByClick.bind(this)}>Comedy</Menu.Item>
                                <Menu.Item key="5" onClick={this.menuChangeByClick.bind(this)}>Crime</Menu.Item>
                                <Menu.Item key="6" onClick={this.menuChangeByClick.bind(this)}>Drama</Menu.Item>
                                <Menu.Item key="7" onClick={this.menuChangeByClick.bind(this)}>Fantasy</Menu.Item>
                                <Menu.Item key="8" onClick={this.menuChangeByClick.bind(this)}>Historical</Menu.Item>
                                <Menu.Item key="9" onClick={this.menuChangeByClick.bind(this)}>Horror</Menu.Item>
                                <Menu.Item key="10" onClick={this.menuChangeByClick.bind(this)}>Science fiction</Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout className="wishContentLayout">
                            <Breadcrumb className="bread">
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item>{this.state.genre}</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content className="wishContent">
                                <div className="movieList">
                                    {movies}
                                </div>
                            </Content>
                        </Layout>
                    </Layout>
                    <Footer>footer</Footer>
                </Layout>
            </div>
        )
    }


}

export default WishList;