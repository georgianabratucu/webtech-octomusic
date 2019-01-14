import React, { Component } from 'react';

class Favourite extends Component {
	constructor(props){
		super(props)
		this.state = {
			isEditing : false,
		 	track_name : this.props.item.track_name,
			mark : this.props.item.mark,
			id_user:this.props.item.id_user
		}
		this.handleChange = (evt) => {
			this.setState({
				[evt.target.name] : evt.target.value
			})
		}
	}
  render() {
  
  	if (this.state.isEditing){
  		return (
  			<tbody>
  			<tr>
      		 <td>{this.props.item.track_name}</td>
	         <td><input type="text" name="mark" id="mark" onChange={this.handleChange} value={this.state.mark}/></td>
	         <td><input type="button" className="tableFavBtn" value="save" onClick={() => {
	        	this.props.onSave({
	            track_name: this.props.item.track_name,
	        	mark : this.state.mark,
	        	id_user:this.state.id_user
	        	},this.props.item.id_user)
	        	this.setState({
	        		isEditing : false
	        	})
	        }} /></td>
  				<td><input type="button" className="tableFavBtn" value="cancel" onClick={() => this.setState({isEditing : false})} /></td>	
  				</tr>
  			</tbody>
  		)
  	}
  	else{
	    return (
	      <tbody>
	         
	        <tr>
	        <td>{this.props.item.track_name}</td>
	        <td>{this.props.item.mark}</td>
	      	<td><input type="button" className="tableFavBtn" value="delete" onClick={() => this.props.onDelete(this.props.item.id_user,this.props.item.track_name)} /></td>
	        <td><input type="button" className="tableFavBtn" value="edit" onClick={() => this.setState({isEditing : true})} /></td>
	        </tr>	    
	        
	   
	      </tbody>
	    )  		
  	}
  }
}

export default Favourite