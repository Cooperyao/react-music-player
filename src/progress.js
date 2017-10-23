import React, {Component} from 'react'
import './progress.css';

class Progress extends Component {
    constructor (props) {
        super(props);
        this.state = {
            progress: '0',
            barColor: '#9FF99F'
        }   
    }
    
    changeProgress(e) {
        let progressBar = this.refs.progressBar;
        let progress = ((e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth)*100;
        this.setState({
            progress : progress
        }); 
        this.props.onProgressChange(progress);
    }
    render() {
        return (
            <div className="components-progress" ref="progressBar" onClick={this.changeProgress.bind(this)}>
                <div className="progress" style={{width : `${this.props.progress}%`, background: this.state.barColor}}></div>
            </div>
        );
    }
}

export default Progress;