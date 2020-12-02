import React from 'react';
//import { Link } from 'react-router-dom'
import './styles/MenuItemCards.css';
import { useAuth } from "../helpers/auth";
import { auth } from '../services/firebase';
import { db } from '../services/firebase';
// Imports firebase into the component

export default class MenuItemCards extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
        user: auth().currentUser,
        title : this.props.foodTitle,
        description: this.props.foodDescription,
        type: this.props.foodType,
        price: this.props.foodPrice
      };
      this.addToOrder = this.addToOrder.bind(this);
    }

    // pushes data input back to database
    async addToOrder() {
      if (this.state.user != null){
        //console.log("item is added to order: " + this.state.user.uid)
        await db.ref("orders/" + this.state.user.uid).push({
          title: this.state.title,
          price: this.state.price,
          uid: this.state.user.uid
        });
        this.setState({ content: '' });
      }

    }
    // use this to pull stuff into the component
    componentDidMount(){
      // here is where you declar const user with useAuth?
    }

    render() {
      return (
        <div class="menucard">
            <div className="menuTitle">{this.state.title}</div>
            <div className="menuDescription">
            {this.state.description}
            <br/>
            ${this.state.price}.00
            </div>
            <button
            class="buttonlinks"
            onClick={() => this.addToOrder()} >
            Add to Cart
            </button>
        </div>
      )
    }
}
