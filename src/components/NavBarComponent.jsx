
import React from 'react';
import "../styles/global.css";
import "..//styles/navBar.css";

export const NavbarComponent = (props) => {
  const userName = props.userName;
  return (
    <div className="container navBar">
        <h5 className='text-navBar'>Gestion de ventas</h5>
        <h5 className='text-navBar'>{userName? userName: "User"}</h5>
    </div>
  );
}


export default NavbarComponent;