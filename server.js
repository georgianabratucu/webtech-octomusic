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
    username: {type:Sequelize.STRING,
               unique:{msg:'This username already exists'},
               allowNull:false},
    password: {type:Sequelize.STRING,
                allowNull:false,
                validate:{len:{args:[5,15], msg:'Password must have between 5 and 15 characters'}}},
    email: { type:Sequelize.STRING,
             validate: {isEmail:{msg: 'Email address is not valid'}}
            },
    birth_date:Sequelize.DATE
})



app.listen(8080);