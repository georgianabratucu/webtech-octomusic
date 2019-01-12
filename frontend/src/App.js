import React, { Component } from 'react';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {TabMenu} from 'primereact/tabmenu';
import GeoTrackList from './GeoTrackList';

class App extends Component {
   constructor() {
    super();
    this.state = {
        items: [
            {label: 'Home', icon: 'pi pi-fw pi-home'},
            {label: 'Geo Tracks', icon: 'pi pi-fw pi-calendar'},
            {label: 'Genre Tracks', icon: 'pi pi-fw pi-pencil'},
            {label: 'Artists', icon: 'pi pi-fw pi-file'},
            {label: 'Registration', icon: 'pi pi-fw pi-cog'}
        ],
        apasat:'Home',
        search:''
    };
}

  render() {
      var selectedOption;
    if(this.apasat==='Geo Tracks'){
      selectedOption=<GeoTrackList onAdd={this.add} id={1}/>
    }else if(this.apasat==='Edit') {
     
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
