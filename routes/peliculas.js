const{Router} = require("express")
const { addpeliculas, deletepeliculasID } = require("../controllers/peliculas")
const router = Router()

router.post("/", addpeliculas)
router.delete("/id/:id", deletepeliculasID)

module.exports = router