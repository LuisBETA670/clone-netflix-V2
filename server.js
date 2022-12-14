const express = require('express')
const netflixroutes = require('./routes/netfl')
const cors = require('cors')

class Server {
   constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.paths = {
        netfl:"/api/v1/clonenetflix" //ruta
        
    }

    this.middlewares()
    this.routes()
   }

   routes(){ 
   
     this.app.use(this.paths.netfl, netflixroutes )

   }

   middlewares(){
    this.app.use(cors())
    this.app.use(express.json())
   }

   listen(){
    this.app.listen(this.port, () => {
        console.log('servidor corriendo en el puerto', process.env.PORT)
    })
   }
}
module.exports=Server