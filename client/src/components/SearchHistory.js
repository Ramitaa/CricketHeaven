import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Alert} from 'reactstrap';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import { Link } from 'react-router-dom';
import 'react-table/react-table.css';
import { connect } from 'react-redux';
import { getHistory, deleteHistory } from '../actions/historyActions';
import PropTypes from 'prop-types';

class SearchHistory extends Component{
    
    constructor(props) {
        super(props);
        this.state ={
        }
    }

    componentDidMount(){
        console.log("Component did mount!");
        this.props.getHistory();
        console.log(this.props);
    }

    onDeleteClick = id => {
        this.props.deleteHistory(id);
    }

    render() {

        const { error } = this.props;

        if(error.id === 'AUTH_ERROR'){
            this.props.history.push('/');
        }

        const logo = require('./cricketer_silhouette.png');

        const dhanush_style = 
        {
            marginRight: '120px', 
            marginLeft: '120px',
            marginTop: '10px', 
            marginBottom: '25px', 
            display: 'flex',
            textAlign: 'center'
        }

        const rajini_style = {
            marginRight: '120px', 
            marginLeft: '120px', 
            marginBottom: '15px', 
            display: 'flex',
            marginTop: '30px'
        }

        const dravid_style = {
            backgroundColor: 'rgba(230, 230, 230, 0.8)'
        }
        const img_style = 
        {
            width:'90px', height: '100px'
        }

        const tryStyle = {    
            backgroundColor: 'rgb(248, 249, 250)',
            margin: '5px',
            paddingTop: '10px',
            paddingBottom: '10px'
        }

        const sachin_style = {
            marginTop: '20px',
            fontWeight: '100'
        }

        const dhoni_style = {
            marginTop: '15px',
            textAlign: 'right',
            fontWeight: '100'
        }

        const rohit_style = {
            fontWeight: '300'
        }

        const yereme_style = {
            alignSelf: 'center'
        }

        const madu_style = {
            color: 'midnightblue'
        }

        const some_style = {
            textAlign: 'center', fontWeight:400, marginTop: '30px', marginBottom: '20px'
        }
        var search_histories  = this.props.histories.histories;

        return(
        <React.Fragment>
            <div style={some_style}><h4><i>Search History</i></h4></div>
            <Alert id="loadingAlert" color="success" style={rajini_style} isOpen={this.props.auth.isLoading || this.props.histories.loading}>
                    Loading...
            </Alert>
            <Alert id="nothingAlert" color="success" style={rajini_style} isOpen={!this.props.auth.isLoading && !this.props.histories.loading && !(search_histories && search_histories.length)}>
                    No search histories.
            </Alert>
            <div className="row" style={dhanush_style}>
                <div className="col-md- col-sm-1 col-xs-1"></div>
                <div className="col-md-10 col-sm-10 col-xs-10 align-self-center">
                    { this.props.auth.isAuthenticated && this.props.histories.success ? (
                    <Container>
                        <ListGroup>
                            <TransitionGroup className="historyList">
                            {search_histories.map(({_id, id, fullName, birth, country, role, battingStyle, bowlingStyle, imageURL, searchDate}) =>(
                                <CSSTransition key={_id} classNames={"fade"} timeout={500}>
                                    <ListGroupItem style={dravid_style}>
                                    <div className="row" style={tryStyle}>
                                        <div className="col-md-2 col-sm-2 col-xs-2" style={yereme_style}>
                                        <img src={imageURL} alt="Cricketer" style={img_style} className="rounded mx-auto d-block img-thumbnail" onError={(e)=>{e.target.onerror = null; e.target.src=String(logo)}}/></div>
                                        <div className="col-md-8 col-sm-8 col-xs-8">
                                            <h5><Link to={`/viewPlayer/${id}`}><b style={madu_style}>{fullName} </b></Link><b>({country})</b></h5>
                                            <h6 style={sachin_style}>{role}</h6>
                                            <h6 style={rohit_style}>{bowlingStyle} | {battingStyle}</h6>
                                            <h6 style={rohit_style}>{birth}</h6>
                                            <h6 style={dhoni_style}><i>Search date: {searchDate}</i></h6>
                                        </div>
                                        <div className="col-md-2 col-sm-2 col-xs-2" style={yereme_style}>
                                            <Button 
                                                className="remove-btn" 
                                                color="danger"
                                                onClick={this.onDeleteClick.bind(this, _id)}
                                                >
                                                &times;
                                            </Button>

                                        </div>
                                    </div>
                                    </ListGroupItem>
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                        </ListGroup>
                </Container>
                ): '' }
                </div>
                <div className="col-md-1 col-sm-1 col-xs-1"></div>
            </div>
        </React.Fragment>
        )
    }
}

SearchHistory.propTypes = {
    getHistory: PropTypes.func.isRequired,
    histories: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    deleteHistory: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({ 
    histories: state.histories,
    auth: state.auth,
    error: state.error
});

export default connect(mapStateToProps, { getHistory, deleteHistory })(SearchHistory);