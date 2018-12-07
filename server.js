const express=require("express")
const Sequelize=require("sequelize")
const axios=require("axios")

const app=express()
app.use("/",express.static('static'))
const sequelize = new Sequelize('Music', 'root', '', {
    dialect:'mysql',
    host:'localhost'
})

sequelize.authenticate().then(function(){
    console.log("success");
}).catch(function(){
    console.log("there was an error connecting to db");
})

//create tables
const Accounts = sequelize.define('accounts', {
    
    name: Sequelize.STRING,
    username: {
                type:Sequelize.STRING,
                unique:{
                    msg:'This username already exists'
                },
                 allowNull: false
                
        },
    password: {
                type:Sequelize.STRING,
                allowNull: false,
               validate:{
                    len:{
                        args:[5,15],
                        msg:'Password must have between 5 and 15 characters'
                    },
                    notEmpty:true,
               }
    },
    email: { 
              type:Sequelize.STRING,
              allowNull:false,
              validate: {
                isEmail:{
                    msg: 'Email address is not valid'}}
            },
    birth_date:Sequelize.DATE
})

const GeoTracks = sequelize.define('geo_tracks', {
    
    name: {
           type:Sequelize.STRING,
           allowNull: false,
    },
    listeners: Sequelize.INTEGER,
    url: Sequelize.STRING,
    image: Sequelize.STRING,
    rank: {
            type: Sequelize.INTEGER,
            allowNull:false
            },
    country: Sequelize.STRING,
    id_artist:Sequelize.INTEGER
})

const GenreTracks = sequelize.define('genre_tracks', {
    
     name:{ 
             type:Sequelize.STRING,
             allowNull: false
          
        },
    duration: Sequelize.INTEGER,
    url: Sequelize.STRING,
    image: Sequelize.STRING,
    rank: {type:Sequelize.INTEGER,
           allowNull:false,
         
    },
    rank: Sequelize.INTEGER,
    genre: Sequelize.STRING,
    id_artist:Sequelize.INTEGER
})

const Artists=sequelize.define('artists',{
    
    name: {
        type:Sequelize.STRING,
        allowNull:false
    },
    listeners:Sequelize.INTEGER,
    url:Sequelize.STRING,
    image:Sequelize.STRING
})
const Preferences=sequelize.define('preferences',{
    track_name:{
                type:Sequelize.STRING,
                allowNull: false
    },
    mark:{
           type:Sequelize.INTEGER,
        
    },
    id_user:{
              type:Sequelize.INTEGER,
                allowNull: false
    }
})
app.get('/createdb',function(request,response){
    sequelize.sync({force:true}).then(function(){
        response.status(200).send('tables created')
    }).catch(function(){
        response.status(200).send('could not create database')
    })
})
Accounts.hasMany(Preferences,{foreignKey:'id_user'});
Preferences.belongsTo(Accounts,{foreignKey:'id_user'});
Artists.hasMany(GeoTracks,{foreignKey:'id_artist'});
Artists.hasMany(GenreTracks,{foreignKey:'id_artist'});
GenreTracks.belongsTo(Artists,{foreignKey:'id_artist'});
GeoTracks.belongsTo(Artists,{foreignKey:'id_artist'});

app.use(express.json());
app.use(express.urlencoded());

app.post('/accounts',function(request,response){
    Accounts.create(request.body).then(function(account){
        response.status(201).json(account);
    }).catch(function(error){
        response.status(401).send(error.message);
    })
})
app.get('/userPreferences/:username', async(request,response)=>{
    try{
        let account=await Accounts.findOne({where:{username:request.params.username}});
        if(account){
            let preferences=await account.getPreferences();
            response.status(200).json(preferences);
        } else {
            response.status(404).send("not found");
        }
    } catch(error){
        response.status(500).send(error.message);
    }
    
})
app.get('/accountList',async(request,response)=>{
    try {
        let accounts= await Accounts.findAll();
        response.status(200).json(accounts);
    } catch(error) {
        response.status(500).send(error.message);
    }
})
app.put('/updateAccount/:username',async function(request,response){
    try {
        let account=await Accounts.findOne({where:{username:request.params.username}});
        if(account){
            await account.update(request.body);
            response.status(200).json(account);
        }
        else {
            response.status(404).send("Not found");
        }
    } catch(error){
        response.status(500).send(error.message);
    }
  
})

app.delete("/account/:username", async function(request,response){
    try{
      let account= await Accounts.findOne({where:{username:request.params.username}});
      if(account){
          await account.destroy();
          response.status(200).send("The account was deleted");
      }
      else
      {
          response.status(404).send("The account was not found");
      }
    } catch(error){
        response.status(500).send(error.message);
    }
})

app.post('/preferences',function(request,response){
    Preferences.create(request.body).then((p)=>{
        response.status(201).json(p)
    }).catch(error=>{
        response.status(400).send(error.message)
    })
})

app.get('/preferenceList',async function(request,response){
    try{
   let preferences= await Preferences.findAll()
        response.status(200).json(preferences)
    }catch(error){
        response.status(500).send(error.message)
    }
})
app.put('/updatePreference/:track_name/:id_user',async function(request, response) {
    try{
        let preference = await Preferences.findOne(
            {
                where:{track_name:request.params.track_name,
                id_user:request.params.id_user}
                
            })
        if(preference){
            
            await preference.update(request.body)
            response.status(200).send("The preference has been updated.")
            
        }else{
            
            response.status(404).send("Preference not found.")
        }
        
    }catch(error){
        response.status(500).send(error.message)
    }
    
})

app.delete('/deletePreference/:id_user/:track_name',async(request,response)=>{
    try{
        let preference=await Preferences.findOne(
            { 
              where:{
                  
                  id_user:request.params.id_user,
                  track_name:request.params.track_name}
                
            })
        if(preference){
            
            await preference.destroy()
            response.status(200).send('The prefernce has been deleted.')
            
        }else{
            
            response.status(404).send("Preference not found.")
        }
    }catch(error){
        
        response.status(500).send(error.message)
    }
})

//insert into artists from last.fm api
app.post('/artists/:country',(request,response)=>{
    
    let url='http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country='+request.params.country+'&api_key=3516736128cc24d429fa4a04d2ef2d7b&format=json&limit=20';
    Artists.findAll().then(function(artists){
        if(artists){
            for(var i=0;i<artists.length;i++){
                artists[i].destroy();
            }
        }
    })
    axios.get(url).then((result)=>{
        for(var i=0;i<20;i++){
            var name=result.data.topartists.artist[i].name;
            var listeners=result.data.topartists.artist[i].listeners;
            var url=result.data.topartists.artist[i].url;
            var image=result.data.topartists.artist[i].image[2]["#text"]
            Artists.create({ "id":i+1,
                             "name":name,
                             "listeners":listeners,
                             "url":url,
                             "image":image
            })
        }
        response.status(200).send("ok");
    })
})

app.get("/artistList", async function(request,response){
    try
    { 
        let artists= await Artists.findAll();
        response.status(200).json(artists);
    }
    catch(error)
    {
        response.status(500).send(error.message);
    }
})

async function findArtistIdByName(searched_name){
   var artist=await Artists.findOne({where:{name:searched_name}});
    if(artist){
    return artist.id;
    }
   else{
       return null;
     }
}

app.post('/geoTracks/:country',(request,response)=>{
    let url='https://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country='+request.params.country+'&api_key=3516736128cc24d429fa4a04d2ef2d7b&format=json&limit=20'
   GeoTracks.findAll().then(function(track){
        if(track){
            for(var i=0;i<track.length;i++){
                track[i].destroy();
            }
             console.log("sterse");
        }
       
    })
   axios.get(url).then(async(result) => {
        
        for(let i=0;i<20;i++){
        var name=result.data.tracks.track[i].name;
        var noOfListeners=result.data.tracks.track[i].listeners;
        var url=result.data.tracks.track[i].url;
        var image=result.data.tracks.track[i].image[1]['#text'];
        var rank=result.data.tracks.track[i]['@attr'].rank;
        var country=request.params.country;
        let artist_name=result.data.tracks.track[i].artist.name;
    
        try{
           var id_artist = await findArtistIdByName(artist_name);
          await  GeoTracks.create({"id":i+1,
                          "name":name,
                          "listeners":noOfListeners,
                          "url":url,
                          "image":image,
                          "rank":rank,
                          "country":country,
                          "id_artist":id_artist
        })
        }catch(error){
            
            console.log("Error message: "+error.message);
        }
}
    
    response.status(200).send('The data has been successfully inserted into the table');
     
    })
    
   
})

app.put('/geoTracks/:name', function(request, response) {
    GeoTracks.findOne({
  where: {name: request.params.name}
}).then(function(geo_tracks) {
        if(geo_tracks) {
            geo_tracks.update(request.body).then(function(geo_tracks){
                response.status(201).send(geo_tracks)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})


app.get("/geoTrackList",async function(request,response){
    try{
   let geo_tracks= await GeoTracks.findAll();
   response.status(200).json(geo_tracks);
    }catch(error){
        response.status(500).send(error.message);
    }
})

app.delete('/geoTracks/:name', function(request, response) {
    GeoTracks.findOne({
  where: {name: request.params.name}
}).then(function(geo_tracks) {
        if(geo_tracks) {
            geo_tracks.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.delete('/genreTracks/:name', function(request, response) {
    GenreTracks.findOne({
  where: {name: request.params.name}
}).then(function(genre_tracks) {
        if(genre_tracks) {
            genre_tracks.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})


app.put('/genreTracks/:name', function(request, response) {
    GenreTracks.findOne({
  where: {name: request.params.name}
}).then(function(genre_tracks) {
        if(genre_tracks) {
            genre_tracks.update(request.body).then(function(genre_tracks){
                response.status(201).send(genre_tracks)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})


app.post('/genreTracks/:genre',(request,response)=>{
    
    let url='https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag='+request.params.genre+'&api_key=3516736128cc24d429fa4a04d2ef2d7b&format=json&limit=20'
    GenreTracks.findAll().then(function (track){
        if(track){
            for(var i=0;i<track.length;i++){
                track[i].destroy();
            }
             console.log("sterse");
        }
       
    })
    axios.get(url).then(async(result) => {
    for(var i=0;i<20;i++){
        var name=result.data.tracks.track[i].name;
        var duration=result.data.tracks.track[i].duration;
        var url=result.data.tracks.track[i].url;
        var image=result.data.tracks.track[i].image[1]['#text'];
        var rank=result.data.tracks.track[i]['@attr'].rank;
        var genre=request.params.genre;
        let artist_name=result.data.tracks.track[i].artist.name;
        
        var id_artist=await findArtistIdByName(artist_name); 
        
        await GenreTracks.create({"id":i+1,
                          "name":name,
                          "duration":duration,
                          "url":url,
                          "image":image,
                          "rank":rank,
                          "genre":genre,
                          "id_artist":id_artist
        })
    }
    
    response.status(200).send('The data has been successfully inserted into the table');
     
    })
    
})
app.get("/genreTrackList",async function(request,response){
    try {
        var genre_tracks= await GenreTracks.findAll();
        response.status(200).json(genre_tracks);
    }
    catch(error){
        response.status(500).send(error.message);
    }
})


app.listen(8080);