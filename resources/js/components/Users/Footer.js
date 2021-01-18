import React from "react";

export default function Footer() {
  return (
    <nav
      style={{
        color: "white",
        justifyContent: "center",
        fontSize: "17px",
        padding:'35px',

      }}
      className="navbar navbar-expand-lg navbar-dark bg-dark"
    >
      <i className='fab fa-facebook'/>
      <i className='fab fa-twitter'/>
      <i className='fab fa-instagram'/>
      <br/>
  <p >
     All Copyright Reserved @{new Date().getFullYear()}
    </p>
    </nav>
  );
}
