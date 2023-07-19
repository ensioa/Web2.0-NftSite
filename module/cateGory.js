const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { getNowTime } = require('../config/keys')
const FoodModel = require("./FoodSchema")

global.BASEIMGURL = require("../config/keys").nowAdress

//Create Schema
const cateGorySchema = new Schema({
    name:{
        type: String, 
    },
    imgUrl:{
        type: String,
        default: BASEIMGURL + "upload/default/efault_category.jpg"
    },
    id:{
        type: String 
    },
    nowPrice: {
        type: Array,
        default: [] // 价格图标的30个价格
    },
    quantity: {
        type: Number,
        default: 0
    }
})

// cateGorySchema.pre('updateOne', async function(doc, next) {
//     const filter = this.getFilter();
//     const update = this.getUpdate();
//     const oldCategory = await this.model.findOne(filter);
//     const oldCategoryName = oldCategory.name;
//     const categoryId = oldCategory._id;
//     const newCategoryName = update.name;
//     // console.log(`数据更新之前，旧的名称`, oldCategoryName)
//     // console.log(`数据更新之前，我要执行,传入的新的数据是`, update)
//     const FoodS = mongoose.model('Food');

//     await mongoose.model('Food').updateMany(
//         {classification: oldCategoryName},
//         { $set: {classification: newCategoryName}}
//     )
//     next();
// })



module.exports = CateGory = mongoose.model("CateGory", cateGorySchema);