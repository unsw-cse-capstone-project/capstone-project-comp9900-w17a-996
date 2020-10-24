import React from 'react';
import searchImg from "../images/searchbar.png"
// import './style.css';



const homeImage = {
    backgroundSize: '100% 100%', //记得这里100%
    background: 'url(${ homeImage })',
    backgroundImage: 'url(' + searchImg + ')'
  }


class Dropdown extends React.Component {
  constructor() {
    super();
    this.state = {
      displayMenu: false,
    };
    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
  }

  showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      // 在DOM根节点上为组件绑定事件处理函数
      document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    // 在这里解绑组件在DOM根节点上绑定的事件
    this.setState({ displayMenu: false }, () => {
      // 注意事件的绑定解绑不能传递匿名函数
      document.removeEventListener('click', this.hideDropdownMenu);
    });
  }






  render() {
    return (
      <div className="dropdown">
        <button  className="btn btn-secondary btn-sm" onClick={this.showDropdownMenu} style={{width: '60px', height: '30px',border: '1px solid #1A237E',color: '#1A237E'}}> Share </button>
        
        {
          this.state.displayMenu ? (
            <ul>
              <li><a className="active" href="#www.facebook.com/">Facebook</a></li>
              <li><a href="#www.instagram.com/">Instagram</a></li>
              <li><a href="#Web.wechat.com/">Wechat</a></li>
              <li><a href="#twitter.com/">Twitter</a></li>
              <li><a href="#www.snapchat.com/">Snapchat</a></li>
              
            </ul>
          ) : null
        }
      </div>

    );
  }
}
export default Dropdown;