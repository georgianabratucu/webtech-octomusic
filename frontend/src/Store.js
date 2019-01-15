import axios from 'axios'
import {EventEmitter} from 'fbemitter'

const SERVER='https://webtech-octomusic-bratucugeorgiana.c9users.io'

class Store{
    constructor(){
        this.content=[]
        this.emitter=new EventEmitter()
    }
    async getAllGeoTracks(){
        try{
            let response=await axios(`${SERVER}/geoTrackList`)
            this.content=response.data
            this.emitter.emit('GET_ALL_SUCCESS')
        }catch(ex){
            console.log(ex)
            this.emitter.emit('GET_ALL_ERROR')
        }
    }
    async getAllAccounts(){
        try{
            let response=await axios(`${SERVER}/accountList`)
            this.content=response.data
            this.emitter.emit('GET_ALL_SUCCESS')
        }catch(ex){
            console.log(ex)
            this.emitter.emit('GET_ALL_ERROR')
        }
    }
    async addOneGeoTrack(country){
        try{
		    await axios.post(`${SERVER}/geoTracks/`+country)
			this.getAllGeoTracks()
			this.emitter.emit('ADD_SUCCESS')			
		}
		catch(ex){
			console.warn(ex)
			this.emitter.emit('ADD_ERROR')
		}

    }
     async getAllGenreTracks(){
        try{
            let response=await axios(`${SERVER}/genreTrackList`)
            this.content=response.data
              this.emitter.emit('GET_ALL_SUCCESS')
            
        } catch(ex){
            console.warn(ex)
            this.emitter.emit('GET_ALL_ERROR')
        }
    }
    async addGenreList(genre){
          try{
            await axios.post(`${SERVER}/genreTracks/`+genre)
            this.getAllGenreTracks()
              this.emitter.emit('ADD_SUCCESS')
            
        } catch(ex){
            console.warn(ex)
            this.emitter.emit('ADD_ERROR')
        }
    }
    
    async getAllMusicForAnUser(idUser){
        try{
            let response=await axios(`${SERVER}/userPreferences/`+idUser)
            this.content=response.data
              this.emitter.emit('GET_ALL_SUCCESS')
            
        } catch(ex){
            console.warn(ex)
            this.emitter.emit('GET_ALL_ERROR')
        }
    }
    async addPreference(preference){
          try{
            await axios.post(`${SERVER}/preferences`,preference)
            this.getAllMusicForAnUser(preference.id_user)
              this.emitter.emit('ADD_SUCCESS')
            
        } catch(ex){
            console.warn(ex)
            this.emitter.emit('ADD_ERROR')
        }
    }
    async deleteFav(id,track_name){
		try{
			await axios.delete(`${SERVER}/deletePreference/`+id+'/'+track_name)
			this.getAllMusicForAnUser(id)
			this.emitter.emit('DELETE_SUCCESS')			
		}
		catch(ex){
			console.warn(ex)
			this.emitter.emit('DELETE_ERROR')
		}
	}

    async saveFav(fav,id){
        
		try{
		    await axios.put(`${SERVER}/updatePreference/`+fav.track_name+'/'+id, fav)
			this.getAllMusicForAnUser(id)
			this.emitter.emit('SAVE_SUCCESS')			
		}
		catch(ex){
			console.warn(ex)
			this.emitter.emit('SAVE_ERROR')
		}		
	
    }
    async addArtists(country){
        try{
		    await axios.post(`${SERVER}/artists/`+country)
			this.getArtists()
			this.emitter.emit('ADD_SUCCESS')			
		}
		catch(ex){
			console.warn(ex)
			this.emitter.emit('ADD_ERROR')
		}

    }
    async getArtists(){
        try{
             let response=await axios(`${SERVER}/artistList`)
            this.content=response.data
            this.emitter.emit('GET_ALL_SUCCESS')
        }catch(ex){
            console.log(ex)
            this.emitter.emit('GET_ALL_ERROR')
        }
    }
     async deleteAccount(id){
		try{
			await axios.delete(`${SERVER}/account/`+id)
			this.getAllAccounts()
			this.emitter.emit('DELETE_SUCCESS')			
		}
		catch(ex){
			console.warn(ex)
			this.emitter.emit('DELETE_ERROR')
		}
	}

    async postAccount(user){
        axios.post(`${SERVER}/accounts`, user)
    .then(function (response) {
     if(response.data.id ==null){
         alert(response.data);
     }else{
        alert('User successfully created!');
     }
         
     })
 .catch(function (error) {
 console.log(error);
 
 });
    }
}
export default Store