import React from 'react';
import '../App.css';
import { Button } from './Button';
import './styles/Hero.css';
//import veg from '../../../images/header-1.jpg';

function Hero() {
  return (
    <div className='hero-container'>
      <img src='../../../images/veganheader.jpg' alt="veggies"/>
      <h1>Welcome to VeggieRst</h1>
      <p>Tasty, Sustainable, and Organically Produced Dishes</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'>
          Sign In or Create an Account To Order
        </Button>
      </div>
    </div>
  );
}

export default Hero;
