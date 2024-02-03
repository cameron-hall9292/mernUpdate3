const express = require('express');
const mongoose = require('mongoose');

const dotenv = require ('dotenv').config();
const cors = require("cors");


const app = express();

const todoItemsModel = require('./models/todoItems')

// use express.json() to get data into json format

app.use(express.json());

//Port

const PORT = process.env.PORT || 5500;

//use cors
app.use(cors());




//Lets import routes

const TodoItemRouter = require('./routes/todoItems');

//Lets connect to mongodb

mongoose.connect(process.env.DB_CONNECT)
.then(()=> console.log("Database connected"))
.catch(err => console.log(err));




app.get('/api/items', async (req,res) => {
    try {
        const allTodoItems = await todoItemsModel.find({});
        res.status(200).json(allTodoItems);
    }catch(err){
        res.json(err);
    }
});

//app.use('/', TodoItemRouter)


//add port and connect to server


app.listen(PORT, (err) => {
    if (err) console.log(err); else console.log('Server is running on port:', PORT);}
)

//export app

module.exports = app;


// app.listen(PORT, '0.0.0.0'); // or server.listen(3001, '0.0.0.0'); for all interfaces
// app.on('listening', function() {
//     console.log('Express server started on port %s at %s', server.address().port, server.address().address);
// });
