import React from 'react';
import PropTypes from 'prop-types';
import { Pagination }  from 'antd';

const MainPagination = ({onChangePage}) => (
        <Pagination onChange={onChangePage} defaultCurrent={1} total={100} className='pagination'/>
    )

MainPagination.defaultProps = {
    onChangePage: null,
}
MainPagination.propTypes = {
    onChangePage: PropTypes.func,
}
export default MainPagination;
    