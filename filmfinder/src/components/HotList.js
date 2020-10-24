import React, {Component} from 'react';
import  './styledHotList.css';
import rightarrowImg from "../images/rightarrow.png"
import leftarrowImg from "../images/leftarrow.png"
import HotMovies from "./HotMovies"


class HotList extends Component{
    constructor(){
        super();
        this.state = {
            imgs:[
                './1.png',
                './2.png',
                './3.png',
                './4.png',
                './5.png',
                './6.png',
                './7.png',
               ],   // 图片数组
          showIndex: 0, //显示第几个图片
          timer: null,  // 定时器
          show: false   // 前后按钮显示
        }
    }
    render(){
        return (
            <div className="ReactCarousel">
                <div className="contain" 
                     onMouseEnter={()=>{this.stop()}} //鼠标进入停止自动播放
                     onMouseLeave={()=>{this.start()}}  //鼠标退出自动播放
                >
                    <ul className="ul">
                        {
                            this.state.imgs.map((value, index) => {
                                return (
                                    <li className={index === this.state.showIndex ? 'show' : ''}
                                        key={index} 
                                    > 
                                    
                                    
                                        <img src={require(value + '')} alt="轮播图"  onClick={this.handle}/>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <ul className="dots" style={{width: this.state.imgs.length * 30 + 'px'}}> 
                        {
                            this.state.imgs.map((value, index) => {
                                return (
                                    <li key={index}  
                                        className={index === this.state.showIndex ? 'active' : ''} 
                                        onClick={()=>{this.change(index)}}>
                                    </li>)
                            })
                        }
                        
                    </ul>
                    <div className="control">
                        <span className="left"  onClick={(e)=>{this.previous(e)}}><img src={leftarrowImg} style={{width: '20px', height: '20px'}}/> </span>
                        <span className="right" onClick={(e)=>{this.next(e)}}><img src={rightarrowImg} style={{width: '20px', height: '20px'}}/> </span>
                    </div>
                </div>
                <HotMovies/>
            </div>
        )
    }

    handle(){
        const w=window.open('about:blank');
        w.location.href='你的地址';
        }
    componentDidMount(){ //一开始自动播放
        this.start();
    }
    componentWillUnmount() { //销毁前清除定时器
        this.stop();
    }
    stop = () => { //暂停
        let {timer} = this.state;
        clearInterval(timer);
    }
    start = () => { //开始
        let {timer} = this.state;
        timer = setInterval(() => {
            this.next();
        }, 2000);
        this.setState({
            timer
        })
    }
    change = (index) => { //点击下面的按钮切换当前显示的图片
        let {showIndex} = this.state;
        showIndex = index;
        this.setState({
            showIndex
        })
    }
    previous = (e) => { //上一张
        let ev = e || window.event;
        let {showIndex, imgs} = this.state;
        if(showIndex <= 0){
            showIndex = imgs.length - 1;
        }else{
            showIndex --;
        }
        this.setState({
            showIndex
        })
    }
    next = (e) => { //下一张
        let ev = e || window.event;
        let {showIndex, imgs} = this.state;
        if(showIndex >= imgs.length - 1){
            showIndex = 0;
        }else{
            showIndex ++;
        }
        this.setState({
            showIndex
        })
    }
}
export default HotList;
