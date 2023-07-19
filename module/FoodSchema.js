const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { getNowTime } = require('../config/keys')

//Create Schema
const FoodSchema = new Schema({
    id:{
        type: String 
    },
    name: {  // 商品名称
        type: String,
        required: true
    },
    imgUrl: {
        type: String,  // 图片地址
        required: true
    },
    // 修改 joshua
    classification: {
        type: Schema.Types.ObjectId, 
        ref: 'CateGory',
        required: true
    },
    stratPrice: {
        type: Number, // 起价
        required: true
    },
    quantity: {
        type: Number, // 数量
    },
    introduce: {
        type: String, // 介绍
        required: true
    },
    nowPrice: {
        type: Array,
        default: [] // 存储了价格图标的30个价格
    },
    config: {   // 浮动配置
        type: Object,
        default: {
            starts: 10000,
            end: 15000,
            space: 300,
            add: 0,    // 0为默认  1为增加  2 为减少
        }
    },
    isShow: { // 是否显示
        type: Boolean,
        default: true
    },
    userSell: {   // 用户出售
        type: Array,
        default: []
    },
    date: {
        type: String, // 上传时间
        default: getNowTime()
    },
    SWl:{
        type: Boolean,
        default: true
    }
})




FoodSchema.pre(/^find/, function(next) {
    this.populate({
        path: "classification",
        select: "name _id"
    })
    next()
})

// FoodSchema.post(/^update/, function(next) {
//     //每次更新之后查找一次,
//     let _id = this.getQuery();
//     console.log('upload 222:', this.getQuery(), this.getUpdate());
//     FoodSchema.findOne({_id})
//     next()
// })


module.exports = Food = mongoose.model("Food", FoodSchema);