import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import GeoTracksStore from './GeoTracksStore';
import {Dropdown} from 'primereact/dropdown';
import './css/style.css';

class GeoTrackList extends React.Component{
    constructor(){
        super();
        this.state={
            tracks:[],
            country:'',
     countrySelectItems :[
    {label: 'Italia', value: 'italy'},
    {label: 'Franta', value: 'france'},
    {label: 'Spania', value: 'spain'},
    {label: 'Romania', value: 'romania'},
    {label: 'Germania', value: 'germany'}
]
        }
      this.store=new GeoTracksStore()  
    }
    componentDidMount(){
        this.store.getAll()
        this.store.emitter.addListener('GET_ALL_SUCCESS',()=>{
            this.setState({
                tracks:this.store.content
            })
        })
        
      
    }
    render(){
        var id=this.props.id;
        return(
          <div>
          
           <Dropdown value={this.state.country} options={this.state.countrySelectItems} onChange={(e) => {this.setState({country: e.value});this.store.addOne(e.value)}} placeholder="Select a Country"/>
           
            <div className="lis">
           
    <List>
    
      {
          this.state.tracks.map((e,i) => <ListItem alignItems="flex-start" key={i}>
        
        <ListItemAvatar >
          <Avatar id="b" alt="imagine melodie" src={e.image}  />
        </ListItemAvatar>
        <ListItemText
          primary={e.rank}
          secondary={
            <React.Fragment>
              <Typography component="span" color="textPrimary">
                {e.name}
              </Typography>
              {e.listeners}
            </React.Fragment>
           
          }
        />
       <img id="c" 
      value="add" src="https://tse1.mm.bing.net/th?id=OIP.oPk_awAR79Nm8Ri_FDCyrwHaHa&pid=15.1&P=0&w=30&h=30" alt="ceva"
       onClick={()=>{
                this.props.onAdd({
      			track_name :e.name,
      			mark : 0,
      			id_user:id
      		})
           alert("pus")
           
       }}/>
       
     </ListItem>
      )}
      
    </List>
    </div>
    </div>
)}
}


export default GeoTrackList;