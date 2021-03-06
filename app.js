var express = require('express');
var app = express();


app.all('*',function(req,res,next){
    
    
    res.header('Access-Control-Allow-Origin','*');
    
    res.header('Access-Control-Allow-Credentials','true');
    res.header('Access-Control-Allow-Methods','PUT,GET,POST,DELETE,OPTIONS');
    //首部字段用于预检请求的响应。指明实际请求中允许携带的首部字段。
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild,X-Access-Token');
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
app.get('/api/randomRequest', function (req, res) {
    let data = {}
    if(Math.ceil(Math.random() * 10) %2 === 0){
        data.status = 200;
        data.success = true;
        data.message = '请求成功';
    }else{
        data.status = 500;
        data.success = true;
        data.message = '请求失败';
        res.status(500)
    }
    setTimeout(()=>{
        res.send(data);
    },1000)
    
})
app.get('/api/list',function(req,res){
    
    console.log("列表get 请求",req.query);
    var reqData = req.query;
    var resData = {};
    console.log(reqData.page);
    let total = 23;
    if(reqData.page <= 3){
        resData.status = 200; 
        resData.success = true;
        let list = [];
        let num = 10;
        
        if(reqData.page == 3){
            num = 3
        }
        for(let i=0; i<num; i++){
            list.push({
                name:`姓名${i+1}`,
                age:`${20+i}`
            })
        }
        
        resData.data = {
            list:list,
            total:total
        }
        resData.message = '获取成功'; 
    }else{
        resData.data = {
            list:[],
            total:total
        }
        resData.status = 200; 
        resData.success = true;
        resData.message = '数据已加载完毕'; 
    }
    setTimeout(()=>{
       
        if(req.headers['x-access-token'] === 'tokenabcdefg'){
            res.send(resData);
        }else{
            res.status(500)
            res.send({
                status:500,
                success:false,
                message:'token过期，请重新登录'
            });
        }
        // res.send({
        //     status:500,
        //     success:false,
        //     message:'token过期，请重新登录'
        // });
    },2000)
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
                token:'tokenabcdefg'
            }
            resData.message = '登录成功'; 
        }else{
            resData.status = 400; 
            resData.success = false;
            resData.message = '密码错误'; 
        }
        setTimeout(()=>{
            res.send(resData);
        },1000)
       
    })
})
  
app.put('/api/add/list', function (req, res) {
    console.log("主页 put 请求");
    var reqData = '';
    var resData = {};
    req.on('data', function(chunk){    
        reqData += chunk;
    });
    req.on('end',function(){
        console.log('req',reqData)
        reqData = JSON.parse(reqData)
        console.log(typeof reqData)
        if(Array.isArray(reqData.list)){
            resData.status = 200; 
            resData.success = true;
            
            resData.message = '添加成功'; 
        }else{
            resData.status = 400; 
            resData.success = false;
            resData.message = '数据格式错误'; 
        }
        res.send(resData);
    })
})

app.delete('/api/delete/list', function (req, res) {
    console.log("主页 put 请求");
    var reqData = '';
    var resData = {};
    req.on('data', function(chunk){    
        reqData += chunk;
    });
    req.on('end',function(){
        console.log('req',reqData)
        reqData = JSON.parse(reqData)
        console.log(typeof reqData)
        if(Array.isArray(reqData.ids)){
            resData.status = 200; 
            resData.success = true;
            
            resData.message = '删除成功'; 
        }else{
            resData.status = 400; 
            resData.success = false;
            resData.message = '数据格式错误'; 
        }
        res.send(resData);
    })
})

var server = app.listen(9999,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
    
})