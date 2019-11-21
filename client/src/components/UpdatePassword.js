import React, { Component } from 'react';
import { Alert, Form, FormGroup, Input, Label} from 'reactstrap';
import { connect } from 'react-redux';
import { updatePasswordActions, loadUser } from '../actions/authActions'; 
import { clearErrors } from '../actions/errorActions';
import PropTypes from 'prop-types';

class UpdatePassword extends Component{
    
    constructor(props) {
        super(props);
        this.state =
        {
          id: '' ,
          name: '' ,
          email: '' ,
          password: '',
          message: null,
          err_msg_visibile: false,
          counter: 0
        }
    }

    componentDidMount()
    {
        console.log("Mounting!");
    }
    
    componentDidUpdate(prevProps){
        console.log("componentDidUpdate");
        const { error, isAuthenticated } = this.props;

        if(error !== prevProps.error){
            // Check for update password fail error
            if(error.id === 'UPDATE_PASSWORD_FAIL'){
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

        if(this.props.auth.user && this.state.counter === 0)
        {   
            if(this.state.id === '')
                this.setState({id: this.props.auth.user._id });

            if(this.state.name === '')
                this.setState({name: this.props.auth.user.name });
            
            if(this.state.email === '')
                this.setState({email: this.props.auth.user.email });

            this.setState({ counter: 1});
        }
    }   

    onSubmit = (e) => {
        e.preventDefault();

        const { id, name, email, password } = this.state;

        // Creating new user 
        const newUser = {
            id, 
            name,
            email, 
            password
        };

        // Attempt to register
        this.props.updatePasswordActions(newUser);
    }
    
    onChange = e => {
        console.log("Updating value of " + e.target.name + " which is " + e.target.value);
        this.setState({ [e.target.name]: e.target.value });
      };

    render() {

        const { error } = this.props;

        if(error.id === 'AUTH_ERROR'){
            this.props.history.push('/');
        }

        
        if(this.props.auth.updatedUser){
            console.log("Updated user: " + this.props.auth.updatedUser.user.success);
            this.props.history.push(`/home`);
        }

        
        const { user } = this.props.auth;

        const madhavan_style = {
            marginRight: '90px'
        }

        const vivek_style = {
            marginTop: '40px'
        }

        const namme_style = {
            marginTop : '15px'
        }

        const walao_style = {
            display : 'none'
        }

        const rajini_style = 
        {               
            marginRight: '100px', 
            marginLeft: '100px', 
            marginBottom: '15px', 
            display: 'flex',
            marginTop: '30px'
        }

        const arjuna2_style = 
        {               
            marginTop: '60px'
        }

        const headingStyle = {
            textAlign: 'center'
        }

        return(
            <React.Fragment>
            <Alert id="errorAlert" color="danger" isOpen={ this.state.err_msg_visibile } style={rajini_style}>
            {this.state.msg}
            </Alert>    
            <Alert id="loadingAlert" color="success" isOpen={ this.props.auth.isLoading } style={rajini_style}>
            Loading...
            </Alert>

            <div className="updatePassword">
                <div className="row" style={ arjuna2_style }>
                    <div className="col-md-12">
                        { user ? (
                        <Form onSubmit = {this.onSubmit}>
                        <h5 style={headingStyle}><i>Update User Details</i></h5>
                        <FormGroup>
                        <Label for="id" style={walao_style}>User ID</Label>    
                        <Input 
                            type="text" 
                            name="id" 
                            id = "id"
                            onChange = {this.onChange}
                            style={walao_style}
                            value = { this.state.id }
                            disabled = "disabled"
                            placeholder = "User ID"
                        />
                        <Label for="name" style={namme_style}>Name</Label>    
                        <Input 
                            type="text" 
                            name="name" 
                            id = "name"
                            onChange = {this.onChange}
                            style={madhavan_style}
                            value = { this.state.name }
                            placeholder = "Name"
                        />
                        <Label for="email" style={namme_style}>Email</Label>    
                        <Input 
                            type="email" 
                            name="email"
                            id = "email"
                            style={madhavan_style}
                            onChange = {this.onChange}
                            value = { this.state.email }
                            placeholder = "Email Address"
                        />
                        <Label for="password" style={namme_style}>Password</Label>    
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
                            value="Update Details" 
                            className="btn btn-grad"
                        />
                        </FormGroup>
                    </Form>
                    ) : ''}
                    </div>
                </div>
          </div>
          </React.Fragment>
        )
    }
}

UpdatePassword.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    updatePasswordActions: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    loadUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({ 
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    auth: state.auth
});

export default connect(mapStateToProps, { updatePasswordActions, clearErrors, loadUser })(UpdatePassword);