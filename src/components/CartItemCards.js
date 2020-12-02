import React from 'react';
//import { Link } from 'react-router-dom'
import './styles/CartItemCards.css';
//import { useAuth } from "../helpers/auth";
//import { auth } from '../services/firebase';
//import { db } from '../services/firebase';
// Imports firebase into the component

export default class CartItemCards extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
        title : this.props.foodTitle,
        price: this.props.foodPrice
        /*user: auth().currentUser,
        title : this.props.foodTitle,
        description: this.props.foodDescription,
        type: this.props.foodType,*/
      };
      //this.addToOrder = this.addToOrder.bind(this);
    }

    // pushes data input back to database
    /*async addToOrder() {
      //console.log("item is added to order: " + this.state.user.uid)
      await db.ref("orders/" + this.state.user.uid).push({
        title: this.state.title,
        uid: this.state.user.uid
      });
      this.setState({ content: '' });

    } */
    // use this to pull stuff into the component
    componentDidMount(){
      // here is where you declar const user with useAuth?
    }

    render() {
      return (
        <div class="cartCard">
            <div className="cartDescription">
            {this.state.title}
            <br/>
            ${this.state.price}.00
            </div>
        </div>
      )
    }
}
