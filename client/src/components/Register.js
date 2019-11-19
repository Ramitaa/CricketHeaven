import React, { Component } from 'react';
import { Alert, Form, FormGroup, Input} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerActions } from '../actions/authActions'; 
import { clearErrors } from '../actions/errorActions';
import PropTypes from 'prop-types';

class Register extends Component{
    
    constructor(props) {
        super(props);
        this.state =
        {
          name: '',
          email: '',
          password: '',
          message: null,
          err_msg_visibile: false
        }
    }

    componentDidUpdate(prevProps){
        const { error, isAuthenticated } = this.props;

        if(error !== prevProps.error){
            // Check for register error
            if(error.id === 'REGISTER_FAIL'){
                this.setState({ msg: error.msg.msg })

                this.setState({ err_msg_visibile : true }, () => {
                    window.setTimeout(()=>{
                      this.setState({ err_msg_visibile : false })
                      this.props.clearErrors();
                    },2000)
                });

            } else{
                this.setState({ msg: null })
            }
        }

        // If authenticated, redirect to login page
        if(isAuthenticated){
            this.props.history.push(`/`);
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { name, email, password } = this.state;

        // Creating new user 
        const newUser = {
            name,
            email, 
            password
        };

        // Attempt to register
        this.props.registerActions(newUser);
    }
    
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };
    
    render() {

        const title_logo = require('./cricket_heaven_title.png');

        const rajini_style = {   
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            padding: '10px 15px 10px 15px',
            textAlign: 'center'
        }

        const madhavan_style = {
            marginTop: '15px',
            marginRight: '90px'
        }

        const vivek_style = {
            marginTop: '40px'
        }

        const img_style = 
        {
            height: '80px',
            textAlign: 'center',
            marginBottom: '10px'

        }

        const login_style = {
            fontSize: '14px',
            paddingTop: '10px',
            color: 'black'
        }

        return(
            <div className="register">
                <div className="row">
                    <div className="col-md-12" style={rajini_style}>
                        <Alert id="errorAlert" color="danger" isOpen={this.state.err_msg_visibile}>
                            {this.state.msg}
                        </Alert>
                        <img style={img_style} alt="Cricket Heaven Logo" src={String(title_logo)}></img>
                        <Form onSubmit = {this.onSubmit}>
                        <FormGroup>
                        <Input 
                            type="text" 
                            name="name" 
                            id = "name"
                            placeholder = "Name"
                            onChange = {this.onChange}
                            style={madhavan_style}
                        />
                        <Input 
                            type="email" 
                            name="email"
                            id = "email" 
                            placeholder="Email Address" 
                            onChange = {this.onChange}
                            style={madhavan_style}
                        />
                        <Input 
                            type="password" 
                            name="password" 
                            id = "password"
                            placeholder="Password"
                            onChange = {this.onChange}
                            style={madhavan_style}
                        />
                        <Input
                            style={vivek_style} 
                            type="submit" 
                            value="Register" 
                            className="btn btn-grad"
                        />
                        <Link to={`/`}><p style={login_style}>Already have an account? Login here</p></Link>
                        </FormGroup>
                    </Form>
                    </div>
                </div>
          </div>
        )
    }
}

Register.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    registerActions: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({ 
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { registerActions, clearErrors })(Register);