import React, { Component, Fragment } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  UncontrolledTooltip
} from 'reactstrap';
import Logout from '../components/Logout';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class AppNavBar extends Component {
    state = {
        isOpen: false
    }

    toggle = () =>{
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {

        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Fragment>
                <NavItem id="UncontrolledTooltipExample">
                    <span className="navbar-text mr-3">
                        <strong>{ user ? `Welcome ${user.name}!` : '' }</strong>
                    </span>
                    <UncontrolledTooltip placement="bottom" target="UncontrolledTooltipExample">
                        { user ? `Name: ${user.name}` : '' } <br />
                        { user ? `Email: ${user.email}` : '' }
                    </UncontrolledTooltip>
                </NavItem>
                <NavItem>
                    <NavLink href="/searchHistory">History</NavLink>
                </NavItem>
                <NavItem><Logout /></NavItem>
            </Fragment>
        )

        const guestLinks = ( <Fragment></Fragment>)
        const title_logo = require('./cricket_heaven_title.png');

        return (
        <div>
            <Navbar color="light" light expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="/home"><img alt="Cricket Heaven Logo" height="50" width="160" src={String(title_logo)}></img></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            { isAuthenticated ? authLinks : guestLinks }
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
        );
    }

}

AppNavBar.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(mapStateToProps, null )(AppNavBar);