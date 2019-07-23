<template>
    <div id="noloading">
        <van-nav-bar
            class="cTitle"
            title="未卸车装车单查询"
            left-arrow
            fixed
            @click-left="onClickLeft"
        />
        <van-field label="装车站点：" placeholder="请选择装车站点" @click="fsite()" v-model="this.siteName "> </van-field>
        <!-- 开始日期弹窗 -->
        <van-field label="开始日期：" @click="startshow = true" v-model="this.fstartDate"/>
        <div class="dateIcons">
            <img src="../assets/images/datePicker.png" alt="">
        </div>
        <van-popup v-model="startshow" >
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                @cancel="startCancel()"
                @confirm="startConfirm()"
                @change="startChange()" 
            />
        </van-popup>
        <!-- 结束日期弹窗 -->
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
        <div class="iconBtn">
            <van-button class="unloadBtn" size="small" @click="noReceipt()">查询</van-button>
        </div>
        <!-- 查询信息展示 -->
        <van-list  @load="onLoad" >
            <van-cell v-for="(item, index) in this.fmsgList" :key="index" class="fListMsg" @click="fTouchLi(index,item)" :class="{ active: isActive == index }">
                <van-row class="fvanrow">
                    <van-col span="24"><span class="fListOrderNo">装车单号：{{item.floadListSerialNo}}</span></van-col>
                </van-row>
                <van-row class="fvanrow">
                    <van-col span="10"><span> 装车站点：{{item.fsendSiteName}}</span></van-col>
                    <van-col span="14"><span> 到达站点：{{item.freceiveSiteName}}</span></van-col>
                </van-row>
                <van-row class="fvanrow">
                    <van-col span="12"><span>装车时间：{{item.floadDate.substring(0,10)}}</span></van-col>
                    <van-col span="12"><span>未卸车单数：{{item.funloadSum}}</span></van-col>
                </van-row>
            </van-cell>
        </van-list>
    </div>
</template>

<script>
import {UnLoadListSearch,LoadListSearchByNo} from '../api/index'
export default {
    data() {
        return {
            stateshow:false,
            startshow:false,
            endshow:false,
            currentDate: new Date(),
            fstartDate: "",
            fendDate: "" ,
            fmsgList:"",
            isActive:false,
            // 存放从后台获取的数据
            siteDatas:[],
            // 从本地缓存中去站点数据
            siteNo:"",     
            siteName:"",
            fsendSiteNo:"",
            floadListSerialNo:""    
        };
    },
    methods:{
        onClickLeft(){
            this.$router.push({path:"/container", name:"container"})
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
            var seperator2 = ":";
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
            var seperator2 = ":";
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
        fsite(){
            localStorage.setItem('pageName',JSON.stringify('noloading'));
            this.$router.push({path:"/siteDetailMsg", name:"siteDetailMsg"});      
        },
        onLoad(){

        },
        noReceipt(){
            let msg = {
                msgId: "1001005131",
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
                    fstartDate:this.fstartDate,
                    fendDate:this.fendDate,
                    funloadStatus:"0", 
                    fsendSiteNo:this.fsendSiteNo                     
                }
                
            };
            UnLoadListSearch({data:msg})
            .then(res => {
                if(res.msgBody == null && res.msgBody != ""){
                    this.$toast.fail('暂无数据！')
                }else{
                    this.fmsgList = res.msgBody.pageOutBody.pageObjBody;
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        // 点击每一项li数据事件
        fTouchLi(index,item){
            this.isActive = index;
            this.floadListSerialNo = item.floadListSerialNo
            console.log(this.floadListSerialNo)
            let msg = {
                msgId: "1001005122",
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
                    floadListNo:this.floadListSerialNo,
                    funloadStatus:"0", 
                 
                }        
            };
            LoadListSearchByNo({data:msg})
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error)
            })
        },
    },
    created(){
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        this.star = date.getFullYear() + seperator1 + month + seperator1 + strDate;
        this.fstartDate = this.star;
        this.end = date.getFullYear() + seperator1 + month + seperator1 + strDate;
        this.fendDate = this.end;
    },
    mounted(){
        var siteName =  JSON.parse(sessionStorage.getItem("siteName"));
        var siteNo = JSON.parse(sessionStorage.getItem("siteNo"));
        var pageName =  JSON.parse(localStorage.getItem("pageName"));
        // console.log(siteName)
        if(siteName != null && pageName == 'noloading'){
            this.siteName = siteName;
        }
        if(siteNo != null){
            this.fsendSiteNo = siteNo;
        }
        
    }
}
</script>

<style lang="less" scoped>
#noloading{
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
    top: 95px;
    right: 105px;
}
.dateIcons{
    position: absolute;
    top: 52px;
    right: 105px;
}
.iconBtn{
    position: absolute;
    right: 12px;
    top: 90px;
    .unloadBtn{
        background-color: #CACACA;
    }
}
.fListMsg{
    margin: 8px 0px;
    background-color: #ffffff;
    .fvanrow{
        padding: 3px 0px;
    }
    .fListOrderNo{
        font-size: 18px;
        font-weight: 520;
       
    }
}
.active{
    background-color: #DFDDDB;
}
</style>
