import React from 'react';
import PropTypes from 'prop-types';
import { Pagination }  from 'antd';
import './main-pagination.css';

const MainPagination = ({onChangePage, page}) => (
        <Pagination onChange={onChangePage} defaultCurrent={1} total={100} className='pagination' current={page}/>
    )

MainPagination.defaultProps = {
    onChangePage: ()=>{},
    page: 1
}
MainPagination.propTypes = {
    onChangePage: PropTypes.func,
    page: PropTypes.number
}
export default MainPagination;
    