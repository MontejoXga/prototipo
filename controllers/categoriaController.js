import { resolveInclude } from "ejs";
import conexion from "../database/db.js";

export const listado = (req, res)=>{
    conexion.query('SELECT * FROM `categoria` ',(error, results)=>{
        if (error) {
            throw error;
        } else {
            res.render('CategoriaIndex.ejs',{results:results});
        }
    })
}


function validar(categoria){
    return new Promise((resolve,reject)=>{
        conexion.query("SELECT * FROM `categoria` WHERE categoria=?",[categoria],(error,results)=>{
            if (error) {
                return reject(error)
            } else {
                let existencia = results.length>0
                return resolve(existencia)
            }
        })
    })
}

export const dataUpdate = (req, res)=>{
    const id = req.params.cat_id
    conexion.query('SELECT * FROM categoria WHERE id_cat =?',[id],(error,results)=>{
        if (error) {
            throw error
        } else {
            res.render('CategoriaEdit.ejs',{categoria:results[0]})
        }
    })
}


export const save = (req, res)=>{
    const categoria = req.body.categoria
    const abreviatura = req.body.abreviatura
    const descripcion = req.body.descripcion

    const isEmpty = (value)=>{
        return value === undefined || value === null || value.trim() === ''
    }

    if(isEmpty(categoria) || isEmpty(abreviatura) || isEmpty(descripcion)){
        return res.json({
            error:"Los campos deben estar llenos y no vacios."
        })
    }else{
        validar(categoria).then(duplicado=>{
            if (duplicado) {
                res.json({
                    error:"La categoria ya existe"
                })
            } else {
                conexion.query('INSERT INTO categoria SET ?',{categoria:categoria, descr_cate:descripcion, abre_cate:abreviatura},(error,results)=>{
                    if (error) {
                        console.log(error)
                        res.json({
                            error:"Hubo un problema al guardar en la base de dato!!!"
                        })
                    } else {
                        res.json({
                            success:"Categoria agregada correctamente"
                        })
                    }
                })
            }
        })
        .catch(error=>{
            console.log(error)
            res.json({error:"Ocurrio un error inesperado"})
        })
    }
}


export const update = (req,res)=>{
    const id = req.body.id;
    const categoria = req.body.categoria
    const abreviatura = req.body.abreviatura
    const descripcion = req.body.descripcion
    const isEmpty = (value) => {
        return value === undefined || value === null || value.trim() === '';
    }
    if (isEmpty(categoria)||isEmpty(abreviatura)||isEmpty(descripcion)) {
        return res.json({ error: "Los campos no pueden estar vacíos." });
    }else{
        validar(categoria)
            .then(duplicado => {
                if (duplicado) {
                    conexion.query('SELECT * FROM categoria WHERE id_cat = ? AND categoria =? ', [id, categoria], (error, results) => {
                        if (error) {
                            return res.json({ success: "Hubo un problema al guardar en la base de datos!"});
                        } 
                        if (results.length == 1 ) {
    
                            conexion.query('UPDATE categoria SET ? WHERE id_cat = ?',[{categoria:categoria, descr_cate:abreviatura, abre_cate:descripcion}, id], (error,results)=>{
                                if (error) {
                                    console.log(error);
                                    res.json({ error: "Hubo un problema al guardar en la base de datos!"});
                                } else {
                                    res.json({ success: "La categoria se edito exitosamente!"});
                                }
                            })
                        } else {
                            return res.json({ error: "La categoria ya existe ya existe!"});
                        }
                    });               
                    
                } else {
                    conexion.query('UPDATE categoria SET ? WHERE id_cat = ?',[{categoria:categoria, descr_cate:abreviatura, abre_cate:descripcion}, id], (error,results)=>{
                        if (error) {
                            console.log(error);
                            res.json({ error: "Hubo un problema al guardar en la base de datos!" });
                        } else {
                            res.json({ success: "El producto se edito exitosamente!"});
                        }
                    })
                }
    
            }).catch(error=>{
                console.log(error);
                res.json({ error: "Ocurrió un error inesperado!"});
            })
    }
}


export const Eliminar = (req,res)=>{
    const id = req.params.cat_id;
    conexion.query('DELETE FROM categoria WHERE id_cat = ?',[id],(error,results)=>{
        if (error) {
            return res.json({error: "Ocurrio un error en la base de datos!!"})
        }else{
            return res.json({success: "La categoria se elimino correctamente"})
            //res.redirect('/');
        }
    })
}