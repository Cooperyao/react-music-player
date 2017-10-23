import React, {Component} from 'react'
import MusicListSong from './components/musiclistsong'

class MusicList extends Component {
    render(){
        let listElement = null;
        listElement = this.props.musicList.map((item)=>{
            return <MusicListSong 
            focus={item === this.props.currentMusic}
            key={item.id}
            musicSong={item}
            >
            </MusicListSong>
        });
        return (
            <ul>
                { listElement }
            </ul>
        )
    }
}

export default MusicList;