<template>
    <div id="storage">
         <van-nav-bar
            class="cTitle"
            title="入库签收"
            left-arrow
            fixed
            @click-left="onClickLeft"
        />
        <van-cell-group>
            <van-field
                v-model="fdispatchOrderNo"
                id="fOrderNo"
                name="fOrderNo"
                autofocus
                label="运单号："
                placeholder="请扫描运单号"
            />
            <van-button class="receiptBtn" size="small" @click="disOrderSearch()">查询</van-button>
        </van-cell-group>

        

        <van-swipe-cell :on-close="onClose">
            <!-- 遍历从后台获取的数据 -->
            <ul v-if="this.SnewstoreData.length > 0" class="fListUl">
                <li class="fListStyle" v-show="lishow" 
                    v-for="(item,index) in SnewstoreData" :key="index" 
                    @click="fTouchLi(index,item)" 
                    :class="{ active: isActive == index }"
                >
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

            <template slot="right">
                <van-button square type="info" text="删除" />
            </template>
        </van-swipe-cell>



<!-- <van-swipe-cell :on-close="onClose">
  <template slot="left">
    <van-button square type="primary" text="Select" />
  </template>

  <van-cell :border="false" title="Cell" value="Cell Content" />

  <template slot="right">
    <van-button square type="danger" text="Delete" />
  </template>
</van-swipe-cell> -->


        <!--底部按钮 -->
        <div class="footBtn">
            <van-button class="gbtn savebtn" type="warning" @click="storeConfirm()" >确定</van-button>
            <van-button class="gbtn requirebtn" type="warning" to="/alreadyStorage">已入库查询</van-button>
        </div> 

    </div>
</template>

<script>
import {CheckDispatchOrderNo,GetDispatchOrderDetailEntered,DispatchOrderInstuck} from "../api/index"
export default {
    data(){
        return{
            fdispatchOrderNo:"",
            SfmsgList:"",
            SstoreData:[],
            SnewstoreData:[],
            storeDatass:"",
            isActive:false,
            storeshow:false,
            lishow:true,
            cf_order:'',
            cf_siteName:'',
            cf_goodsNum:'',
        }
    },
    // websocket请求服务器
    sockets:{
        connect(){
            console.log('连接成功')
        },
        // 检查运单号是否正确
        checkdisotder(res){
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
                    this.queryOrderDetail()

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
        onClose(clickPosition, instance) {
            console.log(instance)
            switch (clickPosition) {
                case 'left':
                case 'cell':
                case 'outside':
                instance.close();
                break;
                case 'right':
                Dialog.confirm({
                    message: '确定删除吗？'
                }).then(() => {
                    instance.close();
                });
                break;
            }
        },
        onClickLeft(){
            this.$router.push({path:"/container", name:"container"})
        },
        // 点击每一项li数据事件
        fTouchLi(index,item){
            let that = this;
            that.isActive = index;
            that.cf_order = item.fdispatchOrderNo;
            that.cf_siteName = item.freceiveSiteName;
            that.cf_goodsNum = item.fgoodsNums;
            console.log(item.fdispatchOrderNo)
        },
        // 输入运单号点击查询按钮事件
        disOrderSearch(){
            if (this.fdispatchOrderNo !== "") {
                var ydh = this.fdispatchOrderNo;
                var isok = false;
                this.SstoreData.forEach(function(t) {
                    if (t.fdispatchOrderNo == ydh) {
                        isok = true;
                    }
                });
                if (isok) {
                    alert("运单号已存在");
                } else {
                    // 调用获取运单详情函数
                    this.queryOrderDetail();
                }
            } else {
                this.$toast.fail("请输入运单号");
            }
         
        },
        queryOrderDetail(){
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
                if(res.msgBody == null){
                    this.$toast.fail('暂无数据！');                
                } else{ 
                    this.SfmsgList = res.msgBody;
                    this.SstoreData.push(this.SfmsgList);
                    
                // 数组去重 
                    for(var i=0;i<this.SstoreData.length;i++){
                        var flag = true;
                        for(var j=0;j<this.SnewstoreData.length;j++){
                            if(this.SstoreData[i].fdispatchOrderNo == this.SnewstoreData[j].fdispatchOrderNo){
                                flag = false;
                            }
                        }
                        if(flag){
                            this.SnewstoreData.push(this.SstoreData[i])
                        }
                    }
                    this.storeshow = true;
                    this.fdispatchOrderNo == '';
                    // 将去重之后的数组存放到本地缓存中
                    sessionStorage.setItem('storeDatass',JSON.stringify(this.SnewstoreData));  
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        // 入库签收点击确定按钮事件
        storeConfirm(){
            let _index  = this.isActive;
            let _newstoreDatas = this.SnewstoreData;
            if(this.fdispatchOrderNo == "" && _newstoreDatas.length == '0'){
                this.$toast.fail('没有运单数据，请扫描运单号')
            } else {
                let msg = {
                    msgId: "1001005111",
                    serId: 1,
                    type: 1,
                    key: 0,
                    source: 1,
                    tokenSta:0,
                    msgBody:{
                        fdispatchOrderNo:this.cf_order ,
                        pageSetBody: {
                            pageNo: 0,
                            pageSize: 20
                        }
                    }
                };
                DispatchOrderInstuck({data:msg})
                .then(res =>{
                    this.$dialog.confirm({
                        title: '温馨提示',
                        message: '未扫描完毕，确定入库？'+'<br>'+ '运单号'+this.cf_order  + ',' + '到达地'+this.cf_siteName + ',' + '件数'+this.cf_goodsNum
                        
                    }).then(()=> {
                        // alert(res.msgBody.staInfo)
                        this.$dialog.alert({
                            title: '温馨提示',
                            message: res.msgBody.staInfo
                        }).then( () => {
                            // 删除当前点击的数组
                            _newstoreDatas.splice(_index,1);
                            // 更新缓存中存放的数组
                            sessionStorage.setItem('storeDatas',JSON.stringify(_newstoreDatas));
                        })
                       
                    }).catch(() => {
                        // console.log("点击了取消按钮")
                    })
                })
                .catch(error => {
                    console.log(error)
                })
            }
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
        //触发socket连接
        this.$socket.emit('checkdisotder', 45152292);
        
        // 从本地缓存中取数据存放到页面中
        var storeDatass = JSON.parse(sessionStorage.getItem("storeDatass"));
        this.storeDatass = storeDatass;
        if(this.storeDatass != null){
            this.SnewstoreData = this.storeDatass
        }

    }
}
</script>

<style lang="less" scoped>
#storage{
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

    .van-swipe-cell__left,
    .van-swipe-cell__right {
        display: inline-block;
        width: 65px;
        height: 44px;
        font-size: 15px;
        line-height: 44px;
        color: #fff;
        text-align: center;
        background-color: #f44;
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
    margin: 8px 0px;
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

