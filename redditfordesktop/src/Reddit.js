import React, { Component } from 'react';

import MenuBar from './MenuBar';
import MainContent from './MainContent';

import data from './data.json';

// import './Reddit.css';

export default class Reddit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'myusername',
            threads: data.data.children,
            expandedView: false,
            subreddit: ''
        }
    }

    componentDidMount() {
        document.addEventListener('keypress', (e) => {
            console.log(e.keyCode);
            if (e.keyCode === 97) this.setState({expandedView: true});
            if (e.keyCode === 100) this.setState({expandedView: false});
        });
    }

    render() {
        if (this.state.expandedView) {

        }
        // else {
            return (
                <>
                    <MenuBar />
                    <MainContent threads={this.state.threads}/>
                </>
            );
        // }
    }
}