import React from 'react';
import PropTypes from 'prop-types';
import Card from "../card";
import './cartd-list.css';



const CardList = ({filmsData, getLessText, onRatedMovies, guestId, getRatedData, ratedMovies}) => {

    const elements = filmsData.map((el) => (
                <Card title={el.title}
                    description={el.overview}
                    date={el.release_date}
                    getLessText={getLessText}
                    genres={el.genres}
                    key={el.id}
                    id={el.id}
                    poster={el.poster_path}
                    voteAverage={el.vote_average}
                    onRatedMovies={onRatedMovies}
                    rate={el.rate}
                    guestId={guestId}
                    filmsData={filmsData}
                    getRatedData={getRatedData}
                    ratedMovies={ratedMovies}
                />
                ))
    return (
        <div className='container'>
            {elements}
        </div>

    )

}
CardList.defaultProps = {
    filmsData: null,
    getLessText: null,
    onRatedMovies: null,
    guestId: '',
    getRatedData: null,
    ratedMovies: null
}
CardList.propTypes = {
    filmsData: PropTypes.arrayOf(Object),
    getLessText: PropTypes.func,
    onRatedMovies: PropTypes.func,
    guestId: PropTypes.string,
    getRatedData: PropTypes.func,
    ratedMovies: PropTypes.func
}
export default CardList;