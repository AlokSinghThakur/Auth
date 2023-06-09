require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

const USER_ROUTE = require('./routes')

app.use('/user',USER_ROUTE)

const models = require('./models');
models.db_config
    .sync({
        // force: true,
        // alter: true,
    })
    .then(() => {
        console.log(`Connected to Database!`);
    })
    .catch(err => {
        console.log('Could not connect to the database. Exiting now...', err)
        process.exit()
    });


app.listen(6000, () => {
    console.log('Server is running on http://localhost:6000')
})