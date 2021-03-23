import React from 'react';
 import PropTypes from 'prop-types'
 import { debounce } from 'lodash';
import { Input } from 'antd';
import './serach.css';


const Search = ({onSearch}) => (
            <Input placeholder="Type to search" className='search' size='large' onChange={debounce(onSearch, 2000)} />
        )
Search.defaultProps = {
    onSearch: ()=>{},

}
Search.propTypes = {
    onSearch: PropTypes.func,
}
export default Search;