import React, { Component } from 'react';

export default class MenuBar extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="menu-bar">
                <div className="search-box">
                    <input type="text" placeholder="Search"/>
                </div>
            </div>
        )
    }
}