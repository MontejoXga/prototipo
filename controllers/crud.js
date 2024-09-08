import conexion from '../database/db.js'

export const save = (req, res)=>{
    const prod = req.body.producto;
    const obs = req.body.obs;
    conexion.query('INSERT INTO prod SET ?',{nombre:prod, obs:obs},(error,results)=>{
        if (error) {
            console.log(error);
        }else{
            res.redirect('/');
        }
    })
}


export const update = (req, res)=>{
    const id = req.body.id;
    const nombre = req.body.producto;
    const obs = req.body.obs;
    conexion.query('UPDATE prod SET ? WHERE prod_id = ?',[{nombre:nombre, obs:obs}, id], (error,results)=>{
        if (error) {
            console.log(error);
        }else{
            res.redirect('/');
        }
    })

}