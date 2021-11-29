/*
 * @Description:使用node服务模拟接口文件
 * @Author: bb f
 * @Date: 2021-11-26 16:58:50
 * @LastEditors: bb f
 * @LastEditTime: 2021-11-26 17:04:41
 */
const express = require('express'); //引入express模块
const cors = require('cors');
const app = express();
//设置CORS
// app.all('*',function (req, res, next) {
//     res.header('Access-Control-Allow-Origin','http://localhost:3001'); //当允许携带cookies此处的白名单不能写’*’
//     res.header('Access-Control-Allow-Headers','content-type,Content-Length, Authorization,Origin,Accept,X-Requested-With'); //允许的请求头
//     res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT'); //允许的请求方法
//     res.header('Access-Control-Allow-Credentials','true');  //允许携带cookies
//     next();
// });

// 不设置跨域
app.use(cors());

app.get('/smbweatherapi/typhoon/list', function (req, res) {
    res.status(200);
    res.send(require('./data/typhoon/typhoonList.json'));
});

//定义端口，此处所用为8080端口，可自行更改
const server = app.listen(8080, function () {
    console.log('running 8080...');
});
