const WatchItem = require('../models/watchItem');

const getWatchItemSymbols = async () => {
    // fetch all watchlist docs from MongoDb
    const watchItems = await WatchItem.find({})

    // we need to filter on symbol only..
    const watchSymbols = watchItems.map(item => item.symbol);

    return watchSymbols;
} 

const deleteWatchItem = async (symbol) => {
    // deleting the symbol from MongoDb
    await WatchItem.deleteOne({ symbol: symbol });
}
const saveWatchItem = async (symbol) => {
    
    // add symbol to watch list
    const item = new WatchItem({
        symbol: symbol,
        dateCreated: Date.now()
    })

    // insert into mongoDb
    await item.save();
}

module.exports = {
    getWatchItemSymbols,
    deleteWatchItem,
    saveWatchItem
}