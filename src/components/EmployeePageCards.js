import React from 'react';
//import { Link } from 'react-router-dom'
import './styles/EmployeePageCards.css';
//import { useAuth } from "../helpers/auth";
//import { auth } from '../services/firebase';
import { db } from '../services/firebase';
// Imports firebase into the component

export default class EmployeePageCards extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
        status: this.props.statusNew,
        userId: this.props.userIdNew,
        numberOfItems: this.props.numberOfItemsNew,
        componentData: []
      };
      this.setState({ content: '' });
      //this.updateStatus = this.updateStatus.bind(this);
    }
    updateStatus(){
      var dbRef = db.ref('processedOrders/' + this.state.userId + "/status");
      if (this.state.status === "Received Order"){
        //var refer1 = db.ref("processedOrders/" + this.state.user.uid + "/status");
        dbRef.set("Preparing Order");
        this.setState({status: "Preparing Order"});
      }
      if (this.state.status === "Preparing Order"){
        dbRef.set("Order Done");
        this.setState({status: "Order Done"});
      }
      if (this.state.status === "Order Done"){
        dbRef.set("Picked Up");
        this.setState({status: "Picked Up"});
      }

    }
    removeOrder(){
      var dbRef = db.ref('processedOrders/' + this.state.userId);
      dbRef.remove();
    }

    // use this to pull stuff into the component
    componentDidMount(){
      //console.log(this.props.statusNew)
      // Goal: Save every document in the workshops collection
      // get data from specific docs when needed
      var dbRef = db.ref('processedOrders/' + this.props.userId);
      var numTimes = parseInt(this.props.numberOfItems)
      const processedOrders = []
      var foodItems = []
      var cnt = 0;
      //console.log(dbRef.child(key))

      // Get the data from the firestore
      dbRef.once("value", function(snapshot) {
        // gets all docs in menu collection and maps array of docs to querySnapshot
        // docs. Puts every docs data into data variable
        snapshot.forEach(function(doc) {
          var processedItems = doc.val();
          var numItems = parseInt()
            if (cnt < numItems){
              var processedItems = doc.val();
              console.log("item" + processedItems)
              foodItems.push(doc.val())
              //console.log(orderItemDetails.doc.key)
              cnt++;
            }
        })
        // component data is now an array of ordered wksp objects
        this.setState({componentData: foodItems});
      }.bind(this));

      // here is where you declar const user with useAuth?
    }

    render() {
      const { componentData } = this.state;
      console.log(this.state.status)
      //console.log(componentData)
      //console.log(this.state.numberOfItems)

      /*componentData.forEach((details) => {
          console.log(details.foodItem)
      });*/

      return (
        <div class="orderCard">
          <div className="orderDescription">
          <b>Order for:</b> {this.state.userId}
          <br/>
          <b>Status:</b>  {this.state.status}
          </div>
          <button
          class="buttonlinks"
          onClick={() => this.updateStatus()}>
          Prepare Order
          </button>
          <button
          class="buttonlinks"
          onClick={() => this.updateStatus()}>
          Order Done
          </button>
          <button
          class="buttonlinks"
          onClick={() => this.updateStatus()}>
          Picked Up
          </button>
          <button
          class="buttonlinks"
          onClick={() => this.removeOrder()}>
          Remove
          </button>
        </div>
      )
    }
}
