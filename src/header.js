import React, {Component} from 'react';
import './header.css';
import mlogo from './images/logo.png'

class Header extends Component{
  render() {
      return (
          <div className="components-header row">
              <img src={mlogo} alt="" className="fl"/>
              <h1 className="caption fl">Music Player</h1>
          </div>
      );
  }
};

export default Header;
