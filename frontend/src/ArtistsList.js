import React, { Component } from 'react';
import {DataView} from 'primereact/dataview';
import Store from './Store'
import "./css/style.css";
import {Dropdown} from 'primereact/dropdown';
class ArtistsList extends Component {
  constructor() {
    super();
    this.state = { 
        artists: [],
        layout: 'list',
        country:'',
     countrySelectItems :[
   {label: 'Italy', value: 'italy'},
    {label: 'France', value: 'france'},
    {label: 'Spain', value: 'spain'},
    {label: 'Romania', value: 'romania'},
    {label: 'Germany', value: 'germany'},
    {label: 'Hungary', value: 'hungary'},
    {label: 'Greece', value: 'greece'},
    {label: 'India', value: 'india'},
    {label: 'Poland', value: 'poland'},
    {label: 'Finland', value: 'finland'}
]
    };
    this.store = new Store();
    
}

componentDidMount() {
    this.store.addArtists('romania');
    this.store.getArtists()
        this.store.emitter.addListener('GET_ALL_SUCCESS',()=>{
            this.setState({
                artists:this.store.content
            })
        })
}
itemTemplate(artist, layout) {
        return (
            <div className="p-grid" id="artistDivP">
            <img id="artistImgElem" alt ="poza artist" src={artist.image} width="140" height="114"/> 
            <div id="artistDivS" align="right" > 
            <p>Nume: {artist.name}</p> 
            <p>Numar ascultatori:{artist.listeners}</p></div>
            </div>
        );
}
render(){

 return(
     <div>
     <div className="margin1">
     <p id="para">Artists top list by country</p>
     <Dropdown value={this.state.country} options={this.state.countrySelectItems} onChange={(e) => {this.setState({country: e.value});this.store.addArtists(e.value)}} placeholder="Romania"/>
     </div>
     <br/>
     <br/>
     <div id="divDataView">
     <DataView value={this.state.artists} layout={this.state.layout} itemTemplate={this.itemTemplate} paginator={true} rows={5}></DataView>
     </div>
    </div> 

 
    
)
    
}
}
export default ArtistsList