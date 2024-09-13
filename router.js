import express from 'express'
import multer from 'multer'
import * as productoConstroller from './controllers/productoController.js'
import * as categeoriaController from './controllers/categoriaController.js'


const upload = multer()
const router = express.Router()

//////////////////////////////////////////////////////////////////////
///////////////////////////URL de productos///////////////////////////
//////////////////////////////////////////////////////////////////////

router.get('/',productoConstroller.listado)
router.get ('/create',(req,res)=>{
    res.render('create');
})
router.get('/edit/:prod_id', productoConstroller.dataUpdate)
router.get('/delete/:prod_id', productoConstroller.Eliminar)

//////////////////rutas de acciones de productos////////////////////

router.post('/save',upload.none(),productoConstroller.save);
router.post('/update',upload.none(),productoConstroller.update);

//////////////////////////////////////////////////////////////////////
///////////////////////////URL de productos///////////////////////////
//////////////////////////////////////////////////////////////////////

router.get('/categoria', categeoriaController.listado)
router.get('/categoria/create',(req,res)=>{
    res.render('CategoriaCreate');
})
router.get('/categoria/edit/:cat_id',categeoriaController.dataUpdate)
router.get('/categoria/delete/:cat_id', categeoriaController.Eliminar)

router.post('/categoria/save',upload.none(),categeoriaController.save)
router.post('/categoria/update',upload.none(),categeoriaController.update)

export default router;