const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { getNowTime } = require('../config/keys')

//Create Schema
const RealNameSchema = new Schema({

    phone: {  //用户登陆手机号
        type: String,
        required: true
    },
    username: {
        type: String,  //用户姓名
        required: true
    },
    card: {
        type: String //用户身份证号
    },
    nowDate: {
        type: String, // 提交时间
    },
    code: {
        type: Number, // 当前状态可用吗
        default: 0   // 默认为 0   1为审核通过 可用     2为审核不通过 ，清空  ，3重新审核中
    },
    SFImgs: {
        type: String
    }
})
module.exports = RealName = mongoose.model("RealName", RealNameSchema);