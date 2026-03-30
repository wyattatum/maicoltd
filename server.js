const { urlencoded } = require('body-parser');
const express=require('express');
const mysql=require('mysql2');
const app=express();

app.listen(300,()=>{
    console.log('server listened:http://localhost:300');
});

app.get('/',(req,res)=>{
    res.render('index');
});

// middleware
app.set('view engine','ejs');
app.use(express.urlencoded({extended: true }));

//routes
app.post('/login',(req,res)=>{
const { username,password }= req.body;
const sql="INSERT INTO Reception(username,password) VALUES(?,?)";
db.query(sql, [username,password], (err, result)=>{
    if (err){
        console.log(err);
        return res.send("error");
    }
    res.send("user saved");
});

});


// database connection
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"mugisha2007149",
    database:"Maico"
});


db.connect((err)=>{
    if(err){
console.log("database connection failed");
    }
    else{
        console.log("database connection successfully");
    }
});
