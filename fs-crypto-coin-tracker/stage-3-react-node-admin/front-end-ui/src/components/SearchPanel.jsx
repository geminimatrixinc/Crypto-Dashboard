
import { useState } from 'react';

const SearchPanel = (props) => {

    const [searchText, setSearchText] = useState('');

    const handleClick = () => {
        props.searchCallback(searchText) 
    }

    const handleSortTypeChange = (event) => {
        //alert(`sort type change`)
        props.sortTypeCallback(event.target.value)
    }



    const handleKeyDown = (e) => {
        // handle ENTER key ==> keyCode = 13
        if (e.keyCode === 13) {
            // TODO: trigger a search and pass back search text to parent
            props.searchCallback(searchText) 
        }   
    }

    const handleOnChange = (e) => {
        // update search text state
        setSearchText(e.target.value);
    }
    return <>
        <input 
            onKeyDown={handleKeyDown}
            onChange={handleOnChange}
            type="text" 
            placeholder="Search Cryptocurrency" 
            value={searchText}
            />
        <select onChange={handleSortTypeChange}>
            <option value='market_cap'>Market Cap</option>
            <option value='price'>Price</option>
            <option value='volume_24h'>24h Volume</option>
            <option value='percent_change_24h'>24h Change</option>
        </select>
        <button style={{ height: 40, width: 100}} onClick={handleClick}>Search</button>
    </>
}

export default SearchPanel;