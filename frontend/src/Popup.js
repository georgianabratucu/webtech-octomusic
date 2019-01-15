import React, { Component } from 'react';
import axios from 'axios';
import Store from './Store'
const SERVER=" https://octomusic-georgianabrailoiu.c9users.io"
class Popup extends Component{
      constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      usern:"",
      ok: 0,
      idUser : " ",
      accounts:[]
    };
   this.storeVerif=new Store();
   this.handleClick=this.handleClick.bind(this);
   this.handleChange = this.handleChange.bind(this);
  }
componentDidMount(){
        this.storeVerif.getAllAccounts()
        this.storeVerif.emitter.addListener('GET_ALL_SUCCESS',()=>{
            this.setState({
                accounts:this.storeVerif.content
            })
        })
}

handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    
  }
  

async handleClick(event){

 var user={
 "username":this.state.username,
 "password":this.state.password
 }
 var a=0;
 var id=0;
 console.log(user)
 await this.storeVerif.getAllAccounts()
 this.storeVerif.emitter.addListener("GET_ALL_SUCCESS",()=>{
    this.setState({accounts:this.storeVerif.content})
    })
 var gasit =0;
  for(var i=0;i<this.state.accounts.length;i++){
    if(this.state.accounts[i].username===this.state.username){
      gasit=1;
      }
    }
 if(gasit===1){
  await axios.get(`${SERVER}/account/`+ this.state.username).then(function (response) {
      if(user.password === response.data.password){
          a=a+1; 
          id=response.data.id;
          console.log(response);
          alert('Login successfull!');
      }
      else{
          alert('Username and password do not match');
      }
  })
  .catch(function (error) {
    console.log(error);
     alert('Username does not exist!');
  });
  this.setState({
    ok:a,
    idUser:id
  })
    await this.onChangeId()
 }else{
    alert("This account does not exists")
  }
 
 }  
 onChangeId(){
   this.props.onId(this.state.idUser)
 }
  
 render() {
     if(this.state.ok===1){
      return (
        <div></div>
     )
     }  else {
    return (
      <div className='popup'>
      
        <div className='popup_inner'>
          <h1 id="loginH1">{this.props.text}</h1>
           <form className = "form" >
        <div className="field">
                  <label className="label">Username</label>
                  <div className="control">
                    <input
                    id="idInput"
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
        <input className ="button"type="button" value="Login"onClick={this.handleClick}/>
        <input className ="button"type="button" value="Close"onClick={this.props.closePopup} />
        
      </form>
    
        </div>
      </div>
    );
     }
  }
}

export default Popup;