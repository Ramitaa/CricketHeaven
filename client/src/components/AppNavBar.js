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
  UncontrolledPopover, 
  PopoverHeader, 
  PopoverBody
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

        const max_style = {
            padding: '20px 10px 20px 10px'
        }

        const vadivelu_style = {
            marginTop: '20px',
            textAlign: 'right'
        }

        const ar_style = {
            cursor: 'pointer'
        }

        const authLinks = (
            <Fragment>
                <NavItem id="PopoverLegacy">
                    <span className="navbar-text mr-3" style={ar_style}>
                        <strong>{ user ? `Welcome ${user.name}!` : '' }</strong>
                    </span>
                    <UncontrolledPopover trigger="legacy" placement="bottom" target="PopoverLegacy">
                    <PopoverHeader>Account Details</PopoverHeader>
                    <PopoverBody style={max_style}>
                        { user ? `User ID: ${user._id}` : '' } <br />
                        { user ? `Name: ${user.name}` : '' } <br />
                        { user ? `Email: ${user.email}` : '' }
                        <div style={vadivelu_style}>
                        <a  className="btn btn-grad" href={`/updatePassword`}>Update Details</a>
                        </div>
                    </PopoverBody>
                </UncontrolledPopover>
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