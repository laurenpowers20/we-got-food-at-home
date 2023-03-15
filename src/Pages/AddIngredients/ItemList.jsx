import React from "react";
import "./AddIngredients.css";

const ItemList = ({ item, selectItem, deleteItem }) => {
  return (
    <div className="ingredients-list-items">
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
  );
};

export default ItemList;
