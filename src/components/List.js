import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {Router} from 'react-router-dom';
import axios from 'axios';

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: []
        };
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('http://localhost:3000/books')
            .then(res => {
                this.setState({books: res.data});
                console.log(this.state.books);
            })
            .catch((error) => {
                console.log(error.response)
                /*if (error.response.status === 401) {
                    // this.props.history.push("/login");
                    Router.replace("/login");
                }*/
            });
    }

    logout = () => {
        axios.post('http://localhost:3000/users/logout')
            .then(res => {
                localStorage.removeItem('jwtToken');
                window.location.reload();
            })
            .catch((error) => {
                console.log(error)
            });

    };

    render() {
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 className="panel-title">
                            BOOK CATALOG &nbsp;
                            {localStorage.getItem('jwtToken') &&
                            <button className="btn btn-primary" onClick={this.logout}>Logout</button>
                            }
                        </h3>
                    </div>
                    <div class="panel-body">

                        <table class="table table-stripe">
                            <thead>
                                <tr>
                                    <th>ISBN</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.books.map(book =>
                                    <tr>
                                        <td><Link to={`/show/${book._id}`}>{book.isbn}</Link></td>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default List;
