import React, { Component } from 'react';
import marked from 'marked';

export default class MainContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            threadIdx: 0
        };
    }

    componentDidMount() {
        document.addEventListener('keypress', e => {
            if (e.keyCode === 119) this.setState(prev => ({threadIdx: Math.max(0, prev.threadIdx - 1)}));
            if (e.keyCode === 115) this.setState(prev => ({threadIdx: Math.min(this.props.threads.length - 1, prev.threadIdx + 1)}));
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
                <div className="main-content-thread-preview">
                {
                    threads.map((thread, idx) => <ThreadPreview key={idx} index={idx} threadInfo={thread} selected={idx === threadIdx} onclick={this._clickThread}/>)
                }
                </div>
                <div className="main-content-thread-expanded-container">
                    <div className="main-content-thread-expanded">
                        <h1>{threads[threadIdx].data.title}</h1>
                        <p dangerouslySetInnerHTML={{__html: marked(threads[threadIdx].data.selftext)}}></p>
                    </div>
                </div>
            </div>
        );
    }
}

const ThreadPreview = ({index, threadInfo, selected, onclick}) => {
    return (
        <h2 className={selected ? 'preview-selected' : 'preview-not-selected'} onClick={() => onclick(index)}>
            <p>{threadInfo.data.title}</p>
        </h2>
    );
}