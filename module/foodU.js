const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { getNowTime } = require('../config/keys')

//Create Schema
const foodUSchema = new Schema({

    showjia: {  //售价
        type: String
    },
    names: {
        type: String  //商品名

    },
    imgUrl: {
        type: String //商品图片
    },
    id: {
        type: String, // 商品id
    },
    foodId: {
        type: String //商品编号
    },
    nowNumber: {
        type: String // 商品数字
    },
    nowPirceNew: {
        type: String  //商品购买价格
    },
    user1: {
        type: String //卖家
    },
    user2: {
        type: String //买家
    },
    code: {
        type: Number,
        default: 0
    }
})
module.exports = foodU = mongoose.model("foodU", foodUSchema);