import axios from 'axios'
import {EventEmitter} from 'fbemitter'

class GenreMusicStore{
    constructor(){
        this.content=[]
        this.emitter=new EventEmitter()
    }
    async getAll(){
        try{
            let response=await axios('https://webtech-octomusic-bratucuiuliana.c9users.io/genreTrackList')
            this.content=response.data
              this.emitter.emit('GET_ALL_SUCCESS')
            
        } catch(ex){
            console.warn(ex)
            this.emitter.emit('GET_ALL_ERROR')
        }
    }
    async addGenreList(genre){
          try{
            await axios.post('https://webtech-octomusic-bratucuiuliana.c9users.io/genreTracks/'+genre)
            this.getAll()
              this.emitter.emit('ADD_SUCCESS')
            
        } catch(ex){
            console.warn(ex)
            this.emitter.emit('ADD_ERROR')
        }
    }
    async deleteOne(id){}
    async saveOne(id, genreMusic){}
}

export default GenreMusicStore