import React from 'react';
 import PropTypes from 'prop-types'
 import { debounce } from 'lodash';
import { Input } from 'antd';
import './serach.css';


const Search = ({onSearch}) => (
            <Input placeholder="Type to search" className='search' size='large' onChange={debounce(onSearch, 1000)}/>
        )
Search.defaultProps = {
    onSearch: ()=>{},
    // value: ''

}
Search.propTypes = {
    onSearch: PropTypes.func,
    // value: PropTypes.string
}
export default Search;