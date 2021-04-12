import React from 'react';
import PropTypes from 'prop-types';
import Card from "../card";
import Spinner from "../spinner";
import './cartd-list.css';





const CardList = ({filmsData, getLessText, onRatedMovies, guestId, getRatedData, isLoading}) => {
    if(filmsData === null) {
        return null;
    }
    const elements = filmsData.map((el) => (
                    <Card title={el.title}
                        description={el.overview}
                        date={el.release_date}
                        getLessText={getLessText}
                        genres={el.genre_ids}
                        key={el.id}
                        id={el.id}
                        poster={el.poster_path}
                        voteAverage={el.vote_average}
                        onRatedMovies={onRatedMovies}
                        rate={el.rating}
                        guestId={guestId}
                        filmsData={filmsData}
                        getRatedData={getRatedData}

                    />
                ))

    return (
            <div className='container'>
                { isLoading === true ? <Spinner/> : elements}
            </div>

    )

}
CardList.defaultProps = {
    filmsData: [],
    getLessText: ()=>{},
    onRatedMovies: ()=>{},
    guestId: '',
    getRatedData: ()=>{},

    isLoading: true
}
CardList.propTypes = {
    filmsData: PropTypes.arrayOf(Object),
    getLessText: PropTypes.func,
    onRatedMovies: PropTypes.func,
    guestId: PropTypes.string,
    getRatedData: PropTypes.func,
    isLoading: PropTypes.bool
}
export default CardList;