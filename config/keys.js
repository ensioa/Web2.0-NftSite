module.exports = {
    // http://fortis.ink/
    mongoUrl: 'mongodb://127.0.0.1:27017/newNtf1',

    // mongoUrl: 'mongodb://103.139.1.219:27017/newNtf1',
    // nowAdress: "http://127.0.0.1:8801/",
    nowAdress: "http://www.fortis.ink:8801/",
    getNowTime: function () {
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
        //小于10的拼接上0字符串
        function addZero(s) {
            return s < 10 ? ('0' + s) : s;
        }
        return time;
    }
}