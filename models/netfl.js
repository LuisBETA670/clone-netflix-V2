const modelsnetfl = {
    queryAddCuenta: "INSERT INTO usuarios(Nombre, Usuarios, Contrasena, Activo) VALUES (?, ?, ? ,?)",
    queryConsulCuenta: "SELECT Usuarios FROM usuarios WHERE Usuarios = ?",
    queryDeleteCuenta: `UPDATE usuarios SET Activo = 'N' WHERE ID = ?`,
    queryGetUsersByID:`SELECT * FROM usuarios WHERE ID = ?`,
    queryUserExists: `SELECT Nombre FROM usuarios WHERE Nombre = ?`,
    querygetverByID: `SELECT * FROM usuarios"`


}

const updateCuenta = (
    Nombre,
    usuario,
    Contrasena,
    Activo

) => {
    return 
`UPDATE usuarios SET
Nombre = '${Nombre}',
Usuario = '${Usuario}',
Contrasena = '${Contrasena}',
Activo = '${Activo}'
WHERE usuario = '${usuario}'`

}

module.exports = modelsnetfl