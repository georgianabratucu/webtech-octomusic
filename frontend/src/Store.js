import axios from 'axios'
import {EventEmitter} from 'fbemitter'

const SERVER='https://webtech-octomusic-bratucugeorgiana.c9users.io'

class GeoTracksStore{
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
}
export default GeoTracksStore