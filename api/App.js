const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const bookRouter = require('./routes/book');
const userRouter = require('./routes/user');
const cors = require('cors');
const path = require('path');
const config = require('./DB.js');
const app = express();
process.env.JWT_SECRET = 'mySecret'

mongoose.connect(config.DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log('connection successful'))
    .catch((err) => console.error(err));

const port = '3000';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.json());

// app.use('/api/book', bookRouter);
// app.use('/api/users', userRouter);
app.use([userRouter, bookRouter]);

// app.use(express.static(path.join(__dirname, '../build')));


app.listen(port, () => {
    console.log('Listening to port ' + port)
});


