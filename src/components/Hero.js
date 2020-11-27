import React from 'react';
import '../App.css';
import { Button } from './Button';
import './styles/Hero.css';
//import veg from '../../../images/header-1.jpg';

function Hero() {
  return (
    <div className='hero-container'>
      <img src='../../../images/header-1.jpg' alt="veggies"/>
      <h1>ADVENTURE AWAITS</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'>
          GET STARTED
        </Button>
      </div>
    </div>
  );
}

export default Hero;
