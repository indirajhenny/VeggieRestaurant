import React from 'react';
import '../../App.css';
import ProgressBar from 'react-bootstrap/ProgressBar'
import { auth } from '../../services/firebase';
import { db } from '../../services/firebase';
import '../styles/Tracker.css';

export default class Tracker extends React.Component{
  constructor(props) {
    super(props);

    // The component's temporary memory (state)
    this.state = {
      user: auth().currentUser,
      status: null
    };
    //this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    // Goal: Save every document in the workshops collection
    // get data from specific docs when needed
    if (this.state.user != null){
      var dbRef = db.ref('processedOrders/' + this.state.user.uid + "/status");
      const processedOrders = []
      //console.log(dbRef.child(key))
      dbRef.on("value", function(statusData) {
        var statusVal = statusData.val();
        console.log(statusData.val())
        this.setState({status: statusVal});
      }.bind(this))
    }

  }

  render(){
    var barLevel = [];
    if (this.state.status === "Received Order"){
      barLevel.push(
          <div class="myBarTen">{this.state.status}</div>
      );
    }
    if (this.state.status === "Preparing Order"){
      barLevel.push(
          <div class="myBarFifty">{this.state.status}</div>
      );
    }
    if (this.state.status === "Order Done"){
      barLevel.push(
          <div class="myBarSeventy">{this.state.status}</div>
      );
    }
    if (this.state.status === "Picked Up"){
      barLevel.push(
          <div class="myBarComplete">{this.state.status}</div>
      );
    }
    if (this.state.status === null){
      barLevel.push(
          <div class="myBarEmpty"></div>
      );
    }

    return (
      <div>
        <div className='tracker-container'>
          <div class="trackerHeading">Track Your Order!</div>
          <div class="myProgress">
            {barLevel}
          </div>
        </div>
      </div>

  )
}


}
