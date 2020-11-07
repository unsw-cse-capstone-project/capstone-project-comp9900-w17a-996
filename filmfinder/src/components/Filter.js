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
        contents: contentData[typeData[0]],
    secondContent: contentData[typeData[0]][0],
     };

     handleProvinceChange = value => {
        this.setState({
            contents: contentData[value],
            secondContent: contentData[value][0],
        });
      };
    
      onSecondCityChange = value => {
        this.setState({
            secondContent: value,
        });
      };
      

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
        <Button type="primary">Browse</Button>
        </React.Fragment> );
    }
}
 
export default Filter;