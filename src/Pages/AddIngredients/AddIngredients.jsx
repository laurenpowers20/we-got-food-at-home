import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { logout, auth, db } from "../../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useState, useEffect } from "react";
import ItemList from "../../Components/ItemList";
import Recipes from "../../Components/Recipes";

import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
  where,
} from "firebase/firestore";
function AddIngredients() {
  const [prompttest, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const prompt = `give me a recipe using only ${selectedItems.toString(" ")}`;

  // Create ItemList
  const addItem = async (e) => {
    e.preventDefault(e);
    if (input === "") {
      alert("Please enter a valid food item");
      return;
    }
    await addDoc(collection(db, "items"), {
      user: user.uid,
      text: input,
      selected: false,
    });
    setInput("");
  };

  // Read item from firebase
  useEffect(() => {
    const collectionRef = collection(db, "items");
    const q = query(collectionRef, where("user", "==", user.uid));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];
      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);
      let newArr = [];
      for (let i = 0; i < itemsArr.length; i++) {
        if (itemsArr[i].selected === true) {
          newArr.push(itemsArr[i].text);
        }
      }
      setSelectedItems(newArr);
    });
    return () => unsubscribe();
  }, []);

  // Items in firebase
  const selectItem = async (item) => {
    await updateDoc(doc(db, "items", item.id), {
      selected: !item.selected,
    });
  };

  // Delete item
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "items", id));
  };

  // ////////////////////////////////////////

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a request to the server with the prompt
    axios
      .post("http://localhost:8080/chat", { prompt })
      .then((res) => {
        // Update the response state with the server's response
        setResponse(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div>
        {/* <Link to="/ingredients/recipes">Recipes</Link> */}
      </div>
      <div>
        <div>
          <h3>Enter Ingredients</h3>
          <form onSubmit={addItem}>
            <input
              className="custom-input add-items"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Add Item"
            />
            <button>Add</button>
          </form>
          <ul>
            {items.map((item, index) => (
              <ItemList
                key={index}
                item={item}
                selectItem={selectItem}
                deleteItem={deleteItem}
              />
            ))}
          </ul>
          {selectedItems.length < 1 ? null : (
            <p>{`You are including ${selectedItems.length} of the ${items.length} items in your recipe`}</p>
          )}
        </div>
      </div>
      <div>
        {/* Submits the prompt with the selected items */}
        <div className="form">
          <form onSubmit={handleSubmit}>
            <button type="submit">Submit</button>
          </form>
          {/* <p>{response}</p> */}
          <Recipes response={response} />
        </div>
      </div>
    </>
  );
}

export default AddIngredients;