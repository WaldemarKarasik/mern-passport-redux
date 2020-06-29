import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Input
} from 'reactstrap';
import {useSelector} from 'react-redux'
import {NavLink as RouterNavLink, Route} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {logout} from '../features/userSlice'


export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = useSelector(state=>state.user.isAuthenticated)
  const toggle = () => setIsOpen(!isOpen);
  const dispatch = useDispatch()

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand className="pl-3" tag={RouterNavLink} to="/">Mnemo</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/login">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
            <NavItem>
                <Input type="text"/>
            </NavItem>
          </Nav>
          <Nav navbar>
          {isAuthenticated ? <NavItem><NavLink href="#" onClick={()=>dispatch(logout())}>Logout</NavLink></NavItem> : null}
          </Nav>
          
        </Collapse>
        
      </Navbar>
    </div>
  );
}