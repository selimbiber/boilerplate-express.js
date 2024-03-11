const bodyParser = require('body-parser');
let express = require('express');
let app = express();
require('dotenv').config();

// console.log('Hello World');

// app.get('/', (req, res) => {
//     res.send('Hello Express');
// });

app.use('/public', express.static(
    __dirname + '/public'
));

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.get('/', (req, res) => {
    res.sendFile(absolutePath = __dirname + '/views/index.html');
});

// app.get('/json', (req, res) => {
//     res.json({"message": "Hello json"});
// });

app.get('/json', (req, res) => {
    if (process.env['MESSAGE_STYLE'] === 'uppercase') {
        return res.json({"message": "HELLO JSON"});
    }
    return res.json({"message": "Hello json"});
});

app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({'time': req.time});
});

app.get('/:word/echo', (req, res) => {
    res.json({ echo: req.params.word });
});

app.get('/name', (req, res) => {
    res.json({ name: req.query.first + ' ' + req.query.last });
});

app.post('/name', (req, res) => {
    res.json({ name: req.body.first + ' ' + req.body.last });
});

 module.exports = app;
