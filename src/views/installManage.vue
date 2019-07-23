<template>
    <div id="install">
        <van-nav-bar
            class="cTitle"
            title="装车单管理"
            left-arrow
            fixed
            @click-left="onClickLeft"
        />

        <div id="arrivePoint">
            <van-field
                id="fdestination"
                name="fdestination"
                label="到达地："
                placeholder="请选择到达地"
                @click="destination"
                v-model="this.siteName "
            />
            <van-button class="inquireBtn" size="small" @click="fsiteSearch">查询</van-button>
        </div>


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

        <div id="insMsg">
            <van-collapse v-model="activeNames">
                <van-collapse-item title="展开详细的信息" class="detailMsg" name="2">
                    <van-row class="frow">
                        <van-col span="12"><span class="ftxt">件数合计：</span></van-col>
                        <van-col span="12"><span class="ftxt">运单合计：{{this.MnewstoreData.length}}</span></van-col>
                    </van-row>
                    <van-row class="frow">
                        <van-col span="12"><span class="ftxt">送货费合计：</span></van-col>
                        <van-col span="12"><span class="ftxt">保值费合计：</span></van-col>
                    </van-row>
                    <van-row class="frow">
                        <van-col span="12"><span class="ftxt">运费合计：</span></van-col>
                    </van-row>
                </van-collapse-item>
            </van-collapse>
            <!-- 遍历从后台获取的数据 -->
            <ul v-if="this.MnewstoreData.length > 0" class="fListUl">
                <li class="fListStyle" v-for="(item,index) in MnewstoreData" :key="index" > 
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
        </div>

        <!-- 底部按钮 -->
        <van-button class="bindBtn" size="normal" @click="createOrder()">生成装车单</van-button>
        <van-dialog v-model="showBtn" title="请填写信息" show-cancel-button :beforeClose="beforeClose" >
            <van-field label="驾驶员：" placeholder="请输入驾驶员信息" v-model="fdriverName"/>
            <van-field label="司机手机号：" placeholder="请输入司机手机号" v-model="fdriverMobile"/>
            <van-field label="车牌号" placeholder="车牌号"  v-model="fplateNo"/>
            <van-field label="车型：" placeholder="请输入车型"  v-model="ftruckType"/>
            <van-field label="车辆颜色：" placeholder="请输入车辆颜色"  v-model="fplateColor"/>
            <van-field label="备注：" placeholder="备注"  v-model="fremark"/>
        </van-dialog>
    </div>
</template>

<script>
import {CreateLoadListSearch,GetDispatchOrderDetailEntered,CheckDispatchOrderNo,LoadListAdd} from '../api/index'
export default {
    data() {
        return {
            activeNames: ['1'],
            siteNo:"",     
            siteName:"",
            fdispatchOrderNo:"",
            MstoreData:[],
            isActive:false,
            showBtn:false,
            MnewstoreData:[],
            allListOrder:[],
            allSplitOrder:'',
            isConfirm:false,
            // 点击生成装车单确认之后传递给后台的数据
            fdriverName:"",
            fdriverMobile:"",
            fplateNo:"",
            ftruckType:"",
            fplateColor:"",
            fremark:"",
        };
    },
    // websocket请求服务器
    sockets:{
        connect(){
            console.log('连接成功')
        },
        // 检查运单号是否正确
        insMangerdisotder(res){
            console.log('1111111',res)
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
                    // 将websocket广播的运单号展示到输入框中
                    this.fdispatchOrderNo = res;
                    // 调用获取运单详情函数
                    this.queryOrderDetail();
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
        destination(){
            localStorage.setItem('pageName',JSON.stringify('installManage'));
            this.$router.push({path:"/siteDetailMsg", name:"siteDetailMsg"}); 
        },
        fsiteSearch(){
            if (this.siteName !== "") {
                var nowSiteName = this.siteName;
                var isok = false;
                this.MnewstoreData.forEach(function(t) {
                    if (t.freceiveSiteName == nowSiteName) {
                        isok = true;
                    }
                });
                if (isok) {
                    alert("以获取该站点信息");
                } else {
                    let msg = {
                        msgId: "1001005119",
                        serId: 1,
                        type: 1,
                        key: 0,
                        source: 1,
                        tokenSta:0,
                        msgBody:{
                            pageSetBody: {
                                pageNo: 0,
                                pageSize: 20
                            },
                            fsiteNo:this.frecerveSiteNo      
                        }                
                    };
                    CreateLoadListSearch({data:msg})
                    .then(res => {
                        if(res.msgBody == null){
                            this.$toast.fail('暂无数据！');
                        } else {
                            let siteSearchMsg  = res.msgBody.pageOutBody.pageObjBody;
                            for(var i=0;i<siteSearchMsg.length;i++){
                                this.MnewstoreData.push(siteSearchMsg[i])
                            }
                            sessionStorage.setItem('storeDatasss',JSON.stringify(this.MnewstoreData));
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
                }
            }
            this.fdispatchOrderNo = '';
        },
        disOrderSearch(){
            if (this.fdispatchOrderNo !== "") {
                var ydh = this.fdispatchOrderNo;
                var isok = false;
                this.MnewstoreData.forEach(function(v) {
                    if (v.fdispatchOrderNo == ydh) {
                        isok = true;
                    }
                });
                if (isok) {
                    alert("运单号已存在");
                } else {
                    // 调用获取运单详情函数
                    this.queryOrderDetail()
                }
            } else {
                this.$toast.fail("请输入运单号");
            }
        },
        queryOrderDetail(){
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
                    this.MstoreData.push(res.msgBody);
                    // 数组去重 MnewstoreData
                    for(var i=0;i<this.MstoreData.length;i++){
                        var flag = true;
                        for(var j=0;j<this.MnewstoreData.length;j++){
                            if(this.MstoreData[i].fdispatchOrderNo == this.MnewstoreData[j].fdispatchOrderNo){
                                flag = false;
                            }
                        }
                        if(flag){
                            this.MnewstoreData.push(this.MstoreData[i])
                        }
                    }
                    this.storeshow = true;
                    // 将去重之后的数组存放到本地缓存中
                    sessionStorage.setItem('storeDatasss',JSON.stringify(this.MnewstoreData));           
                } else{
                    this.$toast.fail('暂无数据！');  
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        
        createOrder(){
            this.showBtn = true;
            for(var n=0;n<this.MnewstoreData.length;n++){
                this.allListOrder.push(this.MnewstoreData[n].fdispatchOrderNo);
            }
            this.allListOrder = [...new Set(this.allListOrder)];
            this.allSplitOrder = this.allListOrder.join(',')
            console.log(this.allSplitOrder)
        },
        beforeClose(action, done) {
            if(action === 'confirm') {
                this.showBtn = false;
                let msg = {
                    msgId: "1001005121",
                    serId: 1,
                    type: 1,
                    key: 0,
                    source: 1,
                    tokenSta:0,
                    msgBody:{
                        freceiveSiteNo:this.frecerveSiteNo,
                        freceiveSiteName:this.siteName,
                        fstartTime:"2019-07-19 11:11:11",
                        fendTime:"2019-07-09 11:11:11", 
                        fplateNo:this.fplateNo,
                        fdriverName:this.fdriverName,
                        fdriverMobile:this.fdriverMobile,
                        ftruckType:this.ftruckType,
                        fplateColor:this.fplateColor,
                        fremark:this.fremark,
                        fdispatchOrderNos:this.allSplitOrder
                    }                
                };
                LoadListAdd({data:msg})
                .then((res)=>{
                    if(res.msgBody.sta == 'ok'){
                        this.MnewstoreData.length=0;
                        this.$toast.success(res.msgBody.staInfo);
                        done() //关闭
                    } else {
                        this.$toast.success(res.msgBody.staInfo);
                    }
                })
            } else if(action === 'cancel') {
                done() //关闭
            }
        }
    },
    mounted(){
        setInterval(function(){
            var storeDatasss =  JSON.parse(sessionStorage.getItem("storeDatasss"));
            this.storeDatasss = storeDatasss;
            if(this.storeDatasss != null){
                this.MnewstoreData = this.storeDatasss;
            }
        },3000)


        var siteName =  JSON.parse(sessionStorage.getItem("siteName"));
        var siteNo = JSON.parse(sessionStorage.getItem("siteNo"));
        var pageName =  JSON.parse(localStorage.getItem("pageName"));
        // console.log(siteName)
        if(siteName != null && pageName == 'installManage'){
            this.siteName = siteName;
        }
        if(siteNo != null){
            this.frecerveSiteNo = siteNo;
        }
    }
}
</script>

<style lang="less" scoped>
#install{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    bottom: 0px;
    margin-top: 45px;
    background-color: #eeeeee;
    .van-cell,.van-button--normal ,.van-cell__title{
        font-size: 16px;
    }
    .van-button--small{
        font-size:14px;
    }
    .van-nav-bar__title,.van-icon-arrow-left,.van-nav-bar__text{
        color: #ffffff;
    }
    .detailMsg{
        .van-cell{
            font-size: 16px;
            padding: 5px;
        }
    }
}
.cTitle{
    color: #ffffff;
    background-color: #3385ff; 
}
.frow{
    border-bottom: 1px solid #f4f4f4;
    background-color: rgb(228, 223, 228);
}
.ftxt{
    padding: 3px;
    font-size: 16px;
    color: #333;
}
.bindBtn{
    background-color: #F17D00;
    color: #ffffff;
    border-radius: 6px;
    width: 40%;
    margin-left: 30%;
    position: fixed;
    bottom: 36px;
}
.receiptBtn{
    background-color: #CACACA;
    position: absolute;
    top: 7px;
    right: 12px;
}
#arrivePoint{
    color: #323233;
    background: url(../assets/images/select.png) no-repeat 188px 14px;
    .rightContent{
        margin-left: 20px;
    }
    .inquireBtn{
        position: absolute;
        right: 12px;
        top: 6px;
        background-color: #CACACA;
    }
}
#insMsg{
    height: 530px;
    overflow-y: auto;
}
.fListStyle{
    padding: 3px 8px;
    background-color: #ffffff;
    margin: 8px 0px;
    .fListOrderNo{
        margin: 5px 0px;
        color: #0A1C6D;
        font-size: 18px;
        font-weight: 500;
    }
}
</style>
