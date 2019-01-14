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
      <h1 align='center'>Listen your favourite radio channel!</h1>
       <ul id="radio">
      {
        this.state.radio.map((e, i)=><li key={i}><div align="center" onClick={()=>{console.log("play")}}>
        {e.name} <ReactPlayer url={e.link} controls height="15px" width="200px"/>
        </div></li>)
      }
      </ul>
      </div>
    );
  }


}

export default RadioPlayer