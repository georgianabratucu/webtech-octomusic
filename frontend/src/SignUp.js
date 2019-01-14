import React, { Component } from 'react';
import Store from './Store'
class SignUp extends Component {
    constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      username: "",
      birth_date: ""

    };
    this.store=new Store();
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
   const pattern = /[a-zA-Z0-9]+[.]?([a-zA-Z0-9]+)?[@][a-z]{3,9}[.][a-z]{2,5}/g;
   const result = pattern.test(this.state.email);
  
 var user={
    "name": this.state.name,
    "username":this.state.username,
    "password":this.state.password,
    "email": this.state.email,
    "birth_date":this.state.birth_date
 }
 
   if(this.state.name === "" || this.state.password ==="" || this.state.username==="" || this.state.name==="" || this.state.birth_date==="" || this.state.email==="" ) {
      alert('Please fill out all fields')
    }else if(user.password.length<5 || user.password.length>15) {
      alert('Password must have between 5 and 15 characters')
    }else if(result===false){
      alert('Invalid email! Format must be aaa@bbb.cc')
    }else{
    this.store.postAccount(user);
    }
 }
  

  render() {
    return (
      <div className="SignUp">
        <header>
          <div className="container">
            <nav className="navbar">
              <div className="navbar-brand">
                <h1 className="navbar-item">Sign Up Form</h1>
              </div>
            </nav>
          </div>
        </header>
        <div className="container">
          <div className="columns">
            <div className="column is-9">
              <form className="form">
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                    <input
                      id="idInput"
                      className="input"
                      type="text"
                      name="name"
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Email Address</label>
                  <div className="control">
                    <input
                    id="idInput1"
                      className="input"
                      type="email"
                      name="email"
                      value={this.state.email}
                      //onChange={this.handleChange}
                        onChange={event => this.setState({email: event.target.value})}
  
                    />
                  </div>
                </div>
                
                <div className="field">
                  <label className="label">Username</label>
                  <div className="control">
                    <input
                    id="idInput2"
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
                
                <div className="field">
                  <label className="label">Birthday</label>
                  <div className="control">
                    <input
                    id="idInput3"
                      className="input"
                      type="text"
                      name="birth_date"
                      value={this.state.birth_date}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                

                <div className="field">
                  <div className="control">
                    <input
                      type="button"
                      value="Submit"
                      className="button is-primary"
                      onClick={this.handleClick}
                    />
                  </div>
                </div>
              </form>
            </div>
           
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp