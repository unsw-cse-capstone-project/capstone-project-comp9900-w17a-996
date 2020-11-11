import React, { Component } from 'react';
import "../styles/wishList.css";
import "../styles/movie.css";
import { Layout, Button, Divider, Menu, Breadcrumb} from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import poster from '../My people, My Homeland(2020).jpg';
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
            "0": [],
            "1": [], 
            "2": [],
            "3": [],
            "4": [],
            "5": [],
            "6": [],
            "7": [],
            "8": [],
            "9": [],
            movieList: [],
            genre: '...',
            thisList: ""
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
        console.log(index);
        let arr = this.state.movieList;
        arr.splice(index, 1);
        console.log("thislist", this.state.thisList - 1);
        console.log(arr);
        

        const data = {
            listid: this.state.thisList - 1,
            content: arr,
        }

        fetch("/wishlist", {
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
            movieList: arr,
        })
    }

    menuChangeByClick(e){
        let index = Number(e.key);
        console.log(index);

        this.setState({
            thisList: e.key,
        })

        // let mList = this.state;
        // mList.splice(index,1);
        
        if (index === 1){
            let newList = this.state[0];
            this.setState({
                movieList: newList,
                genre: 'Zero'
            })
        }else if (index === 2){
            let newList = this.state[1];
            this.setState({
                movieList: newList,
                genre: 'One'
            })
        }
        else if (index === 3){
            let newList = this.state[2];
            this.setState({
                movieList: newList,
                genre: 'Two'
            })
        }
        else if (index === 4){
            let newList = this.state[3];
            this.setState({
                movieList: newList,
                genre: 'Three'
            })
        }
        else if (index === 5){
            let newList = this.state[4];
            this.setState({
                movieList: newList,
                genre: 'Four'
            })
        }
        else if (index === 6){
            let newList = this.state[5];
            this.setState({
                movieList: newList,
                genre: 'Five'
            })
        }
        else if (index === 7){
            let newList = this.state[6];
            this.setState({
                movieList: newList,
                genre: 'Six'
            })
        }
        else if (index === 8){
            let newList = this.state[7];
            this.setState({
                movieList: newList,
                genre: 'Seven'
            })
        }
        else if (index === 9){
            let newList = this.state[8];
            this.setState({
                movieList: newList,
                genre: 'Eight'
            })
        }
        else if (index === 10){
            let newList = this.state[9];
            this.setState({
                movieList: newList,
                genre: 'Nine'
            })
        }
    }

    gotoDetail(title){
        // const data = {
        //     title: title,
        //   }
      
        //   fetch("/movieDetail", {
        //     method: "POST",
        //     headers: {
        //       Accept: "application/json",
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(data),
        //   })
        //     .then((response) => console.log(response))
        //     .then((data) => {
        //       console.log("Success:", data);
        //     })
        //     .catch((error) => {
        //       console.error("Error:", error);
        //     });
      

        window.location.href = "/#/movie?title=" + title;
    }

    render(){
        const movieList = this.state.movieList;
        const movies = movieList.map((movie,i) => 
            {
                return (
                    <div>
                        <div onClick={() => (this.gotoDetail(movie))}>
                        <h5>{movie}</h5>
                        
                    </div>
                    <Button type="primary" onClick={() => this.handleClickByDelete(i)}>Delete</Button>
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
                                <Menu.Item key="1" onClick={this.menuChangeByClick.bind(this)}>Zero</Menu.Item>
                                <Menu.Item key="2" onClick={this.menuChangeByClick.bind(this)}>One</Menu.Item>
                                <Menu.Item key="3" onClick={this.menuChangeByClick.bind(this)}>Two</Menu.Item>
                                <Menu.Item key="4" onClick={this.menuChangeByClick.bind(this)}>Three</Menu.Item>
                                <Menu.Item key="5" onClick={this.menuChangeByClick.bind(this)}>Four</Menu.Item>
                                <Menu.Item key="6" onClick={this.menuChangeByClick.bind(this)}>Five</Menu.Item>
                                <Menu.Item key="7" onClick={this.menuChangeByClick.bind(this)}>Six</Menu.Item>
                                <Menu.Item key="8" onClick={this.menuChangeByClick.bind(this)}>Seven</Menu.Item>
                                <Menu.Item key="9" onClick={this.menuChangeByClick.bind(this)}>Eight</Menu.Item>
                                <Menu.Item key="10" onClick={this.menuChangeByClick.bind(this)}>Nine</Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout className="wishContentLayout">
                            <Breadcrumb className="bread">
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>Wishlist</Breadcrumb.Item>
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