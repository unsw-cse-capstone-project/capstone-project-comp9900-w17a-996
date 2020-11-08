import React, { Component } from 'react';
import { Button, Select } from 'antd';

const { Option } = Select;
const typeData = ['Director', 'Genre', 'Year', 'Language'];
const contentData = {
  Director: ['Anthony Russo', 'Yimou Zhang', 'Yan Fei'],
  Genre: ['Melody', 'Music', 'Drama'],
  Year: [],
  Language: [],
};

class Filter extends Component {
    state = { 
        type: typeData[0],
        contents: contentData[typeData[0]],
    secondContent: contentData[typeData[0]][0],
     };

     handleProvinceChange = value => {
        this.setState({
            type: value,
            contents: contentData[value],
            secondContent: contentData[value][0],
        });
      };
    
      onSecondCityChange = value => {
        this.setState({
            secondContent: value,
        });
      };

      handleBrowse = () => {
        console.log(this.state);

        const data = {
          type: this.state.type,
          content: this.state.secondContent,
        }

        fetch("/searchByOther", {
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
      }
      

    render() { 
        const { contents } = this.state;
        return ( <React.Fragment>
            <Select
          defaultValue={typeData[0]}
          style={{ width: 120 }}
          onChange={this.handleProvinceChange}
        >
          {typeData.map(type => (
            <Option key={type}>{type}</Option>
          ))}
        </Select>
        <Select
          style={{ width: 200 }}
          value={this.state.secondContent}
          onChange={this.onSecondCityChange}
        >
          {contents.map(content => (
            <Option key={content}>{content}</Option>
          ))}
        </Select>
        <Button type="primary" onClick={this.handleBrowse}>Browse</Button>
        </React.Fragment> );
    }
}
 
export default Filter;