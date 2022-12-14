const{ response, request } = require("express")
const bcryptjs = require("bcryptjs")
const pool = require("../db/connection")
const modelspeliculas = require("../models/peliculas")


const addpeliculas = async (req = request, res = response) => {
    const 
        {Nombre_P,
        Genero, 
        Categoria, 
        Fecha_estreno, 
        Activo
    } = req.body//URI params

    if(!Nombre_P || !Genero){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }

   
    let conn;
    try {
        conn = await pool.getConnection()//Realizamos la conexión
        //generamos la consulta
        const [userExist] = await conn.query(modelspeliculas.queryUserExists,[Nombre_P])
        
        if(userExist){
            res.status(400).json({msg: `La pelicula '${Nombre_P}' ya se encuentra registrado`})
            return
        }
                 //generamos la consulta
                    const result = await conn.query(modelspeliculas.queryAddpeliculas,
                        [ Nombre_P,
                            Genero, 
                            Categoria, 
                            Fecha_estreno, 
                            Activo
                        ], (error) => {if(error) throw error})
                        console.log(result.affectedRows)
                    if (result.affectedRows === 0) {//En caso de no haber resgistros lo informamos
                    res.status(404).json({msg: `No se pudo agregar la pelicula con el Nombre '${Nombre_P}' `})
                    return
                    }
                    res.json({msg:`Se agregó satisfactoriamente la pelicula '${Nombre_P}' `})//Se manda la lista de usuarios
    }catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }

}

const deletepeliculasID = async (req = request, res = response) =>{
    const {id} = req.params
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const result = await conn.query(modelspeliculas.queryDeletepeliculasID, [id], (error) => {if (error) throw error})
        console.log(result.affectedRows)

        if(result.affectedRows === 0){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: `NO existen peliculas registradas con el ID ${id}`})
            return
        }

        res.json({msg:`Se elemino la pelicula con el ID ${id}`})
    }catch (error){

        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }


}




module.exports = {addpeliculas,deletepeliculasID}