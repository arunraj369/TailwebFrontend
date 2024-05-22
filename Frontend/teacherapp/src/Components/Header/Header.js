import React from "react";

function Header() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <a class="navbar-brand" href="/home" style={{ color: "red" }}>
            tailwebs
          </a>
          <div>
            <a class="navbar-brand" href="/home" style={{ color: "Black" }}>
              Home
            </a>
            <a class="navbar-brand" href="/login" style={{ color: "Black" }}>
              Logout
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
