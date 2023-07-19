const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { getNowTime } = require('../config/keys')

//Create Schema
const UserSchema = new Schema({

    phone: {  //用户登陆手机号
        type: String,
        required: true
    },
    passWord: {
        type: String,  //密码
        required: true
    },
    balance: {
        type: Number, //余额
        default: 0
    },
    isOut: {
        type: Boolean, // 是否余额冻结,无法提现
        default: false
    },
    isLogin: {
        type: Boolean, //是否可以登陆
        default: true
    },
    isRealName: {
        type: Boolean, //是否已实名
        default: false
    },

    RealName: {   // 实名信息
        type: Object
    },
    RealNameCode: { // 是否正在实名
        type: Boolean,
        default: false
    },
    isCollectionCode: { //是否上传收款码
        type: Boolean,
        default: false
    },
    CollectionCode: { //收款码信息
        type: Object
    },
    date: {
        type: String, //上传时间
        default: getNowTime()
    },
    foodList: {
        type: Array,
        default: []
    },
    shichang:{
        type:Boolean,
        default:true
    },
    xiadan:{
        type:Boolean,
        default:true
    }
})
module.exports = User = mongoose.model("User", UserSchema);