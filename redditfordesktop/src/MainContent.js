import React, { Component } from 'react';
import marked from 'marked';

import dvActive from './img/dv_active.png';
import dvInactive from './img/dv_inactive.png';
import uvActive from './img/uv_active.png';
import uvInactive from './img/uv_inactive.png';

import comments from './comments.json';

export default class MainContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            threadIdx: 0
        };
    }

    componentDidMount() {
        document.addEventListener('keypress', e => {
            if (e.keyCode === 'w'.charCodeAt()) this.setState(prev => ({threadIdx: Math.max(0, prev.threadIdx - 1)}));
            if (e.keyCode === 's'.charCodeAt()) this.setState(prev => ({threadIdx: Math.min(this.props.threads.length - 1, prev.threadIdx + 1)}));
        })
    }

    _clickThread = (index) => {
        this.setState({threadIdx: index});
    }

    render() {
        const {threadIdx} = this.state;
        const {threads} = this.props;
        return (
            <div className="main-content-container">
                <div className="main-content-thread-preview-container">
                {
                    threads.map((thread, idx) => <ThreadPreview key={idx} index={idx} threadInfo={thread} selected={idx === threadIdx} onclick={this._clickThread}/>)
                }
                </div>
                <div className="main-content-thread-expanded-container">
                    <div className="main-content-thread-expanded">
                        <h1>{threads[threadIdx].data.title}</h1>
                        <p dangerouslySetInnerHTML={{__html: marked(threads[threadIdx].data.selftext.replace(/&amp;/, '&'))}}></p>
                        <h2>Comments</h2>
                        <div className="comments-section">
                        {threadIdx === 0 && comments[1].data.children.map((comment, idx) => <Comment key={idx} comment={comment}/>)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class ThreadPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userScore: 0
        };
    }

    componentDidMount() {
        document.addEventListener('keypress', e => {
            if (!this.props.selected) return;
            if (e.keyCode === 'q'.charCodeAt()) this._vote(1);
            if (e.keyCode === 'e'.charCodeAt()) this._vote(-1);
        })
    }

    _vote = (v) => {
        this.setState(prev => {
            let {userScore} = prev;
            if (userScore === v) userScore = 0;
            else userScore = v;
            return {
                userScore
            };
        });
    }

    render() {
        const {index, threadInfo, selected, onclick} = this.props;
        const {userScore} = this.state;
        const selectedClass = selected ? 'preview-selected' : 'preview-not-selected';
        const uv = userScore === 1 ? uvActive : uvInactive;
        const dv = userScore === -1 ? dvActive : dvInactive;
        return (
        <div className={`preview-container ${selectedClass}`}>
            <div className="preview-upvotes">
            <img className="preview-vote" src={uv} onClick={() => this._vote(1)}></img>
            <p>{threadInfo.data.score + userScore}</p>
            <img className="preview-vote" src={dv} onClick={() => this._vote(-1)}></img>
            </div>
            <h2 className="preview-content" onClick={() => onclick(index)}>
                <p>{threadInfo.data.title}</p>
            </h2>
        </div>
    );
    }
}

class Comment extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {comment} = this.props;
        return (
            <div className="comment">
                <p dangerouslySetInnerHTML={{__html: marked(comment.data.body).replace(/&amp;/, '&')}}></p>
                <div>
                {comment.data.replies.data && comment.data.replies.data.children.map(reply => <Comment comment={reply}/>)}
                </div>
            </div>
        );
    }
}