
const express = require("express");
const router = express.Router();
const { getNowTime } = require("../../config/keys")  //获取当前时间方法封装
const UserSchema = require("../../module/UserSchema")
const FoodSchema = require("../../module/FoodSchema")
const tools = require('../../config/tools')
const { nowAdress } = require('../../config/keys')
const RealNameSchema = require("../../module/RealName")
const configSchema = require("../../module/configs")
const topUpSchema = require("../../module/topUp")
const TlistSchema = require("../../module/Tlist")
const odersSchema = require("../../module/oders")
const CategorySchema = require("../../module/cateGory")

/**
 * joshua***
 * 商品分类页面
 */

//  GET  '/admin/Api/getCateCount'  获取分类数量
router.get("/getCateCount", (req, res) => {
    CategorySchema.find({})
        .then((arr) => {
            res.json({
                status: 1,
                count: arr.length
            })
        })
        .catch(err => console.log(err))
})



// Post '/admin/Api/addCategory' 提交一个分类
router.post("/addCategory", async (req, res) => {
    console.log(`/addCategory`, req.body)
    let name = req.body.name;
    let imgUrl = req.body.imgUrl;
    // 判断是否已经有了. 分类不可重名
    const categoryItem = await CategorySchema.findOne({name: name})
    if (categoryItem) {
        res.json({
            status: 0,
            message: '分类已经存在'
        })
    } else {
        console.log(`/addCategory, 进入创建选项`)
        try {
            const newCategoryItem = await CategorySchema.create({name, imgUrl})
            // console.log(`数据存储完了, 返回给后端数据是`, newCategoryItem)
            res.json({
                status: 1,
                data: newCategoryItem
            })
        } catch (err) {
            err => console.log(err)
        }
    }
})

//@router  GET  '/admin/Api/getFoodList' 获取分类列表信息
router.get("/getCateList", (req, res) => {
    // console.log("/getCateList path is", req.originalUrl)
    CategorySchema.find({}).skip(parseInt(req.query.offset)).limit(parseInt(req.query.limit))
        .then((arr) => {
            // console.log(`/getCateList 查到的分类`, arr)
            res.json(arr)
        })
        .catch(err => console.log(err))
})

// POST '/admin/Api/removeCate' 删除选择的分类
router.post("/removeCate", async (req, res)=>{
    let arr = req.body.arr
    for(var i = 0 ; i < arr.length ; i++){
        await CategorySchema.deleteOne({ _id: arr[i].id })
    }
    res.json({
        status: 1,
        message: "删除成功"
    })
})


// POST '/admin/Api/editCateItem' 分类页面编辑按钮表单提交的
router.post("/editCateItem", (req, res) => {

    let id = req.body.id
    let name = req.body.name
    // let nowPrice = req.body.nowPrice
    let imgUrl = req.body.imgUrl
    console.log(`form2 表单 拿到的数据是`, req.body)
    CategorySchema.updateOne({ _id: id }, {
        name,
        imgUrl
    }, {new: true})
    .then((doc) => {
        console.log(`第一次链 doc is`, doc)
        return CategorySchema.findById({_id: id})
    })
    .then((doc) => {
        console.log(`第二次链的 doc is`, doc)
        res.json({
            status: 1,
            data: doc
        })
    })
    .catch(err => console.log(err))
})




module.exports = router