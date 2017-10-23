import React, {Component} from 'react';
import './player.css';
import Progress from './progress'
import play from './icon/play.png';
import pause from './icon/pause.png';
import prev from './icon/prev.png';
import next from './icon/next.png';
import volume from './icon/volume.png';
import { Link } from 'react-router'
import Pubsub from 'pubsub-js';
import Lrc from './lrc';


class Player extends Component {
    constructor() {
        super();
        this.state = {
            isPlay: true,
						progress: 0,
						volume: 0,
						muted: false
        }
    }
    handleClick() {
        this.setState({
            isPlay: !this.state.isPlay
        });
		}
		playProgress() {
			let audio = this.refs.audio;
			let progress = (audio.currentTime/audio.duration)*100;
			let volume = audio.volume;
			this.setState({
					volume: volume,
					progress: progress
			});
			// this.solve();
		}
		playPrev(){
			Pubsub.publish('PLAY_PREV')
		}
		playNext(){
			Pubsub.publish('PLAY_NEXT')
		}
    componentDidMount() {
			let audio = this.refs.audio;
			this.timerID = setInterval(() => this.playProgress(), 1000);
			audio.onended = () =>{
				this.playNext()
			}
    }

    componentWillUnmount() {
			clearInterval(this.timerID);
    }

    componentWillUpdate() {
      let audio = this.refs.audio;
      if (this.state.isPlay) {
          audio.play();
      } else {
          audio.pause();
      }
		}
		//静音
		shut() {
			let audio = this.refs.audio;
			this.setState({
				muted: !this.state.muted
			},()=>{
				audio.muted = this.state.muted;
			});
		}
		//进度条
    changeProgressHandler(progress){
      let audio = this.refs.audio;
      audio.currentTime = (progress*audio.duration)/100;
		}
		//音量
		changeVolumeHandler(progress){
			let audio = this.refs.audio;
			audio.volume = (progress/100);
		}
		// solve(){
		// 	let lrc = this.props.currentMusic.lrc;
		// 	let newLrc = lrc.split(' ').map((item) => {
		// 		return item;
		// 	});

		// 	console.log('====================================');
		// 	console.log(newLrc);
		// 	console.log('====================================');
		// }
    render() {
			let lrc = this.props.currentMusic.lrc;
			let newLrc = lrc.split(' ').map((item) => {
				return item;
			});
        return (
          <div>
            <div className="player">
                <h1>{this.props.currentMusic.title}--<small>{this.props.currentMusic.artist}</small></h1>
                {/* 图片 */}
                <div className="btn col-md-offset-4" onClick={this.handleClick.bind(this)}>
                    <img src={this.props.currentMusic.cover} alt=""/>
                </div>
                {/* 音频控件 */}
                <div className="control row">
                    {/* 音量 */}
										<div className="volumeBox">
											 <img src={volume} alt='' className="volume" onClick={this.shut.bind(this)}/>
											 <Progress
											 	progress={this.state.volume*100}
											 	onProgressChange={this.changeVolumeHandler.bind(this)}
											 >
												</Progress>
										</div>
										{/* 列表 */}
										<div className="list">
										<p><Link to="/list">播放列表 &gt;</Link></p>
										</div>
                    {/* 进度条 */}
										<Progress 
															progress={this.state.progress}
															onProgressChange={this.changeProgressHandler.bind(this)}
															>
										</Progress>
                    {/* 按钮 */}
                    <img src={prev} alt='' className="prev" onClick={this.playPrev}/>
                    <img
                        src={play}
                        alt=''
                        className="play"
                        onClick={this.handleClick.bind(this)}
                    />
                    <img
                        src={pause}
                        alt=''
                        className="play"
                        onClick={this.handleClick.bind(this)}
                    />
                    <img src={next} alt='' className="next" onClick={this.playNext}/>
                    <audio
                        ref="audio"
                        src={this.props.currentMusic.flie}>
                    </audio>
                </div>
            </div>
						<div className="lrc">
								<Lrc lrc={newLrc}></Lrc>
            </div>
					</div>
        );
    }
}

export default Player;