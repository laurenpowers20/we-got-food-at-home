import "./Home.css";
import logo from "../../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { logout, auth,db } from "../../services/firebase";
import {useAuthState} from "react-firebase-hooks/auth"
import React, { useState, useEffect } from 'react';
import ItemList from './ItemList';

import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';
function Home() {

  const [user, loading, error] = useAuthState(auth);
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');

  // Create ItemList
  const addItem = async (e) => {
    e.preventDefault(e);
    if (input === '') {
      alert('Please enter a valid food item');
      return;
    }
    await addDoc(collection(db, 'items'), {
      text: input,
      selected: false,
    });
    setInput('');
  };

  // Read item from firebase
  useEffect(() => {
    const q = query(collection(db, 'items'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];
      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);
    });
    return () => unsubscribe();
  }, []);

  // Update todo in firebase
  const selectItem = async (item) => {
    await updateDoc(doc(db, 'items',item.id), {
      selected: !item.selected,
    });
  };

  // Delete item
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, 'items', id));
  };

  return (
    
      <>





<div>
      <div >
        <h3>Add Food Items</h3>
        <form onSubmit={addItem}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            
            type='text'
            placeholder='Add Item'
          />
          <button>
            Add
          </button>
        </form>
        <ul>
          {items.map((item, index) => (
            <ItemList
              key={index}
              item={item}
              selectItem={selectItem}
              deleteItem={deleteDoc}
            />
          ))}
        </ul>
        {items.length < 1 ? null : (
          <p >{`You have ${items.length} items`}</p>
        )}
      </div>
    </div>
{/* \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */}
      <h1 className="home-heading">Welcome</h1>
      <button className="logout-button" onClick={logout}>logout</button>
      
          <Link to="/sign-in">
            <img src={logo} alt="logo" className="home-logo" />
          </Link>
        
        <h1 className="home-heading">Powered by AI</h1>



      </>
 
  );
}

export default Home;
