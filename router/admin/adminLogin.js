const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
    console.log(1111)
    const username = req.body.username
    const password = req.body.password
    if (username === 'admin' && password === '123') {
        res.json({
            status: 1,
            message: "成功"
        })
    } else {
        res.json({
            status: 0,
            message: '失败'
        })
    }

})

module.exports = router