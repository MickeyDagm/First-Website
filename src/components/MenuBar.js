import React from 'react';
function MenuBar({ setIsCategoryVisible }) {
    return (
      <button
        className="btn btn-large btn-open"
        onClick={() => setIsCategoryVisible((prev) => !prev)}
      >
        Categories
      </button>
    );
  }

  export default MenuBar;