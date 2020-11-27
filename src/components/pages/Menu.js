import React from 'react';
//import '../../App.css';
import '../styles/Menu.css';
import MenuItemCard from '../MenuItemCards.js';
import { useAuth } from "../../helpers/auth";

export default function Menu() {
  const { currentUser } = useAuth()

  // check if user is logged in state is actually saved
  if (currentUser) {
    console.log("user is logged in");
  } else {
    console.log("user is NOT logged in");
  }

  return (
    <div class="wrapper">
      <div class="side">
        <h2>About Me</h2>
        <h5>Photo of me:</h5>
        <div class="fakeimg">Image</div>
      </div>
      <div class="main">
        <div class="card-row">
          <div class="card-column">
            <MenuItemCard/>
          </div>
          <div class="card-column">
            <MenuItemCard/>
          </div>
          <div class="card-column">
            <MenuItemCard/>
          </div>
          <div class="card-column">
            <MenuItemCard/>
          </div>
          <div class="card-column">
            <MenuItemCard/>
          </div>
          <div class="card-column">
            <MenuItemCard/>
          </div>
        </div>
      </div>
    </div>

  );



}
