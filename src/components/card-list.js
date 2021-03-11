import React from 'react';
import PropTypes from 'prop-types';
import Card from "./card";


const CardList = ({filmsData, getLessText}) => {

    const elements = filmsData.map((el) => (
                <Card title={el.title}
                description={el.overview}
                date={el.release_date}
                getLessText={getLessText}
                genres={el.genres}
                key={el.id}
                poster={el.poster_path}/>
            ))
    return (
        <div className='container'>
            {elements}
        </div>

    )

}
CardList.defaultProps = {
    filmsData: [],
    getLessText: null
}
CardList.propTypes = {
    filmsData: PropTypes.arrayOf,
    getLessText: PropTypes.func
}
export default CardList;