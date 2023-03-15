import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { logout, auth, db } from "../../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useState, useEffect } from "react";
import ItemList from "./ItemList";

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
  const prompt = `give me a recipe using ${prompttest}`;
  const [user, loading, error] = useAuthState(auth);
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

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
    });
    return () => unsubscribe();
  }, []);

  // Update todo in firebase
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
          {items.length < 1 ? null : <p>{`You have ${items.length} items`}</p>}
        </div>
      </div>
      <div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <input
              className="custom-input"
              type="text"
              value={prompttest}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
          <p>{response}</p>
        </div>
      </div>
    </>
  );
}

export default AddIngredients;
