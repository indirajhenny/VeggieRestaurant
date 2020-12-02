import React from 'react';
//import '../../App.css';
import '../styles/Menu.css';
import MenuItemCard from '../MenuItemCards.js';
import { useAuth } from "../../helpers/auth";
import { db } from '../../services/firebase';

export default class Menu extends React.Component {

  // In order to initialize the state in a component, create a constructor
  constructor(props) {
    super(props);

    // The component's temporary memory (state)
    this.state = {
      currentTab: 0,
      componentData: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(currentTab) {
    this.setState({ currentTab });
  }

  // componentDidMount() is what runs once your component appears on the webpage
  componentDidMount() {
    // Goal: Save every document in the workshops collection
    // get data from specific docs when needed
    var dbRef = db.ref('menuitems/');
    const menuData = []

    // Get the data from the firestore
    dbRef.once("value", function(snapshot) {
      // gets all docs in menu collection and maps array of docs to querySnapshot
      // docs. Puts every docs data into data variable
      snapshot.forEach(function(doc) {
        var menuItem = doc.val();
        //console.log(menuItem.startTime);
        //if (menuItem.startTime != null) {
          menuItem.key = doc.id;
          menuData.push(menuItem);
        //}
      })
      // component data is now an array of ordered wksp objects
      this.setState({componentData: menuData});
    }.bind(this));
    //console.log(menuData)
  }


  render() {
    //const menuCards = [];
    const mainDishCards = [];
    const appetizerCards = [];
    const dessertCards = [];
    const drinkCards = [];
    const { componentData } = this.state;
    //var moment = require('moment');

    componentData.forEach((menuItemDetail) => {
      //var dateObj = moment(new Date(menuItemDetail.startTime.seconds * 1000)).format('MM/DD/YY');
      //var timeObj = moment(new Date(menuItemDetail.startTime.seconds * 1000)).format('hh:mm A');
      if (menuItemDetail.foodType === "appetizer") {
        //console.log("appetizer found");
        appetizerCards.push(
          <MenuItemCard
            foodTitle={menuItemDetail.name}
            foodDescription={menuItemDetail.description}
            foodType={menuItemDetail.foodType}
            foodPrice={menuItemDetail.price}
          />
        );

      }
      if (menuItemDetail.foodType === "main dish") {
        //console.log("main dish found");
        mainDishCards.push(
          <MenuItemCard
            foodTitle={menuItemDetail.name}
            foodDescription={menuItemDetail.description}
            foodType={menuItemDetail.foodType}
            foodPrice={menuItemDetail.price}
          />
        );
      }
      if (menuItemDetail.foodType === "dessert") {
        //console.log("main dish found");
        dessertCards.push(
          <MenuItemCard
            foodTitle={menuItemDetail.name}
            foodDescription={menuItemDetail.description}
            foodType={menuItemDetail.foodType}
            foodPrice={menuItemDetail.price}
          />
        );
      }
      if (menuItemDetail.foodType === "drink") {
        //console.log("main dish found");
        drinkCards.push(
          <MenuItemCard
            foodTitle={menuItemDetail.name}
            foodDescription={menuItemDetail.description}
            foodType={menuItemDetail.foodType}
            foodPrice={menuItemDetail.price}
          />
        );
      }
    });

    return (
      <div class="wrapper">
        <div class="side">
          <div class="tab">
            <button
              class="tablinks"
              onClick={() => this.handleClick(0)}
              id="defaultOpen">
              Main Dish
            </button>
            <button
              class="tablinks"
              onClick={() => this.handleClick(1)}>
              Appetizers
            </button>
            <button
              class="tablinks"
              onClick={() => this.handleClick(2)}>
              Desserts
            </button>
            <button
              class="tablinks"
              onClick={() => this.handleClick(3)}>
              Drinks
            </button>
          </div>
        </div>
        <div class="main">
          <div class="card-row">
            {this.state.currentTab === 0 &&
              mainDishCards.map(el =>
                <div class="card-column" key={el}> {el} </div>)
            }
            {this.state.currentTab === 1 &&
              appetizerCards.map(el =>
                <div class="card-column" key={el}> {el} </div>)
            }
            {this.state.currentTab === 2 &&
              dessertCards.map(el =>
                <div class="card-column" key={el}> {el} </div>)
            }
            {this.state.currentTab === 3 &&
              drinkCards.map(el =>
                <div class="card-column" key={el}> {el} </div>)
            }
          </div>
        </div>
      </div>
    );
  }
}
