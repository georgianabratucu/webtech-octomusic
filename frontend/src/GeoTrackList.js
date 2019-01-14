import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import GeoTracksStore from './Store';
import {Dropdown} from 'primereact/dropdown';
import './css/style.css';

class GeoTrackList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            tracks:[],
            country:'',
     countrySelectItems :[
    {label: 'Italia', value: 'italy'},
    {label: 'Franta', value: 'france'},
    {label: 'Spania', value: 'spain'},
    {label: 'Romania', value: 'romania'},
    {label: 'Germania', value: 'germany'}
],
    idUser:0,
    pref:[]
        }
      this.store=new GeoTracksStore()
      this.store2=new GeoTracksStore()
    }
    componentDidMount(){
        this.store.getAllGeoTracks()
        this.store.emitter.addListener('GET_ALL_SUCCESS',()=>{
            this.setState({
                tracks:this.store.content
            })
        })
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
        var id=this.props.id;
       
        return(
          <div>
          <div className="margin1">
            <p id="para">Top tracks list by country</p>
           <Dropdown value={this.state.country} options={this.state.countrySelectItems} onChange={(e) => {this.setState({country: e.value});this.store.addOneGeoTrack(e.value)}} placeholder="Select a Country" 
          />
          </div>
            
            <div className="lis">
         <div id="x">  
    <List>
    
      {
          this.state.tracks.map((e,i) => <ListItem alignItems="flex-start" key={i+1}>
        
        <ListItemAvatar >
          <Avatar id="b" alt="imagine melodie" src={e.image}  />
        </ListItemAvatar>
        <ListItemText 
          primary={"Rank: "+(i+1)}
          secondary={
            <React.Fragment>
              <Typography id="itemListGeo" component="span" color="textPrimary">
                {"Name: "+e.name}
              </Typography>
              {"Listeners:"+e.listeners}
            </React.Fragment>
           
          }
        />
       <img id="c" 
      value="add" src="https://us.123rf.com/450wm/faysalfarhan/faysalfarhan1710/faysalfarhan171017256/88981371-add-to-favorite-icon-isolated-on-special-black-square-button-abstract-illustration.jpg?ver=6" alt="ceva"
         
        onClick={async()=>{ console.log(this.state.idUser);
      
                if(this.props.id===0){
                    alert("Nu sunteti logat!");
                } else {
                 
              await this.store2.getAllMusicForAnUser(this.props.id)
               this.store2.emitter.addListener('GET_ALL_SUCCESS',()=>{
               this.setState({
                pref:this.store2.content
              })
            })
            var gasit=0;
            for(var i=0;i<this.state.pref.length;i++){
                if(this.state.pref[i].track_name===e.name){
                    gasit=1;
                }
            }
            if(gasit===0){
                this.props.onAdd({
      			track_name :e.name,
      			mark : 0,
      			id_user:id
      		})
           alert("pus");
                } else {
                    alert('Exista deja!');
                }
                } 
        }}/>
       
     </ListItem>
      )}
      
    </List>
    </div>
    </div>
    </div>
)}
}


export default GeoTrackList;