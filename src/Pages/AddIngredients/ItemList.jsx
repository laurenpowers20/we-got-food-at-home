import React from "react";
import "./AddIngredients.css";

const ItemList = ({ item, selectItem, deleteItem }) => {
  return (
    <div>
      <div className="ingredients-list-items">
        <input
          className="checkbox"
          onChange={() => selectItem(item)}
          type="checkbox"
          checked={item.selected ? "checked" : ""}
        />
        <div>
          <p onClick={() => selectItem(item)}>{item.text}</p>
        </div>
        <div>
          <button className="x-button" onClick={() => deleteItem(item.id)}>
            x
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemList;
