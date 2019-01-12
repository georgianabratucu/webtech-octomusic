import axios from 'axios'
import {EventEmitter} from 'fbemitter'

class GeoTracksStore{
    constructor(){
        this.content=[]
        this.emitter=new EventEmitter()
    }
    async getAll(){
        try{
            let response=await axios('https://tryreact-bratucugeorgiana.c9users.io/geoTrackList')
            this.content=response.data
            this.emitter.emit('GET_ALL_SUCCESS')
        }catch(ex){
            console.log(ex)
            this.emitter.emit('GET_ALL_ERROR')
        }
    }
    async addOne(country){
        try{
		    await axios.post(`https://tryreact-bratucugeorgiana.c9users.io/geoTracks/`+country)
			this.getAll()
			this.emitter.emit('ADD_SUCCESS')			
		}
		catch(ex){
			console.warn(ex)
			this.emitter.emit('ADD_ERROR')
		}

    }
}
export default GeoTracksStore