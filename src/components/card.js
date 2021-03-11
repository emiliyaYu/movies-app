import React from 'react';
import PropTypes from 'prop-types';
import {Tag } from "antd";



const Card = ( { title, date, description, getLessText, genres, poster} ) => {

        const genresName = genres.map((el) => <Tag className='tag' key={el.id}>{el.name}</Tag>);

        return (
           <div className='card'>
               <img src={`https://image.tmdb.org/t/p/original${poster}`} alt="poster" className='image'/>
                 <div className='end'>
                    <div className='title'>{ title }</div>
                     <div className='date'>{ date }</div>
                   <div className='genres'>
                        {genresName}
                    </div>
                    <div className='description'>{getLessText(description)}</div>
                </div>
           </div>
         )
}
Card.defaultProps = {
    title: '',
    date: '',
    description: '',
    getLessText: null,
    genres: [],
    poster: ''
}
Card.propTypes = {
    title: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    getLessText: PropTypes.func,
    genres: PropTypes.arrayOf(Object),
    poster: PropTypes.string,
}
export default Card;