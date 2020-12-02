import React from 'react';
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
    var dbRef = db.ref('menuitems/');
    const menuData = []

    dbRef.once("value", function(snapshot) {

      snapshot.forEach(function(doc) {
        var menuItem = doc.val();
          menuItem.key = doc.id;
          menuData.push(menuItem);
      })
      this.setState({componentData: menuData});
    }.bind(this));
  }


  render() {
    const mainDishCards = [];
    const appetizerCards = [];
    const dessertCards = [];
    const drinkCards = [];
    const { componentData } = this.state;

    componentData.forEach((menuItemDetail) => {
      if (menuItemDetail.foodType === "appetizer") {
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
