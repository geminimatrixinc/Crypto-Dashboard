
import '@fortawesome/fontawesome-free/css/all.min.css';
import { addWatchItem, removeWatchItem } from '../api/ApiHelper';

const CryptoCard = (props) => {
    console.log(`card data ${JSON.stringify(props)}`)

    const handleAddWatchList = async (e) => {
        e.preventDefault();

        if (props.isWatched) {
            await removeWatchItem(props.symbol);
        }
        else {
            await addWatchItem(props.symbol);
        }

        // finally refresh data..
        if (props.refreshData) {
            props.refreshData();
        }
    }
    return <>
        <div className="crypto-card">
            <img 
                src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${props.id}.png`} 
                alt={props.name} 
                width="50" 
                height="50" />
            <h2>{props.name}</h2>
            <p>Current Price: ${props.price.toFixed(2)}</p>
            <p>Market Cap: ${props.marketCap.toLocaleString()}</p>
            <p>24h Volume: ${props.volume24h.toLocaleString()}</p>
            <p>24h Change: {props.change24h.toFixed(2)}%</p>
            
            <button style={{ height: 40, width: 40, borderRadius: "5px", backgroundColor: props.isWatched ? "lightblue" : "" }} 
                    onClick={handleAddWatchList}>
                <i className='fa-solid fa-heart'></i>
            </button>
        </div>
    </>
}

export default CryptoCard;