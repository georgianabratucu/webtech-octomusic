const express=require("express");
const Sequelize=require("sequelize");
const axios=require("axios");

const app=express();

app.use("/",express.static('static'));

const sequelize = new Sequelize('Music', 'root', '', {
    dialect:'mysql',
    host:'localhost'
});

sequelize.authenticate().then(authenticate=>{
    console.log('You have successfully connected to the database.\n' + 'Good luck.');
}).catch(function(){
    console.log('Unfortunately, there was an error connecting to the database.\n'+'Keep trying.');
});

app.get('/creatingTables',(request,response)=>{
    sequelize.sync({force:true}).then(success=>{
        response.status(201).send('The tables has been successfully created.');
    }).catch(error=>{
        response.status(500).send('There was a problem creating the tables.');
    });
});

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
});

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
});

const GenreTracks = sequelize.define('genre_tracks', {
    
     name:{ 
             type:Sequelize.STRING,
             allowNull: false
        },
     duration: Sequelize.INTEGER,
     url: Sequelize.STRING,
     image: Sequelize.STRING,
     rank: {
             type:Sequelize.INTEGER,
             allowNull:false,
        },
     genre: Sequelize.STRING,
     id_artist:Sequelize.INTEGER
});

const Artists=sequelize.define('artists',{
    
     name: {
             type:Sequelize.STRING,
             allowNull:false
       },
     listeners:Sequelize.INTEGER,
     url:Sequelize.STRING,
     image:Sequelize.STRING
});

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
});

Accounts.hasMany(Preferences,{foreignKey:'id_user'});
Preferences.belongsTo(Accounts,{foreignKey:'id_user'});
Artists.hasMany(GeoTracks,{foreignKey:'id_artist'});
Artists.hasMany(GenreTracks,{foreignKey:'id_artist'});
GenreTracks.belongsTo(Artists,{foreignKey:'id_artist'});
GeoTracks.belongsTo(Artists,{foreignKey:'id_artist'});

app.use(express.json());
app.use(express.urlencoded());

//Accounts table

app.post('/accounts',(request,response)=>{
    Accounts.create(request.body).then((account)=>{
        response.status(201).json(account);
    }).catch((error)=>{
        response.status(500).send(error.message);
    });
});

app.get('/userPreferences/:username', async function(request,response){
    try{
        let account=await Accounts.findOne(
            { where:
                {
                username:request.params.username
                }
            });
            
        if(account){
            let preferences=await account.getPreferences();
            response.status(200).json(preferences);
            console.log('There are '+preferences.length+' preferences for this user.');
                   
        } else {
            
            response.status(404).send("The account was not found!");
        }
    } catch(error){
        
        response.status(500).send(error.message);
    }
    
});

app.get('/accountList',async function(request,response){
    try {
        
        let accounts= await Accounts.findAll();
         response.status(200).json(accounts);
         console.log("There are "+accounts.length+" accounts ");
        
    } catch(error) {
        response.status(500).send(error.message);
    }
});

app.put('/updateAccount/:username',async function(request,response){
    
    try {
        let account=await Accounts.findOne(
            {
                where:
                {
                    username:request.params.username
                    
                }
                
            });
            
        if(account){
            
            await account.update(request.body);
            response.status(200).json(account);
        }
        else {
            
            response.status(404).send("The account was not found!");
        }
        
    } catch(error){
        
        response.status(500).send(error.message);
    }
  
});

app.delete("/account/:username", async function(request,response){
    try{
        
        let account= await Accounts.findOne(
            {
                where:{
                    username:request.params.username
                }
                
            });
      if(account){
          await account.destroy();
          response.status(200).send("The account was deleted!");
      }
      else
      {
          response.status(404).send("The account was not found!");
      }
    } catch(error){
        response.status(500).send(error.message);
    }
});

app.post('/preferences',(request,response)=>{
    Preferences.create(request.body).then(preference=>{
        response.status(201).json(preference);
    }).catch(error=>{
        response.status(500).send(error.message);
    });
});

app.get('/preferenceList',async function(request,response){
    try{
         let preferences= await Preferences.findAll();
         let size=preferences.length;
         response.status(200).json(preferences);
         console.log("There are "+ size +" preferences in the table");
         
    }catch(error){
        response.status(500).send(error.message);
    }
});

app.put('/updatePreference/:track_name/:id_user',async function(request, response) {
    try{
        let preference = await Preferences.findOne(
            {
                where:{track_name:request.params.track_name,
                id_user:request.params.id_user}
                
            });
        if(preference){
            
            await preference.update(request.body);
            response.status(201).send("The preference has been updated.");
            
        }else{
            
            response.status(404).send("Preference not found.");
        }
        
    }catch(error){
        response.status(500).send(error.message);
    }
    
});

app.delete('/deletePreference/:id_user/:track_name',async(request,response)=>{
    try{
        let preference=await Preferences.findOne(
            { 
              where:{
                  
                  id_user:request.params.id_user,
                  track_name:request.params.track_name}
                
            });
        if(preference){
            
            await preference.destroy();
            response.status(201).send('The preference has been deleted.');
            
        }else{
            
            response.status(404).send("Preference not found.");
        }
    }catch(error){
        
        response.status(500).send(error.message);
    }
});

//insert into artists from last.fm api
app.post('/artists/:country',(request,response)=>{
    
    let url='http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country='+request.params.country+'&api_key=3516736128cc24d429fa4a04d2ef2d7b&format=json&limit=20';
    Artists.findAll().then(function(artists){
        if(artists){
            for(var i=0;i<artists.length;i++){
                artists[i].destroy();
            }
        }
    });
    axios.get(url).then((result)=>{
        for(var i=0;i<20;i++){
            var name=result.data.topartists.artist[i].name;
            var listeners=result.data.topartists.artist[i].listeners;
            var url=result.data.topartists.artist[i].url;
            var image=result.data.topartists.artist[i].image[2]["#text"];
            Artists.create({ "id":i+1,
                             "name":name,
                             "listeners":listeners,
                             "url":url,
                             "image":image
            });
        }
        response.status(200).send('The data has been successfully inserted into the Artists table!');
    });
});

app.get("/artistList", async function(request,response){
    try
    { 
        let artists= await Artists.findAll();
        var no_of_artists=artists.length;
        response.status(200).json(artists);
        console.log('There are '+no_of_artists+' artists in the table!');
    }
    catch(error)
    {
        response.status(500).send(error.message);
    }
});

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
    let url='https://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country='+request.params.country+'&api_key=3516736128cc24d429fa4a04d2ef2d7b&format=json&limit=20';
   GeoTracks.findAll().then(function(track){
        if(track){
            for(var i=0;i<track.length;i++){
                track[i].destroy();
            }
        }
    });
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
           await  GeoTracks.create({
                          "id":i+1,
                          "name":name,
                          "listeners":noOfListeners,
                          "url":url,
                          "image":image,
                          "rank":rank,
                          "country":country,
                          "id_artist":id_artist
        });
        }catch(error){
            
            console.log("Error message: "+error.message);
        }
}
    
    response.status(200).send('The data has been successfully inserted into the table');
     
    });
});

app.put('/updateGeoTracks/:name',async function(request,response){
    
    try {
        let geoTracks=await GeoTracks.findOne(
            {
                where:
                {
                    name:request.params.name
                    
                }
                
            });
            
        if(geoTracks){
            
            await geoTracks.update(request.body);
            response.status(200).json(geoTracks);
        }
        else {
            
            response.status(404).send("The name was not found");
        }
        
    } catch(error){
        
        response.status(500).send(error.message);
    }
  
});

app.get("/geoTrackList",async function(request,response){
    try{
         let geo_tracks= await GeoTracks.findAll();
         let no_of_geoTracks=geo_tracks.length;
         response.status(200).json(geo_tracks);
         console.log("There are "+ no_of_geoTracks +" geoTracks in the table");
   
    }catch(error){
         response.status(500).send(error.message);
    }
});

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


app.post('/genreTracks/:genre',(request,response)=>{
    try{
    let url='https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag='+request.params.genre+'&api_key=3516736128cc24d429fa4a04d2ef2d7b&format=json&limit=20';
    GenreTracks.findAll().then(function (track){
        if(track){
            for(var i=0;i<track.length;i++){
                track[i].destroy();
            }
        }
    });
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
        
        await GenreTracks.create({
                          "id":i+1,
                          "name":name,
                          "duration":duration,
                          "url":url,
                          "image":image,
                          "rank":rank,
                          "genre":genre,
                          "id_artist":id_artist
        });
    }
    response.status(200).send('The data has been successfully inserted into the GenreTracks table!');
    });
} catch(error){
        response.status(500).send(error.message);
    }
});

app.get("/genreTrackList",async function(request,response){
    try {
            var genre_tracks= await GenreTracks.findAll();
            let no_of_genre_tracks=genre_tracks.length;
            response.status(200).json(genre_tracks);
            console.log('There are '+no_of_genre_tracks+' tracks in the table!');
      }
    catch(error){
            response.status(500).send(error.message);
    }
});

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


app.put('/updateGenreTracks/:name',async function(request,response){
    
    try {
        let genreTracks=await GenreTracks.findOne(
            {
                where:
                {
                    name:request.params.name
                    
                }
                
            });
            
        if(genreTracks){
            
            await genreTracks.update(request.body);
            response.status(200).json(genreTracks);
        }
        else {
            
            response.status(404).send("The name was not found");
        }
        
    } catch(error){
        
        response.status(500).send(error.message);
    }
  
});

app.listen(8080);