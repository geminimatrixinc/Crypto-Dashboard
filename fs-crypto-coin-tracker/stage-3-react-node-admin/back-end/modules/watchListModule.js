
const { getWatchItemSymbols, deleteWatchItem, saveWatchItem } = require('./mongooseModule')
const { getCryptoCoins } = require('./cryptoCoinModule');


const addItem = async (symbol) => {

    try {

        if (!symbol) {
            console.log(`symbol is not valid.`)
        }

        console.log(`item ${symbol} added to watch list`);

        await saveWatchItem(symbol);
      
    }
    catch (err) {
        console.log(`error adding item : ${err}`)
    }
}

const removeItem = async(symbol) => {

    try {
        if (!symbol) {
            console.log(`symbol is not valid.`)
        }

        console.log(`item ${symbol} removed from watch list`)

       await deleteWatchItem(symbol);
    }
    catch (err) {
        console.log(`error removing item : ${err}`)
    }
}

const getItems = async () => {

    try {
        console.log(`watch list items fetched..`)

        // move front end logic for filtering coins to server side/backend!!
        const coins = await getCryptoCoins();

        // we need to filter on symbol only..
        const watchSymbols = await getWatchItemSymbols();

        const filteredCoinData = coins.filter(coin => watchSymbols.includes(coin.symbol))

        return filteredCoinData;
    }
    catch (err) {
        console.log(`error fetching items ${err}`)
    }
}

module.exports = {
    addItem,
    removeItem,
    getItems
}