import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { logout, auth, db } from "../../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useState, useEffect } from "react";
import ItemList from "../../Components/ItemList";
import Recipes from "../../Components/Recipes";
import "../AddIngredients/AddIngredients.css";
import { Hearts } from "react-loading-icons";

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
  const [loading, setLoading] = useState(false);
  const [user, error] = useAuthState(auth);
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [visible, setVisible] = useState(false);
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


  const handleClick = () => {
   
    setVisible(true);
  };

  return (
    <>
      <div>{/* <Link to="/ingredients/recipes">Recipes</Link> */}</div>
      <div>
        <div className="ingredients-div">
          <h1>Enter Ingredients</h1>
          <form onSubmit={addItem}>
            <input
              className="custom-input add-items"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Add Item"
            />
            <button className="add-btn">Add</button>
          </form>
          <ul className="ingredients-div">
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
        <div>
          {/* Submits the prompt with the selected items */}

          <form onSubmit={handleSubmit}>
            <button onClick={handleClick} type="submit">
              Submit
            </button>
          </form>
          {loading ? (
            <Hearts
              stroke="#f09133"
              fill="#ed7f12"
              strokeOpacity={0.1}
              fillOpacity={1}
              speed={0.75}
            />
          ) : (
            " "
          )}
          {/* <p>{response}</p> */}
          <div id="Recipe">
            <Recipes response={response} />
          </div>
        </div>
        <div>{visible ? <button>I Cooked this Recipe!</button> : ""}</div>
      </div>
    </>
  );
}

export default AddIngredients;
