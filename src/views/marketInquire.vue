<template>
    <div id="market">
        <van-nav-bar
            class="cTitle"
            title="市场收货查询"
            left-arrow
            fixed
            @click-left="onClickLeft"
        />
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
                @cancel="endCancel()"
                @confirm="endConfirm()"
                @change="endChange()" 
                
            />
        </van-popup>
        <!-- 货物状态弹窗 -->
        <van-field label="货物状态：" @click="stateshow = true" v-model="this.goodsState"> </van-field>
        <div class="iconBtn">
            <van-icon class="stateIcon" name="arrow-down" />
            <van-button class="marketBtn" size="small" @click="marketBtn()">查询</van-button>
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
                        <van-col span="24">
                            <span class="fListOrderNo">运单号：{{item.fdispatchOrderNo}}</span>
                        </van-col>
                    </van-row>
                    <van-row class="fvanrow">
                        <van-col span="12"><span>市场：{{item.fsendSiteName}}</span></van-col>
                        <van-col span="12"><span>件数：{{item.fgoodsNums}}</span></van-col>
                    </van-row>
                    <van-row class="fvanrow">
                        <van-col span="12"><span>到达地：{{item.freceiveSiteName}}</span></van-col>
                        <van-col span="12"><span>收货日期：{{item.fsendDate.substring(0,10)}}</span></van-col>
                    </van-row>
                </van-cell>
            </van-list>
        </div>
    </div>
</template>

<script>
import {DispatchOrderPackSearch} from '../api/index'
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
            fendDate: "",
            goodsState:'',
            fdispatchOrderType:'',
            fmsgList:'',
            currentPage:0,
            list:[],
            columns:[
                {name:'签收',fdispatchOrderType:'1'},
                {name:'入库',fdispatchOrderType:'2'},
                {name:'装车',fdispatchOrderType:'3'},
                {name:'出库',fdispatchOrderType:'4'},
                {name:'所有',fdispatchOrderType:'-1'}
            ]           
        };
    },
    methods:{
        onClickLeft(){
            this.$router.push({path:"/container", name:"container"})
        },
        onChange(picker,value, index) {
            this.goodsState = value.name;
            this.fdispatchOrderType = value.fdispatchOrderType
        },
        startCancel(){
            this.startshow = false;
        },
        startConfirm(){
            this.startshow = false;
        },
        startChange() {
            var date = this.currentDate;
            var seperator1 = "-";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            this.fstartDate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
            this.star = date.getFullYear() + seperator1 + month + seperator1 + strDate;

        },
        endCancel(){
            this.endshow = false;
        },
        endConfirm(){
            this.endshow = false;
        },
        endChange(){
            var date = this.currentDate;
            var seperator1 = "-";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            this.fendDate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
            this.end = date.getFullYear() + seperator1 + month + seperator1 + strDate;
        },
        marketBtn(){
            this.onLoad();
            console.log(this.list)
            if(this.list.length == 0){
                this.$dialog.alert({
                    title: '温馨提示',
                    message: '暂未数据！'
                });
            }
        },
        onLoad() {
            let _self = this;
            _self.loading = false;
            var timeId = setTimeout(() => {
                if(_self.fdispatchOrderType == ''){
                    _self.fdispatchOrderType = 1;
                }
                let msg = {
                    msgId: "1001005127",
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
                        fdispatchOrderType:this.fdispatchOrderType      
                    }                
                };
                DispatchOrderPackSearch({data:msg})
                .then(res => {
                    if(res.msgBody != null){
                        _self.fmsgList = res.msgBody.pageOutBody.pageObjBody;
                        _self.fmsgList.forEach(element => {
                            _self.list.push(element)
                        });
                    } 
                })
                .catch(error => {
                    console.log(error)
                })
            },3000);
            
        }
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
        this.star = date.getFullYear() + seperator1 + month + seperator1 + strDate + " ";
        this.fstartDate = this.star;
        this.end = date.getFullYear() + seperator1 + month + seperator1 + strDate + " ";
        this.fendDate = this.end;
        this.goodsState = '签收';
    },
    mounted(){
        let winHeight = document.documentElement.clientHeight   //视口大小
        document.getElementById('list-content').style.height = (winHeight - 196) +'px'  //调整上拉加载框高度
    } 
}
</script>

<style lang="less" scoped>
#market{
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
    .van-field__control{
        color: aqua;
    }
}
.cTitle{
    color: #ffffff;
    background-color: #3385ff; 
}
.dateIcon{
    position: absolute;
    top: 51px;
    right: 85px;
}
.dateIcons{
    position: absolute;
    top: 10px;
    right: 85px;
}
.iconBtn{
    position: absolute;
    right: 12px;
    top: 90px;
    .marketBtn{
        background-color: #CACACA;
    }
    .stateIcon{
        margin-right: 12px;
        margin-top: 6px;
    }
}
.fvanrow{
    padding: 3px 0;
}
.list-content{
    overflow:scroll;
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
