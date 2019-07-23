<template>
    <div id="identity">
        <van-nav-bar
            class="cTitle"
            title="身份证采集"
            left-arrow
            fixed
            @click-left="onClickLeft"
        />
        
        <van-cell-group>
            <div class="toggleInput">
                <span class="client" @click="titleChange()">{{titleToggle}} </span>
                <van-popup v-model="stateshow" :overlay="false" position="top">
                    <van-picker              
                        show-toolbar
                        value-key="name"
                        :columns="columns" 
                        @change="onChange" 
                        @confirm="stateshow = false"
                        @cancel="stateshow = false"
                    />
                </van-popup>
                <input autofocus name="toggleTitle" class="cplace" type="text" :placeholder="inputPlace" v-model="fbindCode" />
            </div>
            <van-field
                v-model="xm"
                label="姓   名："
            />
            <van-field
                v-model="sfzh"
                label="身份证："
            />
        </van-cell-group>
        <div class="wrapBtn">
            <van-button class="twobtn gBtn" @click="publick()">公</van-button> 
            <van-uploader :after-read="onRead">
                <van-button class="twobtn zBtn" ref="sfzImage">自</van-button>
            </van-uploader>
        </div>
        <!-- 底部按钮 -->
        <van-button  v-show="showBtn" class="bindBtn" size="normal" @click="msgBind()">绑定</van-button>
    </div>
</template>

<script>
import {StaffCustomerBind , UserIdCardAuthen} from '../api/index'
export default {
    data(){
        return{
            stateshow:false,
            freightState:"",
            titleToggle:'客户采集',
            ftype:"",
            fbindCode:"",
            sfzh:"",
            xm:"",
            idCardStr:"",
            inputPlace: '请输入客户会员卡号',
            columns:[
                {name:'客户采集',ftype:"1"},
                {name:'员工采集',ftype:"2"}
            ],
            showBtn:true
        }
    },
    methods:{
        onClickLeft(){
            this.$router.push({path:"/container", name:"container"})
        },
        publick(){
            this.$dialog.alert({
                title: '温馨提示',
                message: '请安装实名组件！'
            });
        },
        onChange(picker,value, index) {
            this.freightState = value.name;
            // console.log(value.name)
            if(value.name == '员工采集'){
                this.titleToggle='员工采集';
                this.inputPlace = '输入工号'
            }
            if(value.name == '客户采集'){   
                this.titleToggle='客户采集';
                this.inputPlace = '请输入客户会员卡号'
            }
            this.ftype = value.ftype;
            // console.log(value.ftype)
        },
        titleChange(){
            this.stateshow = true;           
        },
        msgBind(){
            let msg = {
                msgId: "10010051235",
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
                    ftype:this.ftype,
                    fbindCode:this.fbindCode,
                    xm:this.xm,
                    sfzh:this.sfzh   
                }
                
            };
            StaffCustomerBind({data:msg})
            .then(res => {
                console.log(res)
                this.$dialog.alert({
                    title: '温馨提示',
                    message: res.msgBody.staInfo
                })
            })
            .catch(error => {
                console.log(error)
            })
        },
        uploadPic(){
            console.log(res)
        },
        onRead(file){
            this.idCardStr = file.content; 
            console.log(this.idCardStr)
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
        }
    },
    mounted(){
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
#identity{
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
    .van-field__label {
        max-width: 77px;
    }
}
.cTitle{
    color: #ffffff;
    background-color: #3385ff; 
}
.wrapBtn{
    width: 137px;
    height: 80px;
    float: right;
    margin-top: 12px;
    background-color: #ffffff;
    .twobtn{
        background-color: #F17D00;
        color: #ffffff;
        margin: 18px 12px 0px 0px;
        border-radius: 6px;
    }
    .gBtn{
        margin-left: 12px;
    }
}
.bindBtn{
    background-color: #F17D00;
    color: #ffffff;
    width: 40%;
    margin-left: 30%;
    border-radius: 6px;
    position: fixed;
    bottom: 36px;
}
.toggleInput{
    padding: 10px 15px;
    border-bottom: 1px solid #EFF0F3;
    background: url(../assets/images/select.png) no-repeat 91px 14px;
    .client{
        width: 33%;
        color: #323233;
    }
    .cplace{
        margin-left: 45px;
        border: none;
        color: #323233;
    }
}

</style>

