
const express = require('express');
const cors = require('cors');
const { connectToDb } = require('./database/connectionManager')

// create instance of express app
const app = new express();
const watchListModule = require('./modules/watchListModule');
const { getCryptoCoins } = require('./modules/cryptoCoinModule');

const port = 3007;

// setup middleware
app.use(cors());

// define routes

// fetch watchlist
app.get('/watchlist', async(req, res) => {
    const data = await watchListModule.getItems();
    res.send(data);
})

// add to watchlist
app.post('/watchlist', async(req, res) => {
    // updated express, uses request.query
    const { symbol } = req.query;
    console.log(JSON.stringify(req.query));

    await watchListModule.addItem(symbol);

    // no need to send back message, status 200 is enough
    res.send();
})

// delete from watch list
app.delete('/watchlist', async(req, res) => {
    
    const { symbol } = req.query; 

    await watchListModule.removeItem(symbol);

    res.send()
})

// the backend should manage the calls to coinmarketcap external api and deal with CORS!
// not the front end

// fetch crypto coins

app.get('/cryptocoins', async (req, res) => {
    const data = await getCryptoCoins();
    res.send(data);
})



connectToDb().then(() => {
    console.log(`MongoDb connection completed..`)

    // start express server on specific port
    app.listen(port, () => {
        console.log(`CORS-enabled Express server started on ${port}`)
    })
})

