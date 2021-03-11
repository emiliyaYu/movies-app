import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'
import './main.css';
import CardList from "./components/card-list";
import ApiService from './api-service';



class App extends Component {
    service = new ApiService();

    allMovies = new ApiService();

    state = {
        filmsData: [],
    }

    constructor() {
        super();
        this.handleGetMovies();
    }

    handleGetMovies = async () => {
        const data = await this.service.getRequest(`https://api.themoviedb.org/3/movie/popular?api_key=0182a56e634228c21690fb3267265463&page=3`);
        const newData = data.results;
        const idData = newData.map((el) => el.id);
        const allMovies = [];
        for(let i = 0; i < idData.length; i++) {
            allMovies.push(this.allMovies.getRequest(`https://api.themoviedb.org/3/movie/${idData[i]}r?api_key=0182a56e634228c21690fb3267265463`));
        }
        const movieData = [...await Promise.all(allMovies)];

        this.setState(() => ({
                filmsData: movieData,
            }))
    }

    handleGetLessText = (text) => {
        let newString = '';
        if(text.length > 303) {
            newString += `${text.substr(0, 200)  } ...`
        }
        else {
            newString += text;
        }
        return newString;
    }

    render() {
       return (
           <div className='list-film'>
            <CardList filmsData={this.state.filmsData} getLessText={this.handleGetLessText}/>
           </div>
       )
   }
}
ReactDOM.render(<App/>, document.querySelector('.wrapper'))


