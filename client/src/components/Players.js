import React, { Component } from 'react';
import { Alert, Jumbotron, Form, Input} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchPlayers } from '../actions/playerActions';
import PropTypes from 'prop-types';

class Players extends Component{
    
    constructor(props) {
        super(props);
        this.state =
        {
          err_msg_visible : false,
          searchQuery : ''
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.searchQuery === ""){

            this.setState({ err_msg_visible : true }, () => {
                window.setTimeout(()=>{
                  this.setState({ err_msg_visible : false })
                },2000)
            });
        }
        else{
            this.props.searchPlayers(this.state.searchQuery)
            this.setState( {searchQuery: '' });
            this.refs.searchQuery.value = "";
        }
    }
    
    onChange = (e) => {
        this.setState({ searchQuery: e.target.value });
    }

    render() {
        const logo = require('./cricketer_silhouette.png');
        const { players } = this.props.player;
        const jumbotron_style = (this.props.player.completedSearch && players.length > 0)? {marginRight: '100px', marginLeft: '100px', marginTop: '15px', marginBottom: '15px', padding: '10px', backgroundColor: 'rgba(200, 200, 200, 0.8)'} : {display: 'none', marginRight: '100px', marginLeft: '100px', marginTop: '15px', marginBottom: '15px', padding: '10px', backgroundColor: 'rgba(200, 200, 200, 0.8)'}
        const rajini_style = {marginRight: '100px', marginLeft: '100px', marginBottom: '15px', display: 'flex'}
        const img_style = {
            width:'170px', height: '190px'
        }
        const tryStyle = {    
            backgroundColor: 'rgb(248, 249, 250)',
            margin: '5px',
            paddingTop: '20px',
            paddingBottom: '20px'
        }
        return(
            <React.Fragment>
                <Form onSubmit = {this.onSubmit} style={rajini_style}>
                    <Input 
                        type="text" 
                        className="searchQuery" 
                        style={{ flex: '10', padding: '15px', marginRight: '10px' }}
                        placeholder="Search for cricket players..." 
                        ref = {'searchQuery'}
                        onChange = {this.onChange}
                    />
                    <Input 
                        type="submit" 
                        value="Submit" 
                        className="btn btn-success"
                        style={{flex: '1'}}
                    />
                </Form>
                <Alert id="loadingAlert" color="success" isOpen={this.props.player.loading} style={rajini_style}>
                    Loading...
                </Alert>
                <Alert id="emptyAlert" color="danger" isOpen={this.state.err_msg_visible} style={rajini_style}>
                    Query must no be empty. Please enter a name.
                </Alert>
                <Alert id="nothingAlert" color="success" isOpen={(this.props.player.completedSearch && players.length === 0)} style={rajini_style}>
                    Search complete! No cricketers found!
                </Alert>
            {players.map(({_id, id, fullName, birth, country, role, profile, imageURL }) => (
            <Jumbotron style={jumbotron_style}>
            <div className="row" style={tryStyle}>
                <div className="col-md-3 col-sm-3 col-xs-3 align-self-center">
                <img src={imageURL} alt="Cricketer" style={img_style} className="rounded mx-auto d-block img-thumbnail" onError={(e)=>{e.target.onerror = null; e.target.src=String(logo)}}/></div>
                <div className="col-md-9">
                <p className="lead">
                    <b>{fullName}</b>
                </p>
                <hr className="my-2" />
                <p>Birth: {birth}</p>
                <p>Role: {role}</p>
                <p><span><Link color="success" className="float-right btn btn-success" to={`/viewPlayer/${id}`}>View Details</Link></span>Country: {country}</p>
                </div>
            </div>
            </Jumbotron>
             ))}
          </React.Fragment>
        )
    }
}

Players.propTypes = {
    searchPlayers: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({ 
    player: state.player
});

export default connect(mapStateToProps, { searchPlayers })(Players);