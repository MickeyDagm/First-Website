import React from "react";
function Header({
    showForm,
    setShowForm,
    isSmallScreenWidth,
    setIsCategoryVisible,
  }) {
    return (
      <header className="header">
        <div className="logo">
          <img src="logo.png" alt="Logo" />
          <h1>Explore and Share Facts</h1>
        </div>
        <div className="header-btns">
          {isSmallScreenWidth ? (
            <button
              className="btn btn-large btn-open menu-btn"
              onClick={() => setIsCategoryVisible((prev) => !prev)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 12h18M3 6h18M3 18h18"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : null}
          <button
            className="btn btn-large btn-open"
            // 3. Update state variable
            onClick={() => setShowForm((show) => !show)}
          >
            {showForm ? "Close" : "Share a fact"}
          </button>
        </div>
      </header>
    );
  }

  export default Header;