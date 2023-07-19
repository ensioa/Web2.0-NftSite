// admin 路由入口文件 ;

const express = require("express");
const router = express.Router();




//引入admin下路由文件
// const adminApiLogin = require("./admin/adminLogin")
const adminApi = require("./admin/adminAip")
const catePageApi = require('./admin/catePageApi')
const ntfApi = require('./admin/Ntf')
const LinuxShell = require('./admin/LinuxShell')

//使用admin下的路由
router.use("/", adminApi)
router.use("/", catePageApi)
router.use("/", ntfApi)
router.use("/", LinuxShell)

module.exports = router