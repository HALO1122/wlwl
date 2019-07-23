<template>
    <div id="print">
        <van-nav-bar
            class="cTitle"
            title="补打标签"
            left-arrow
            fixed
            @click-left="onClickLeft"
        />
        <van-cell-group>
            <van-field
                v-model="fdispatchOrderNo"
                autofocus
                label="运单号："
                placeholder="请扫描运单号"
            />
            <van-field
                autofocus
                label="标签编号："
                placeholder="要补打的标签编号"
            />
        </van-cell-group>

        <div class="fgoodsnum" v-show="isShow">
            <van-field
                autofocus
                v-model="storeData"
                label="货物数量："
            />
        </div>

        <div class="checBoxs">
            <van-checkbox class="simpleBox" v-model="checked1">补打标签</van-checkbox>
            <van-checkbox class="simpleBox" v-model="checked2">票据</van-checkbox>
            <van-checkbox class="simpleBox" v-model="checked3">运单生成</van-checkbox>
        </div>

        <!-- 底部按钮 -->
        <van-button class="bindBtn" @click="confifrm()">确定</van-button>
    </div>
</template>

<script>
import {CheckDispatchOrderNo,GetMissQRCodeValue} from '../api/index'
export default {
    data(){
        return {
            fdispatchOrderNo:"",
            fmsgList:"",
            storeData:"",
            isShow:false,
            checked1:true,
            checked2:true,
            checked3:true
        }
    },
    mounted(){
        //触发socket连接
        this.$socket.emit('printdisotder',44993495);
    },
    // websocket请求服务器
    sockets:{
        connect(){
            console.log('补打标签页面连接成功')
        },
        // 检查运单号是否正确
        printdisotder(res){
            console.log('333333333',res)
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
                    console.log('cccccccccccc')
                    // 将websocket广播的运单号展示到输入框中
                    this.fdispatchOrderNo = res;

                    // 显示运单详细信息
                    let msg = {
                        msgId: "1001005129",
                        serId: 1,
                        type: 1,
                        key: 0,
                        source: 1,
                        tokenSta:0,
                        msgBody:{
                            fdispatchOrderNo:this.fdispatchOrderNo 
                        }
                        
                    };
                    GetMissQRCodeValue({data:msg})
                    .then(data => {
                        if(data.msgBody !== "" || data.msgBody !== null){
                            if(data.msgBody.sta == 'err'){
                                this.$toast.fail(data.msgBody.staInfo)
                            } else{
                                this.storeData = data.msgBody.fgoodsNums;
                                this.isShow  = true;
                                console.log(this.storeData)
                            }
                        } else{
                            this.$toast.fail('暂无数据！');
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
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
        confifrm(){
            let dispatchOrder = this.fdispatchOrderNo;
            if(/^[0-9]*$/.test(dispatchOrder)){
                console.log('运单号是纯数字---查询运单详情')
            } else {
                console.log('调用websocket')
            }
            // if(this.fdispatchOrderNo != ""){
            //     let msg = {
            //         msgId: "1001005129",
            //         serId: 1,
            //         type: 1,
            //         key: 0,
            //         source: 1,
            //         tokenSta:0,
            //         msgBody:{
            //             fdispatchOrderNo:this.fdispatchOrderNo 
            //         }
                    
            //     };
            //     GetMissQRCodeValue({data:msg})
            //     .then(res => {
            //         if(res.msgBody !== "" || res.msgBody !== null){
            //             if(res.msgBody.sta == 'err'){
            //                 this.$toast.fail(res.msgBody.staInfo)
            //             } else{
            //                 this.storeData = res.msgBody.fgoodsNums;
            //                 this.isShow  = true;
            //                 console.log(this.storeData)
            //             }
            //         } else{
            //             this.$toast.fail('请求错误！');
            //         }
            //     })
            //     .catch(error => {
            //         console.log(error)
            //     })
            // } else {
            //     this.$toast.fail("请输入运单号");
            // }
        }
    }
}
</script>

<style lang="less" scoped>
#print{
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
}
.cTitle{
    color: #ffffff;
    background-color: #3385ff; 
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
.checBoxs{
    display: flex;
    margin: 20px;
    .simpleBox{
        padding: 0px 20px;
    }
}
</style>

