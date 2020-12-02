import React from 'react';
import '../styles/EmployeePage.css';
import EmployeePageCards from '../EmployeePageCards.js';
import LogOutButton from '../LogOut.js';
import { auth } from '../../services/firebase';
import { db } from '../../services/firebase';
//import { Link } from "react-router-dom"

export default class EmployeePage extends React.Component {
   //const history = useHistory()
  // In order to initialize the state in a component, create a constructor
    constructor(props) {
      super(props);

      // The component's temporary memory (state)
      this.state = {
        componentData: [],

      };
      //this.handleLogout = this.handleLogout.bind(this);
    }

    /*handleLogout() {
      auth().signOut()
    }*/


    // componentDidMount() is what runs once your component appears on the webpage
  componentDidMount() {
    // Goal: Save every document in the workshops collection
    // get data from specific docs when needed
    var dbRef = db.ref('processedOrders/');
    const processedOrders = []
    //console.log(dbRef.child(key))

    // Get the data from the firestore
    dbRef.once("value", function(snapshot) {
      // gets all docs in menu collection and maps array of docs to querySnapshot
      // docs. Puts every docs data into data variable
      snapshot.forEach(function(doc) {
        var processedItems = doc.val();
        //console.log(menuItem.startTime);
        //if (menuItem.startTime != null) {
          //console.log(doc.key)
          processedItems.key = doc.id;
          processedOrders.push(processedItems);
        //}
      })
      // component data is now an array of ordered wksp objects
      this.setState({componentData: processedOrders});
    }.bind(this));
    //console.log(processedOrders)
    //console.log(this.state.componentData)
  }

  render() {
    const processedOrders = [];
    const preparationOrders = [];
    const completedOrders = [];
    const pickedUpOrders = [];
    const { componentData } = this.state;
    console.log(componentData)
    //console.log(componentData.foodItems[0])
    let foodItems = [];
    var detailcnt = 0;



    componentData.forEach((orderItemDetails) => {
      //console.log(orderItemDetails.foodItem + order//)
      //var dbRef = db.ref('processedOrders/' + orderItemDetails.userId);
      /*dbRef.once("value", function(snapshot) {
        // gets all docs in menu collection and maps array of docs to querySnapshot
        // docs. Puts every docs data into data variable
        snapshot.forEach(function(doc) {
          var processedItems = doc.val();
          var numItems = parseInt(orderItemDetails.numberOfItems)
            if (detailcnt < numItems){
              var processedItems = doc.val();
              console.log(processedItems)
              foodItems.push(doc.val())
              //console.log(orderItemDetails.doc.key)
              detailcnt++;
            }
        })
        // component data is now an array of ordered wksp objects
        var keyItem = foodItems[0]


      }.bind(this));*/

      //console.log(foodItems)
      //console.log(orderItemDetails.userId)
      //console.log(orderItemDetails.status)
      if(orderItemDetails.status === "Received Order"){
        processedOrders.push(
          <EmployeePageCards
            //foodItems={foodItems}
            statusNew={orderItemDetails.status}
            userIdNew={orderItemDetails.userId}
            numberOfItemsNew={orderItemDetails.numberOfItems}
          />
        );
        console.log(processedOrders)
      }
      if(orderItemDetails.status === "Preparing Order"){
        preparationOrders.push(
          <EmployeePageCards
            //foodItems={foodItems}
            statusNew={orderItemDetails.status}
            userIdNew={orderItemDetails.userId}
            numberOfItemsNew={orderItemDetails.numberOfItems}
          />
        );
      }
      if(orderItemDetails.status === "Order Done"){
        completedOrders.push(
          <EmployeePageCards
            //foodItems={foodItems}
            statusNew={orderItemDetails.status}
            userIdNew={orderItemDetails.userId}
            numberOfItemsNew={orderItemDetails.numberOfItems}
          />
        );
      }
      if(orderItemDetails.status === "Picked Up"){
        pickedUpOrders.push(
          <EmployeePageCards
            //foodItems={foodItems}
            statusNew={orderItemDetails.status}
            userIdNew={orderItemDetails.userId}
            numberOfItemsNew={orderItemDetails.numberOfItems}
          />
        );
      }

    });


    return (
      <div>
        <LogOutButton/>
        <div class="employeeWrapper">
          <div class="orderProcessedSide">
            <h1>Processed Orders</h1>
            {processedOrders}
          </div>
          <div class="orderMiddle">
            <h1>Orders in Preparation</h1>
            {preparationOrders}
          </div>
          <div class="orderCompleteSide">
            <h1>Completed Orders</h1>
            {completedOrders}
          </div>
          <div class="orderPickedUpSide ">
            <h1>Picked Up</h1>
            {pickedUpOrders}
          </div>
        </div>
      </div>
    )
  }

}
