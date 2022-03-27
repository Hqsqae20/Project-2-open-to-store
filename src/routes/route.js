const express = require('express');
const router = express.Router();
const Controllers= require("../controller/mainController")


router.post("/functionup/createCollege", Controllers.createCollege  )
router.post("/functionup/createIntern",Controllers.createIntern)
router.get("/functionup/getCollegeDetails",Controllers.getCollegeDetails)



module.exports=router;