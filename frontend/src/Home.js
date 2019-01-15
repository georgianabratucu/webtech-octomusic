import React, { Component } from 'react';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {TabMenu} from 'primereact/tabmenu';
import GeoTrackList from './GeoTrackList';
import GenreTrackList from './GenreTrackList';
import FavouriteList from './FavouriteList';
import Store from './Store';
import SignUp from './SignUp';
import RadioPlayer from './RadioPlayer';
import Artists from './ArtistsList';
import Popup from './Popup';

class Home extends Component{
     constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      items: [
            {label: 'User', icon: 'pi pi-fw pi-home'},
            {label: 'Geo Tracks', icon: 'pi pi-fw pi-calendar'},
            {label: 'Genre Tracks', icon: 'pi pi-fw pi-pencil'},
            {label: 'Artists', icon: 'pi pi-fw pi-file'},
            {label: 'RadioPlayer', icon: 'pi pi-fw pi-cog'},
            {label: 'Registration', icon: 'pi pi-fw pi-cog'},
            {label: 'Delete account', icon: 'pi pi-fw pi-pencil'},
            {label: 'Log out', icon: 'pi pi-fw pi-pencil'}
        ],
        apasat:"User",
        search:'',
        idUser:-1
    };
    this.storeDeleteAccount=new Store();
    this.store=new Store();
        	this.add = (fav) => {
			this.store.addPreference(fav)
		}
    
		
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
 onChangeId(newId){
   this.setState({
     idUser:newId
   })
 }
   
  render() {
    var selectedOption;
    if(this.apasat==='Geo Tracks'){
      selectedOption=<GeoTrackList onAdd={this.add} id={this.state.idUser}/>
    }else if(this.apasat==='Genre Tracks') {
       selectedOption=<GenreTrackList id={this.state.idUser}/>
    }
    else if(this.apasat==="Registration"){
      selectedOption=<SignUp/>
    } else if(this.apasat==="RadioPlayer"){
        selectedOption=<RadioPlayer/>
    }else if(this.apasat==="Artists"){
      selectedOption=<Artists/>
    }else if(this.apasat==="User" && this.state.idUser!==0){
     selectedOption= <FavouriteList id={this.state.idUser} />
    }else if(this.apasat==='Delete account'){
        if(this.state.idUser!==0){
            this.storeDeleteAccount.deleteAccount(this.state.idUser);
            this.storeDeleteAccount.emitter.addListener('DELETE_SUCCESS',()=>{
               this.setState({
                   idUser:0
               })
            })
            return(<div> 
         <TabMenu model={this.state.items} activeItem={this.state.activeItem} onTabChange={(e) => {this.setState({activeItem: e.value}) 
                                                                                               this.apasat=e.value.label
                                                                                               console.log(this.state.idUser)
                                                                                               this.setState({idUser:0})
      }}/>
      {selectedOption}
         <p className="logOutPage">Account deleted!</p></div>)
        } else {
            return(<div> 
         <TabMenu model={this.state.items} activeItem={this.state.activeItem} onTabChange={(e) => {this.setState({activeItem: e.value}) 
                                                                                               this.apasat=e.value.label
                                                                                               console.log(this.state.idUser)
                                                                                               this.setState({idUser:0})
      }}/>
      {selectedOption}
         <p className="logOutPage">You are not logged in!</p></div>)
     }
    } else if(this.apasat==="Log out"){
     if(this.state.idUser!==0){
       return(
      <div>
       <TabMenu model={this.state.items} activeItem={this.state.activeItem} onTabChange={(e) => {this.setState({activeItem: e.value}) 
                                                                                               this.apasat=e.value.label
                                                                                               console.log(this.state.idUser)
                                                                                               this.setState({idUser:0})
      }}/>
      {selectedOption}
      <div className="centercontainer">
      <div className="centerelements">
      <p className = "logoutMessage">You have successfully logged out of your account! See you next time! </p>
      <img src="https://media.giphy.com/media/l1J3CbFgn5o7DGRuE/giphy.gif" alt="loading..." />
      </div>
      </div>
      </div>);
     } else {
         return(<div> 
         <TabMenu model={this.state.items} activeItem={this.state.activeItem} onTabChange={(e) => {this.setState({activeItem: e.value}) 
                                                                                               this.apasat=e.value.label
                                                                                               console.log(this.state.idUser)
                                                                                               this.setState({idUser:0})
      }}/>
      {selectedOption}
         <p className="logOutPage">You are not logged in!</p></div>)
     }
    }else if(this.state.idUser===-1)
     {return (
        <div>
       <TabMenu model={this.state.items} activeItem={this.state.activeItem} onTabChange={(e) => {this.setState({activeItem: e.value}) 
                                                                                               this.apasat=e.value.label
                                                                                               console.log(this.state.idUser)
                                                                                               this.setState({idUser:0})
      }}/>
      {selectedOption}
      <p className="firstPage">OCTOMUSIC APP</p>
        </div>
        )}
    if(this.state.idUser===0  ){
      if(this.apasat==="User"){
      return(
      <div>
     
       <TabMenu model={this.state.items} activeItem={this.state.activeItem} onTabChange={(e) => {this.setState({activeItem: e.value}) 
                                                                                               this.apasat=e.value.label
                                                                                               console.log(this.state.idUser)
                                                                                               
      }}/>
      {selectedOption}
      <h1>Would you like to Log In?</h1>
      <div className="loginBTN">
      <button className="buton" onClick={this.togglePopup.bind(this)}>YES</button>
       {this.state.showPopup ? 
          (<Popup
            text='Login'
            closePopup={this.togglePopup.bind(this)}
            onId={this.onChangeId.bind(this)}/>)
          : null
        }
      </div>
      </div>);}else{
        return(<div>
        <TabMenu model={this.state.items} activeItem={this.state.activeItem} onTabChange={(e) => {this.setState({activeItem: e.value}) 
                                                                                               this.apasat=e.value.label
                                                                                               console.log(this.state.idUser)
                                                                                               
      }}/>
       {selectedOption}
      </div>);
      }
    }else{
    return (   
    <div>
    <TabMenu model={this.state.items} activeItem={this.state.activeItem} onTabChange={(e) => {this.setState({activeItem: e.value}) 
                                                                                               this.apasat=e.value.label
                                                                                               console.log(this.state.idUser)
                                                                                               
      }}/>
      {selectedOption}
      
      </div>
      );}
  }
}

export default Home;