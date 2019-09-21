const express       = require('express')
const bodyParser    = require('body-parser');
const cors          = require('cors');

const app           = express();
const port          = 3000;

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

const jwt = require('jsonwebtoken');
let secret = 'localhost';

var expressJWT = require('express-jwt');
app.use(expressJWT({ secret: secret})
    .unless(
        { path: [
            '/token/sign',
            '/path1'
        ]}
    ));



app.get('/', (req, res) => {
    res.json("Hello World");
});

app.get('/path1', (req, res) => {
    res.status(200)
        .json({
            "success": true,
            "msg": "Hello World"
        });
});

/* CREATE TOKEN FOR USE */
app.get('/token/sign', (req, res) => {
    var userData = {
        "name": "Muhammad Bilal",
        "id": "4321"
    }
    let token = jwt.sign(userData, secret, { expiresIn: '15s'})
    res.status(200).json({"token": token});
});

/* VERIFY TOKEN */
app.get('/token/verify', (req, res) => {
    //GET TOKEN FROM HEADER
    let token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, secret, (err, data) => {
        if (err) {
            res.status(401)
                .json({
                    "error": true,
                    "message": "Fuck You Bitch"
                });
            return;
        }

        res.status(200)
            .json({
                "success": true,
                "message": "Welcom to the NOOB Oracle"
            });
    });

});

/* LISTEN */
app.listen(port, function() {
    console.log("Listening to " + port);
});