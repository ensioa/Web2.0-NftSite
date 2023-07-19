const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require('express-session')  //引入session
const cookieparser = require('cookie-parser')
const cors = require('cors')
const app = express();
const FoodSchema = require("./module/FoodSchema")
const CateGorySchema = require("./module/cateGory")

//修改限制大小


// 配置session中间件
app.use(session({
    secret: 'this is session',//服务器端生成session的签名；
    name: 'Fortis',//修改session对应的cookie的名称；
    resave: false,//强行保存session 即使他没有变化；
    saveUninitialized: true,//强制将未初始化的session存储；
    cookie: {
        maxAge: 1000 * 60 * 30,
        secure: false //true 表示只有https协议才能访问cookie
    },
    rolling: true //在每次请求时强行设置 cookie 这将重置cookie的过期时间（默认false）
}))

//配置ejs模板引擎
app.set('view engine', 'ejs')

app.use(express.static('static'))

// //配置项--开始
app.use(cors({
    // "origin": ["http://localhost:8002", "http://localhost:8080", "http://localhost:8081", "http://localhost:8082"],
    // credentials: true
    // "origin": "*",
    "origin": true,
    credentials: true
}))




// {
// "origin": "*",//此处也可以更替为，允许的指定域名，例如：yousite.com  // *表示接受任意域名的请求
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//         "preflightContinue": false,
//             "optionsSuccessStatus": 200
// }



//引入router
const admin = require("./router/admin")
const adminLogin = require("./router/admin/adminLogin")
const webApi = require("./router/webApi");
const cateGory = require("./module/cateGory");

//DB config
const db = require("./config/keys").mongoUrl;


//配置 bodyparser 中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));



//连接数据库
mongoose.connect(db)
    .then(() => console.log("MongoDB Conneted"))
    .catch(err => console.log(err));



//使用 router
app.use("/admin/Api", admin)
app.use("/admin/adminLogin", adminLogin)
app.use("/webApi", webApi)

/*
app.get("/test/computePrice", (req, res) => {
    function ComputeCategoryPrice() { 
        FoodSchema.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "classification",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $unwind: '$category'
            },
            {
                $group: {
                    _id: "$classification",
                    nowPrice: {$push: "$nowPrice"}
                }
            },
    
        ], function(err, result) {
    
            const promises = result.map(item => {
                const newPriceArr = item.nowPrice.reduce((acc, curr) => {
                    curr.forEach((num, i) => {
                    acc[i] = (acc[i] || 0) + num;
                    })
                    return acc
                }, [])
                
                item.nowPrice = newPriceArr
                return CateGorySchema.findByIdAndUpdate({_id: item._id}, {nowPrice: item.nowPrice}, {new: true})
            })
    
            Promise.all(promises)
            .then((docs) => {
            // 在这里处理所有更新操作的结果
            res.json({
                docs
            })
            })
            .catch((err) => {
            // 在这里处理错误
            console.log(err);
            });
        })
    }
    ComputeCategoryPrice()
})
*/

function ComputeCategoryPrice() { 
    FoodSchema.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: "classification",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $unwind: '$category'
        },
        {
            $group: {
                _id: "$classification",
                nowPrice: {$push: "$nowPrice"}
            }
        },

    ], function(err, result) {

        const promises = result.map(item => {
            const newPriceArr = item.nowPrice.reduce((acc, curr) => {
                curr.forEach((num, i) => {
                acc[i] = (acc[i] || 0) + num;
                })
                return acc
            }, [])
            
            item.nowPrice = newPriceArr
            return CateGorySchema.findByIdAndUpdate({_id: item._id}, {nowPrice: item.nowPrice}, {new: true})
        })

        Promise.all(promises)
        .then((docs) => {
        // 在这里处理所有更新操作的结果
        // res.json({
        //     docs
        // })
        })
        .catch((err) => {
        // 在这里处理错误
        console.log(err);
        });
    })
}
// 启动价格波动
setInterval(function async() {
    FoodSchema.find({})
        .then(async (arr) => {

            for (var i = 0; i < arr.length; i++) {
                let nowPrice = arr[i].nowPrice //最新价格数组

                if (nowPrice.length == 30) {
                    nowPrice.shift()
                }
                let config = arr[i].config
                let space = config.space //间隔价
                let add = config.add //执行方法
                let nows = nowPrice[nowPrice.length - 1]
                let min = config.starts
                let max = config.end

                if (add == 0) {
                    //正常
                    var randNum = Math.floor(Math.random() * 10) + 1;
                    if (randNum == 1 || randNum == 3 || randNum == 5 || randNum == 7 || randNum == 9) {
                        let numl = parseInt(nows) - parseInt(space)
                        if (numl < min) {
                            numl = parseInt(nows) + parseInt(space)
                        }
                        nowPrice.push(numl)
                    } else {
                        let numl = parseInt(nows) + parseInt(space)
                        if (numl > max) {
                            numl = parseInt(nows) - parseInt(space)
                        }
                        nowPrice.push(numl)
                    }
                } else if (add == 1) {
                    //加价
                    var randNum = Math.floor(Math.random() * 10) + 1;
                    if (randNum == 1 || randNum == 9) {
                        let numl = parseInt(nows) - parseInt(space)
                        if (numl < min) {
                            numl = parseInt(nows) + parseInt(space)
                        }
                        nowPrice.push(numl)
                    } else {
                        let numl = parseInt(nows) + parseInt(space)
                        if (numl > max) {
                            numl = parseInt(nows) - parseInt(space)
                        }
                        nowPrice.push(numl)
                    }

                } else {
                    //减价
                    var randNum = Math.floor(Math.random() * 10) + 1;
                    if (randNum == 1 || randNum == 3 || randNum == 5 || randNum == 7 || randNum == 9 || randNum == 0 || randNum == 2 || randNum == 4) {
                        let numl = parseInt(nows) - parseInt(space)
                        if (numl < min) {
                            numl = parseInt(nows) + parseInt(space)
                        }
                        nowPrice.push(numl)
                    } else {
                        let numl = parseInt(nows) + parseInt(space)
                        if (numl > max) {
                            numl = parseInt(nows) - parseInt(space)
                        }
                        nowPrice.push(numl)
                    }
                }
                await FoodSchema.updateOne({ _id: arr[i]._id }, { nowPrice: nowPrice })
            }
        })
        .catch(err => console.log(err))
    
    // CateGorySchema.find({})
    // .then((arr) => {
    //     // const nowCateId = 
    // })

    // 对分类总价格进行计算
    // FoodSchema.find({}) 
    // .then(async (arr) => {
    //     const result = arr.reduce((acc, cur) => {
    //         const categoryId = cur.classification._id
    //         const prices = cur.nowPrice  // Array
    //         if (!acc[categoryId]) {
    //             acc[categoryId] = new Array(prices.length).fill(0);
    //         }
    //         for (let i = 0; i < prices.length; i++) {
    //             acc[categoryId][i] += prices[i]
    //         }
    //         console.log(`当前acc `, acc)
    //         return acc
    //     }, {})
    //     for (const category in result) {
    //         CateGorySchema.findOne({_id: category._id}, (err, doc) => {
    //             if (err) {
    //                 console.error(err)
    //             } else if (!doc) {
    //                 // console.warn('该分类没有发现')
    //             } else {
    //                 doc.nowPrice = result[category];
    //                 doc.save((err) => {
    //                     if (err) {
    //                         console.error('err')
    //                     }
    //                 })
    //             }
    //         })
    //     }
    // })
    ComputeCategoryPrice()
}, 3000)

const prot = process.env.PORT || 8801;

app.get("/", (req, res) => {
    res.send("hello world!")
})
// app.get('/static/:file', function (req, res) {
//   var fileName = req.params.file;
//   var filePath = path.join(__dirname, 'static', fileName);
//   res.sendFile(filePath);
// });


app.listen(prot, () => {
    console.log('server running on prot' + prot)
})
