const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { getNowTime } = require('../config/keys')

//Create Schema
const odersSchema = new Schema({
    id: {
        type: String // 当前订单 id
    },
    GmZ1: {  // 购买者
        type: String
    },
    nowPirceNew: {
        type: Number,  // 购买价格
        required: true
    },
    nowNumber: {
        type: String // 商品编号
    },
    foodId: {
        type: String
    },
    Foodclassification: {
        type: String
    },
    names: {
        type: String,  // 商品渠道
    },
    imgUrl: {
        type: String //商品图片
    },
    GmZ2: {
        type: Boolean
    },
    date: {
        type: String
    },
    SMZ: {  // 卖家
        type: String
    },
})




module.exports = oders = mongoose.model("oders", odersSchema);