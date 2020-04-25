var express = require('express');
var app = express();


app.all('*',function(req,res,next){
    
    
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Credentials','true');
    res.header('Access-Control-Allow-Methods','PUT,GET,POST,DELETE,OPTIONS');
    
    // res.header('Access-Control-Allow-Headers','Content-Type,username');
    next();
})
app.get('/',function(req,res){
    res.writeHead(200,{
        'Content-Type':'text/plain;charset=UTF-8'
    })
    res.write('端口: '+req.hostname)
    res.write('\n')
    res.write('ip: '+req.ip)
    res.end();
})
app.post('/api/login', function (req, res) {
    console.log("主页 post 请求");
    var reqData = '';
    var resData = {};
    req.on('data', function(chunk){    
        reqData += chunk;
    });
    req.on('end',function(){
        console.log('req',reqData)
        reqData = JSON.parse(reqData)
        console.log(typeof reqData)
        if(reqData.userName == 'admin' && reqData.passWord === '123456' ){
            resData.status = 200; 
            resData.success = true;
            resData.data = {
                token:'tokenadadsaidahdklaw'
            }
            resData.message = '登录成功'; 
        }else{
            resData.status = 400; 
            resData.sucess = false;
            resData.message = '密码错误'; 
        }
        res.send(resData);
    })
})
  
var server = app.listen(9999,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
    
})