import React from 'react';
import PropTypes from 'prop-types';
import {Tag, Rate } from "antd";
import { format } from 'date-fns'
import classnames from 'classnames'
import './card.css';
import getLessText from "../../utilts/get-less-text";
import genresContext from "../../utilts/context";
import openNotificationWithIcon from "../../utilts/notifications";


const Card = ({ title, date, description, poster, voteAverage, rate, id, getRatedData, genres}) => {
    
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
        try {
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
            }
        }
        catch {
          openNotificationWithIcon('error', 'Rate failed.', 'Rate failed. Try again.');
        }

    }

    const classNameOfRated = classnames('rated-circle',{'bad-rated': voteAverage < 3}, {'so-rated': voteAverage > 3 && voteAverage < 5}, {'normal-rated':voteAverage > 5 && voteAverage < 7}, {'good-rated': voteAverage >= 7 })

    return (
            <div className='card'>
                <img src={`https://image.tmdb.org/t/p/original${poster}`} alt="poster" className='image'/>
                <div className='info'>
                    <div className='title'>{ title }</div>
                    <div className={classNameOfRated}>
                        <span className='rated-text'>{voteAverage}</span>
                    </div>
                    <div className='date'>{formatDate(date) }</div>
                    <genresContext.Consumer>
                        {value => {
                            const filtered = value.filter((el) => genres.some((it) => el.id === it));
                            const genresName = filtered.map((gen) => <Tag className='tag' key={gen.id}>{gen.name}</Tag>);
                            return (
                                <div className='genres'>
                                    {genresName}
                                </div>
                            )
                        }}
                       
                    </genresContext.Consumer>
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
    genres: [],
    poster: '',
    voteAverage: 0,
    rate: 0,
    id: 0,
    getRatedData: ()=>{}
}
Card.propTypes = {
    title: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    genres: PropTypes.arrayOf(Object),
    poster: PropTypes.string,
    voteAverage: PropTypes.number,
    rate: PropTypes.number,
    id: PropTypes.number,
    getRatedData: PropTypes.func
}
export default Card;