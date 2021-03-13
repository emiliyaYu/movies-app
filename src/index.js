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
        currentValue: '',
        page: 1,
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
            const data = await this.service.getMovies();

            const movieData = await this.service.getMoviesById(data);
            this.setState(() => ({
                filmsData: movieData,
                isLoading: false
            }))
        }
        catch {
            this.handleError();
        }

    }

    handleSearch = async (event) => {

        const targetValue = event.target.value;

        const newData = await this.service.getMoviesFromSearch(targetValue);

        this.setState(() => ({
            filmsData: newData,
            currentValue: targetValue,
            page: 1
        }))

    }

    handleChangePage = async (pageNumber) => {
        if(this.state.currentValue === '') {

            this.setState(() => ({
                isLoading: true
            }))

            const data = await this.service.getChangePage(pageNumber);

            this.setState(() => ({
                filmsData: data,
                isLoading: false,
                page: pageNumber
            }))
        }
        if(this.state.currentValue !== '') {
            const targetValue = this.state.currentValue;

            this.setState(() => ({
                isLoading: true,
                page: 1,
                currentValue: targetValue
            }))

            const data = await this.service.getChangePageOnSearch(pageNumber, targetValue);

            this.setState(() => ({
                filmsData: data,
                isLoading: false,
                page: pageNumber,
                currentValue: targetValue
            }))
        }


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

         const { isLoading ,isError } = this.state;

        if(isLoading) return <Spinner />
        if(isError) return <ErrorMessage/>;
        return (
           <div className='list-film'>
               <Search onSearch={this.handleSearch}/>
                <CardList filmsData={this.state.filmsData}
                          getLessText={this.handleGetLessText}
                          onLoad={this.state.isLoading}/>
                <MainPagination onChangePage={this.handleChangePage} page={this.state.page}/>
           </div>
        )
   }
}
ReactDOM.render(<App/>, document.querySelector('.wrapper'))


