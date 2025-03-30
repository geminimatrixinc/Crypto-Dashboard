
const express = require('express');
const { connectToDb } = require('./database/connectionManager')

// create instance of express app
const app = new express();
const watchListModule = require('./modules/watchListModule');

const port = 3000;

// setup middleware

// define routes

// fetch watchlist
app.get('/watchlist', (req, res) => {
    const data = watchListModule.getItems();
    res.send(data);
})

// add to watchlist
app.post('/watchlist', (req, res) => {
    // updated express, uses request.query
    const { symbol } = req.query;
    console.log(JSON.stringify(req.query));

    watchListModule.addItem(symbol);

    // no need to send back message, status 200 is enough
    //res.send();

    res.end()  //terminates our session, and we lose our temp data..we need a database to save data!
})

// ====> let's connect to mongoDb and then start the express web server...

connectToDb().then(() => {
    console.log(`MongoDb connection completed..`)

    // start express server on specific port
    app.listen(port, () => {
        console.log(`Express server started on ${port}`)
    })
})


