const express=require("express")
const Sequelize=require("sequelize")
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
                validate: {
                    isNotNull: { msg: 'The username is required' }
         
            }
        },
    password: {
                type:Sequelize.STRING,
                allowNull:false,
                validate:{
                    len:{
                        args:[5,15],
                        msg:'Password must have between 5 and 15 characters'
                    }
                }
    },
    email: { 
             type:Sequelize.STRING,
             validate: {
                isEmail:{
                    msg: 'Email address is not valid'}}
            },
    birth_date:Sequelize.DATE
})

const GeoTracks = sequelize.define('geo_tracks', {
    
    name: {type:Sequelize.STRING,
           allowNull:false,
           validate: {
                    isNotNull: { msg: 'The name is required' }
         
            }
    },
    listeners: Sequelize.INTEGER,
    url: Sequelize.STRING,
    image: Sequelize.STRING,
    rank: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                isInt: {msg: 'Only numbers accepted'},
                isNotNull: { msg: 'The rank is required' }
            }
        },
    country: Sequelize.STRING,
    id_artist:Sequelize.INTEGER
})
const GenreTracks = sequelize.define('genre_tracks', {
    
     name:{ type:Sequelize.STRING,
           allowNull:false,
           validate: {
                    isNotNull: { msg: 'The name is required' }
         
            }
        },
    duration: Sequelize.INTEGER,
    url: Sequelize.STRING,
    image: Sequelize.STRING,
    rank: {type:Sequelize.INTEGER,
           allowNull:false,
           validate: {
                isInt: true,
                msg:'Only numbers accepted'
            }
    },
    rank: Sequelize.INTEGER,
    genre: Sequelize.STRING,
    id_artist:Sequelize.INTEGER
})

const Artists=sequelize.define('artists',{
    
    name: {
        type:Sequelize.STRING,
          allowNull:false,
           validate: {
                    isNotNull: { msg: 'The name is required' }
         
            }
    },
    listeners:Sequelize.INTEGER,
    url:Sequelize.STRING,
    image:Sequelize.STRING
})
const Preferences=sequelize.define('preferences',{
    track_name:{
                type:Sequelize.STRING,
                validate: {
                    isNotNull: { msg: "The track's name is required" }
            }
    },
    mark:{
           type:Sequelize.INTEGER,
            validate: {
                isInt: true,
                msg:'Only numbers accepted'
            }
    },
    id_user:{
              type:Sequelize.INTEGER,
              allowNull:false
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


app.post('/account',function(request,response){
    Accounts.create(request.body).then(function(account){
        response.status(201).json(account);
    }).catch(function(error){
        response.status(401).send(error.message);
    })
})
app.listen(8080);