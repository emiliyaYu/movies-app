import React from 'react';
import PropTypes from 'prop-types';
import { Pagination }  from 'antd';
import './main-pagination.css';

const MainPagination = ({onChangePage, page, total}) => {
    if(total === null || total === 0){
        return null;
    }
    return (
        <Pagination onChange={onChangePage} total={total} className='pagination' current={page}/>
    )
}

MainPagination.defaultProps = {
    onChangePage: ()=>{},
    page: 1,
    // filmsData: [],
    total: null
}
MainPagination.propTypes = {
    onChangePage: PropTypes.func,
    page: PropTypes.number,
    // filmsData: PropTypes.arrayOf(Object),
    total: PropTypes.number
}
export default MainPagination;
    