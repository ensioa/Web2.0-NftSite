const express = require("express");
const router = express.Router();
const UserSchema = require("../module/UserSchema")
const FoodSchema = require('../module/FoodSchema')
const tools = require('../config/tools')
const RealNameSchema = require('../module/RealName')
const foodUSchema = require("../module/foodU")
const topUpSchema = require("../module/topUp")
const configSchema = require("../module/configs")
const TlistSchema = require("../module/Tlist")
const odersSchema = require("../module/oders");
const cateGorySchema = require("../module/cateGory");


// wallte页面
router.post("/createT",async(req,res)=>{
    let user = await UserSchema.findOne({phone:req.body.phone})
    let balance = user.balance
    if(balance>=0 && balance>=parseInt(req.body.jine)){
       let result = new TlistSchema({
        phone:req.body.phone,
        money:req.body.jine,
        img:req.body.img,
        date:getNowTime()
    })
    
    
    let all = balance - parseInt(req.body.jine)
    await UserSchema.updateOne({phone:req.body.phone},{balance:all})
    let item = await result.save()
    res.json({
        status:1,
        date:item
    }) 
    }else{
        res.json({
            status:0,
            message:"余额不足"
        })
    }
    
})

// 收款码页面
router.post("/actionImg1", tools.multer().single('SFImg'), async (req, res) => {
    let SFImgs = req.file ? req.file.path.substring(7) : ''
    let username = req.body.username
    let Pay = req.body.Pay
    let id = req.body.id
    // let user = await UserSchema.findOne({ _id: id })
    // let phone = user.phone;
    let obj = {
        Pay,
        username,
        SFImgs
    }
   
    await UserSchema.updateOne({ _id: id }, { isCollectionCode: true ,CollectionCode:obj})
    res.json({
        status: 1,
        message: "已提交审核"
    })
})


router.get("/opi", async (req, res) => {
    console.log('/opi', 12)
    await UserSchema.updateOne({ phone: "13109100555" }, { foodList: [] })
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
// wallet 页面
router.post("/topUp",async(req,res)=>{

    let obj = {
        phone:req.body.phone,
        money:req.body.yue,
        date:getNowTime(),
    }

    let result = new topUpSchema(obj)
    let item = await result.save()
        res.json({
            status: 1,
            data: item
    })
})

router.post("/editUFood",async(req,res)=>{
    await foodUSchema.deleteOne({foodId:req.body.id})
    let user = await UserSchema.findOne({phone:req.body.user})
    let foodList = user.foodList
    for(var i = 0 ; i <foodList.length;i++){
        if(foodList[i].foodId == req.body.id){
            foodList[i].code = 0
        }
    }
    await UserSchema.updateOne({phone:req.body.user},{foodList:foodList})
    
    res.json({
        status:1,
        message:"完成"
    })
})

//buyUserFood
router.post('/buyUserFood',async(req,res)=>{
    let foodId = req.body.foodId  // 商品编号
    let user1 = req.body.user1  //卖家
    let food_Id = req.body.food_Id //二次商品id
    let user2 = req.body.user2 //买家
    let user1Info = await UserSchema.findOne({phone:user1})
    let user2Info = await UserSchema.findOne({phone:user2})
    let user1foodList = user1Info.foodList
    let arr = []
    for(var i = 0 ; i<user1foodList.length;i++){
        if(user1foodList[i].foodId == foodId){
            arr.push(user1foodList[i])
            user1foodList.splice(i,1)
        }
    }
    let fooduFoods = await foodUSchema.findOne({_id:food_Id})
    let showjia = parseInt(fooduFoods.showjia)
    let user2InfoYue = parseInt(user2Info.balance)-showjia
    let user1InfoYue = parseInt(user1Info.balance)+showjia
    await UserSchema.updateOne({phone:user1},{
        balance:user1InfoYue,
        foodList:user1foodList
    })
    
    let user2foodList = user2Info.foodList
    arr[0].code=0
    arr[0].nowPirceNew=showjia
    user2foodList.push(arr[0])
await UserSchema.updateOne({phone:user2},{
         balance:user2InfoYue,
        foodList:user2foodList
    })
   await foodUSchema.deleteOne({_id:food_Id})
   let oder = new odersSchema({
        GmZ1:user2,//购买者
        nowPirceNew:showjia,//购买价格,
        nowNumber:arr[0].nowNumber, //商品编号
        foodId:foodId, //商品码 
        names:arr[0].names, //商品名称
        imgUrl:arr[0].imgUrl, //商品图片
        id:food_Id , //商品信息id
        GmZ2:false,
        SMZ:user1,
        date:getNowTime()
        
    })
   await oder.save()
        res.json({
            status:1,
            message:"成功"
        })
})


//getfood2   Deal>Right 页面
router.post("/getfood2", (req, res) => {
    let phone = req.body.phone
    foodUSchema.find({}).then(arr => {
        if (arr) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].user1 == phone) {
                    arr.splice(i, 1)
                }
            }
            // console.log(`/getfood2 find data is `, arr)
            res.json({
                status: 1,
                data: arr
            })
        }
    })
})

//createFoodU
router.post('/createFoodU', async (req, res) => {

    let userIphone = req.body.obj.user1
    let user = await UserSchema.findOne({ phone: userIphone })
    // console.log(user)
    let foodList = user.foodList

    let foodId = req.body.obj.foodId
    let nowNumber = req.body.obj.nowNumber
    for (var i = 0; i < foodList.length; i++) {
        if (foodList[i].nowNumber == nowNumber && foodList[i].foodId == foodId) {
            foodList[i].code = 1
        }
    }
    await UserSchema.updateOne({ phone: userIphone }, { foodList: foodList })
    let result = new foodUSchema(req.body.obj)
    result.save()
        .then((item) => {
            res.json({
                status: 1,
                data: item
            })
        })
})


// 购买按钮提交 creatOder
router.post("/creatOder", async (req, res) => {
    let foodId = req.body.foodId
    let id = req.body.id
    console.log(`订单的商品_id is>>`, req.body)
    let nowNumber = req.body.nowNumber
    let nowPirceNew = req.body.nowPirceNew   // 修改实际为 stratPrice
    let userIphone = req.body.userIphone
    let names = req.body.names
    let imgUrl = req.body.imgUrl
    // 根据用户 id 查询到用户的其他信息.
    let user = await UserSchema.findOne({ phone: userIphone })
    let foodList = user.foodList ? user.foodList : []
    // 购买减去用户的余额
    let balance = user.balance
    let yue = balance - parseInt(nowPirceNew)

    let obj = {
        foodId,
        id,
        nowNumber,
        nowPirceNew,
        userIphone,
        names,
        imgUrl,
        data: getNowTime(),
        code: 0
    }
    foodList.push(obj)

    try {
        await UserSchema.updateOne({ phone: userIphone }, { foodList: foodList, balance: yue })
    
        // 塞入 classifation 字段
        const buyfoodCate = await FoodSchema.findOne({_id: id}, 'classification')
        console.log(`购买的商品的分类是`, buyfoodCate.classification)
        let oder = new odersSchema({
            GmZ1:userIphone,//购买者
            nowPirceNew:nowPirceNew,//购买价格,
            nowNumber:nowNumber, //商品编号
            foodId:foodId, //商品码 
            names:names, //商品名称
            imgUrl:imgUrl, //商品图片
            id:id , //商品信息id
            GmZ2:true,
            date:getNowTime(),
            Foodclassification: buyfoodCate.classification.name
        })
        await oder.save()
        res.json({
            status: 1,
            message: ""
        })
    } catch (error) {
        console.log(error)
    }

})

router.post("/getUserSFcs", async (req, res) => {
    let sf = await RealNameSchema.findOne({ phone: req.body.phone })
    res.json({
        status: 1,
        data: sf
    })
})

router.post("/getUserInfo", async (req, res) => {
    // console.log(`getUserInfo `, req.body)
    let user = await UserSchema.findOne({ _id: req.body.id })
    // console.log(`getUserInfo 请求找到的数据`, user)
    res.json({
        status: 1,
        data: user
    })
})

// 收到提交以后把 code 改为 0 
router.post("/actionImg", tools.multer().single('SFImg'), async (req, res) => {
    
    let SFImgs = req.file ? req.file.path.substring(7) : ''
    let username = req.body.username
    let card = req.body.card
    let id = req.body.id

    let user = await UserSchema.findOne({ _id: id })
    // 查询是否RealName里面是是否以前提交过一次审核
    let phone = user.phone
    console.log(`actionImg`, user)
    let oldUser = await RealNameSchema.find({phone: phone})
    // console.log(`查询到的数据有,`, oldUser)
    if (oldUser.length > 0) {
        await RealNameSchema.deleteMany({ phone: phone });
    }
    // console.log(`删除过后的数据是`,await RealNameSchema.find({phone: phone}))
    let result = new RealNameSchema({
        phone: phone,
        username: username,
        card: card,
        nowDate: getNowTime(),
        SFImgs: SFImgs,
        code: 0
    })
    await result.save()
    await UserSchema.updateOne({ _id: id }, { RealNameCode: true })
    res.json({
        status: 1,
        message: "已提交审核"
    })
})

// post goods.vue  商品大头页面 
router.post('/getFoodItem', async (req, res) => {
    console.log(`/getFoodItem query is`, req.body)
    try {
        let result = await FoodSchema.findOne({ _id: req.body.goodid })
        // // can be optimizated
        let categoryChartData = await cateGorySchema.findOne({ _id: req.body.categoryId})
        res.json({
            status: 1,
            data: result,
            categoryChartData
        })
    } catch(err) {
        res.json({
            status: 0,
            message: 'getFoodItem error'
        })
    }

})

// POST  "/webApi/register"
// 用户注册

router.post("/register", (req, res) => {
    //phone
    UserSchema.findOne({ phone: req.body.shoujihao })
        .then(item => {
            if (item) {
                res.json({
                    status: 0,
                    message: "当前手机号已注册"
                })
            } else {
                //执行注册
                let result = new UserSchema({
                    phone: req.body.shoujihao,
                    passWord: req.body.password
                })
                result.save()
                    .then(result => {
                        res.json({
                            status: 1,
                            data: result
                        })
                    })
                    .catch(err => {
                        res.json({
                            status: 0,
                            data: err,
                            message: "注册失败"
                        })
                    })
            }
        })
        .catch(err => {
            res.json({
                status: 0,
                data: err,
                message: "注册失败"
            })
        })
})
// POST  "/webApi/login"
// 用户登陆
router.post('/login', (req, res) => {
    UserSchema.findOne({ phone: req.body.shoujihao })
        .then(item => {
            if (item) {
                if (item.passWord == req.body.password) {
                    if(item.isLogin){
                        res.json({
                        status: 1,
                        message: "登陆成功",
                        data: item
                    })
                    }else{
                        res.json({
                        status: 0,
                        message: "账户已冻结"
                    })
                    }
                } else {
                    res.json({
                        status: 0,
                        message: "密码错误"
                    })
                }
            } else {
                res.json({
                    status: 0,
                    message: "账号不存在"
                })
            }
        })
})
// POST  "/webApi/getFoodList"
// 
router.get("/getFoodList", (req, res) => {
    FoodSchema.find({ isShow: true })
        .then(arr => {
            // console.log(`/getfoodlist , foodList>`, arr)
            res.json({
                status: 1,
                data: arr
            })
        })
        .catch(err => {
            res.json({
                status: 0,
                message: err
            })
        })
})


// 首页显示分类列表
router.get("/getAllCategory", async (req, res) => {
    //只显示该分类下有商品的 分类项
    // 拿出商品的分类列表操作.
    try {
        await FoodSchema.aggregate([
            {
                $group: {
                    _id: null,
                    classification: { $addToSet: '$classification'}
                }
            }
        ], function(err, result) {
            if (err) {
                console.log(err)
                res.json({
                    status:0,
                    message: 'getAllcategoryList error'
                })
            } else  {
                // console.log(`================`, result[0].classification)
                const dedupResultArr = result[0].classification || []
                if(dedupResultArr.length === 0) {
                    res.json({
                        status: 0,
                        message: '目前没有任何商品'
                    })
                }
                   console.log(`分类列表`, result)
                cateGorySchema.find({_id: { $in: dedupResultArr } }, function(err, categories) {
                    if (err) {
                        console.log(err)
                        res.json({
                            status:0,
                            message: 'findCateGoryList error '
                        })
                    }
                    console.log(`符合条件的最终分类列表`, categories)
                    res.json({
                        status: 1,
                        data: categories
                    })
                })
            }
    
        })
    } catch(err) {
        console.err(err)
        res.json({
            status: 0,
            message: 'getAllcategory error '
        })
    }
})

// 显示分类页面的 商品列表
router.post("/getCategoryFoodList", async (req, res) => {
    console.log("getCategoryFoodList data is ", req.body)
    let categoryChartData = await cateGorySchema.findOne({ _id: req.body.categoryId})

    FoodSchema.find({ classification: req.body.categoryId})
    .exec((err, doc) => {
        if (err) {
            res.json({
                status: '3',
                message: 'getCategoryFoodList error '
            })
        }
        res.json({
            status:1,
            data: doc,
            categoryChartData
        })
    }) 

})


//获取当前时间
function getNowTime() {
    var date = new Date();
    //年 getFullYear()：四位数字返回年份
    var year = date.getFullYear();  //getFullYear()代替getYear()
    //月 getMonth()：0 ~ 11
    var month = date.getMonth() + 1;
    //日 getDate()：(1 ~ 31)
    var day = date.getDate();
    //时 getHours()：(0 ~ 23)
    var hour = date.getHours();
    //分 getMinutes()： (0 ~ 59)
    var minute = date.getMinutes();
    //秒 getSeconds()：(0 ~ 59)
    var second = date.getSeconds();

    var time = year + '-' + addZero(month) + '-' + addZero(day) + ' ' + addZero(hour) + ':' + addZero(minute) + ':' + addZero(second);
    return time;
}


//小于10的拼接上0字符串
function addZero(s) {
    return s < 10 ? ('0' + s) : s;
}



module.exports = router