var serve = require('http').Server();
var io = require('socket.io')(serve);

io.on('connection',function(socket){

    // 模拟收货签收
    setTimeout(()=>{
        io.sockets.emit('goodsdisotder',201904180000800035);
        console.log("入库签收");
    },8000)
    // 模拟入库签收
    setTimeout(()=>{
        io.sockets.emit('checkdisotder',45152292);
        console.log("入库签收");
    },8000)
    // 模拟装车签收
    setTimeout(()=>{
        io.sockets.emit('truckdisotder',44049205);
        console.log("装车签收");
    },8000)
    // 补打标签
    setTimeout(()=>{
        io.sockets.emit('printdisotder',201904180000800042);
        console.log("补打标签");
    },8000)
    // 装车单管理
    setTimeout(()=>{
        io.sockets.emit('insMangerdisotder',201904180000800042);
        console.log("装车单管理");
    },8000)
})

serve.listen(8081,function(){
    console.log('listening on 8081');
})




