import mysql from 'mysql2'
import {DB_HOST,DB_NAME,DB_PASSWORD,DB_PORT,DB_USER} from '../config.js'

const conexion = mysql.createConnection({
    user : DB_USER,
    password : DB_PASSWORD,
    host: DB_HOST,
    database : DB_NAME,
    port: DB_PORT,

});

conexion.connect((error)=>{
    if (error) {
        console.log('El error de conexion es:'+ error);
        return
    }
    console.log("CONECTADO");
});

export default conexion