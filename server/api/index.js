const express = require('express');
const mongoose = require('mongoose');

const dotenv = require ('dotenv').config();
const cors = require("cors");

const app = express();

//use cors
app.use(cors(
    {
        origin: ["https://mern-update3-hnr7-frontend.vercel.app/"],
        methods: ["GET","POST","PUT"],
        credentials: true

    }

    
));

// use express.json() to get data into json format

app.use(express.json());

//Port

const PORT = process.env.PORT || 5500;



//Lets import routes

const TodoItemRouter = require('./routes/todoItems');

//Lets connect to mongodb

mongoose.connect(process.env.DB_CONNECT)
.then(()=> console.log("Database connected"))
.catch(err => console.log(err));

app.use('/', TodoItemRouter)


//add port and connect to server


app.listen(PORT, (err) => {
    if (err) console.log(err); else console.log('Server is running on port:', PORT);}
)



