import React, { Component } from 'react';
import { NavLink} from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions'; 
import PropTypes from 'prop-types';

class Logout extends Component{
    
    render() {

        return(
            <React.Fragment>
                <NavLink onClick={this.props.logout} href="/">Logout</NavLink>
            </React.Fragment>
        )
    }
}

Logout.propTypes = {
    logout: PropTypes.func.isRequired
}

export default connect(null, { logout })(Logout);