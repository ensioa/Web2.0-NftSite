// admin/Api 用户管理路由 

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

//@router  GET  '/admin/Api/text'
// name  测试接口
router.get("/text", (req, res) => {
    console.log(getNowTime())
    res.json({
        status: 1,
        Text: "成功!"
    })
})


//removeS
router.post("/removeS",async(req,res)=>{
let id = req.body.id
await RealNameSchema.deleteOne({_id:id})
res.json({
    status:1,
    message:""
})
})

// get 获取全部分类
router.get("/getCateoptions", async (req, res) => {
    const arr = await CategorySchema.find({})
    res.json({
        status: 1,
        message: "Categories",
        data: arr
    })
})

/**
 * addGoods页面
 */

//addGoods页面, getOdersListoop
router.get("/getOdersListoop",async(req,res)=>{
    let oders = await odersSchema.find({})
    res.json({
        status:1,
        data: oders
    })
})

// addGoods 页面 search post 搜素
router.post('/orderSearchForm', async (req, res) => {
    let GmZ1 = req.body.buyer
    let SMZ = req.body.seller
    let Foodclassification = req.body.Foodclassification
    // 买家手机号, 卖家手机号, 商品分类.
    // console.log(`search 得到的数据`,req.body)

    // const buyerResult = await odersSchema.find({GmZ1: {$reex: buyer, $options: 'i'}})
    const query = {}
    if (GmZ1) {
        query.GmZ1 = {$regex: new RegExp(GmZ1, 'i')}
    }
    if(SMZ) {
        query.SMZ = {$regex: new RegExp(SMZ, 'i')}
    }
    if (Foodclassification) {
        query.Foodclassification = {$regex: new RegExp(Foodclassification, 'i')}
    }
    const result = await odersSchema.find(query)
    console.log(`查询到的数据`, result)
    res.json({
        status: 1,
        data: result
    })
})

router.get('/orderClassificationOptions', async (req, res) => {
    try {
        const arr = await odersSchema.find().select('-_id Foodclassification')
        // 过滤空对象
        // const result = arr.filter(item => item.Foodclassification)
        const uniqueValues = arr.filter(item => item.Foodclassification).reduce((obj, item) => {
            const classification = item.Foodclassification;
            if (!obj[classification]) {
              obj[classification] = item;
            }
            return obj;
          }, {});
        
        res.json({
            status: 1,
            message: "orderClassificationOptions",
            data: uniqueValues
        })
    } catch (err) {
        console.err(err)
        res.json({
            status: 3,
            message: "get OrderClassification error"
        })
    }

})


/**
 * addShop 页面
 */
router.post('/shopSearchForm', async (req, res) => {
    let name = req.body.name;
    let classification = req.body.classification;
    // 买家手机号, 卖家手机号, 商品分类.
    console.log(` shopSearchForm search 得到的数据`,req.body)

    // const buyerResult = await odersSchema.find({GmZ1: {$reex: buyer, $options: 'i'}})
    const query = {}
    if (name) {
        query.name = {$regex: new RegExp(name, 'i')}
    }
    if (classification) {
        query.classification = classification
    }
    try {
        const result = await FoodSchema.find(query)
        console.log(`shopSearchForm 查询到的数据`, result)
        res.json({
            status: 1,
            data: result
        })
    } catch (err) {
        console.log(err)
        res.json({
            status:0,
            meseage: 'search error'
        })
    }

})

//editItemFood
router.post("/editItemFood", (req, res) => {
    console.log(`editItemFood 提交的数据`, req.body)
    let id = req.body.id
    let name = req.body.name
    let quantity = req.body.quantity
    let stratPrice = req.body.stratPrice
    let introduce = req.body.introduce
    //joshua 编辑添加分类
    let classification = req.body.classification
    // console.log(`================================`)
    // console.log(`this classification is`, classification)
    FoodSchema.updateOne({ _id: id }, {
        name,
        quantity,
        stratPrice,
        classification,
        introduce
    }, {new: true})
    .then((doc) => {  // result 是一个promise对象,
        return FoodSchema.findById({_id: id})
    })
    .then((doc) => {
        console.log(`更新后的数据`, doc)
        res.json({
            status: 1,
            message: 'ok',
            data: doc
        })                
    })
    .catch((err) => {
        res.json({
            status: 0,
            message: 'editFood error populate classification',
            error:err
        })
    })
})


//removeUser
router.post("/removeUser",async(req,res)=>{
    let arr = req.body.arr
    for(var i = 0 ; i <arr.length;i++){
       await UserSchema.deleteOne({_id:arr[i].id})
    }
    res.json({
        status:1,
        data:"0"
    })
})

router.post("/removefood",async(req,res)=>{
    let arr = req.body.arr
    console.log(`removefood`, arr)
    try {
        for(var i = 0 ; i< arr.length ; i++){
            await FoodSchema.deleteOne({_id: arr[i].id})
        }
        res.json({
            status:1,
            message: ''
        })
    }catch(error){
        console.log(error)
    }

})

router.post("/removeC",async(req,res)=>{
    await topUpSchema.deleteOne({_id:req.body.id})
    res.json({
        status:1
    })
})
router.post("/removeT",async(req,res)=>{
    await TlistSchema.deleteOne({_id:req.body.id})
    res.json({
        status:1
    })
})

router.get("/getTlist",async(req,res)=>{
    let result =await TlistSchema.find({code:0})
    res.json({
        status:1,
        data:result
    })
})
router.get("/getTlist1",async(req,res)=>{
    let result =await TlistSchema.find({code:1})
    res.json({
        status:1,
        data:result
    })
})
router.post("/TUserMoney",async(req,res)=>{
    let user = req.body.user
    let money = parseInt(user.money)
    let iphone = user.phone 
    let id = user._id
    let userInfo = await UserSchema.findOne({phone:iphone})
    let balance = userInfo.balance
    let all = balance - money
    // await UserSchema.updateOne({phone:iphone},{balance:all})
    await TlistSchema.updateOne({_id:id},{code:1})
    res.json({
        status:1,
        data:''
    })
})

router.post("/CUserMoney",async(req,res)=>{
    let user = req.body.user
    let money = parseInt(user.money)
    let iphone = user.phone 
    let id = user._id
    let userInfo = await UserSchema.findOne({phone:iphone})
    let balance = userInfo.balance
    let all = balance + money
    await UserSchema.updateOne({phone:iphone},{balance:all})
    await topUpSchema.updateOne({_id:id},{code:1})
    res.json({
        status:1,
        data:''
    })
})

router.get("/getClist",async(req,res)=>{
    let result =await topUpSchema.find({code:0})
    res.json({
        status:1,
        data:result
    })
})
router.get("/getClist1",async(req,res)=>{
    let result =await topUpSchema.find({code:1})
    res.json({
        status:1,
        data:result
    })
})

router.get("/getConfig",async(req,res)=>{
let result = await configSchema.find({})
if(result>0){
    res.json({
    status:1,
    data:result[0]
})
}else{
     res.json({
    status:0,
    data:result
})
}
})

//postConfig
router.post("/postConfig",async(req,res)=>{
    let payImage = req.body.payImage
    // console.log(`设置按钮提交的请求 /postconfig`, req)
    let result = await configSchema.find({})
    if(result.length>0){
        await configSchema.updateOne({_id:result[0]._id},{
            payImage:payImage,
            Ltext1:req.body.Ltext1,
            Ltext:req.body.Ltext,
            minT:req.body.minT,
            maxT:req.body.maxT,
            zhu1:req.body.zhu1,
            zhu2:req.body.zhu2,
            zhu3:req.body.zhu3
        })
        res.json({
            status:1,
            data:''
        })
    }else{
        let newitem = new configSchema({
            payImage:payImage,
            Ltext1:req.body.Ltext1,
            Ltext:req.body.Ltext,
            minT:req.body.minT,
            maxT:req.body.maxT,
            zhu1:req.body.zhu1,
            zhu2:req.body.zhu2,
            zhu3:req.body.zhu3
        })
      let sendItem =  await newitem.save()
        res.json({
            status:1,
            data:sendItem
        })
    }
})

router.post("/removeFoods",(req,res)=>{
    res.json({
        status:1,
        message:"暂不支持删除"
    })
})
//SF
router.get("/SF", async(req, res) => {
    let arr = await RealNameSchema.find({ code: 1 })
    res.json({
        status: 1,
        data:arr
    })
})

/**
 * joshua
 * 审核不通过
 */
router.post("/rejectAudit", async (req, res) => {
    
    let item = await RealNameSchema.findOne({ _id: req.body.id })
    console.log(`审核不通过按钮提交的内容.`, item)
    await RealNameSchema.updateOne({ _id: req.body.id }, { code: 2 })
    res.json({
        status: 0,
        message: ""
    })
})



// 审核通过按钮
// getWSf userlist 页面 ,通过按钮 提交信息.
router.post("/shenhe", async (req, res) => {
    await RealNameSchema.updateOne({ _id: req.body.id }, { code: 1 })
    let item = await RealNameSchema.findOne({ _id: req.body.id })
    let phone = item.phone

    await UserSchema.updateOne({ phone: phone }, { isRealName: true })
    res.json({
        status: 1,
        message: ""
    })
})




//getWSf
router.post("/getWSf", async (req, res) => {
    let arr = await RealNameSchema.find()
    // console.log(`用户审核列表`, arr)
    res.json({
        status: 1,
        data: arr
    })
})


// postConfig
router.post("/postConfigs", (req, res) => {
    let add = parseInt(req.body.add)
    let end = parseInt(req.body.end)
    let id = req.body.id
    let space = parseInt(req.body.space)
    let starts = parseInt(req.body.starts)
    //joshua
    let classification = req.body.classification
    let obj = {
        add,
        end,
        space,
        starts
    }
    FoodSchema.updateOne({ _id: id }, {
        config: obj,
        // joshua
        classification: classification
    })
        .then(() => {
            res.json({
                status: 1,
                message: '成功'
            })
        })
})


router.post("/SQShow", (req, res) => {
    console.log(req.body)
    FoodSchema.findOne({ _id: req.body.id })
        .then(item => {
            if (item) {
                let bor = item.SWl
                FoodSchema.updateOne({ _id: req.body.id }, {
                    SWl: !bor
                })
                    .then(() => {
                        res.json({
                            status: 1,
                            message: "成功"
                        })
                    })
            } else {
                res.json(
                    {
                        status: 0,
                        message: "未找到用户"
                    }
                )
            }
        })
})


// editShow
router.post("/editShow", (req, res) => {
    console.log(`/editShow 参数是`, req.body)
    FoodSchema.findOne({ _id: req.body.id })
        .then(item => {
            console.log(`item is`, item)
            if (item) {
                let bor = item.isShow
                FoodSchema.updateOne({ _id: req.body.id }, {
                    isShow: !bor
                })
                    .then(() => {
                        res.json({
                            status: 1,
                            message: "成功"
                        })
                    })
            } else {
                res.json(
                    {
                        status: 0,
                        message: "未找到用户"
                    }
                )
            }
        })
        .catch(err => {
            res.json({
                status: 0,
                message: 'error findOne'
            })
        }) 
})



//postEditPass
router.post("/postEditPass", (req, res) => {
    UserSchema.findOne({ _id: req.body.id })
        .then(user => {
            if (user) {
                UserSchema.updateOne({ _id: req.body.id }, { passWord: req.body.passWord })
                    .then(() => {
                        res.json({
                            status: 1,
                            message: "修改成功"
                        })
                    })
            } else {
                res.json(
                    {
                        status: 0,
                        message: "未找到用户"
                    }
                )
            }
        })
})

//userLogin
router.post("/userLogin", (req, res) => {
    UserSchema.findOne({ _id: req.body.id })
        .then(item => {
            if (item) {
                let bor = item.isLogin
                UserSchema.updateOne({ _id: req.body.id }, {
                    isLogin: !bor
                })
                    .then(() => {
                        res.json({
                            status: 1,
                            message: "成功"
                        })
                    })
            } else {
                res.json(
                    {
                        status: 0,
                        message: "未找到用户"
                    }
                )
            }
        })
})
//userLogin
router.post("/shichangis", (req, res) => {
    UserSchema.findOne({ _id: req.body.id })
        .then(item => {
            if (item) {
                let bor = item.shichang
                UserSchema.updateOne({ _id: req.body.id }, {
                    shichang: !bor
                })
                    .then(() => {
                        res.json({
                            status: 1,
                            message: "成功"
                        })
                    })
            } else {
                res.json(
                    {
                        status: 0,
                        message: "未找到用户"
                    }
                )
            }
        })
})
//userLogin
router.post("/xiadanis", (req, res) => {
    UserSchema.findOne({ _id: req.body.id })
        .then(item => {
            if (item) {
                let bor = item.xiadan
                UserSchema.updateOne({ _id: req.body.id }, {
                    xiadan: !bor
                })
                    .then(() => {
                        res.json({
                            status: 1,
                            message: "成功"
                        })
                    })
            } else {
                res.json(
                    {
                        status: 0,
                        message: "未找到用户"
                    }
                )
            }
        })
})

router.post("/userOut", (req, res) => {
    UserSchema.findOne({ _id: req.body.id })
        .then(item => {
            if (item) {
                let bor = item.isOut
                UserSchema.updateOne({ _id: req.body.id }, {
                    isOut: !bor
                })
                    .then(() => {
                        res.json({
                            status: 1,
                            message: "成功"
                        })
                    })
            } else {
                res.json(
                    {
                        status: 0,
                        message: "未找到用户"
                    }
                )
            }
        })
})

router.post('/postChongZhi', async(req, res) => {
    //balance
    let money = parseInt(req.body.money)
    let user  = await UserSchema.findOne({_id: req.body.id})
    let balance = user.balance
    let zong = balance + money
    UserSchema.updateOne({ _id: req.body.id }, { balance: zong })
        .then(() => {
            res.json({
                status: 1,
                message: "成功"
            })
        })
})
router.post('/postChongjian', async(req, res) => {
    //balance
    let money = parseInt(req.body.money)
    let user  = await UserSchema.findOne({_id: req.body.id})
    let balance = user.balance
    let zong = balance - money
    UserSchema.updateOne({ _id: req.body.id }, { balance: zong })
        .then(() => {
            res.json({
                status: 1,
                message: "成功"
            })
        })
})
//@router  GET  '/admin/Api/getUserCount'
// name shoplist用户管理页面  获取用户数量
router.get("/getUserCount", (req, res) => {
    UserSchema.find({})
        .then((arr) => {
            console.log(`获取用户数量`, arr)
            res.json({
                status: 1,
                count: arr.length
            })
        })
        .catch(err => console.log(err))
})
//@router  GET  '/admin/Api/getUserList'
// name  获取用户列表
router.get("/getUserList", (req, res) => {
    UserSchema.find({}).skip(parseInt(req.query.offset)).limit(parseInt(req.query.limit))
        .then((arr) => {
            res.json(arr)
        })
        .catch(err => console.log(err))
})
//@router  GET  '/admin/Api/getFoodCount'
// name  获取商品数量
router.get("/getFoodCount", (req, res) => {
    FoodSchema.find({})
        .then((arr) => {
            res.json({
                status: 1,
                count: arr.length
            })
        })
        .catch(err => console.log(err))
})
//@router  GET  '/admin/Api/getFoodList'
// name  获取商品列表
router.get("/getFoodList", (req, res) => {
    FoodSchema.find({}).skip(parseInt(req.query.offset)).limit(parseInt(req.query.limit))
        .then((arr) => {
            
            // console.log(`/getFoodList 查到到的商品`, arr)
            res.json(arr)
        })
        .catch(err => console.log(err))
})

//@router  POST  '/admin/Api/postImg'
// name  添加图片
router.post("/postImg", tools.multer().single('focus_zip'), (req, res) => {
    console.log(`有一个添加图片的请求.`, req.body)
    let focus_img = req.file ? req.file.path.substring(7) : ''
    res.send({
        status: 1,
        files: nowAdress + focus_img
    })
})
//@router  POST  '/admin/Api/addFoodItem'
// name  添加商品
router.post("/addFoodItem", (req, res) => {
    const newFood = new FoodSchema({
        name: req.body.name,
        imgUrl: req.body.imgUrl,
        stratPrice: parseInt(req.body.stratPrice),
        classification: req.body.classification,  // Category._id
        introduce: req.body.introduce,
        nowPrice: parseInt(req.body.stratPrice),
        config:{
            starts: parseInt(req.body.stratPrice),
            end: parseInt(req.body.stratPrice) + 5000,
            space: 300,
            add: 0, 
        }
    })
    newFood.save()
        .then((item) => {
            return FoodSchema.findById(item._id)
        })
        .then((doc) => {
            res.json({
                status: 1,
                message: 'Food saved , save data ',
                data: doc
            })
        })
        .catch(err => console.log(err))
})
module.exports = router