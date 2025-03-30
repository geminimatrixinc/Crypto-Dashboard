const WatchItem = require('../models/watchItem');

// Add a new item to the watch list
const addItem = async (symbol) => {
    if (!symbol) {
        console.log('Symbol is not valid.');
        return;
    }

    console.log(`Item ${symbol} added to watch list`);

    const item = new WatchItem({
        symbol: symbol,
        dateCreated: new Date()
    });

    try {
        await item.save();
        console.log(`Item ${symbol} saved to MongoDB.`);
    } catch (error) {
        console.error(`Error saving item ${symbol}: ${error.message}`);
    }
};

// Remove an item from the watch list
const removeItem = async (symbol) => {
    if (!symbol) {
        console.log('Symbol is not valid.');
        return;
    }

    try {
        await WatchItem.deleteOne({ symbol: symbol });
        console.log(`Item ${symbol} removed from watch list`);
    } catch (error) {
        console.error(`Error removing item ${symbol}: ${error.message}`);
    }
};

// Get all items from the watch list using aggregate
const getItems = async () => {
    try {
        const items = await WatchItem.aggregate([
            {
                $match: {}
            }
        ]).exec();
        console.log('Watch list items fetched..');
        return items;
    } catch (error) {
        console.error(`Error fetching items: ${error.message}`);
        return [];
    }
};

module.exports = {
    addItem,
    removeItem,
    getItems,
};
