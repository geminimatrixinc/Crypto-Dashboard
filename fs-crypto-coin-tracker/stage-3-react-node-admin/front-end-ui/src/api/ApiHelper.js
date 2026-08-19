
const serverUrl = 'http://localhost:3007';

const getCryptoCoins = async () => {

   return await fetch(`${serverUrl}/cryptocoins`);
}

const getWatchList = async () => {
    return await fetch(`${serverUrl}/watchlist`);
}
const addWatchItem = async(symbol) => {
    // POST
    const url = `${serverUrl}/watchlist?symbol=${symbol}`

    const response = fetch(url, {
        method: 'POST'
    })

    return response;
}

const removeWatchItem = async(symbol)  => {
    // DELETE
    const url = `${serverUrl}/watchlist?symbol=${symbol}`

    const response = fetch(url, {
        method: 'DELETE'
    })

    return response;
}


module.exports = {
    addWatchItem,
    getCryptoCoins,
    getWatchList,
    removeWatchItem
}