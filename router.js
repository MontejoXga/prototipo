import express from 'express'
import conexion from './database/db.js'

const router = express.Router()

router.get('/',(req,res)=>{
    
    
    conexion.query('SELECT * FROM `prod`',(error,results)=>{
        if (error) {
            throw error;
        }else{
            res.render('index',{results:results});
        }
    })
    
})


//RUTA PARA CREAR PRODUCTO

router.get ('/create',(req,res)=>{
    res.render('create');
})

//RUTA PARA EDITAR REGISTRO
router.get('/edit/:prod_id',(req,res)=>{
    const id = req.params.prod_id
    conexion.query('SELECT * FROM prod WHERE prod_id  = ?',[id],(error,results)=>{
        if (error) {
            throw error;
        }else{
            res.render('edit',{prod:results[0]});
        }
    })


})
//RUTA PARA ELIMINAR EL REGISTRO//
router.get('/delete/:prod_id', (req, res)=>{
    const id = req.params.prod_id;
    conexion.query('DELETE FROM prod WHERE prod_id = ?',[id],(error,results)=>{
        if (error) {
            throw error;
        }else{
            res.redirect('/');
        }
    })
})


import * as crud from './controllers/crud.js'
router.post('/save',crud.save);
router.post('/update',crud.update);



export default router;