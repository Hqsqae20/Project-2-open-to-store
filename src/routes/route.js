const express = require('express');
const router = express.Router();
const Controllers= require("../controller/mainController")


router.post("/createCollege", Controllers.createCollege  )
router.post("/createIntern",Controllers.createIntern)
router.get("/getCollegeDetails",Controllers.getCollegeDetails)



module.exports=router;