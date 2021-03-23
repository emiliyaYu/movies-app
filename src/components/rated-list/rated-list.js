import React from 'react';
import PropTypes from 'prop-types';
import Card from "../card/card";


const RatedList = ({filmsData, getLessText, guestId, rated}) => {
    const elements = filmsData.map((el) => <Card title={el.title}
                     description={el.overview}
                     date={el.release_date}
                     getLessText={getLessText}
                     genres={el.genres}
                     key={el.id}
                     id={el.id}
                     poster={el.poster_path}
                     voteAverage={el.vote_average}
                     rate={el.rate}
                     guestId={guestId}
                     filmsData={filmsData}
                     rated={rated}/>)
    return (
        <div className='container'>
            {elements}
        </div>
    )
}
RatedList.defaultProps = {
    filmsData: [],
    getLessText: ()=>{},
    guestId: '',
    rated: ()=>{}
}
RatedList.propTypes = {
    filmsData: PropTypes.arrayOf(Object),
    getLessText: PropTypes.func,
    guestId: PropTypes.string,
    rated: PropTypes.func
}
export default RatedList;