import React, {Component} from 'react';
import axios from "axios";
// const router = require("react-router-dom").BrowserRouter;

class Home extends Component {

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('http://localhost:3000/books')
            .then(res => {
                console.log('Home');
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    this.props.history.push("/login");
                    // router.replace("/login");
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
