import express from 'express'
import multer from 'multer'
import * as productoConstroller from './controllers/productoController.js'
import * as categeoriaController from './controllers/categoriaController.js'
import * as proveedorController from './controllers/proveedorController.js'

const upload = multer()
const router = express.Router()

//////////////////////////////////////////////////////////////////////
///////////////////////////URL de productos///////////////////////////
//////////////////////////////////////////////////////////////////////

router.get('/',productoConstroller.listado)
router.get ('/create',(req,res)=>{
    res.render('create');
})
router.get('/create/proveedor', productoConstroller.listadoProveedor)
router.get('/create/categoria', productoConstroller.listadoCategoria)

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

//////////////////////////////////////////////////////////////////////
///////////////////////////URL de productos///////////////////////////
//////////////////////////////////////////////////////////////////////

router.get('/proveedor', proveedorController.listado)
router.get('/proveedor/create',(req,res)=>{
    res.render('ProveedorCreate');
})

router.get('/proveedor/edit/:id_prod',proveedorController.dataUpdate)
router.get('/proveedor/delete/:id_prod', proveedorController.Eliminar)

router.post('/proveedor/save',upload.none(),proveedorController.save)
router.post('/proveedor/update',upload.none(),proveedorController.update)

export default router;