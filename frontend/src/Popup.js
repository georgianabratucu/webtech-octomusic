import React, { Component } from 'react';
import axios from 'axios';


class Popup extends Component{
      constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      usern:""
    };

   this.handleClick=this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  

handleClick(event){

 var user={
 "username":this.state.username,
 "password":this.state.password
 }
 console.log(user)
  axios.get('http://octomusic-georgianabrailoiu.c9users.io:8080/account/'+ this.state.username).then(function (response) {
      if(user.password === response.data.password){
          console.log(response);
          alert('Login successfull!')
      }
      else{
          alert('Username and password do not match');
      }
  })
  .catch(function (error) {
    console.log(error);
  });
 }  
  
 render() {
     
    return (
      <div className='popup' >
        <div className='popup_inner'>
          <h1>{this.props.text}</h1>
           <form className = "form">
        <div className="field">
                  <label className="label">Username</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="username"
                      value={this.state.username}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      className="input"
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
        <input className ="button"type="button" value="Login"onClick={this.handleClick} />
        <input className ="button"type="button" value="Close"onClick={this.props.closePopup} />
      </form>
    
        </div>
      </div>
    );
  }
}

export default Popup;