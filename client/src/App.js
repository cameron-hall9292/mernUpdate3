import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import axios from "axios";
import { useEffect } from 'react';

function App() {


  const [itemText, setItemText] = useState("");
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState('');
  const [updateItemText, setUpdateItemText] = useState('');

  //add new todo item to database

  const addItem = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post("mern-update3.vercel.app/api/item",{item: itemText});
      
      setListItems(prev => [...prev, res.data]);

      console.log(res);
      setItemText('');

   
    }catch(err){
      console.log(err);
    }
    }


//create function to fetch all todo items from database -- we will use useEffect hook

useEffect(()=>{
  const getItemsList = async () => {
    try{
      const res = await axios.get("mern-update3.vercel.app/api/items");
      setListItems(res.data);
      console.log('render');
    }catch(err){
      console.log(err);
    }
  }
  getItemsList();
},[])

// Delete item when click on delete

const deleteItem = async (id) => {
  try{
    const res = await axios.delete(`mern-update3.vercel.app/api/item/${id}`)
    const newListItem = listItems.filter(item => item._id !== id);
    setListItems(newListItem);
  }catch(err){
    console.log(err);
  }
}

//Update item

const updateItem = async (e) => {
  e.preventDefault();
  try{
    const res = await axios.put(`mern-update3.vercel.app/api/item/${isUpdating}`, {item: updateItemText });

    console.log(res.data);
    const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating);
    const updatedItem = listItems[updatedItemIndex].item = updateItemText;
    setUpdateItemText('');
    setIsUpdating('');
  }catch(err){
    console.log(err);
  }
}

const renderUpdateForm = () => (
  <form className="update-form" onSubmit={(e)=>{updateItem(e)}}>
    <input className='update-new-input' type="text" placeholder="New Item" onChange={e=>{setUpdateItemText(e.target.value)}} value={updateItemText} />
    <button className="update-new-btn" type="submit">Update</button>
  </form>
)

  return (
    <div className="flexContainer">
    <div className="App">
    
     <form className="form" onSubmit={e => addItem(e)}>
      <input type="text" placeholder="ADD LIST ITEMS HERE" onChange={e => {setItemText(e.target.value)}} value={itemText} /> 
      <button type="submit">Add</button>
      </form>
      <div className="todo-listItems">
        {
          listItems.map(item => (
          <div className="todo-item">
            {
              isUpdating === item._id
              ? renderUpdateForm()
              : <>
            
            <p className = "item-content">{item.item}</p>
            <button className="update-item" onClick={()=>{setIsUpdating(item._id)}}>Update</button>
            <button className="delete-item" onClick={()=>{deleteItem(item._id)}}>Delete</button>
            </>
            }
          </div>   
          
          ))

  
        }


    </div>
    </div>
    </div>
  );
  }

export default App;
