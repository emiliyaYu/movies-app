import React from 'react';
import PropTypes from 'prop-types';
import { Pagination }  from 'antd';

const MainPagination = ({onChangePage, page}) => (
        <Pagination onChange={onChangePage} defaultCurrent={1} total={100} className='pagination' current={page}/>
    )

MainPagination.defaultProps = {
    onChangePage: null,
    page: null
}
MainPagination.propTypes = {
    onChangePage: PropTypes.func,
    page: PropTypes.number
}
export default MainPagination;
    