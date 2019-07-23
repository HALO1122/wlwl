<template>
    <div id="freight">
        <van-nav-bar
            class="cTitle"
            title="交付运费查询"
            left-arrow
            fixed
            @click-left="onClickLeft"
        />
        <!-- 开始日期 -->
        <van-field label="开始日期：" @click="startshow = true" v-model="this.fstartDate"/>
        <div class="dateIcons">
            <img src="../assets/images/datePicker.png" alt="">
        </div>
        <van-popup v-model="startshow" >
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                @cancel="startCancel"
                @confirm="startConfirm"
                @change="startChange" 
            />
        </van-popup>
        <!-- 结束日期 -->
        <van-field label="结束日期：" @click="endshow = true" v-model="this.fendDate"/>
         <div class="dateIcon">
            <img src="../assets/images/datePicker.png" alt="">
        </div>
        <van-popup v-model="endshow" >
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                @cancel="endCancel"
                @confirm="endConfirm"
                @change="endChange" 
            />
        </van-popup>
        <!-- 运费状态弹窗 -->
        <van-field label="运费状态：" @click="stateshow = true" v-model="this.fcarriage"> </van-field>
        <div class="iconBtn">
            <van-icon class="stateIcon" name="arrow-down" />
            <van-button class="freightBtn" size="small" @click="freightBtn()">查询</van-button>
        </div>
        <van-popup v-model="stateshow" :overlay="false">
            <van-picker 
                show-toolbar 
                value-key="name"
                :columns="columns" 
                @change="onChange" 
                @confirm="stateshow = false"
                @cancel="stateshow = false"
            />
        </van-popup>

        <!-- 查询信息展示 -->
        <div class="list-content" id="list-content">
            <van-list
                loading-text="正在查询，请稍后..."
                v-model="loading"
                :finished="finished"
                loading:true
                finished-text="数据加载完毕"
                :offset="2"
                @load="onLoad"
            >
                <van-cell v-for="(item,index) in this.list" :key="index"  class="fListStyle">
                    <van-row class="fvanrow">
                        <van-col span="24"><span class="fListOrderNo">运单号：{{item.fdispatchOrderNo}}</span> </van-col>
                    </van-row>
                    <van-row class="fvanrow">
                        <van-col span="12"><span>收货日期：{{item.fsendDate.substring(0,10)}}</span></van-col>
                        <van-col span="12"><span>业务员：{{item.fdispatcherName}}</span></van-col>
                    </van-row>
                    <van-row class="fvanrow">
                        <van-col span="8"><span>运费：{{item.fcarriage}}</span></van-col>
                        <van-col span="8"><span>送货费：{{item.fdeliveryFee}}</span></van-col>
                        <van-col span="8"><span> 保值费：{{item.fmaintenanceFee}}</span></van-col>
                    </van-row>
                </van-cell>
            </van-list>
        </div>
        <!-- 底部总计栏 -->
        <div class="footTotal">
            <span class="waybill allTotal">总计：</span>
            <ul class="waybill total1">
                <li>运单 {{this.list.length}} 单</li>
                <li>送货费 {{this.fdeliveryFee}} 元</li>
            </ul>
            <ul class="waybill total2">
                <li>运费 {{ftotalFee}} 元</li>
                <li>保值费 {{fhedgFee}} 元</li>
            </ul>
        </div>
    </div>
</template>

<script>
import {DispatchOrderUpCarriageSearch} from '../api/index'
export default {
    data() {
        return {
            loading:false,
            finished: false,
            stateshow:false,
            startshow:false,
            endshow:false,
            currentDate: new Date(),
            fstartDate: "",
            currentDate2: new Date(),
            fendDate: "",
            fcarriage:'',
            ffcarriageType:'',
            fmsgList:'',
            currentPage:0,
            list:[],
            columns:[
                {name:'未结算',fcarriageType:'1'},
                {name:'已结算',fcarriageType:'2'},
                {name:'所有',fcarriageType:'-1'}
            ],
            fdeliveryFee:0,
            ftotalFee:0,
            fhedgFee:0,
            showBtn: true,  // 控制底部按钮盒子显示隐藏
        };
    },
    methods:{
        onClickLeft(){
            this.$router.push({path:"/container", name:"container"})
        },
        onChange(picker,value, index) {
            this.fcarriage = value.name;
            this.fcarriageType = value.fcarriageType;
            console.log(this.fcarriageType)
        },
        startCancel(){
            this.startshow = false;
        },
        startConfirm(){
            this.startshow = false;
        },
        startChange() {
            var date = this.currentDate;
            var line = "-";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            this.fstartDate = date.getFullYear() + line + month + line + strDate;
            this.star = date.getFullYear() + line + month + line + strDate;
            // console.log(this.fstartDate)
        },
        endCancel(){
            this.endshow = false;
        },
        endConfirm(){
            this.endshow = false;
        },
        endChange(){
            var date = this.currentDate;
            var line = "-";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            this.fendDate = date.getFullYear() + line + month + line + strDate;
            this.end = date.getFullYear() + line + month + line + strDate;
        },
        freightBtn(){
            this.onLoad();
            if(this.list.length == 0){
                this.$dialog.alert({
                    title: '温馨提示',
                    message: '暂未数据！'
                });
            }
        },
        onLoad() {
            this.loading = false;
            var timeId = setTimeout(() => {
                if(this.fcarriageType == undefined){
                    this.fcarriageType = '1';
                }
                let msg = {
                    msgId: "1001005125",
                    serId: 1,
                    type: 1,
                    key: 0,
                    source: 1,
                    tokenSta:0,
                    msgBody:{
                        pageSetBody: {
                            pageNo: this.currentPage++,
                            pageSize: 20
                        },
                        fstartDate:this.fstartDate,
                        fendDate:this.fendDate,
                        fcarriageType:this.fcarriageType        
                    }
                    
                };
                DispatchOrderUpCarriageSearch({data:msg})
                .then(res => {
                    if (res.msgBody !== null) {
                        this.fmsgList = res.msgBody.pageOutBody.pageObjBody;
                        for(var i=0;i<this.fmsgList.length;i++){
                            this.list.push(this.fmsgList[i])
                            // 运费
                            this.ftotalFee = this.ftotalFee + this.fmsgList[i].fcarriage;
                            // 送货费
                            this.fdeliveryFee = this.fdeliveryFee + this.fmsgList[i].fdeliveryFee;
                            // 保值费
                            this.fhedgFee = this.fhedgFee + this.fmsgList[i].fmaintenanceFee;
                        }
                        
                    } else{
                        // this.$dialog.alert({
                        //     title: '温馨提示',
                        //     message: '暂未数据！'
                        // });
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            },3000);
            
        }
    },
    mounted(){
        let winHeight = document.documentElement.clientHeight;                           //视口大小
        document.getElementById('list-content').style.height = (winHeight - 246) +'px';  //调整上拉加载框高度
        window.onresize= ()=>{
            if(this.winHeight>document.documentElement.clientHeight) {
               this.showBtn =false
            }else{
                this.showBtn = true
            }
        }
    },
    created(){
        var date = new Date();
        var line = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        this.star = date.getFullYear() + line + month + line + strDate + " ";
        this.fstartDate = this.star;
        this.end = date.getFullYear() + line + month + line + strDate + " ";
        this.fendDate = this.end;
        this.fcarriage = '未结算'
    }
}
</script>

<style lang="less" scoped>
#freight{
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
    .van-button--small{
        font-size:14px;
    }
    .van-nav-bar__title,.van-icon-arrow-left,.van-nav-bar__text{
        color: #ffffff;
    }
    .van-popup{
        width: 100%;
    }
}
.cTitle{
    color: #ffffff;
    background-color: #3385ff; 
}
.dateIcon{
    position: absolute;
    top: 102px;
    right: 86px;
}
.dateIcons{
    position: absolute;
    top: 56px;
    right: 85px;
}
.iconBtn{
    position: absolute;
    right: 12px;
    top: 90px;
    .freightBtn{
        background-color: #CACACA;
    }
    .stateIcon{
        margin-right: 18px;
        margin-top: 6px;
    }
}
.footTotal{
    width: 100%;
    background-color: #ffffff;
    color: #323233;
    position: absolute;  
    .allTotal{
        width: 16%;
        text-align: center;
        margin-top: 13px;
    }
    .waybill{
        float: left;
        padding: 8px;
        li{
            padding: 3px;
            font-size: 14px;
        }
    }
    .total1{
        margin-right: 20px;
    }
}
.list-content{
    height: 496px !important;
    overflow:scroll;
    background-color: #eeeeee;
    .fListStyle{
        padding: 5px;
        background-color: #ffffff;
        margin: 8px 0px;
        .fListOrderNo{
            font-size: 18px;
            font-weight: 500;
        }
    }
}
</style>

