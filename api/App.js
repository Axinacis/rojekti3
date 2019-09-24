const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const bookRouter = require('./routes/book');
const userRouter = require('./routes/user');
// const path = require('path');
const app = express();

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log('connection successful'))
    .catch((err) => console.error(err));

const port = normalizePort(process.env.PORT || '3000');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.json());

app.use('/api/book', bookRouter);
app.use('/api/users', userRouter);



app.listen(port, () => {
    console.log('Listening to port ' + port)
});


function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

