import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './login.css';
// const router = require("react-router-dom").BrowserRouter;

class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            message: ''
        };
    }
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { email, password } = this.state;

        axios.post('http://localhost:3000/users/login', { email, password })
            .then((result) => {
                localStorage.setItem('jwtToken', ( 'Bearer ' + result.data.token));
                console.log(result.data)
                console.log(result.data.token)
                console.log(localStorage.getItem('jwtToken'))
                this.setState({ message: 'Logged in' });
                this.props.history.push('/')
                // router.replace("/");
            })
            .catch((error) => {
                if(error.response.status === 401) {
                    this.setState({ message: 'Login failed. Username or password not match' });
                }
            });
    }

    render() {
        const { email, password, message } = this.state;
        return (
            <div class="container">
                <form class="form-signin" onSubmit={this.onSubmit}>
                    {message !== '' &&
                    <div class="alert alert-warning alert-dismissible" role="alert">
                        { message }
                    </div>
                    }
                    <h2 class="form-signin-heading">Please sign in</h2>

                    <label for="inputEmail" class="sr-only">Email address</label>
                    <input type="email" class="form-control" placeholder="Email address" name="email" value={email} onChange={this.onChange} required/>

                    <label for="inputPassword" class="sr-only">Password</label>
                    <input type="password" class="form-control" placeholder="Password" name="password" value={password} onChange={this.onChange} required/>

                    <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
                    <p>
                        Not a member? <Link to="/register"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Register here</Link>
                    </p>
                </form>
            </div>
        );
    }
}

export default Login;
