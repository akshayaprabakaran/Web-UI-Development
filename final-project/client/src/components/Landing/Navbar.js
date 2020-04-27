import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink tag={Link} to="/">Home</NavLink>
                        </NavItem>
                    </Nav>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink tag={Link} to="/jobgrowth">JobGrowth</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/">StartUp</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/">Sector</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/">Etc</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div >
        )
    }
}

export default Landing;