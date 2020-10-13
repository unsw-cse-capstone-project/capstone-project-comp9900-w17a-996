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
const { Header, Footer, Sider, Content} = Layout;
class WishList extends Component{
    constructor(props){
        super(props);
        this.state={
            movieList:[poster,recom1,recom2,recom3,recom4,recom5,recom6,recom7,recom8],
            genre: 'genre'
        }
    }
    handleClickByDelete(index){
        let arr = this.state.movieList;
        arr.splice(index,1);
        this.setState({
            movieList: this.state.movieList
        })
    }
    menuChangeByClick(e){
        let index = Number(e.key);
        console.log(index);
        let mList = this.state.movieList;
        mList.splice(index,1);
        if (index === 1){
            let newList = [recom3]
            this.setState({
                movieList: newList,
                genre: 'Absurdist'
            })
        }else if (index === 2){
            let newList = [recom1,recom2]
            this.setState({
                movieList: newList,
                genre: 'Action'
            })
        }
        else if (index === 3){
            let newList = [recom5,recom6]
            this.setState({
                movieList: newList,
                genre: 'Adventure'
            })
        }
        else if (index === 4){
            let newList = [poster,recom1,recom2,recom3,recom4,recom5,recom6,recom7,recom8]
            this.setState({
                movieList: newList,
                genre: 'Comedy'
            })
        }
        else if (index === 5){
            let newList = [poster,recom1,recom2,recom3,recom4,recom5,recom6,recom7,recom8]
            this.setState({
                movieList: newList,
                genre: 'Crime'
            })
        }
        else if (index === 6){
            let newList = [poster,recom1,recom2,recom3,recom4,recom5,recom6,recom7,recom8]
            this.setState({
                movieList: newList,
                genre: 'Drama'
            })
        }
        else if (index === 7){
            let newList = [poster,recom1,recom2,recom3,recom4,recom5,recom6,recom7,recom8]
            this.setState({
                movieList: newList,
                genre: 'Fantasy'
            })
        }
        else if (index === 8){
            let newList = [poster,recom1,recom2,recom3,recom4,recom5,recom6,recom7,recom8]
            this.setState({
                movieList: newList,
                genre: 'Historical'
            })
        }
        else if (index === 9){
            let newList = [poster,recom1,recom2,recom3,recom4,recom5,recom6,recom7,recom8]
            this.setState({
                movieList: newList,
                genre: 'Horror'
            })
        }
        else if (index === 10){
            let newList = [poster,recom1,recom2,recom3,recom4,recom5,recom6,recom7,recom8]
            this.setState({
                movieList: newList,
                genre: 'Science fiction'
            })
        }

    }
    render(){
        const movies = this.state.movieList.map((k,i) => {
            return(<div className="movieItem" key={i}>
                <div className="movie">
                    <div className="wishmage">
                        <Image width='100%' height="100%" src={k} className="wishPoster"/>
                    </div>
                    <Button type="primary" onClick={this.handleClickByDelete.bind(this,i)}>delete</Button>
                </div>
            </div>
        )})
        return(
            <div>
                <Layout className="layout">
                    <Header>header</Header>
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