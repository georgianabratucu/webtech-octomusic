import React, { Component } from 'react';
import Popup from './Popup';

class Home extends Component{
     constructor() {
    super();
    this.state = {
      showPopup: false
    };
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  render() {
    return (   <div>
      <h1>Would you like to Log In?</h1>
      <div className="loginBTN">
      <button className="buton" onClick={this.togglePopup.bind(this)}>YES</button>
       {this.state.showPopup ? 
          <Popup
            text='Login'
            closePopup={this.togglePopup.bind(this)}
          />
          : null
        }
      </div>
      </div>
      );
  }
}

export default Home;
