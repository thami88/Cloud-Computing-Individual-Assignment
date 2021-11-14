import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {

    constructor(props) {
        super(props);

        this.onChangeNewsDescription = this.onChangeNewsDescription.bind(this);
        this.onChangeNewsDate = this.onChangeNewsDate.bind(this);
        
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            news_description: '',
            news_date: '',
           
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/news/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    news_description: response.data.news_description,
                    news_date: response.data.news_date,
                   
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeNewsDescription(e) {
        this.setState({
            news_description: e.target.value
        });
    }

    onChangeNewsDate(e) {
        this.setState({
            news_date: e.target.value
        });
    }

   

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            news_description: this.state.news_description,
            news_date: this.state.news_date,
            
        };
        console.log(obj);
        axios.post('http://localhost:4000/news/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3 align="center">Update News</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.news_description}
                                onChange={this.onChangeNewsDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <input 
                                type="date" 
                                className="form-control"
                                value={this.state.news_date}
                                onChange={this.onChangeNewsDate}
                                />
                    </div>
                    <br/>
                    <div className="form-group">
                        <input type="submit" value="Update News" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}