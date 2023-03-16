import React from "react";
import { BsTrashFill } from "react-icons/bs";

import "../Pages/AddIngredients/AddIngredients.css";

const ItemList = ({ item, selectItem, deleteItem }) => {
  return (
    <div>
   
      <div className="ingredients-list-items">
      <label className="container">
          <input
            className="container"
            onChange={() => selectItem(item)}
            type="checkbox"
            checked={item.selected ? "checked" : ""}
          />
          <span className="checkmark"></span>
          </label>
        

        <li>
          <p className="list-item-text" onClick={() => selectItem(item)}>{item.text}</p>
        </li>
        <div className="x-button-container">
          
            <BsTrashFill style={{fontSize:"20px"}} onClick={() => deleteItem(item.id)}/>
          
        </div>
      </div>
    </div>
  );
};

export default ItemList;
