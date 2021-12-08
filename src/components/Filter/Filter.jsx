import React from "react";

export const Filter = ({ filter }) => {
  return (
    <div>
      <label>
        Find contacts by name:
        <input onChange={filter} type="text"></input>
      </label>
    </div>
  );
};

export default Filter;
