import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './login.css';

class Create extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: ''
        };
    }

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    onSubmit = (e) => {
        e.preventDefault();
        const {name, email, password} = this.state;
        axios.post('http://localhost:4000/api/users/', {name, email, password})
            .then((result) => {
                localStorage.setItem('jwtToken', ( 'Bearer ' + result.data.token));
                this.props.history.push("/")
            });
    };

    render() {
        const {name, email, password} = this.state;
        return (
            <div class="container">
                <form class="form-signin" onSubmit={this.onSubmit}>
                    <h2 class="form-signin-heading">Register</h2>

                    <label htmlFor="inputName" className="sr-only">Name</label>
                    <input type="text" className="form-control" placeholder="Name" name="name" value={name} onChange={this.onChange} required/>

                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input type="email" className="form-control" placeholder="Email address" name="email" value={email} onChange={this.onChange} required/>

                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" className="form-control" placeholder="Password" name="password" value={password} onChange={this.onChange} required/>

                    <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
                </form>
            </div>
        );
    }
}

export default Create;
