import React, { Component } from 'react';

import MenuBar from './MenuBar';
import MainContent from './MainContent';

import threads from './threads.json';

// import './Reddit.css';

export default class Reddit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'myusername',
            threads: threads.data.children,
            expandedView: false,
            subreddit: ''
        }
    }

    componentDidMount() {
        document.addEventListener('keypress', (e) => {
            console.log(e.keyCode);
            if (e.keyCode === 'a'.charCodeAt()) this.setState({expandedView: true});
            if (e.keyCode === 'd'.charCodeAt()) this.setState({expandedView: false});
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