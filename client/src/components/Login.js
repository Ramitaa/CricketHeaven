import React, { Component } from 'react';
import { Alert, Form, FormGroup, Input} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginActions } from '../actions/authActions'; 
import { clearErrors } from '../actions/errorActions';
import PropTypes from 'prop-types';

class Login extends Component{
    
    constructor(props) {
        super(props);
        this.state =
        {
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
            if(error.id === 'LOGIN_FAIL'){
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
            this.props.history.push(`/home`);
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { email, password } = this.state;
        
        const user = {
            email, 
            password
        }

        // Attempt to login
        this.props.loginActions(user);
    }
    
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };
    
    render() {

        const title_logo = require('./cricket_heaven_title.png');

        const rajini_style = {   
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            padding: '30px 15px 30px 15px',
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
            marginBottom: '20px'

        }

        const register_style = {
            fontSize: '14px',
            paddingTop: '10px',
            color: 'black'
        }

        return(
            <div className="login">
                <div className="row">
                    <div className="col-md-12" style={rajini_style}>
                        <Alert id="errorAlert" color="danger" isOpen={this.state.err_msg_visibile}>
                            {this.state.msg}
                        </Alert>
                        <img style={img_style} alt="Cricket Heaven Logo" src={String(title_logo)}></img>
                        <Form onSubmit = {this.onSubmit}>
                        <FormGroup>
                        <Input 
                            type="email" 
                            name="email"
                            id = "email" 
                            onChange = {this.onChange}
                            style={madhavan_style}
                            placeholder="Email Address"
                        />

                        <Input 
                            type="password" 
                            name="password" 
                            id = "password"
                            onChange = {this.onChange}
                            style={madhavan_style}
                            placeholder="Password"
                        />
                        <Input
                            style={vivek_style} 
                            type="submit" 
                            value="Login" 
                            className="btn btn-grad"
                        />
                        <Link to={`/registerNewUser/`}><p style={register_style}>New? Register here</p></Link>
                        </FormGroup>
                    </Form>
                    </div>
                </div>
          </div>
        )
    }
}

Login.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    loginActions: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({ 
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { loginActions, clearErrors })(Login);