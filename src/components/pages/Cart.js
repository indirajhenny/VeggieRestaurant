import React from 'react';
import '../styles/Cart.css';
import CartItemCard from '../CartItemCards.js';
import { auth } from '../../services/firebase';
import { db } from '../../services/firebase';
import { Link } from "react-router-dom"

export default class Cart extends React.Component {
  constructor(props) {
    super(props);

    // The component's temporary memory (state)
    this.state = {
      user: auth().currentUser,
      componentData: []
    };

  }

  componentDidMount() {
    const userState = this.state.user;
    if(userState != null) {
      var dbRef = db.ref('orders/' + this.state.user.uid);
      const cartData = []

      // Get the data from the firestore
      dbRef.once("value", function(snapshot) {
        // gets all docs in menu collection and maps array of docs to querySnapshot
        // docs. Puts every docs data into data variable
        snapshot.forEach(function(doc) {
          var cartItem = doc.val();
            cartItem.key = doc.id;
            cartData.push(cartItem);
          //}
        })
        // cart data is now assigned to componentData
        this.setState({componentData: cartData});
      }.bind(this));
    }

  }

  render() {
    const cartCards = [];
    const { componentData } = this.state;

    componentData.forEach((cartItemDetail) => {
      cartCards.push(
        <div class="cart-card-column">
          <CartItemCard
            foodTitle={cartItemDetail.title}
            foodPrice={cartItemDetail.price}
            />
        </div>

      );
    });

    return(
      <div className='cart-container'>
        <div class="cardContainer">
          <div class="cart-card-row">
            {cartCards}
          </div>
        </div>
        <Link class= "confirmButton" to="/orderconfirm">Confirm Order</Link>
      </div>
    );
  }
}
