const{ response, request } = require("express")
const bcryptjs = require("bcryptjs")
const pool = require("../db/connection")
const modelsnetfl = require("../models/netfl")


const addCuenta = async (req = request, res = response) => {
    // console.log( req.body)
    // res.json({msg: req.body})
    const {Nombre, Usuario, Contrasena, Activo} = req.body//URI params
    if(!Nombre || !Usuario || !Contrasena || !Activo){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }

    const salt = bcryptjs.genSaltSync()
    const cc = bcryptjs.hashSync(Contrasena, salt)
    let conn;
    try {
        conn = await pool.getConnection()//Realizamos la conexión
        //generamos la consulta
        const [ConsulCuenta] = await conn.query(modelsnetfl.queryConsulCuenta,[Usuario])
        
        if(ConsulCuenta){
            res.status(400).json({msg: `El usuario '${Usuario}' ya se encuentra registrado`})
            return
        }
                 //generamos la consulta
                    const result = await conn.query(modelsnetfl.queryAddCuenta,
                        [Nombre,
                        Usuario, 
                        Contrasena, 
                        Activo
                    ], (error) => {if(error) throw error})
                        console.log(result.affectedRows)
                    if (result.affectedRows === 0) {//En caso de no haber resgistros lo informamos
                    res.status(404).json({msg: `No se pudo agregar el usuarios con el Nombre ${Nombre}`})
                    return
                    }
                    res.json({msg:`Se agregó satisfactoriamente el usuario con Nombre ${Nombre}`})//Se manda la lista de usuarios
    }catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }

}

const deleteCuenta = async (req = request, res = response) =>{
    const {id} = req.params
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const result = await conn.query(modelsnetfl.queryDeleteCuenta, [id], (error) => {if (error) throw error})
        console.log(result.affectedRows)

        if(result.affectedRows === 0){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: `NO existen usuarios registrados con el ID ${id}`})
            return
        }

        res.json({msg:`Se elemino el usuario con el ID ${id}`})
    }catch (error){

        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }


}

const updateCuenta = async (req = request, res = response) => {
    //const {id} = req.params
    const {Nombre,
        Usuario, 
        Contrasena, 
        Activo} = req.body//URI params

    if(!Nombre || !Usuario || ! Contrasena || ! Activo){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }
    let conn;
    try {
        conn = await pool.getConnection()//Realizamos la conexión

        const [userexist] = await conn.query(modelsnetfl.queryUserExists,[Nombre])
        
                 //generamos la consulta
                 if(!userexist){ res.json({msg:`El usuario'${Nombre}' no existe`})
                    return
                }

                    const result = await conn.query(`UPDATE usuarios SET 
                    Nombre = '${Nombre}',
                    Usuarios = '${Usuario}',
                    Contrasena = '${Contrasena}',
                    Activo = '${Activo}'
                    WHERE Nombre = '${Nombre}'`, (error) => {if (error) throw error})
                    
                    if (result.affectedRows === 0) {//En caso de no haber resgistros lo informamos
                        res.status(404).json({msg: `No se pudo actualizar el usuario`})
                        return
                        }
   
                    res.json({msg:`Se actualizo satisfactoriamente el usuario '${Nombre}'`})//Se manda la lista de usuarios
                 
               
    }catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }

}



module.exports = {addCuenta, deleteCuenta, updateCuenta }        