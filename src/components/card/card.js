import React from 'react';
import PropTypes from 'prop-types';
import { Tag , Rate } from "antd";
import { format } from 'date-fns'
import './card.css'


const Card  = ({ title, date, description, getLessText, genres, poster, voteAverage, rate, getRatedData, ratedMovies, id}) =>  {

    const formatDate = (time) => {
            if(time === undefined || time === null || time === '') {
                return 'No date...';
            }

                const year = format(new Date(time), 'yyyy');
                const month = format(new Date(time), 'MMMM');
                const day = format(new Date(time), 'd');
                return `${month} ${day}, ${year}`;

        }

        const handleGetRatedMovie = async (count) => {
            const request = await fetch(`https://api.themoviedb.org/3/movie/${id}/rating?api_key=0182a56e634228c21690fb3267265463&guest_session_id=${JSON.parse(localStorage.getItem('sessionId'))}`, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json;charset=utf-8"
                },
                body: JSON.stringify({"value": count})
            })
            if (request.ok) {
                localStorage.setItem(JSON.stringify(id), JSON.stringify(count));
                getRatedData(id);
                ratedMovies();
            }

        }

        const genresName = genres.map((el) => <Tag className='tag' key={el.id}>{el.name}</Tag>);

        let classNameOfRated ='rated-circle';

        if (voteAverage < 3) classNameOfRated += ' bad-rated';
        if (voteAverage > 3 && voteAverage < 5) classNameOfRated += ' so-rated';
        if(voteAverage > 5 && voteAverage < 7) classNameOfRated += ' normal-rated';
        if(voteAverage >= 7) classNameOfRated += ' good-rated';

        return (
            <div className='card'>
                <img src={`https://image.tmdb.org/t/p/original${poster}`} alt="poster" className='image'/>
                <div className='info'>
                    <div className='title'>{ title }</div>
                    <div className={classNameOfRated}>
                        <span className='rated-text'>{voteAverage}</span>
                    </div>
                    <div className='date'>{formatDate(date) }</div>
                    <div className='genres'>
                        {genresName}
                    </div>
                    <div className='description'>{getLessText(description)}</div>
                    <Rate onChange={handleGetRatedMovie} value={rate} className='rate'/>
                </div>
            </div>
        )
};

Card.defaultProps = {
    title: '',
    date: '',
    description: '',
    getLessText: null,
    genres: [],
    poster: '',
    voteAverage: null,
    ratedMovies: null,
    rate: null,
    id: null,
    getRatedData: null
}
Card.propTypes = {
    title: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    getLessText: PropTypes.func,
    genres: PropTypes.arrayOf(Object),
    poster: PropTypes.string,
    voteAverage: PropTypes.number,
    rate: PropTypes.number,
    id: PropTypes.number,
    getRatedData: PropTypes.func,
    ratedMovies: PropTypes.func
}
export default Card;