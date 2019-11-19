import React, { Component } from 'react';
import { Link } from 'react-router-dom' 
import { connect } from 'react-redux';
class PageNotFound extends Component{
    
    render() {
        
        const display_style = {
            fontSize: '10rem',
            color: 'white',
            fontWeight: 500,
            margin:'0px',
            padding: '0px'
        }

        return(
            <div className="page_not_found">
            <center>
                <h1 style={display_style} className="display-1">404</h1>
                <h1 style={{color: 'white', margin:'0px', padding: '0px'}}>PAGE NOT FOUND</h1>
                <Link style={{marginTop: '20px'}} className="btn btn-grad" to={`/home`}>I'm Lost! Take Me Home</Link>
            </center>
            </div>
        )
    }
}

export default connect(null, {})(PageNotFound);