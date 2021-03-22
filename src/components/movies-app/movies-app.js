import React, { Component } from 'react';
import 'antd/dist/antd.css'
import {Tabs} from 'antd'
import CardList from "../card-list";
import ApiService from "../../api-service";
import Spinner from "../spinner";
import ErrorMessage from "../error-message";
import MainPagination from "../main-pagination";
import Search from "../search";
import AlertMessage from "../alert-message";
import RatedList from "../rated-list";
import './movies-app.css';


class MoviesApp extends Component {

    service = new ApiService();

    state = {
        isLoading: true,
        isError: false,
        currentValue: '',
        page: 1,
        isCookieSendingAgree: localStorage.getItem('isCookieSendingAgree'),
        guestId: localStorage.getItem('sessionId'),
        personalData:  [],
        ratedData: []
    }

    instLocalStorage  = {
        set (key, value) {
            window.localStorage.setItem( key, JSON.stringify(value) );
        },
        get (key) {
            try {
                return JSON.parse( window.localStorage.getItem(key) );
            } catch {
                return null;
            }
        }
    }

    componentDidMount() {
        this.handleGetMovies();
        const isAgreeCookie = this.instLocalStorage.get('isCookieSendingAgree') === 'true';
        const guestId = isAgreeCookie ? this.instLocalStorage.get('sessionId') : '';
        const personalData = isAgreeCookie ? this.instLocalStorage.get('personalData') : [];
        const ratedData = isAgreeCookie ? this.instLocalStorage.get('ratedData') : [];
        this.setState({ personalData, guestId, ratedData });
    }

    isError = () => {
        this.setState({
            isError: true
        })
    }

    addRating = (data) => data.map((el) => {
        const result = {...el};
        if(!result.rate) {
            if(result.id) {
                result.rate = this.instLocalStorage.get(result.id);
            }
        }

        return result;
    })

    handleGetMovies = async () => {
        try {
            const data = await this.service.getMovies();

            const movieData = await this.service.getMoviesById(data);
            const ratedData = this.addRating(movieData)
            this.setState(() => ({
                personalData: ratedData,
                isLoading: false
            }))
        }
        catch {
            this.isError();
        }
    }

    handleSearch = async (event) => {
        const targetValue = event.target.value;
        if(targetValue !== '') {
            const newData = await this.service.getMoviesFromSearch(targetValue);
            const ratedData = this.addRating(newData)
            this.setState(() => ({
                personalData: ratedData,
                currentValue: targetValue,
                page: 1
            }))
        }
        if(!targetValue) {
            this.handleGetMovies();
            this.setState(() => ({
                currentValue: targetValue,
            }))
        }
    }

    handleChangePage = async (pageNumber=1) => {
        if(this.state.currentValue === '') {

            this.setState(() => ({
                isLoading: true
            }))

            const data = await this.service.getChangePage(pageNumber);

            const newData = this.addRating(data)
            this.setState(() => ({
                personalData: newData,
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

            const newData = this.addRating(data);

            this.setState(() => ({
                personalData:  newData,
                isLoading: false,
                page: pageNumber,
                currentValue: targetValue
            }))
        }

    }

    handleAgreeSaveCookies = async () => {
        const request = await fetch(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=0182a56e634228c21690fb3267265463`);
        const result = await request.json();
        const sessionId = result.guest_session_id;
        const expires = new Date(result.expires_at).toUTCString();
        localStorage.setItem('isCookieSendingAgree', 'true');
        document.cookie = `sessionId=${sessionId};path=/;expires=${expires}`;
        this.instLocalStorage.set('sessionId', sessionId);
        this.setState(()=>({
            guestId: this.instLocalStorage.get('sessionId'),
            isCookieSendingAgree: this.instLocalStorage.get('isCookieSendingAgree')
        }))

    }
    
    getRatedData = (id) => {
        const value = this.instLocalStorage.get(id);
        this.setState(({personalData}) => {
            const newData = personalData.map((el) => {
                const result = {...el}
                if(!result.rate) {
                    if(result.id === id) {
                        result.rate = value;
                    }
                }
                return result;
            });
            this.instLocalStorage.set('personalData', newData);
            return {
                personalData: this.instLocalStorage.get('personalData')
            }
        })
    }
    
    handleRatedMovies = () => {
        const personalData = this.instLocalStorage.get('personalData');
        const ratedData = personalData.filter((el) => el.rate);
        this.setState({ratedData})
        this.instLocalStorage.set('ratedData', ratedData)

    }

    getLessText = (text) => {
        let newString = '';
        if (text.length > 220) {
            newString += `${text.substr(0, 170)  } ...`
        }
        else {
            newString += text;
        }
        return newString;
    }

    render() {
        const { TabPane } = Tabs;
        const { isLoading ,isError } = this.state;

        if(isLoading) return <Spinner />
        if(isError) return <ErrorMessage/>;
        return (
            <div className='list-film'>
                <AlertMessage getAgreeSaveCookies={this.handleAgreeSaveCookies}
                         isCookieSendingAgree={this.state.isCookieSendingAgree}/>
                <Tabs centered>
                    <TabPane tab='Search' key='1' className='tab-list'>
                        <Search onSearch={this.handleSearch}/>
                        <CardList
                            filmsData={this.state.personalData}
                            guestId={this.state.guestId}
                            getLessText={this.getLessText}
                            onLoad={this.state.isLoading}
                            getRatedData = {this.getRatedData}
                            ratedMovies={this.handleRatedMovies}/>
                        <MainPagination
                            onChangePage={this.handleChangePage}
                            page={this.state.page}/>
                    </TabPane>
                    <TabPane tab='Rated' key='2'>
                        <RatedList filmsData={this.state.ratedData}
                                   guestId={this.state.guestId}
                                   getLessText={this.getLessText}
                                   onLoad={this.state.isLoading}
                                   ratedMovies={this.handleRatedMovies}
                                   getRatedData = {this.getRatedData}/>
                    </TabPane>
                </Tabs>
            </div>

        )
    }
}
export default MoviesApp;