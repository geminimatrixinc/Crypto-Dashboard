
const { coinMarketCapApiKey, coinMarketCapApiUrl } = require('./configModule');
const { getWatchItemSymbols } = require('./mongooseModule')

const getCryptoCoins = async () => {

    console.log(`fetching data from coinmarketcap`)

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

        if (!response.ok) {
            throw new Error(`There was an error loading data..`)
        }
        const rawData = await response.json();
        console.log(`coin market data: ${JSON.stringify(rawData)}`)


        // create a data transfer object, containing only the data fields the ui needs!
        const dtoData = rawData.data.map((coin) => {
                    return {
                        id: coin.id,
                        symbol: coin.symbol,
                        name: coin.name,
                        price: coin.quote?.USD.price,
                        marketCap: coin.quote?.USD.market_cap,
                        volume24h: coin.quote?.USD.volume_24h,
                        change24h: coin.quote?.USD.percent_change_24h
                    }
             })

        // we need to filter on symbol only..
        const watchSymbols = await getWatchItemSymbols();

        // iterate over the dto data and dynamically toggle isWatched

        const watchedDtoData = dtoData.map(coin => ({
            // spread out the object properties
            ...coin,
            // dynamic set the iswatched field, if coin symbol is in watch list
            isWatched: watchSymbols.includes(coin.symbol)
        }))

        return watchedDtoData;
    }
    catch (ex) {
        console.error(ex)
    }
}

module.exports = {
    getCryptoCoins
}