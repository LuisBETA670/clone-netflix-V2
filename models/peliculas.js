const modelspeliculas= {
    queryAddpeliculas: "INSERT INTO peliculas (Nombre_P,Genero ) VALUES (?, ?)",
    querydeletepeliculasID: `UPDATE peliculas SET ESTATUS = 'N' WHERE ID = ?`,


}