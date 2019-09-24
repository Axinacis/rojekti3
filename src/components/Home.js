import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";

class Home extends Component {

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('http://localhost:4000/api/book')
            .then(res => {
                console.log('Home');
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    this.props.history.push("/login");
                }
            });
    }

    logout = () => {
        localStorage.removeItem('jwtToken');
        window.location.reload();
    };


    render() {
        return (
            <div class="container">
                <div class="panel panel-default">
                    <h1>KOTISIVU</h1>
                    <div className="panel-body">
                        {localStorage.getItem('jwtToken') &&
                        <button className="btn btn-primary" onClick={this.logout}>Logout</button>
                        }
                        <div>
                            <p>Liibalaaba diipadaapa news updatet tänne joo</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
