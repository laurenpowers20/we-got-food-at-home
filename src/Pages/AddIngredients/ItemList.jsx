import React from "react";
import "./AddIngredients.css";

const ItemList = ({ item, selectItem, deleteItem }) => {
  return (
    <div>
      <div>
        <input
          onChange={() => selectItem(item)}
          type="checkbox"
          checked={item.selected ? "checked" : ""}
        />
        <p onClick={() => selectItem(item)}>{item.text}</p>
      </div>
      <button onClick={() => deleteItem(item.id)}>x</button>
    </div>
  );
};

export default ItemList;
