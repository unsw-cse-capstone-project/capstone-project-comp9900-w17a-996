import React, { Component } from 'react';

class Share extends Component {

        constructor(props) {
            super(props);
            this.state = {value: 'basketball'};
            this.handleChange = this.handleChange.bind(this);
        }
        handleChange(event) {
            this.setState({value: event.target.value});
        }
    render() {
        return (
            <div>
            <label>choose favorite sports：
                <select value={this.state.value} onChange={this.handleChange}>
                    <option value="running">running</option>
                    <option value="basketball">basketball</option>
                    <option value="skiing">skiing</option>
                </select>
            </label>
            <div>chosen: {this.state.value}</div>
        </div>
)
}
}

export default Share;

