import React, { Component } from 'react';
import 'antd/dist/antd.css'
import {Tabs} from 'antd'
import CardList from "../card-list";
import ApiService from "../../utilts/api-service";
import Spinner from "../spinner";
import ErrorMessage from "../error-message";
import MainPagination from "../main-pagination";
import Search from "../search";
import AlertMessage from "../alert-message";
import './movies-app.css';
import instLocalStorage from "../../utilts/inst-loscalStorage";
import genresContext from "../../utilts/context";
import openNotificationWithIcon from "../../utilts/notifications";


class MoviesApp extends Component {

    service = new ApiService();


    state = {
        isLoading: true,
        isError: false,
        currentValue: null,
        pageOnSearch: 1,
        pageOnRated: 1,
        isCookieSendingAgree: instLocalStorage.get('isCookieSendingAgree'),
        guestId: instLocalStorage.get('sessionId'),
        personalData:  [],
        ratedData: [],
        genresData: [],
        totalRated: null,
        totalSearch: null
    }


    componentDidMount() {
        const cookie = this.state.isCookieSendingAgree;
        if(cookie === null) {
            localStorage.clear();
            this.setState(() => ({
                guestId: null,
                isCookieSendingAgree: null
            }))
        }
        const isAgreeCookie = instLocalStorage.get('isCookieSendingAgree') === 'true';
        const guestId = isAgreeCookie ? instLocalStorage.get('sessionId') : '';
        const personalData = isAgreeCookie ? instLocalStorage.get('personalData') : [];
        this.setState({ personalData, guestId, isLoading: false});
        this.getGenres();
        this.handleRatedMovies();
    }

    // получаем жанры
    getGenres = async () =>{
        const genresData = await this.service.getGenres();
        this.setState(() => ({
            genresData: genresData.genres
        }))
    }

    // ошибки
    isError = () => {
        this.setState({
            isError: true
        })
    }


    // поиск
     handleSearch = async (event) => {
        const targetValue = event.target.value.trim();
        this.setState(() =>({
            isLoading: true
        }))
        if(targetValue === '') {
            this.setState(() =>({
                personalData: [],
                currentValue: null,
                isLoading: false
            }))
            return;
        }
        try{
            const data = await this.service.getChangePageOnSearch(1, targetValue);
            this.setState(() => ({
                currentValue: targetValue,
                personalData: data.data,
                pageOnSearch: 1,
                isLoading: false,
                totalSearch: data.totalPage
            }))
            this.addRating();
            if(this.state.totalSearch === 0) {
                openNotificationWithIcon('warning', 'Search failed.', 'The search has not given any results.');
            }
        }
        catch {
            openNotificationWithIcon('error', 'Search failed.', 'Search failed. Try again.');
            this.setState(() => ({
                isLoading: false
            }))
        }



    }

    // меняем state при пагинации
    handleChangePage = async (pageNumber=1) => {
        const targetValue = this.state.currentValue;
        this.setState(() => ({
            isLoading: true
        }))
        const data = await this.service.getChangePageOnSearch(pageNumber, targetValue);
        this.setState(() => ({
            personalData: data.data,
            pageOnSearch: pageNumber,
            currentValue: targetValue,
            isLoading: false,
            totalSearch: data.totalPage
        }))
    }

    // пагинация на странице оцененных фильмов
    handleChangePageOnRated = async (page) => {
        const newData = await this.service.getRatedMovies(page);
        this.setState(() => ({
            ratedData: newData.data,
            pageOnRated: page
        }))
    }

     // сохраняем куки
    handleAgreeSaveCookies = async () => {
      await this.service.handleAgreeSaveCookie();
      this.setState(() => ({
          isCookieSendingAgree: instLocalStorage.get('isCookieSendingAgree')
      }))
    }

    // сохраняем рейтинг
    getSaveRated = (id) => {
        const value = instLocalStorage.get(id);
        this.setState(({personalData}) => {
            const newData = personalData.map((el) => {
                const result = {...el}
                if(!result.rating) {
                    if(result.id === id) {
                        result.rating = value;
                    }
                }
                return result;
            });
            instLocalStorage.set('personalData', newData);

            return {
                personalData: instLocalStorage.get('personalData')
            }
        })
    }

    // eslint-disable-next-line no-unused-vars
    handleRatedMovies = async (key = 'rated') => {     // получааем фильмы оцененные пользователем
        const cookie = this.state.isCookieSendingAgree;
        if(cookie !== null) {
            const newData = await this.service.getRatedMovies(1);
            this.setState(() => ({
                ratedData: newData.data,
                totalRated: newData.totalPage,
                pageOnRated: 1
            }))
        }

    }

    // добавляем фильмы оцененные ползьвателем в общий sate
    addRating = () => {
        const {personalData, ratedData} = this.state;
        const newData = personalData.map((el) => {
            ratedData.map((it) => {
                if(el.id === it.id) {
                    // eslint-disable-next-line no-param-reassign
                    el = {...it};
                }
                return it
            });
            return el
        })
        this.setState(() => ({
            personalData: newData
        }))
    }

    render() {
        const { TabPane } = Tabs;
        const { isError, isLoading} = this.state;


        if(isLoading) return <Spinner />
        if(isError) return <ErrorMessage/>;
        return (
            <div className='list-film'>
                <AlertMessage getAgreeSaveCookies={this.handleAgreeSaveCookies}
                         isCookieSendingAgree={this.state.isCookieSendingAgree}/>
                <genresContext.Provider value={this.state.genresData}>
                    <Tabs centered onTabClick={this.handleRatedMovies}>
                        <TabPane tab='Search' key='search' className='tab-list'>
                            <Search onSearch={this.handleSearch} value={this.state.currentValue}/>
                            <CardList
                                filmsData={this.state.personalData}
                                guestId={this.state.guestId}
                                getRatedData={this.getSaveRated}
                            />
                            <MainPagination
                                onChangePage={this.handleChangePage}
                                page={this.state.pageOnSearch}
                                filmsData={this.state.personalData}
                                total={this.state.totalSearch}/>
                        </TabPane>
                        <TabPane tab='Rated' key='rated' className='tab-list'>
                            <CardList filmsData={this.state.ratedData}
                                      guestId={this.state.guestId}
                                      getRatedData={this.getSaveRated}
                                      genresData={this.state.genresData}
                            />
                            <MainPagination
                                onChangePage={this.handleChangePageOnRated}
                                page={this.state.pageOnRated}
                                filmsData={this.state.ratedData}
                                total={this.state.totalRated}/>
                        </TabPane>
                    </Tabs>
                </genresContext.Provider>
            </div>

        )
    }
}
export default MoviesApp;