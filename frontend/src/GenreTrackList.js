import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import GenreTracksStore from './Store'
import {Dropdown} from 'primereact/dropdown';
import './css/style.css'

class GenreTrackList extends Component{
     constructor(){
      super();
      this.state={
          genreMusic:[],
          genre:"",
          genres:[
              {
                  label:'pop', value:'pop'
                  },
                  {label:'disco', value:'disco'
              }
              ],
          idUser:0
      }
      this.store=new GenreTracksStore();
      this.store1=new GenreTracksStore();
  }
  componentDidMount(){
      this.setState({idUser:this.props.id})
      this.store.getAllGenreTracks()
      this.store.emitter.addListener('GET_ALL_SUCCESS',()=>{
          this.setState({
              genreMusic:this.store.content
          })})
  }
    render(){
  return (
     <div className='divnou'>
     <Dropdown value={this.state.genre} options={this.state.genres} onChange={(e) => {console.log(this.state.idUser);this.setState({genre: e.value});this.store.addGenreList(e.value);   this.store.emitter.addListener('GET_ALL_SUCCESS',()=>{
          this.setState({
              genreMusic:this.store.content
          })
      })}} placeholder="pop"/>
      <br/>
      <br/>
      <GridList className='gridList' cols={4.5}>
        {this.state.genreMusic.map(tile => (
          <GridListTile key={tile.id}>
            <img src={tile.image} alt={tile.name}/>
            <GridListTileBar
              title ={tile.name}
              actionIcon={
                <IconButton>
                <img src='https://static.addtoany.com/images/icon-200-3.png' alt='adauga' width='20' height='20' onClick={(e)=>{this.store1.addPreference({track_name:tile.name, mark:1,id_user:this.props.id}); alert("Piesa adaugata cu succes!")}}></img>
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
      
    </div>
  );

}

}
export default GenreTrackList;