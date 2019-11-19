import React, { Component } from 'react';
import { Alert, Badge, Form, Input,
        Modal, ModalBody, 
        Card, CardImg, CardTitle, CardGroup,CardBody} from 'reactstrap';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { connect } from 'react-redux';
import { getMatches, getJoke } from '../actions/homeActions';
import PropTypes from 'prop-types';

class Home extends Component{
    
    constructor(props) {
        super(props);
        this.state =
        {
          err_msg_visible : false,
          num_msg_visible : false,
          searchQuery : '',
          openModal: false
        }
    }

    componentDidMount(){
        this.props.getMatches();
        console.log(this.props);
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log("Query: " + this.state.searchQuery)
        if (this.state.searchQuery === ""){

            this.setState({ err_msg_visible : true }, () => {
                window.setTimeout(()=>{
                  this.setState({ err_msg_visible : false })
                },2000)
            });
        }
        else{

            if(hasNumber(this.state.searchQuery))
            {
                this.setState({ num_msg_visible : true }, () => {
                    window.setTimeout(()=>{
                      this.setState({ num_msg_visible : false })
                    },2000)
                });
            }
            else
            {
                console.log("Redirecting..."); 
                this.props.history.push(`/searchPlayer/${this.state.searchQuery}`);
                window.location.reload();
            }
        }
    }
    
    onChange = (e) => {
        this.setState({ searchQuery: e.target.value });
    }

    getJoke(){
        this.props.getJoke();
        this.setState({'openModal': true});
    }

    closeModal(){
        this.setState({'openModal': false});
        this.props.match.joke = null;
    }

    render() {

        const chiku = require('./cricket_heaven_joke.png');
        const one = require('./cricket_heaven_card_one.PNG');
        const two = require('./cricket_heaven_card_two.PNG');
        const three = require('./cricket_heaven_card_three.PNG');
        const { error } = this.props;

        if(error.id === 'AUTH_ERROR'){
            this.props.history.push('/');
        }

        const rajini_style = 
        {               
            marginRight: '100px', 
            marginLeft: '100px', 
            marginBottom: '15px', 
            display: 'flex',
            marginTop: '30px'
        }

        const row_style = (this.props.match.searchCompleted && this.props.match.success)? 
        {} : { display : 'none'}


        const dhanush_style = 
        {
            marginRight: '100px', 
            marginLeft: '100px',
            marginTop: '60px', 
            marginBottom: '5px', 
            display: 'flex',
            textAlign: 'center'
        }

        const karthik_style = 
        {
            marginRight: '100px', 
            marginLeft: '100px',
            marginBottom: '15px', 
            display: 'flex',
            textAlign: 'center'
        }

        const surya_style = {
            backgroundColor: 'rgba(250, 250, 250, 0.8)',
            padding: '10px'
        }

        const my_style = {fontWeight: 100, marginBottom: '40px'}

        const data = this.props.match.matches.matches;
          const columns = 
          [
            {
                Header: 'Match Type',
                accessor: 'type'
            },
            {
                Header: 'Team 1',
                accessor: 'team-1'
            },
            {
                Header: 'Team 2',
                accessor: 'team-2'
            },
            {
                Header: 'Date',
                accessor: 'dateTimeGMT'
            },
            {
                Header: 'Toss Winner Team',
                accessor: 'toss_winner_team'
            },
          ]

          const card_ma = {
            marginRight: '100px', 
            marginLeft: '100px',
            marginBottom: '35px', 
            marginTop: '30px'
          }

          const ind_card = {
              marginRight: '8px',
              marginLeft: '8px'
          }

          const finishing_card = {
              margin: '100px 100px 100px 100px',
              padding: '30px 0px 30px 0px',
              background: 'rgba(230, 230, 230, 0.8)'
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
                        className="btn btn-grad"
                        style={{flex: '1'}}
                    />
                </Form>
                <Alert id="emptyAlert" color="danger" isOpen={this.state.err_msg_visible} style={rajini_style}>
                    Query must no be empty. Please enter a name.
                </Alert>
                <Alert id="numberAlert" color="danger" isOpen={this.state.num_msg_visible} style={rajini_style}>
                    Query must not have any numerical values. Please enter an appropriate name.
                </Alert>
                <Alert id="errorAlert" color="danger" isOpen={(this.props.match.success === false && this.props.match.searchCompleted === true)} style={rajini_style}>
                    An error has occured. Please refresh!
                </Alert>
                <div className="row" style={dhanush_style}>
                    <div className="col-md- col-sm-1 col-xs-1"></div>
                    <div className="col-md-10 col-sm-10 col-xs-10 align-self-center">
                    <h3>Upcoming Cricket Matches <Badge color="secondary">New</Badge></h3>
                   </div>
                   <div className="col-md-1 col-sm-1 col-xs-1"></div>
                </div>
                <div className="row" style={karthik_style}>
                    <div className="col-md- col-sm-1 col-xs-1"></div>
                    <div className="col-md-10 col-sm-10 col-xs-10 align-self-center">
                    <h5>- Local and International coverage -</h5>
                   </div>
                   <div className="col-md-1 col-sm-1 col-xs-1"></div>
                </div>
                <Alert id="loadingAlert" color="success" isOpen={this.props.match.loading} style={rajini_style}>
                    Loading upcoming matches...
                </Alert>
                <div className="row" style={row_style}>
                    <div className="col-md- col-sm-1 col-xs-1"></div>
                    <div className="col-md-10 col-sm-10 col-xs-10 align-self-center">
                    <ReactTable
                        data={data}
                        columns={columns}
                        style={surya_style}
                    />
                   </div>
                   <div className="col-md-1 col-sm-1 col-xs-1"></div>
                </div>
                <div style={finishing_card}>
                <h4 style={{fontWeight: '100'}}><center>Who do you trust to crack a joke?</center></h4>
                <CardGroup style={card_ma}>
                    <Card style={ind_card}>
                        <CardImg bottom width="150px" height="280px" src={one} alt="Card image cap" />
                        <CardBody>
                        <CardTitle><center><b>Rahul Dravid</b></center></CardTitle>
                        <Input type="submit" className="btn btn-grad" onClick={this.getJoke.bind(this)} value="I'm good. Trust me!"/>
                        </CardBody>
                    </Card>
                    <Card style={ind_card}>
                        <CardImg bottom width="150px" height="280px" src={two} alt="Card image cap" />
                        <CardBody>
                        <CardTitle><center><b>MS Dhoni</b></center></CardTitle>
                        <Input type="submit" className="btn btn-grad" onClick={this.getJoke.bind(this)} value="I'm 'Captain Cool' for a reason"/>
                        </CardBody>
                    </Card>
                    <Card style={ind_card}>
                        <CardImg bottom width="150px" height="280px" src={three} alt="Card image cap" />
                        <CardBody>
                        <CardTitle><center><b>Bhuvaneshwar Kumar</b></center></CardTitle>
                        <Input type="submit" className="btn btn-grad" onClick={this.getJoke.bind(this)} value="Come on! You know me!"/>
                        </CardBody>
                    </Card>
                </CardGroup>
                </div>
                <Modal isOpen={this.state.openModal}>
                <ModalBody>
                    <div>
                <center>
                    <img src={chiku} alt="Virat Kohli" name="virat" width="140" height="140" border="0" class="img-circle"/>
                    <h3 class="media-heading">Virat Kohli <small>Chiku</small></h3>
                    <h5>HA HA HA HA HA HA</h5>
                    <h6 style={my_style}>I fooled you! Only I can crack jokes here :D</h6>
                    <h6><i>{this.props.match.joke? this.props.match.joke.response.value : 'loading'}</i></h6>
                    <Input style={{marginTop: '20px'}} type="submit" className="btn btn-grad" onClick={this.closeModal.bind(this)} value="Thanks for wasting my time"/>
                    </center>
                  </div>
                </ModalBody>
            </Modal>
          </React.Fragment>
        )
    }
}

Home.propTypes = {
    getMatches: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    getJoke: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({ 
    match: state.match,
    auth: state.auth,
    error: state.error
});

function hasNumber(myString) {
    return /\d/.test(myString);
}

export default connect(mapStateToProps, { getMatches, getJoke })(Home);