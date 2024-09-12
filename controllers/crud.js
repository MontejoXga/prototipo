import conexion from '../database/db.js'



export const listado = (req, res)=>{
    conexion.query('SELECT * FROM `prod`',(error,results)=>{
        if (error) {
            throw error;
        }else{
            res.render('index',{results:results});
        }
    })
}

function validar(prod,id){

    return new Promise((resolve,reject)=>{

        conexion.query('SELECT * FROM prod WHERE nombre =?',[prod],(error,results)=>{
            if (error) {
                return reject(error);
            }else{
                let existencia = results.length > 0
                return resolve(existencia)
            }
        })

    })

}

export const dataUpdate = (req,res)=>{
    const id = req.params.prod_id
    conexion.query('SELECT * FROM prod WHERE prod_id  = ?',[id],(error,results)=>{
        if (error) {
            throw error;
        }else{
            res.render('edit',{prod:results[0]});
        }
    })
}

export const Eliminar = (req,res)=>{
    const id = req.params.prod_id;
    console.log(id)
    conexion.query('DELETE FROM prod WHERE prod_id = ?',[id],(error,results)=>{
        if (error) {
            return res.json({error: "Ocurrio un error en la base de datos!!"})
        }else{
            return res.json({success: "El producto se elimino correctamente"})
            //res.redirect('/');
        }
    })
}

export const save = (req, res)=>{
    
    const prod = req.body.producto;
    const obs = req.body.obs;
    const isEmpty = (value) => {
        return value === undefined || value === null || value.trim() === '';
    }
    if (isEmpty(prod)||isEmpty(obs)) {
        return res.json({ error: "Los campos producto y observaciones no pueden estar vacíos." });
    }else{
        validar(prod)
            .then(duplicado=>{
                if (duplicado) {
                    res.json({
                        error:"El producto ya existe",
                        nombre: prod,
                        obs: obs
                    })
                } else {
                    conexion.query('INSERT INTO prod SET ?', { nombre: prod, obs: obs }, (error, results) => {
                        if (error) {
                            console.log(error);
                            res.json({ error: "Hubo un problema al guardar en la base de datos!", nombre: prod, obs: obs });
                        } else {
                            res.json({ success: "Producto guardado exitosamente!", nombre: "", obs: "" });
                        }
                    });
                }
            })
            .catch(error=>{
                console.log(error);
                res.json({ error: "Ocurrió un error inesperado!", nombre: prod, obs: obs });
            })
    }
}

export const update = (req, res)=>{
    const id = req.body.id;
    const prod = req.body.producto;
    const obs = req.body.obs;
    const isEmpty = (value) => {
        return value === undefined || value === null || value.trim() === '';
    }
    if (isEmpty(prod)||isEmpty(obs)) {
        return res.json({ error: "Los campos id, producto y observaciones no pueden estar vacíos." });
    }else{
        validar(prod,id)
            .then(duplicado => {
                if (duplicado) {
                    conexion.query('SELECT * FROM prod WHERE prod_id = ? AND nombre =? ', [id, prod], (error, results) => {
                        if (error) {
                            return res.json({ success: "Hubo un problema al guardar en la base de datos!", nombre: prod, obs: obs });
                        } 
                        console.log(results.length)
                        if (results.length == 1 ) {
    
                            conexion.query('UPDATE prod SET ? WHERE prod_id = ?',[{nombre:prod, obs:obs}, id], (error,results)=>{
                                if (error) {
                                    console.log(error);
                                    res.json({ error: "Hubo un problema al guardar en la base de datos!", nombre: prod, obs: obs });
                                } else {
                                    res.json({ success: "El producto se edito exitosamente!", nombre: "", obs: "" });
                                }
                            })
                        } else {
                            return res.json({ error: "El producto ya existe!", nombre: prod, obs: obs });
                        }
                    });               
                    
                } else {
                    conexion.query('UPDATE prod SET ? WHERE prod_id = ?',[{nombre:prod, obs:obs}, id], (error,results)=>{
                        if (error) {
                            console.log(error);
                            res.json({ error: "Hubo un problema al guardar en la base de datos!", nombre: prod, obs: obs });
                        } else {
                            res.json({ success: "El producto se edito exitosamente!", nombre: "", obs: "" });
                        }
                    })
                }
    
            }).catch(error=>{
                console.log(error);
                res.json({ error: "Ocurrió un error inesperado!", nombre: prod, obs: obs });
            })
    }


}