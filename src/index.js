import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'
import './main.css';
import CardList from "./components/card-list";
import ApiService from './api-service';
import Spinner from "./components/spinner";
import ErrorMessage from "./components/errorMessage";
import MainPagination from "./components/on-pagination";
import Search from "./components/search";





class App extends Component {

    service = new ApiService();

    allMovies = new ApiService();

    state = {
        filmsData: [],
        isLoading: true,
        isError: false,
    }


    componentDidMount() {
        this.handleGetMovies();
    }

    handleError = () => {
        this.setState({
            isError: true
        })
    }



    handleGetMovies = async () => {
        try {
            const data = await this.service.getRequest(`https://api.themoviedb.org/3/movie/popular?api_key=0182a56e634228c21690fb3267265463&page=1`);
            const newData = data.results;
            const idData = newData.map((el) => el.id);
            const allMovies = [];
            for(let i = 0; i < idData.length; i++) {
                allMovies.push(this.allMovies.getRequest(`https://api.themoviedb.org/3/movie/${idData[i]}r?api_key=0182a56e634228c21690fb3267265463`));
            }
            const movieData = [...await Promise.all(allMovies)];

            this.setState(() => ({
                filmsData: movieData,
                isLoading: false
            }))
        }
        catch (err) {
            this.handleError(err)
        }

    }

    handleSearch = async (e) => {
        try {
            const data = await this.service.getRequest(`https://api.themoviedb.org/3/search/movie?api_key=0182a56e634228c21690fb3267265463&query=${e.target.value}&page=${1}`);
            const newData = data.results;
            const idData = newData.map((el) => el.id);
            const allMovies = [];
            for(let i = 0; i < idData.length; i++) {
                allMovies.push(this.allMovies.getRequest(`https://api.themoviedb.org/3/movie/${idData[i]}r?api_key=0182a56e634228c21690fb3267265463`));
            }
            const movieData = [...await Promise.all(allMovies)];

            this.setState(() => ({
                filmsData: movieData,
                isLoading: false
            }))
        }
         catch (err) {
          this.handleError(err)
        }

    }

    handleChangePage = async (pageNumber) => {
        const data = await this.service.getRequest(`https://api.themoviedb.org/3/movie/popular?api_key=0182a56e634228c21690fb3267265463&page=${pageNumber}`);
        const newData = data.results;
        const idData = newData.map((el) => el.id);
        const allMovies = [];

        for(let i = 0; i < idData.length; i++) {
            allMovies.push(this.allMovies.getRequest(`https://api.themoviedb.org/3/movie/${idData[i]}r?api_key=0182a56e634228c21690fb3267265463`));
        }
        const movieData = [...await Promise.all(allMovies)];
        this.setState(() => ({
                filmsData: movieData
            }))
    }

    handleGetLessText = (text) => {
        let newString = '';
        if (text.length > 270) {
            newString += `${text.substr(0, 200)  } ...`
        }
        else {
            newString += text;
        }
        return newString;
    }

    render() {

        const { isLoading, isError } = this.state;

        if(isLoading) return <Spinner/>;
        if(isError) return <ErrorMessage/>;

        return (
           <div className='list-film'>
               <Search onSearch={this.handleSearch}/>
                <CardList filmsData={this.state.filmsData}
                          getLessText={this.handleGetLessText}
                          onLoad={this.state.isLoading}/>
                <MainPagination onChangePage={this.handleChangePage}/>
           </div>
        )
   }
}
ReactDOM.render(<App/>, document.querySelector('.wrapper'))


