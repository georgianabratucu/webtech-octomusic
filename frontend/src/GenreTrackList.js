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
              {label:'pop', value:'pop'},
              {label:'disco', value:'disco'},
              {label:'country', value:'country'},
              {label:'classical', value:'classical'},
              {label:'jazz', value:'jazz'},
              {label:'instrumental', value:'instrumental'},
              {label:'folk', value:'folk'}
              ],
          idUser:0,
          pref:[]
      }
      this.store=new GenreTracksStore();
      this.store1=new GenreTracksStore();
      this.store2=new GenreTracksStore();
  }
  componentDidMount(){
      this.setState({idUser:this.props.id})
      this.store.addGenreList('pop');   
      this.store.emitter.addListener('GET_ALL_SUCCESS',()=>{
          this.setState({
              genreMusic:this.store.content
          })
      })
      this.store.getAllGenreTracks()
      this.store.emitter.addListener('GET_ALL_SUCCESS',()=>{
          this.setState({
              genreMusic:this.store.content
          })})
      if(this.props.id!==0){
        this.store2.getAllMusicForAnUser(this.props.id)
        this.store2.emitter.addListener('GET_ALL_SUCCESS',()=>{
            this.setState({
                pref:this.store2.content
            })
        })
        }
  }
    render(){
  return (
     <div className='divnou'>
      <div className="margin1">
            <p id="para">Top tracks list by genre</p>
     <Dropdown value={this.state.genre} options={this.state.genres} onChange={(e) => {console.log(this.state.idUser);this.setState({genre: e.value});this.store.addGenreList(e.value);   this.store.emitter.addListener('GET_ALL_SUCCESS',()=>{
          this.setState({
              genreMusic:this.store.content
          })
      })}} placeholder="pop"/></div>
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
                <img src='https://static.addtoany.com/images/icon-200-3.png' alt='adauga' width='20' height='20' onClick={async(e)=>{
                if(this.props.id===0){
                  alert('You are not logged in!');
                } else {
               
                  await this.store2.getAllMusicForAnUser(this.props.id)
                   this.store2.emitter.addListener('GET_ALL_SUCCESS',()=>{
                   this.setState({
                   pref:this.store2.content
               })
          })
                var gasit=0;
                for(var i=0;i<this.state.pref.length;i++){
                if(this.state.pref[i].track_name===tile.name){
                    gasit=1;
                }
            }
                if(gasit===0){
                this.store1.addPreference({track_name:tile.name, mark:1,id_user:this.props.id}); 
                alert("Track successfully added to your favourites!")}
                  else {
                    alert("Track already added to your favourites!")
                  }
                }}}>
                </img>
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