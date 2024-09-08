import express from 'express'
import router from './router.js'
import {PORT} from './config.js'

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('img'));

app.use('/', router );


app.listen(PORT, () => {
    const host = 'http://localhost'; 
    console.log(`SERVER CORRIENDO en ${host}:${PORT}`);
});
