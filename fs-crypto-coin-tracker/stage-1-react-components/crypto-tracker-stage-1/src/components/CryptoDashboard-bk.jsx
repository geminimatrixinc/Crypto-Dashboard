
import { useState, useEffect } from 'react';

import SearchPanel from "./SearchPanel";
import CryptoCard from "./CryptoCard";


const coinMarketCapApiKey = 'd828f78d-9d58-4241-91a2-d42ede5c11de';
const coinMarketCapApiUrl = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';

// 1. component mount - useEffect hook
// 2. get data - using fetch api
// 3. set the coin data from market cap api
// 4. handle loading and errors



const CryptoDashboard = () => {

    // default the data to the coin array..
    const [coinData, setCoinData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleSearch = (searchText) => {
        debugger
        if (searchText === "") {
            alert(`Enter a crypto coin to search`)

            // reset the full list
            setFilterData(coinData);

            return;
        }


        // TODO: filter the crypto coin list by searchText
        // use ES6 array method filter.

        // BUG!:
        // 1. fix search text to lower case 
        //2. set object, with .data property, 
        //3. unhook static data and use default data
        const filterCoins = coinData?.filter(coin => coin.name.toLowerCase().includes(searchText.toLowerCase()))

            .sort((a, b) => {
                const aValue = a.quote.USD['price'];
                const bValue = b.quote.USD['price'];
                return bValue - aValue;
            });
            
        debugger

        console.log(filterCoins)
        // set state to filter coins and re-render on update
        setFilterData(filterCoins)
    }


    // component mounted, fire once ===> empty dependency array
    useEffect(() => {
        console.log(`component mounted..`);

        fetchData();

    }, [])


    const fetchData = async () => {
        console.log(`fetch data..`);

        try {
            const response = await fetch(coinMarketCapApiUrl, {
                headers: {
                    'X-CMC_PRO_API_KEY': coinMarketCapApiKey
                },
                params: {
                    start: 1,
                    limit: 10,
                    convert: 'USD',
                },
            });

            // server is 400, 500
            if (!response.ok) {
                throw new Error(`There was an error loading data..`)
            }
            const rawData = await response.json();
            console.log(`coin market data: ${JSON.stringify(rawData)}`)

            // set initial coin data..one fetch for performance
            setCoinData(rawData.data);

            // set working filtered data
            setFilterData(rawData.data)
        }
        catch (error) {
            setError(error)
        }
        finally {
            setIsLoading(false);
        }


    }

    if (isLoading) {
        return <p style={{ textAlign: 'center' }}>Loading....</p>
    }

    if (error) {
        return <p style={{ textAlign: 'center' }}>{error.message}</p>
    }

    return <>
        <div className="app">
            <h1>Crypto Coin Tracker</h1>
            <SearchPanel searchCallback={handleSearch} />
            <div className="crypto-container">
                {
                    filterData?.map((currentCoin) => {
                        return <CryptoCard  {...currentCoin} />
                    })
                }

            </div>
        </div>
    </>
}

export default CryptoDashboard;