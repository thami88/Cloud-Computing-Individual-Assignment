import React, { Component } from 'react';
import axios from 'axios';
export default class Create extends Component {

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
        
       
        const newNews = {
            news_description: this.state.news_description,
            news_date: this.state.news_date
        };

        axios.post('http://localhost:4000/news/add', newNews)
            .then(res => console.log(res.data));

        this.setState({
            news_description: '',
            news_date: '',
            
        })

        this.props.history.push('/');
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New News</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>News Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.news_description}
                                onChange={this.onChangeNewsDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>News Date: </label>
                        <input 
                                type="date" 
                                className="form-control"
                                value={this.state.news_date}
                                onChange={this.onChangeNewsDate}
                                />
                    </div>
                    
                    <div className="form-group">
                        <input type="submit" value="Create News" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}