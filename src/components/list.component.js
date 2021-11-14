import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const News = props => (
    <tr>
        <td>{props.news.news_description}</td>
        <td>{props.news.news_date}</td>
        <td>
            <Link to={"/edit/"+props.news._id}>Edit</Link>
        </td>
    </tr>
)

export default class List extends Component {

    constructor(props) {
        super(props);
        this.state = {news: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/news/')
            .then(response => {
                this.setState({ news: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    newsList() {
        return this.state.news.map(function(currentNews, i){
            return <News news={currentNews} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>News List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>News Description</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.newsList() }
                    </tbody>
                </table>
            </div>
        )
    }
}