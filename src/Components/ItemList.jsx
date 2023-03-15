import React from "react";
import "../Pages/AddIngredients/AddIngredients.css";

const ItemList = ({ item, selectItem, deleteItem}) => {
  return (
    <div>
      {/* <h3>Enter Ingredients</h3>
          <form onSubmit={addItem}>
            <input
              className="custom-input add-items"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Add Item"
            />
            <button>Add</button>
          </form> */}
     <div
      className="ingredients-list-items">

      <input
        className="checkbox"
        onChange={() => selectItem(item)}
        type="checkbox"
        checked={item.selected ? "checked" : ""}
      />
      
      <li>
        <p onClick={() => selectItem(item)}>{item.text}</p>
      </li>
      <button className="x-button" onClick={() => deleteItem(item.id)}>
        x
      </button>
      </div>
    </div>
  );
};

export default ItemList;
