import React, { Fragment, useContext } from "react";
import AuthContext from '../../../context/auth-context';

// Components Imports
import HeaderCartButton from "./HeaderCartButton"
import Button from '../../../components/UI/Button/Button';
//Style Imports

import styles from "./Header.module.css"
import mealsImage from "../../assets/meals.jpg"



const Header = (props) => {
  const authCtx = useContext(AuthContext);
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>FoodOrderProject</h1>
        <HeaderCartButton onCartClick={props.onShowCart} />
        <Button onClick={authCtx.onLogout}>Logout</Button>
      </header>
      <div className= {styles['main-image']}> 
        <img src={mealsImage} alt="Table full of food" />
      </div>
    </Fragment>
  )
};

export default Header
