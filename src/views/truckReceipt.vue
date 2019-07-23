<template>
    <div id="truck">
        <van-nav-bar
            class="cTitle"
            title="装车签收"
            left-arrow
            fixed
            @click-left="onClickLeft"
        />
        <van-cell-group>
            <van-field
                v-model="fdispatchOrderNo"
                id="fdispatchOrderNo"
                name="fdispatchOrderNo"
                autofocus
                label="运单号："
                placeholder="请扫描运单号"
            />
            <van-button class="receiptBtn" size="small" @click="disOrderSearch()">查询</van-button>
        </van-cell-group>
        <!-- 遍历从后台获取的数据 -->
        <ul v-if="this.TnewstoreData.length > 0" class="fListUl">
            <li class="fListStyle" v-show="lishow" v-for="(item,index) in TnewstoreData" :key="index" @click="fTouchLi(index,item)" :class="{ active: isActive == index }"> 
                <p class="fListOrderNo">运单号：{{item.fdispatchOrderNo}}  
                    &nbsp;&nbsp;&nbsp;<span>{{item.fsendSiteName}}</span>
                </p>
                <van-row>
                    <van-col span="8"><span> 到达地：{{item.freceiveSiteName}}</span></van-col>
                    <van-col span="8"><span>货物数量：{{item.fgoodsNums}}</span></van-col>
                    <van-col span="8"><span>已签收：{{item.fsignType}}</span></van-col>
                </van-row>
            </li>
        </ul>

        <!--底部按钮 -->
        <div class="footBtn"  v-show="showBtn">
            <van-button class="gbtn savebtn" type="warning" @click="storeConfirm()">确定</van-button>
            <van-button class="gbtn requirebtn" type="warning" to="/alreadyTruck">已装车查询</van-button>
        </div>  
    </div>
</template>

<script>
import {CheckDispatchOrderNo,DispatchOrderLoad,GetDispatchOrderDetailEntered} from '../api/index'
export default {
    data(){
        return {
            fdispatchOrderNo:"",
            TstoreData:[],
            TnewstoreData:[],
            storeDatass:"",
            TfmsgList:"",
            isActive:false,
            lishow:true,
            tf_order:'',
            tf_siteName:'',
            tf_goodsNum:'',
            showBtn: true,  // 控制按钮盒子显示隐藏
        }
    },
    // websocket请求服务器
    sockets:{
        connect(){
            console.log('装车签收页面连接成功')
        },
        // 检查运单号是否正确
        truckdisotder(res){
            // console.log('22222222',res)
            let msg = {
                msgId: "1001005100",
                serId: 1,
                type: 1,
                key: 0,
                source: 1,
                tokenSta:0,
                msgBody:{
                    fdispatchOrderNo:res,
                }
            };
            CheckDispatchOrderNo({data:msg})
            .then(data => {
                if(data.msgBody.sta == 'ok'){
                    // console.log('cccccccccccc')
                    // 将websocket广播的运单号展示到输入框中
                    this.fdispatchOrderNo = res;

                    // 展示运单的详细信息
                    let msg = {
                        msgId: "1001005200",
                        serId: 1,
                        type: 1,
                        key: 0,
                        source: 1,
                        tokenSta:0,
                        msgBody:{
                            fcompanyId:"1",
                            fdispatchOrderNo:this.fdispatchOrderNo,
                        }
                    };
                    // 获取运单信息
                    GetDispatchOrderDetailEntered({data:msg})
                    .then(res =>{
                        if(res.msgBody !== null){
                            this.TfmsgList = res.msgBody;
                            this.TstoreData.push(this.TfmsgList);
                            // 数组去重 TnewstoreData
                            for(var i=0;i<this.TstoreData.length;i++){
                                var flag = true;
                                for(var j=0;j<this.TnewstoreData.length;j++){
                                    if(this.TstoreData[i].fdispatchOrderNo == this.TnewstoreData[j].fdispatchOrderNo){
                                        flag = false;
                                        this.$toast.fail('该信息已存在！');
                                    }
                                }
                                if(flag){
                                    this.TnewstoreData.push(this.TstoreData[i])
                                }
                            }
                            this.storeshow = true;
                            // 将去重之后的数组存放到本地缓存中
                            sessionStorage.setItem('storeDatass',JSON.stringify(this.TnewstoreData));           
                        } else{
                            this.$toast.fail('暂无数据！');  
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })

                } else{
                    this.$toast.fail('运单号错误！');
                }
            })
            .catch(err => {
                console.log(err)
            })
           
            
        }
    },
    methods:{
        onClickLeft(){
            this.$router.push({path:"/container", name:"container"})
        },
        // 点击每一项li数据事件
        fTouchLi(index,item){
            let that = this;
            that.isActive = index;
            that.tf_order = item.fdispatchOrderNo;
            that.tf_siteName = item.freceiveSiteName;
            that.tf_goodsNum = item.fgoodsNums;
        },
        // 输入运单号点击查询按钮事件
        disOrderSearch(){
            if (this.fdispatchOrderNo !== "") {
                var ydh = this.fdispatchOrderNo;
                var isok = false;
                this.TstoreData.forEach(function(t) {
                    if (t.fdispatchOrderNo == ydh) {
                        isok = true;
                    }
                });
                if (isok) {
                    alert("运单号已存在");
                } else {
                    // 指定运单的运单明细
                    let msgDetail = {
                        msgId: "1001005200",
                        serId: 1,
                        type: 1,
                        key: 0,
                        source: 1,
                        tokenSta:0,
                        msgBody:{
                            fcompanyId:"1",
                            fdispatchOrderNo:this.fdispatchOrderNo,
                        }
                    };
                    // 装车运单操作
                    let msgHandel = {
                        msgId: "1001005114",
                        serId: 1,
                        type: 1,
                        key: 0,
                        source: 1,
                        tokenSta:0,
                        msgBody:{
                            fdispatchOrderNo:this.fdispatchOrderNo
                        }
                    };
                    DispatchOrderLoad({data:msgHandel})
                    .then(res => {
                        if(res.msgBody.staInfo == "操作失败,该运单已装车!") {
                            this.$dialog.alert({
                                title: '温馨提示',
                                message:'当前运单已经签收过'   
                            })
                            this.fdispatchOrderNo = ''
                        } else {
                            GetDispatchOrderDetailEntered({data:msgDetail})
                            .then(res =>{
                                if(res.msgBody == null){
                                    this.$toast.fail('暂无数据！');                
                                } else{
                                    this.TfmsgList = res.msgBody;
                                    this.TstoreData.push(this.TfmsgList);

                                    // 数组去重 TnewstoreData
                                    for(var i=0;i<this.TstoreData.length;i++){
                                        var flag = true;
                                        for(var j=0;j<this.TnewstoreData.length;j++){
                                            if(this.TstoreData[i].fdispatchOrderNo == this.TnewstoreData[j].fdispatchOrderNo){
                                                flag = false;
                                            }
                                        }
                                        if(flag){
                                            this.TnewstoreData.push(this.TstoreData[i])
                                        }
                                    }
                                    this.storeshow = true;
                                    sessionStorage.setItem('storeDatas',JSON.stringify(this.TstoreData));
                                }
                            })
                            .catch(error => {
                                console.log(error)
                            })
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
                }
                // console.log(this.TstoreData)
            } else {
                this.$toast.fail("请输入运单号");
            }
         
        },
        storeConfirm(){
            let _index  = this.isActive;
            let _newstoreDatas = this.TnewstoreData;
            if(this.fdispatchOrderNo == "" && _newstoreDatas.length == '0'){
                this.$toast.fail('没有运单数据，请扫描运单号')
            } else {
                let msgHandel = {
                    msgId: "1001005114",
                    serId: 1,
                    type: 1,
                    key: 0,
                    source: 1,
                    tokenSta:0,
                    msgBody:{
                        fdispatchOrderNo:this.tf_order,
                        pageSetBody: {
                            pageNo: 0,
                            pageSize: 20
                        }
                    }
                };
                DispatchOrderLoad({data:msgHandel})
                .then(res =>{
                    console.log(res)
                    this.$dialog.confirm({
                        title: '温馨提示',
                        message: ' 未扫描完毕，确定入库？'+'<br>'+ '运单号'+this.tf_order + ',' + '到达地'+this.tf_siteName + ',' + '件数'+this.tf_goodsNum
                        
                    }).then(()=> {
                        this.$dialog.alert({
                            title: '温馨提示',
                            message: res.msgBody.staInfo
                        }).then( () => {
                            // 删除当前点击的数组
                            _newstoreDatas.splice(_index,1);
                            // 更新缓存中存放的数组
                            sessionStorage.setItem('storeDatas',JSON.stringify(_newstoreDatas));
                        })
                       
                    }).catch(error => {
                        this.$toast.fail('操作失败！')
                    })
                })
                .catch(error => {
                    this.$toast.fail('操作失败！')
                })
            }
        }
    },
    mounted(){
        //触发socket连接
        this.$socket.emit('truckdisotder',44049205);
        
        // 从本地缓存中取数据存放到页面中
        var storeDatas = JSON.parse(sessionStorage.getItem("storeDatas"));
        this.storeDatas = storeDatas;
        if(this.storeDatas != null){
            this.TnewstoreData = this.storeDatas
        } 

        let winHeight = document.documentElement.clientHeight;  //视口大小
        window.onresize= ()=>{
            if(this.winHeight>document.documentElement.clientHeight) {
               this.showBtn =false
            }else{
                this.showBtn = true
            }
        }
    }
}
</script>

<style lang="less" scoped>
#truck{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    bottom: 0px;
    margin-top: 45px;
    background-color: #eeeeee;
    .van-cell,.van-button--normal{
        font-size: 16px;
    }
    .van-button--small{
        font-size:14px;
    }
    .van-nav-bar__title,.van-icon-arrow-left,.van-nav-bar__text{
        color: #ffffff;
    }
}
.cTitle{
    color: #ffffff;
    background-color: #3385ff; 
}
.receiptBtn{
    background-color: #CACACA;
    position: absolute;
    top: 6px;
    right: 10px;
}
.footBtn{
    width: 100%;
    background-color: #ffffff;
    position: fixed;
    bottom: 36px;
    .gbtn{
        border-radius: 6px;
        background-color: #F17D00;
    }
    .savebtn{
        width: 25%;
        margin: 10px 5% 10px 18%;
    }
    .requirebtn{
        width: 35%;
    }
}
.fListUl{
    height: 496px;
    overflow-y: auto;
}
.fListStyle{
    padding: 3px 8px;
    background-color: #ffffff;
    margin:8px 0px;
    .fListOrderNo{
        margin: 5px 0px;
        color: #0A1C6D;
        font-size: 18px;
        font-weight: 500;
    }
}
.active{
    background-color: #DFDDDB;
}
</style>
