const router = require('express').Router();
//import5 todo model

const todoItemsModel = require('../models/todoItems')


//Lets create our first route -- we will ad todo item to our DB

router.post('/api/item', async (req,res)=> {
    try{
        const newItem = new todoItemsModel({
            item: req.body.item
        });
        //save this item in DB
        const saveItem =   await newItem.save()
        res.status(200).json(saveItem)
    } catch(err){
        res.json(err);
    }
});

//Lets create a second route -- get data from DB

router.get('/api/items', async (req,res) => {
    try {
        const allTodoItems = await todoItemsModel.find({});
        res.status(200).json(allTodoItems);
    }catch(err){
        res.json(err);
    }
});

//Let's update item
router.put('/api/item/:id', async (req, res)=> {
    try{
    const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {$set: req.body});
    res.status(200).json('Item updated');
    }catch(err){
        res.json(err);
    }


});

//Let's update item
router.delete('/api/item/:id', async (req, res)=> {
    try{
    const updateItem = await todoItemsModel.findByIdAndDelete(req.params.id, {$set: req.body});
    res.status(200).json('Item deleted');
    }catch(err){
        res.json(err);
    }


})


//export router

module.exports = router;