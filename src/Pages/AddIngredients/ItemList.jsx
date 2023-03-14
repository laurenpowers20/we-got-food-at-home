import React from 'react';

const ItemList = ({ item, selectItem, deleteItem }) => {
  return (
    <li >
      <div>
        <input onChange={() => selectItem(item)} type='checkbox' checked={item.selected ? 'checked' : ''} />
        <p onClick={() => selectItem(item)}>
          {item.text}
        </p>
      </div>
      <button onClick={() => deleteItem(item.id)}>X</button>
    </li>
  );
};

export default ItemList;