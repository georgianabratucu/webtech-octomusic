import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import './css/style.css'

class RadioPlayer extends Component {
 constructor(props) {
    super(props);
    this.state = { 
    radio:[
        {
            name:"RadioZu", link:"http://5.254.113.34:9123/radiozu.aacp"
        },
            
        {
             name:"KissFM", link:"http://80.86.106.143:9128/kissfm.aacp"
        },
        {
             name:"EuropaFM", link:"http://astreaming.europafm.ro:8000/europafm_mp3_64k"
        },
        {
             name:"MagicFM", link:"http://80.86.106.143:9128/magicfm.aacp"
        },
        {
             name:"RockFM", link:"http://80.86.106.143:9128/rockfm.aacp"
        }
]
  }
 }
  render() {
    return (
      <div>
      
       <ul id="radio">
      {
        this.state.radio.map((e, i)=><li key={i} onClick={()=>{console.log("play")}}>
        {e.name} <ReactPlayer url={e.link} controls height="15px" width="200px"/>
        </li>)
      }
      </ul>
      </div>
    );
  }


}

export default RadioPlayer