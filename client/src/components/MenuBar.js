import React, { useState,useContext } from "react";
import { Icon, Menu, Image } from "semantic-ui-react";
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/auth'

const MenuBar = () => {
  const context = useContext(AuthContext)
  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'home' : pathname.substr(1)
  const [activeItem, setActiveItem] = useState(path);
  const handleItemClick = (e, { name }) => setActiveItem(name);


  return (
    <>
  {context && context.user? 
      <Menu pointing secondary size='tiny' color='olive' icon='labeled'>
        <Menu.Item
          name={context.user.username}
          as={Link}
          to='/'
        >
          <Image
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg'
        />
          {context.user.username}
        </Menu.Item>
        <Menu.Menu position='right' />
        <Menu.Item
          name="signOut"
          active={activeItem === "signOut"}
        >
          <Icon name="sign out" />
        Sign out
        </Menu.Item>
      </Menu> : <Menu pointing secondary size='tiny' color='olive' icon='labeled'>
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
          as={Link}
          to='/'
        >
          <Icon name="home" />
        Home
        </Menu.Item>
        <Menu.Menu position='right' />
        <Menu.Item
          name="signIn"
          active={activeItem === "signIn"}
          onClick={handleItemClick}
          as={Link}
          to='/signIn'
        >
          <Icon name="sign in" />
        Sign In
        </Menu.Item>
        <Menu.Item
          name="signUp"
          active={activeItem === "signUp"}
          onClick={handleItemClick}
          as={Link}
          to='/signUp'
        >
          <Icon name="signup" />
        Sign Up
        </Menu.Item>
      </Menu>}
    </>
  );
};

export default MenuBar;
