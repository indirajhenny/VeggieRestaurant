import React from 'react';
import '../styles/EmployeePage.css';
import EmployeePageCards from '../EmployeePageCards.js';
import LogOutButton from '../LogOut.js';
import { auth } from '../../services/firebase';
import { db } from '../../services/firebase';

export default class EmployeePage extends React.Component {
  // In order to initialize the state in a component, create a constructor
    constructor(props) {
      super(props);

      // The component's temporary memory (state)
      this.state = {
        componentData: [],

      };
    }

    // componentDidMount() is what runs once your component appears on the webpage
  componentDidMount() {
    var dbRef = db.ref('processedOrders/');
    const processedOrders = []

    // Get the data from the firebase
    dbRef.once("value", function(snapshot) {
      snapshot.forEach(function(doc) {
        var processedItems = doc.val();
          processedItems.key = doc.id;
          processedOrders.push(processedItems);
      })
      this.setState({componentData: processedOrders});
    }.bind(this));
  }

  render() {
    const processedOrders = [];
    const preparationOrders = [];
    const completedOrders = [];
    const pickedUpOrders = [];
    const { componentData } = this.state;
    let foodItems = [];
    var detailcnt = 0;



    componentData.forEach((orderItemDetails) => {
      if(orderItemDetails.status === "Received Order"){
        processedOrders.push(
          <EmployeePageCards
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
            statusNew={orderItemDetails.status}
            userIdNew={orderItemDetails.userId}
            numberOfItemsNew={orderItemDetails.numberOfItems}
          />
        );
      }
      if(orderItemDetails.status === "Order Done"){
        completedOrders.push(
          <EmployeePageCards
            statusNew={orderItemDetails.status}
            userIdNew={orderItemDetails.userId}
            numberOfItemsNew={orderItemDetails.numberOfItems}
          />
        );
      }
      if(orderItemDetails.status === "Picked Up"){
        pickedUpOrders.push(
          <EmployeePageCards
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
