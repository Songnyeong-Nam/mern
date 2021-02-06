import React, { useState } from "react";
import { Icon, Menu } from "semantic-ui-react";
import {Link} from 'react-router-dom'

const MenuBar = () => {
    const pathname = window.location.pathname;
    const path = pathname === '/'? 'home': pathname.substr(1)
    const [activeItem, setActiveItem] = useState(path);
    console.log(activeItem)
  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <>
      <Menu pointing secondary size='tiny' color='olive' icon='labeled'>
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
          as={Link}
          to='/'
        >
        <Icon name="home"/>
        Home
        </Menu.Item>
        <Menu.Menu position='right'/>
        <Menu.Item 
          name="signIn"
          active={activeItem === "signIn"}
          onClick={handleItemClick}
          as={Link}
          to='/signIn'
        >
        <Icon name="sign in"/>
        Sign In
        </Menu.Item>
        <Menu.Item
          name="signUp"
          active={activeItem === "signUp"}
          onClick={handleItemClick}
          as={Link}
          to='/signUp'
        >
        <Icon name="signup"/>
        Sign Up
        </Menu.Item>
      </Menu>
    </>
  );
};

export default MenuBar;
