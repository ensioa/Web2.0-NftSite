const { nowAdress } = require('../../config/keys')
const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");
const { exec } = require('child_process');

// const basePath = "C:\\Users\\Canon\\Desktop\\NewTask_Id_v\\FortisAdmin_YX63k_Li\\ntfTool";

const filePath = path.resolve(__dirname, "../../ntfTool/test.py")

router.post("/runShell", async (req, res) => {
    // nftTools/Master-Art-Punk
    exec('python3 app.py', (error, stdout, stderr) => {
        if (error) {
        console.error(`执行出错：${error}`);
        return;
        }

        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
})


module.exports = router