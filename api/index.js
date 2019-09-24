const express = require('express');
const path = require('path');
const app = require('./App')

app.use(express.static(path.join(__dirname, '../client/build/')));

const port = process.env.PORT;


app.listen(port, () => {
    console.log('Listening to port ' + port)
});

