import conexion from "../database/db.js";

export const listado = (req,res)=>{
    conexion.query('SELECT * FROM proveedor',(error,results)=>{
        if (error) {
            throw error
        } else {
            res.render('ProveedorIndex.ejs',{results:results})
        }
    })
}

function validar(proveedor){
    return new Promise((resolve,reject)=>{
        conexion.query("SELECT * FROM `proveedor` WHERE proveedor=?",[proveedor],(error,results)=>{
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
    const id = req.params.id_prod
    conexion.query('SELECT * FROM proveedor WHERE id_prod =?',[id],(error,results)=>{
        if (error) {
            throw error
        } else {
            res.render('ProveedorEdit.ejs',{proveedor:results[0]})
        }
    })
}

export const save = (req, res)=>{
    const proveedor = req.body.proveedor
    const ruc = req.body.ruc
    console.log(proveedor)
    console.log(ruc)


    const isEmpty = (value)=>{
        return value === undefined || value === null || value.trim() === ''
    }

    if(isEmpty(proveedor) || isEmpty(ruc) ){
        return res.json({
            error:"Los campos deben estar llenos y no vacios."
        })
    }else{
        validar(proveedor).then(duplicado=>{
            if (duplicado) {
                res.json({
                    error:"El proveedor ya existe"
                })
            } else {
                conexion.query('INSERT INTO proveedor SET ?',{proveedor:proveedor, ruc:ruc},(error,results)=>{
                    if (error) {
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
    const proveedor = req.body.proveedor
    const ruc = req.body.ruc

    const isEmpty = (value) => {
        return value === undefined || value === null || value.trim() === '';
    }
    if (isEmpty(proveedor)||isEmpty(ruc)) {
        return res.json({ error: "Los campos no pueden estar vacíos." });
    }else{
        validar(proveedor)
            .then(duplicado => {
                if (duplicado) {
                    conexion.query('SELECT * FROM proveedor WHERE id_prod = ? AND proveedor =? ', [id, proveedor], (error, results) => {
                        if (error) {
                            return res.json({ success: "Hubo un problema al guardar en la base de datos!"});
                        } 
                        if (results.length == 1 ) {
    
                            conexion.query('UPDATE proveedor SET ? WHERE id_prod = ?',[{proveedor:proveedor, ruc:ruc}, id], (error,results)=>{
                                if (error) {
                                    console.log(error);
                                    res.json({ error: "Hubo un problema al guardar en la base de datos!"});
                                } else {
                                    res.json({ success: "El proveedor se edito exitosamente!"});
                                }
                            })
                        } else {
                            return res.json({ error: "El proveedor ya existe ya existe!"});
                        }
                    });               
                    
                } else {
                    conexion.query('UPDATE proveedor SET ? WHERE id_prod = ?',[{proveedor:proveedor, ruc:ruc}, id], (error,results)=>{
                        if (error) {
                            console.log(error);
                            res.json({ error: "Hubo un problema al guardar en la base de datos!" });
                        } else {
                            res.json({ success: "El proveedor se edito exitosamente!"});
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
    const id = req.params.id_prod;
    console.log(id)
    conexion.query('DELETE FROM proveedor WHERE id_prod = ?',[id],(error,results)=>{
        if (error) {
            return res.json({error: "Ocurrio un error en la base de datos!!"})
        }else{
            return res.json({success: "El proveedor se elimino correctamente"})
            //res.redirect('/');
        }
    })
}