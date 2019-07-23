<template>
    <div id="alreadyStorage">
         <van-nav-bar
            class="cTitle"
            title="已入库查询"
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
        <van-button class="receiptBtn" size="small" @click="aStorageBtn()">查询</van-button>
        <!-- 遍历从后台获取的数据 -->
        <ul class="fListUl">
            <li class="fListStyle" v-for="(item,index) in this.flistMsg" :key="index">
                <van-row class="flistRow">
                    <van-col span="12">
                        <span class="fListOrderNo">运单号：{{item.fdispatchOrderNo}}</span>
                    </van-col>
                    <van-col span="12">
                        <span>件数：{{item.fgoodsNums}}</span>
                    </van-col>
                </van-row>
                <van-row class="flistRow">
                    <van-col span="12"><span>到达地：{{item.freceiveSiteName}}</span></van-col>
                    <van-col span="12"><span>发货地：{{item.fsendSiteName}}</span></van-col>
                </van-row>
            </li>
        </ul>
    </div>
</template>
<script>
import {DispatchOrderInstuckSearch} from '../api/index';
export default {
    data(){
        return{
            startshow:false,
            endshow:false,
            currentDate: new Date(),
            fstartDate: "",
            fendDate: "",
            flistMsg:""
        }
    },
    methods:{
        onClickLeft(){
            this.$router.push({path:"/storageReceipt", name:"storageReceipt"})
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
            this.star = date.getFullYear() + line + month + line + strDate + " ";
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
            this.fendDate = date.getFullYear() + line + month + line + strDate 
            this.end = date.getFullYear() + line + month + line + strDate + " ";
            console.log(this.fendDate);
        },
        aStorageBtn(){
            let msg = {
                msgId: "1001005112",
                serId: 1,
                type: 1,
                key: 0,
                source: 1,
                tokenSta:0,
                msgBody:{
                    pageSetBody: {
                        pageNo: 0,
                        pageSize: -1
                    },
                    fstartDate:this.fstartDate,
                    fendDate:this.fendDate
                    
                }
                
            };
            DispatchOrderInstuckSearch({data:msg})
            .then(res => {
                if (res.msgBody != null && res.msgBody != '') {
                    this.flistMsg = res.msgBody.pageOutBody.pageObjBody;
                    if(this.flistMsg.length == 0){
                        this.$toast.fail('暂无数据！');
                    }
                    console.log(this.flistMsg)
                } else{
                    this.$toast.fail('数据错误！');
                }
            })
            .catch(error => {
                console.log(error)
            }) 
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
        this.freightState = '未结算'
    }
}
</script>
<style lang="less" scoped>
#alreadyStorage{
    margin-top: 45px;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    bottom: 0px;
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
    top: 52px;
    right: 95px;
}
.dateIcons{
    position: absolute;
    top: 8px;
    right: 95px;
}
.receiptBtn{
    background-color: #CACACA;
    position: absolute;
    top: 49px;
    right: 6px;
}
.fListUl{
    margin-bottom: 40px;
    .fListStyle{
        background-color: #ffffff;
        padding: 8px 5px;
        border-bottom: 6px solid #eeeeee;
        .fListOrderNo{
            font-size: 18px;
            font-weight: 500;
        }
        .flistRow{
            padding: 3px;
        }
    }
}
</style>
