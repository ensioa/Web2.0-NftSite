const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { getNowTime } = require('../config/keys')

//Create Schema
const configSchema = new Schema({

    payImage: {  // 支付二维码
        type: String
    },
    maxT: {
        type: Number,  // 最大提现数
    },
    minT: {
        type: Number // 最小提现数
    },
    Ltext: {
        type: String, // 首页轮播
    },
    Ltext1: {
        type: String, // 第二页轮播
    },
    date: {
        type: String
    },
    zhu1:{
        type:String
    },
    zhu2:{
        type:String
    },
    zhu3:{
        type:String
    }
})
module.exports = config = mongoose.model("config", configSchema);