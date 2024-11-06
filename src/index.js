const path = require('path');
const express = require('express');
const router = express.Router(); 
const morgan = require('morgan')
const { engine } = require('express-handlebars');
const app = express()


const routes = require('./routes');
app.use('/', routes);
 
app.use(express.static(path.join(__dirname, 'public')));
 
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
app.set('view engine', 'ejs');
console.log('PATH:', path.join(__dirname, 'resources/views'))
 

app.get('/', (req, res) => {
    res.send('Hello World');
  });
  
  // Middleware phải có next()
  app.use((req, res, next) => {
    console.log('Logging request...');
    next(); // Đảm bảo gọi next() để tiếp tục
  });
  
  app.listen(3000, () => {
    console.log('Example app listening at http://localhost:3000');
});