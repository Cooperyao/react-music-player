import React, {Component} from 'react'
import './musiclistsong.css'
import Pubsub from 'pubsub-js';

class MusicListSong extends Component {
    playMusic(musicSong){
        Pubsub.publish('PLAY_MUSIC', musicSong);
    }
    render(){
        let musicSong = this.props.musicSong;
        return (
            <li onClick={this.playMusic.bind(this, musicSong)} className={`song ${this.props.focus ? 'green' : ''}`}> 
                <p>{musicSong.title} -- <small>{musicSong.artist}</small></p>
            </li>
        );
    }
}

export default MusicListSong;