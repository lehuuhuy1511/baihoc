
const express = require('express');
const router = express.Router();

// Định nghĩa các route
router.get('/', (req, res) => {
    res.send('Hello from the home route!');
});

module.exports = route;


function route(app){

 
    app.get ('/' , ( req ,res)=> {
        res.render('home')
    });
    app.get ('/news' , ( req ,res)=> {
     
        res.send('news')
        });
        app.get('/path', (req, res) => {
            res.send('Hello World');
          });
     
}

