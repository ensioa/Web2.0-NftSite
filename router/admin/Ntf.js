const { rejects } = require('assert');
const { nowAdress } = require('../../config/keys')

const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");
const readline = require('readline');
const { execFile, exec } = require("child_process");

// const basePath = "C:\\Users\\Canon\\Desktop\\NewTask_Id_v\\FortisAdmin_YX63k_Li\\ntfTool";
// 修改文本
const filePath = path.resolve(__dirname,"../../nftTools/settings.py")

console.log(`路径是`, filePath)

function readLines(inputFilePath, outputFilePath, testArrMap, regex) {
    // 创建 readline 接口实例
    const rl = readline.createInterface({
        input: fs.createReadStream(inputFilePath, 'utf8'),
        // output: fs.createWriteStream(filePath),
        crlfDelay: Infinity
    });
    const cache = [];
    let changeLineSum = 0;
    rl.on('line', function(line) {
        // console.log(`当前行是`,line)
            const match = line.match(regex); // 匹配字段
            if (match) {
                // const data = match.map((m) => testArrMap.get(m)).join(','); // 获取对应的数据
                const data = match.map((m) => `${m}${testArrMap.get(m)}`).join(','); // 获取对应的数据
                cache.push(data); // 将替换后的数据保存到缓存中
                changeLineSum += 1;
            } else {
                cache.push(line); // 将未匹配成功的行也保存到缓存中
            }
    })
    return new Promise((resolve, rejects) => {
        // 监听读取完成事件
        rl.on('close', function() {
            console.log('修改的行数', changeLineSum);
            const output = fs.createWriteStream(outputFilePath); // 创建输出流
            output.on('error', (err) => {
                rejects(err)
            }); // 处理输出流错误
        
            output.write(cache.join('\n')); // 将整个缓存写回文件
        
            output.end(() => {
                resolve();   // 关闭输出流
                ExecPyFile() 
            });
        });
    })

}

// const pyFilePath_test = "/www/wwwroot/www.fortis.ink/nftTools/Li_test.py"
const pyFilePath = "/www/wwwroot/www.fortis.ink/nftTools/app.py"

function ExecPyFile() {
    // execFile(executroPath, [pyFilePath], (error ))
    exec(`python3 ${pyFilePath}`, (error, stdout, stderr) => {
        if(error) {
            console.log(`exec error: ${error}`)
            return;
        }
        console.log('查看返回参数', stdout, stderr)
    })
}



router.post("/createNtf", async (req, res) => {
    console.log(`formdata`, req.body)
    let ntfData = req.body.ntfData
    const data = req.body
        // res.json({
        //     data
        // })
        
 
    
    const timestampInSeconds = Math.floor(Date.now() / 1000).toString();
    const obj = {
        chooseId: ntfData.chooesId,
        food_num: ntfData.food_num,
        train: ntfData.train, // Ture False
        // imgUrl: ntfData.imgUrl,
        color_output_name: timestampInSeconds,
        color_style: ntfData.color_style, // 风格 0 1
        food_name: ntfData.food_name,
        food_notes: ntfData.food_notes,
        food_price: parseInt(ntfData.food_price),
        config: {
            starts: parseInt(ntfData.food_price),
            end: parseInt(ntfData.food_price) + 5000,
            space: 300,
            add: 0
        }
    }

    const testArrMap = new Map([
        ['chooesId=', obj.chooseId],
        ['food_num=', obj.food_num],
        ['color_style=', obj.color_style],
        ['train=', obj.train],
        ['color_output_name=', `'${obj.color_output_name}'`],
        ['food_name=', `'${obj.food_name}'`],
        ['food_notes=', `'${obj.food_notes}'`],
        ['food_price=', obj.food_price],
        ['starts=', obj.config.starts],
        ['end=', obj.config.end],
        ['space=', obj.config.space],
        ['add=', obj.config.add],
        ['isShow=', 'True']
    ]);
        
    const regex = new RegExp(Array.from(testArrMap.keys()).join('|'), 'g');
    // console.log(`正则数据是`, regex)
    try {
        await readLines(filePath, filePath,testArrMap, regex);
        res.json({
            ntfData,
            obj,
        })

    } catch (err) {
        console.log('createNtf make File error', err)
    }
    
})


module.exports = router