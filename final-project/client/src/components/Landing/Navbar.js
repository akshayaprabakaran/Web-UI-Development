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
                            <NavLink tag={Link} to="/home">Home</NavLink>
                        </NavItem>
                    </Nav>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink tag={Link} to="/employment">Employment</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/startups">StartUp</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/education">Education</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="//">Etc</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                </div>
)

    }
}

export default Landing;
