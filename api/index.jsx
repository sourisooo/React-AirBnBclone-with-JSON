import { useContext } from "react"
import { UserContext } from "./UserContext"

const express = require('express');
const cors = require('cors');
// const mongoose = require("mongoose");
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('./models/User.js');
// const Place = require('./models/Place.js');
// const Booking = require('./models/Booking.js');
// const cookieParser = require('cookie-parser');
// const imageDownloader = require('image-downloader');
// const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3');
// const multer = require('multer');
// const fs = require('fs');
// const mime = require('mime-types');

// require('dotenv').config();


const app = express();
app.use(express.json());
app.use(cors({}));

const {user} = useContext(UserContext);


// app.get('/login', async (req,res) => {
//     res.json
    
//           (

//             await fetch("http://localhost:5000/datas/1")
//             // .then(response =>  response.json())


//           )

//   });


  app.post('/register', (req,res) => {
    const {name,email,password}=req.body;
    res.json({name,email,password});

    fetch
    
    (
        
        "http://localhost:5000/datas", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({name,email,password})}
        
    )


  });


  // app.get('/datas/'+user.id, (req,res)=> {

  //     res.json('user info')

  //     console.log(user);


  // })



app.listen(4000);
