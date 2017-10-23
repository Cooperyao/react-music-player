import React, {Component} from 'react'
import LrcSolve from './components/lrcsolve'

class Lrc extends Component {
    render(){
        let lrc = null;
        lrc = this.props.lrc && this.props.lrc.map((item,index)=>{
            return <LrcSolve 
            key={index}
            lrcP={item}
            >
            </LrcSolve>
        });
        return (
            <div>
                { lrc }
            </div>
        )
    }
}

export default Lrc;