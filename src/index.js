if(process.NODE_ENV !== 'production'){
    const dotenv = require('dotenv')
    const path = require('path')
    dotenv.config()
}

const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars'); //llama las plantillas creadas en cada ruta para mostrar HTMLs - se configura en settings
const path = require('path');

//Initializations
const app = express();

// Settings
app.set('port',  4000);  //process.env.PORT ||
app.set('views', path.join(__dirname, 'views'));     //Establece donde está la carpeta views que por defecto debería ir en la carpeta ppal pero está dentro de src
                      //__dirname me la direccion del archivo actual
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',     //nombre de la extensión del archivo, NO es el nombre del motor!
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');    //utilizo el nombre que le di al motor en app.engine

// Middlewares
app.use(morgan('dev'));  //esto muestra por consola que estamos recibiendo en el servidor
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// Global Variables
app.use((req, res, next) => {

    next();//toma la info del usuario(req), lo que el servidor quiere responder(res) y una fc para continuar con el resto del código(next)
});

// Database
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

// Routes
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('authors', authorRouter);

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
