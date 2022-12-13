const {Router} = require("express")
const { addCuenta, deleteCuenta, updateCuenta, } = require("../controllers/netfl")
const router = Router()

router.post("/agregarcuenta",addCuenta)
router.delete("/id/:id", deleteCuenta)

router.put("/", updateCuenta)




module.exports = router