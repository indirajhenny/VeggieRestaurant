import React from 'react';
import '../styles/OrderConfirmation.css';
import { auth } from '../../services/firebase';
import { db } from '../../services/firebase';
import { Link } from "react-router-dom"

export default class OrderConfirmation extends React.Component {
  constructor(props) {
    super(props);

    // The component's temporary memory (state)
    this.state = {
      user: auth().currentUser,
      componentData: [],
      totalPrice: 0
    };
    this.completeOrder = this.completeOrder.bind(this);
  }

  async completeOrder() {
    console.log("order has been placed")
    const { componentData } = this.state;
    console.log(componentData)
    let loopcnt = 0;
    var testString = 0
    // push users order items to /processedOrders in database that the employees look at
    while (loopcnt < componentData.length) {
      //var refer0 = db.ref("processedOrders/" + this.state.user.uid + "/foodItem" + loopcnt);
      //refer0.set(componentData[loopcnt++].title);

      //testString += componentData[loopcnt++].title + ", "
      await db.ref("processedOrders/" + this.state.user.uid).push({
          foodItem: componentData[loopcnt++].title
        });
    }
      var refer1 = db.ref("processedOrders/" + this.state.user.uid + "/status");
      // CHANGES
      refer1.set("Received Order");
      var refer2 = db.ref("processedOrders/" + this.state.user.uid + "/userId");
      refer2.set(this.state.user.uid);
      db.ref("processedOrders/" + this.state.user.uid + "/numberOfItems").set("" + loopcnt);

    // empty users cart aka empty user's /orders
    let orderRef = db.ref('orders/' + this.state.user.uid);
    orderRef.remove();
  }

  componentDidMount() {
    // Goal: Save every document in the workshops collection
    // get data from specific docs when needed
    const userState = this.state.user;
    if(userState != null) {
      var dbRef = db.ref('orders/' + this.state.user.uid);
      const orderData = []
      let totalPrice = 0;

      // Get the data from the firestore
      dbRef.once("value", function(snapshot) {
        snapshot.forEach(function(doc) {
          var orderItem = doc.val();
            orderItem.key = doc.id;
            totalPrice += orderItem.price;
            orderData.push(orderItem);

        })
        this.setState({componentData: orderData});
        // add tax to total order
        totalPrice = totalPrice + (totalPrice * 0.065)
        this.setState({totalPrice: totalPrice});
      }.bind(this));
    }

  }

  render() {
    const orderCards = [];
    const { componentData } = this.state;

    componentData.forEach((orderDetails) => {
      orderCards.push(
        <div>
        <div class="order-confirm-column">
          {orderDetails.title}
        </div>
        <div class="order-confirm-column">
          ${orderDetails.price}.00
        </div>
        </div>

      );
    });

    return(
      <div className='orderPage'>
        <h2>Finalize Order</h2>
        <div class="orderContainer">
          <div class="order-confirm-row">
            {orderCards}
          </div>
        </div>
        <h1>Total: ${this.state.totalPrice}</h1>
        <Link
        class= "finalizeButton"
        onClick= {() => this.completeOrder()}
        to="/tracker">Order</Link>
      </div>
    );
  }
}
