import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import Player from './player';
import {MUSIC_LIST} from './music_list';
import MusicList from './musiclist';
import {Router, IndexRoute, Route, hashHistory} from 'react-router';
import Pubsub from 'pubsub-js';

class App extends Component {
		constructor() {
				super();
				this.state = {
						musicList: MUSIC_LIST,
						currentMusic: MUSIC_LIST[1]
				}
		}
		playMusic(musicSong) {
				this.setState({currentMusic: musicSong})
		}
		playNext(type = '') {
				let index = this.findMusicIndex(this.state.currentMusic);
				let newIndex = null;
				let songs = this.state.musicList.length;
				if (type === 'next') {
						newIndex = (index + 1) % songs;
				} else {
						newIndex = (index - 1 + songs) % songs;
				}
				this.playMusic(this.state.musicList[newIndex]);
		}
		findMusicIndex(musicSong) {
				return this
						.state
						.musicList
						.indexOf(musicSong);
		}
		componentDidMount() {
				Pubsub.subscribe('PLAY_MUSIC', (msg, musicSong) => {
						this.playMusic(musicSong)
				});
				Pubsub.subscribe('PLAY_PREV', (msg, musicSong) => {
						this.playNext('prev')
				});
				Pubsub.subscribe('PLAY_NEXT', (msg, musicSong) => {
						this.playNext('next')
				});
		}
		componentWillMount() {
				Pubsub.unsubscribe('PLAY_MUSIC');
				Pubsub.unsubscribe('PLAY_PREV');
				Pubsub.unsubscribe('PLAY_NEXT');
		}
		render() {
				return (
						<div>
								<Header/> {React.cloneElement(this.props.children, this.state)}
						</div>
				);
		}
}

class Root extends Component {
		render() {
				return (
						<Router history={hashHistory}>
								<Route path="/" component={App}>
										<IndexRoute component={Player}></IndexRoute>
										<Route path="/list" component={MusicList}></Route>
								</Route>
						</Router>
				)
		}
}

ReactDOM.render(
		<Root/>, document.getElementById('root'));

// <Player currentMusic={this.state.currentMusic}/>