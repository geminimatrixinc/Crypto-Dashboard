import { useState, useEffect } from 'react';
import CryptoCard from './CryptoCard';
import { getWatchList } from '../api/ApiHelper';

const Watchlist = () => {

    const [watchItems, setWatchItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    // define fetch outside useEffect
    const fetchWatchList = async () => {
        console.log(`watchItems fetched..`);

        try {
            const response = await getWatchList();

            if (!response.ok) {
                throw new Error("There was an error fetching watchlist")
            }

            const rawData = await response.json();

            console.log(`watchlist data ${JSON.stringify(rawData)}`);

            setWatchItems(rawData);

            setIsLoading(false);
        }
        catch (error) {
            console.error(error)
            setError(true);
        }

    }

    // asynchronously fetch watch list, on (Component Mount)
    useEffect(() => {
        fetchWatchList();
    }, []) // empty dependency array, to only fire once on mount


    if (isLoading) {
        return <p style={{ textAlign: 'center' }}>Loading....</p>
    }

    if (error) {
        return <p style={{ textAlign: 'center' }}>{error.message}</p>
    }

    return <>
            <div className="app">
                <h1>WatchList</h1>
                <div className="crypto-container">
                    {
                        watchItems?.map((currentCoin) => {
                            return <CryptoCard  {...currentCoin} refreshData={fetchWatchList}/>
                        })
                    }
                </div>
            </div>
        </>
   
}

export default Watchlist;