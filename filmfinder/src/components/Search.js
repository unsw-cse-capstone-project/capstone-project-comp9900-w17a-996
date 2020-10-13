import React, { Component } from "react";
import SearchOutlined from "@ant-design/icons/SearchOutlined";
import "../styles/search.css";
import { Layout, Button, Divider, Menu, Breadcrumb } from "antd";
import { Input } from "antd";
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ["my people and my country", "my people", "action"],
      found: false,
      result: [],
      display: "none",
    };
  }

  menuChangeByClick = (e) => {
    console.log(e.value);
  };

  searchOnChange = (e) => {
    const { value } = e.target;
    console.log("value", value);

    const data = {
      searchContent: value,
    };

    fetch("/search", {
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

    let newFound = this.state.found;
    let notFind = true;
    var re = new RegExp(value, "g");
    console.log(notFind);
    if (value !== "") {
      const newResult = this.state.title.filter((k, i) => {
        if (k.match(re)) {
          notFind = false;
        }
        return k.match(re);
      });
      if (!notFind) {
        newFound = true;
        notFind = false;
        this.setState({
          found: newFound,
          result: newResult,
          display: newFound ? "block" : "none",
        });
      }
    }
    console.log(notFind);
    if (notFind) {
      console.log("not");
      this.setState({
        found: false,
        result: [],
        display: "none",
      });
    }
    // console.log("result", this.state.result);
  };
  
  onPressEnter = (e) => {
    const { value } = e.target;
    window.location.href = "/#/result?keyword=" + value;
  }

  

  render() {
    const searchResult = this.state.result.map((k, i) => {
      console.log({ k });
      return (
        <Menu.Item key={i} onClick={this.menuChangeByClick.bind(this)}>
          {k}
        </Menu.Item>
      );
    });
    return (
      <div>
        <Input
          style={{ width: "500px" }}
          placeholder="please input the keywords"
          onChange={this.searchOnChange.bind(this)}
          onPressEnter={this.onPressEnter}
          prefix={<SearchOutlined />}
        />
        <div className="searchMenu" style={{ display: this.state.display }}>
          <Menu mode="inline">{searchResult}</Menu>
        </div>
      </div>
    );
  }
}

export default Search;
