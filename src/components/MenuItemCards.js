import React from 'react';
import { Link } from 'react-router-dom'
import './styles/MenuItemCards.css';
// Imports firebase into the component

export default class MenuItemCards extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
        /*title : this.props.title,
        description: this.props.description,*/
      };
    }

    componentDidMount(){

    }

    render() {
      return (
        <div class="menucard">
            <div className="menuDescription">testing is written</div>
        </div>
      )
    }
}
