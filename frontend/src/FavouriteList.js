import React, { Component } from 'react';
import Store from './Store'
import Favourite from './Favourite'

class FavouriteList extends Component {
	constructor(){
		super()
		this.state = {
			fav : []
		}
		this.store = new Store()
	
		this.delete = (id,track_name) => {
			this.store.deleteFav(id,track_name)
		}
		this.save = (fav,id) => {
			this.store.saveFav(fav, id)
		}
	}
	componentDidMount(){
	    var id=this.props.id;
		this.store.getAllMusicForAnUser(id)
		this.store.emitter.addListener('GET_ALL_SUCCESS', () => {
			this.setState({
				fav : this.store.content
			})
		})
	}
  render() {
    return (
    	
	      <div>
	      <table border="3">
	      <caption>
	      Tabel preferinte
	      </caption>
	      <thead>
	      <tr>
	      <th>Track name</th>
	      <th>Mark</th>
	      <th>Edit</th>
	      <th>Delete</th>
	      </tr>
	      </thead>
	        { 
	        	this.state.fav.map((e, i) => <Favourite item={e} key={i} onDelete={this.delete} onSave={this.save} />)
	        }
	        
	        </table>
	      </div>
    );
  }
}

export default FavouriteList
