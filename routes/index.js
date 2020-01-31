var express = require('express');
var router = express.Router();
const path = require('path');
/* GET search page. */
router.get("/search_data", (req, res)=>{
    res.sendFile(path.join(__dirname, '../views/search.html'))
})
module.exports = router;