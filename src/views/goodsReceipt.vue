<template>
    <div id="gReceipt">
        <van-nav-bar
            class="cTitle"
            left-text="收货签收"
            right-text="更新网点信息"
            left-arrow
            fixed
            @click-left="onClickLeft"
        />
        <van-cell-group class="plusTop">
            <van-field
                class="simpleIpt"
                v-model="fdispatchOrderNo"
                id="fdispatchOrderNo"
                name="fdispatchOrderNo"
                autofocus
                label="运单号："
                placeholder="请扫描运单号"
            />
            <van-field
                class="simpleIpt"
                id="fdestination"
                name="fdestination"
                label="到达地："
                placeholder="请选择到达地"
                @click="destination"
                v-model="this.siteName "
            />
            <van-field
                class="simpleIpt"
                v-model="goodsSum"
                id="goodsSum"
                name="goodsSum"
                label="件 数："
            />
            <van-field
                class="simpleIpt"
                v-model="goodsSum"
                id="fnumber"
                name="fnumber"
                label="标签数量："
            />
            <van-field
                class="simpleIpt"
                id="fname"
                name="fname"
                label="姓 名："
            />
            <van-field
                class="simpleIpt"
                id="fidentity"
                name="fidentity"
                label="身份证："
            />
            <div class="wrapBtn">
                <van-button class="twobtn gBtn" @click="publick()">公</van-button>
                <van-uploader :after-read="onRead">
                    <van-button class="twobtn zBtn" ref="sfzImage">自</van-button>
                </van-uploader>      
            </div>
        </van-cell-group>      
        <!--底部按钮 -->
        <div class="footBtn"  v-show="showBtn">
            <van-button class="gbtn savebtn" type="warning" @click="goodsSave()">保存</van-button>
            <van-button class="gbtn requirebtn" type="warning" to="/alreadyReceive">收货查询</van-button>
        </div>     
    </div>
</template>

<script>
import {CheckDispatchOrderNo,CreateDispatchOrder,UserIdCardAuthen} from '../api/index'
export default {
    data(){
        return{
            fdispatchOrderNo:"",
            freceiveSiteNo:"",
            freceiveSiteName:"",
            goodsSum:"",
            idCardStr:"",
            siteName:"",
            siteNo:"",
            showBtn: true,  // 控制按钮盒子显示隐藏
            docmHeight: document.documentElement.clientHeight, // 默认屏幕高度
            showHeight: document.documentElement.clientHeight, // 实时屏幕高度
        }
    },
    // websocket请求服务器
    sockets:{
        connect(){
            console.log('收货签收页面连接成功')
        },
        // 检查运单号是否正确
        goodsdisotder(res){
            console.log('3333333333',res)
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
                    sessionStorage.setItem('goodsDispatchOrder',JSON.stringify(this.fdispatchOrderNo));    

                } else{
                    this.$toast.fail('运单号扫描错误！');
                }
            })
            .catch(err => {
                console.log(err)
            })   
        }
    },
    methods:{
        onClickLeft(){
            this.$router.push({path:"/container", name:"container"});
            // this.siteName = ""
        },
        destination(){
            localStorage.setItem('pageName',JSON.stringify('gReceipt'));
            this.$router.push({path:"/siteDetailMsg", name:"siteDetailMsg"}); 
        },
        publick(){
            this.$dialog.alert({
                title: '温馨提示',
                message: '请安装实名组件！'
            });
        },
        onRead(file){
            this.idCardStr = file.content; 
            // console.log(this.idCardStr)
            let msg = {
                msgId: "1001005133",
                serId: 1,
                type: 1,
                key: 0,
                source: 1,
                tokenSta:0,
                msgBody:{
                    IdCardStr:this.idCardStr 
                }
                
            };
            UserIdCardAuthen({data:msg})
            .then(res => {
                if(res.msgBody != null && res.msgBody != ''){
                    this.$toast.fail(res.msgBody.staInfo);
                }
                console.log(res)
            })
            .catch(error => {
                console.log(error)
            })
        },
        goodsSave(){
            let msg = {
                msgId: "1001005105",
                serId: 1,
                type: 1,
                key: 0,
                source: 1,
                tokenSta:0,
                msgBody:{
                    fdispatchOrderNo:this.fdispatchOrderNo,
                    freceiveSiteNo:this.fsendSiteNo,
                    freceiveSiteName:this.siteName,
                    goodsSum:this.goodsSum,
                    QRValues: [
                        {  
                            "QRValue":"1"
                        }
                    ]
                    
                }
                
            };
            CreateDispatchOrder({data:msg})
            .then(res => {
                if(res.msgBody.sta != "ok"){
                    this.$toast.fail(res.msgBody.staInfo);
                }
                console.log(res)
            })
            .catch(error => {
                console.log(error)
            }) 
        }
    },
    watch: {
        showHeight: function () {
            if (this.docmHeight > this.showHeight) {
                this.hidShow = false
            } else {
                this.hidShow = true
            }
        },
    },
    mounted(){
        // 从本地缓存中取出运单号、当前页面状态和到达站点
        var siteName =  JSON.parse(sessionStorage.getItem("siteName"));
        var siteNo = JSON.parse(sessionStorage.getItem("siteNo"));
        var goodsDispatchOrder = JSON.parse(sessionStorage.getItem("goodsDispatchOrder"));
        var pageName =  JSON.parse(localStorage.getItem("pageName"));
        // console.log(siteName)
        if(siteName != null && pageName == 'gReceipt'){
            this.siteName = siteName;
        } 
        if(siteNo != null){
            this.fsendSiteNo = siteNo;
        }
        
        if(goodsDispatchOrder != null && pageName == 'gReceipt'){
            this.fdispatchOrderNo = goodsDispatchOrder;
        }

        // window.resize监听页面高度的变化
        window.onresize = () => {
            return (() => {
                this.showHeight = document.body.clientHeight
            })()
        }

    }
}
</script>

<style lang="less" scoped>
#gReceipt{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    bottom: 0px;
    margin-top: 45px;
    background-color: #eeeeee;
    .van-cell,.van-button--normal {
        font-size: 16px;
    }
    .van-nav-bar__title,.van-icon-arrow-left,.van-nav-bar__text{
        color: #ffffff;
    }
    .cTitle{
        color: #ffffff;
        background-color: #3385ff; 
    }
}

.plusTop{
    // margin-top: 44px;
    background-color: #eeeeee;
}
.simpleIpt{
    margin: 1px 0px;
}
.wrapBtn{
    height: 80px;
    float: right;
    margin-top: 12px;
    background-color: #ffffff;
    .twobtn{
        background-color: #F17D00;
        color: #ffffff;
        margin-top: 18px;
        margin-right: 12px;
        border-radius: 6px;
    }
    .gBtn{
        margin-left: 12px;
    }
}
.footBtn{
    width: 100%;
    background-color: #ffffff;
    position: fixed;
    bottom: 36px;
    .gbtn{
        width: 30%;
        background-color: #F17D00;
        border-radius: 6px;
    }
    .savebtn{
        margin: 10px 5% 10px 18%;
    }
}

</style>

