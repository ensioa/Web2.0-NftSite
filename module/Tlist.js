const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { getNowTime } = require('../config/keys')

//Create Schema
const TlistSchema = new Schema({

    phone: {  //用户登陆手机号
        type: String,
        required: true
    },
    money: {
        type: Number,  //数额
        required: true
    },
    date: {
        type: String //提交时间
    },
    code: {
        type: Number, //当前状态
        default: 0   //默认为0   1为审核通过 
    },
    img:{
        type:String
    }
})
module.exports = Tlist = mongoose.model("Tlist", TlistSchema);