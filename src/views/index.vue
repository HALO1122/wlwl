<template>
    <div id="index">
        <van-nav-bar
            class="cTitle"
            title="万里物流"
            left-arrow
            fixed
        />

        <img class="limg" src="../assets/images/logo.png">
        <!-- <img class="limg" src="../assets/wlwllogo.svg"> -->
        <van-cell-group>
            <van-field
                v-model="message.fusername"
                name="fusername"
                class="fname"
                label=""
                placeholder="请输入用户名"
            />
            <van-field
                v-model="message.fpassword"
                name="fpassword"
                class="fpassword"
                type="password"
                label=""
                placeholder="请输入密码"
            />
        </van-cell-group>
        <van-button class="userLoginBtn" type="info" size="large" @click="btnLogin()">用户登录</van-button>
    </div>
</template>
<script>
import {LoginVerification} from "../api/index"
export default {
    data(){
        return {
            message:{
                fusername:"",
                fpassword:""
            }
        }
    },
    methods:{
        Register(){
            let msg = {
                msgId: "1001005000",
                serId: 1,
                type: 1,
                key: 0,
                source: 1,
                tokenSta:0,
                msgBody:this.message
            };
            LoginVerification({data:msg})
            .then(res => {
                if (res.msgBody !== "") {
                    localStorage.setItem('tokenInfoToken',JSON.stringify(res.msgBody.packet_token))
                    localStorage.setItem('tokenInfoCheck',JSON.stringify(res.msgBody.packet_check))
                    localStorage.setItem('tokenInfoType',JSON.stringify(res.msgBody.packet_type))
                    if (res.msgBody.sta == "ok") {
                        this.$toast.success("登录成功！");
                        this.$router.push({ path: "/container", name: "container" });
                    } else {
                        this.$toast.fail(res.msgBody.staInfo);
                    }
                }
            })
            .catch(error => {
                console.log(error);
            });
        },
        btnLogin(){
            // console.log('login')
            let fusername = this.message.fusername;
            let fpassword = this.message.fpassword;
            if( fusername == "" ){
                this.$toast.fail("用户名不可为空");
            } else if( fpassword == "" ){
                this.$toast.fail("请输入用户密码");
            } else{
                this.Register()
            }
        }
            
    }
}
</script>
<style lang="less" scoped>
#index{
    // background-color: #F2F3F5;
    text-align: center;
    .van-cell{
        font-size: 16px;
    }
}
.cTitle{
    background-color: #3385ff;
    .van-nav-bar__title{
        color: #ffffff !important;
    }
}
.limg{
  margin-top: 100px;
  margin-bottom: 36px;
}
.userLoginBtn{
    margin-top: 80px;
    border-radius: 6px;
    width: 92%;
    margin-left: 3%;
}
.fname{
    background: url(../assets/images/dlzh1.png) no-repeat 48px 5px;
}
.fpassword{
    background: url(../assets/images/dlma5.png) no-repeat 53px 9px;
}
</style>