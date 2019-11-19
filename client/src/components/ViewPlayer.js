import React, { Component } from 'react';
import { Alert, Table} from 'reactstrap';
import { connect } from 'react-redux';
import { viewPlayer } from '../actions/viewPlayerActions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ViewPlayer extends Component{
    
    constructor(props) {
        super(props);
        this.state =
        {
          loadingCompleted : false
        }
    }

    componentDidMount(){
        let id = this.props.match.params.id;
        this.props.viewPlayer(id);
    }

    render() { 

        const { error } = this.props;

        if(error.id === 'AUTH_ERROR'){
            this.props.history.push('/');
        }
        
        const logo = require('./cricketer_silhouette.png');

        const rajini_style = {
            marginRight: '100px', 
            marginLeft: '100px', 
            marginBottom: '15px', 
            display: 'flex',
            marginTop: '30px'
        }

        const kamal_style = (this.props.i_player.i_player.searchCompleted && this.props.i_player.i_player.success)? 
        {   
            marginTop: '15px', 
            marginBottom: '15px',
            backgroundColor: 'rgba(248, 249, 250, 0.8)'

        } : {
            display: 'none', 
        }
        const img_style = 
        {
            width:'170px', height: '190px'
        }

        const row_style = (this.props.i_player.i_player.searchCompleted && this.props.i_player.i_player.success)? 
        {} : { display : 'none'}

        const first_row_style = (this.props.i_player.i_player.searchCompleted && this.props.i_player.i_player.success)? 
        {marginTop: '30px'} : { display : 'none'}

        const name_style = {
            paddingTop: '10px',
            paddingBottom: '20px'
        }

        const profile_style = {
            padding: '15px',
            backgroundColor: 'rgba(248, 249, 250, 0.8)'
        }   
        
        const dhanush_style = (this.props.i_player.i_player.searchCompleted)?
        {
            marginRight: '100px', 
            marginLeft: '100px', 
            marginBottom: '15px', 
            display: 'flex'
            
        } : {display : 'none'}

        return(
            <React.Fragment>
                <Alert id="loadingAlert" color="success" style={rajini_style} isOpen={this.props.i_player.loading}>
                    Loading...
                </Alert>
                <Alert id="nothingAlert" color="success" style={rajini_style} isOpen={!this.props.i_player.loading && this.props.i_player.i_player.searchCompleted && (this.props.i_player.i_player.success === false)}>
                    Search complete! No cricketers found by this ID: {this.props.match.params.id}!
                </Alert>
                <div className="row" style={first_row_style}>
                    <div className="col-md-12 col-sm-12 col-xs-12 align-self-center">
                    <img src={this.props.i_player.i_player.imageURL} alt="Cricketer" style={img_style} className="rounded mx-auto d-block img-thumbnail" onError={(e)=>{e.target.onerror = null; e.target.src=String(logo)}}/></div>
                </div>

                <div className="row" style={row_style}>
                    <div className="col-md-12 col-sm-12 col-xs-12 text-center">
                    <h3 style={name_style}>{this.props.i_player.i_player.fullName}</h3>
                    </div>
                </div>

                <div className="row" style={row_style}>
                    <div className="col-md-2 col-sm-2 col-xs-2"></div>
                    <div className="col-md-8 col-sm-8 col-xs-8 align-self-center">
                        <p style={profile_style}>{this.props.i_player.i_player.profile}</p>
                   </div>
                   <div className="col-md-2 col-sm-2 col-xs-2"></div>
                </div>

                <div className="row">
                    <div className="col-md-2 col-sm-2 col-xs-2"></div>
                    <div className="col-md-8 col-sm-8 col-xs-8 align-self-center">
                    <Table size="sm" style={kamal_style}>                 
                <tbody>
                    <tr>
                        <th scope="row">Full Name</th>
                        <td>{this.props.i_player.i_player.fullName}</td>
                    </tr>
                    <tr>
                        <th scope="row">Country</th>
                        <td>{this.props.i_player.i_player.country}</td>
                    </tr>
                    <tr>
                        <th scope="row">Age</th>
                        <td>{this.props.i_player.i_player.age}</td>
                    </tr>
                    <tr>
                        <th scope="row">Birth</th>
                        <td>{this.props.i_player.i_player.birth}</td>
                    </tr>
                    <tr>
                        <th scope="row">Role</th>
                        <td>{this.props.i_player.i_player.role}</td>
                    </tr>
                    <tr>
                        <th scope="row">Batting Style</th>
                        <td>{this.props.i_player.i_player.battingStyle}</td>
                    </tr>
                    <tr>
                        <th scope="row">Bowling Style</th>
                        <td>{this.props.i_player.i_player.bowlingStyle}</td>
                    </tr>
                    <tr>
                        <th scope="row">Major Teams</th>
                        <td>{this.props.i_player.i_player.majorTeams}</td>
                    </tr>
                    
                </tbody>
                </Table>
                    </div>
                    <div className="col-md-2 col-sm-2 col-xs-2"></div>
                </div>
                <Link style={dhanush_style} color="success" className="float-right btn btn-grad" to={`/home`}>Back</Link>
          </React.Fragment>
        )
    }
}

ViewPlayer.propTypes = {
    viewPlayer: PropTypes.func.isRequired,
    i_player: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({ 
    i_player: state.i_player,
    auth: state.auth,
    error: state.error
});

export default connect(mapStateToProps, { viewPlayer })(ViewPlayer);