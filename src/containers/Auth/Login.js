import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
// import { FormattedMessage } from 'react-intl';
import {handleLoginApi} from '../../services/userService';

class Login extends Component {
    constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			isShowPassword: false,
			errorMessage: '',
		}
	}

	handleOnchangeUsername = (event) => {
		this.setState({
			username: event.target.value,
		})
	}

	handleOnchangePassword = (event) => {
		this.setState({
			password: event.target.value,
		})
	}

	handleLogin = async () => {
		this.setState({
			errMessage: ''
		})	
		try {
			let data = await handleLoginApi(this.state.username, this.state.password);
			if (data && data.errCode !== 0) {
				this.setState({
					errMessage: data.message,
				})
			}

			if (data && data.errCode === 0) {
				this.props.userLoginSuccess(data.user)
				console.log('login succeeds!')
			}
		} catch (error) {
			if (error.response) {
				if (error.response.data) {
					this.setState({
						errMessage: error.response.data.message
					})
				}
			}
			console.log('leengoc', error.response);
		}
	}

	handleShowHidePassword = (event) => {
		this.setState({
			isShowPassword : !this.state.isShowPassword,
		})
	}


    render() {
        return (
           <div className='login-backgound'>
				<div className='login-container'>
					<div className='login-content'>
						<div className='col-12 text-login'>Login</div>
						<div className='col-12 form-group login-input'>
							<label>Username:</label>
							<input type='text' 
								className='form-control' 
								placeholder='Enter your username' 
								value={this.state.username}
								onChange={this.handleOnchangeUsername}
							/>
						</div>
						<div className='col-12 form-group login-input'>
							<label>Password:</label>
							<div className='custom-input-password'>
								<input type= {this.state.isShowPassword ? 'text' : 'password' }
								className='form-control' 
								placeholder='Enter your password' 
								value={this.state.password}
								onChange={this.handleOnchangePassword}
								/>
								<span onClick = {this.handleShowHidePassword}>
									<i className={this.state.isShowPassword ? 'fas fa-eye' : 'far fa-eye-slash'}></i>
								</span>
								
							</div>
						</div>

						<div className='col-12' style={{color: "red"}}>
							{this.state.errMessage}
						</div>
						<div className='col-12'>
							<button className='btn-login' onClick={this.handleLogin}>Log in</button>
						</div>
						<div className='col-12'>
							<span className='forgot-password'>Forgot password?</span>
						</div>
						<div className='col-12 text-center mt-3'>
							<span className='text-login-with'>Or sign in with:</span>
						</div>
						<div className='col-12 social-login'>
							<i className="fab fa-google-plus-g google"></i>
							<i className="fab fa-twitter twitter"></i>
							<i className="fab fa-facebook-f facebook"></i>
						</div>

					</div>
				</div>
		   </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
		userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
