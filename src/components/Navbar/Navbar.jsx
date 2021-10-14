import React, { useState } from 'react';
import './navbar.css';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const SiteBar = (props) => {

    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    return (
        <div>
        <Navbar className="main-nav-build" color="faded" light>
            <NavbarBrand color="muted" href="/" className="mr-auto">Let's Eat</NavbarBrand>
            <NavbarToggler onClick={toggleNavbar} className="mr-2" />
            <Collapse isOpen={!collapsed} navbar>
            <Nav navbar>
                <NavItem>
                <NavLink href="/components/">Option 1</NavLink>
                </NavItem>
                <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">Option 2</NavLink>
                </NavItem>
            </Nav>
            </Collapse>
        </Navbar>
        </div>
    );
}

export default SiteBar;