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
class App extends Component {
   constructor() {
    super();
    this.state = {
        items: [
            {label: 'Home', icon: 'pi pi-fw pi-home'},
            {label: 'Geo Tracks', icon: 'pi pi-fw pi-calendar'},
            {label: 'Genre Tracks', icon: 'pi pi-fw pi-pencil'},
            {label: 'Favourite', icon: 'pi pi-fw pi-pencil'},
            {label: 'Artists', icon: 'pi pi-fw pi-file'},
            {label: 'Registration', icon: 'pi pi-fw pi-cog'},
            {label: 'RadioPlayer', icon: 'pi pi-fw pi-cog'}
        ],
        apasat:'Home',
        search:'',
     
    };
       this.store=new Store();
        	this.add = (fav) => {
			this.store.addPreference(fav)
		}
}

  render() {
      var selectedOption;
    if(this.apasat==='Geo Tracks'){
      selectedOption=<GeoTrackList onAdd={this.add} id={1}/>
    }else if(this.apasat==='Genre Tracks') {
       selectedOption=<GenreTrackList id={1}/>
    }else if(this.apasat==="Favourite"){
      selectedOption=<FavouriteList id={1}/>
    }
    else if(this.apasat==="Registration"){
      selectedOption=<SignUp id={1}/>
    } else if(this.apasat==="RadioPlayer"){
        selectedOption=<RadioPlayer/>
    }else if(this.apasat==="Artists"){
      selectedOption=<Artists/>
    }
    return (
      <div >
      
      <TabMenu model={this.state.items} activeItem={this.state.activeItem} onTabChange={(e) => {this.setState({activeItem: e.value}) 
                                                                                               this.apasat=e.value.label
                                                                                               console.log(this.apasat)
                                                                                               
      }}/>
      
      {selectedOption}
      </div>
    );
  }
}

export default App;
