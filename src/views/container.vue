<template>
    <div class="container">
        <van-nav-bar
            class="cTitle"
            title="万里物流"
            left-text="返回"
            left-arrow
            fixed
            @click-left="onClickLeft"
        />
        <van-row>
            <van-col span="8">
                <div class="flexDemo"  @click="apath()">
                    <img src="../assets/images/wlth.png" alt="运单退回">
                    <p>运单退回</p>
                 </div>
            </van-col>
            <van-col span="8">
                <div class="flexDemo" @click="bpath()">
                    <img src="../assets/images/wlq4.png" alt="收货签收">
                    <p>收货签收</p>
                </div>
            </van-col>
            <van-col span="8">
                <div class="flexDemo" @click="cpath()">
                    <img src="../assets/images/wlsq.png" alt="入库签收">
                    <p>入库签收</p>
                </div>
            </van-col>
        </van-row>
        <van-row>
            <van-col span="8">
                <div class="flexDemo" @click="dpath()">
                    <img src="../assets/images/wlqs3.png" alt="装车签收">
                    <p>装车签收</p>
                 </div>
            </van-col>
            <van-col span="8">
                <div class="flexDemo" @click="epath()">
                    <img src="../assets/images/wltc2.png" alt="停发货查询">
                    <p>停发货查询</p>
                </div>
            </van-col>
            <van-col span="8">
                <div class="flexDemo" @click="fpath()">
                    <img src="../assets/images/wlc.png" alt="装车单管理">
                    <p>装车单管理</p>
                </div>
            </van-col>
        </van-row>
        <van-row>
            <van-col span="8">
                <div class="flexDemo" @click="gpath()">
                    <img src="../assets/images/wlqs2.png" alt="市场收货查询">
                    <p>市场收货查询</p>
                 </div>
            </van-col>
            <van-col span="8">
                <div class="flexDemo" @click="hpath()">
                    <img src="../assets/images/wlr3.png" alt="未卸车装车单查询">
                    <p>未卸车装车单查询</p>
                </div>
            </van-col>
            <van-col span="8">
                <div class="flexDemo" @click="ipath()">
                   <img src="../assets/images/wlyf.png" alt="交付运费查询">
                    <p>交付运费查询</p>
                </div>
            </van-col>
        </van-row>
        <van-row>
            <van-col span="8">
                <div class="flexDemo" @click="jpath()">
                    <img src="../assets/images/wlbq1.png" alt="补打标签">
                    <p>补打标签</p>
                </div>
            </van-col>
            <van-col span="8">
                <div class="flexDemo" @click="kpath()">
                    <img src="../assets/images/wlsfz4.png" alt="身份证采集">
                    <p>身份证采集</p>
                </div>
            </van-col>
            <van-col span="8">
                <div class="flexDemo" @click="lpath()">
                    <img src="../assets/images/wlxd.png" alt="运单录入">
                    <p>运单录入</p>
                </div>
            </van-col>
        </van-row>
        <van-row>
            <van-col span="8">
                <div class="flexDemo" @click="mpath()">
                    <img src="../assets/images/ydDetail.png" alt="运单详情">
                    <p>运单详情</p>
                </div>
            </van-col>
            <van-col span="8">
            </van-col>
            <van-col span="8">
            </van-col>
        </van-row>
    </div>
</template>

<script>

export default {
    data(){
        return{
            stopList:""
        }
    },
    mounted(){
        localStorage.setItem('pageName',JSON.stringify('contianer'));
    },
    methods:{
        onClickLeft(){
            this.$router.push({path:"/index", name:"index"})
        },
        apath(){
            this.$dialog.alert({
                title: '温馨提示',
                message: '暂未开放，敬请期待！'
            });
        },
        bpath(){
            this.$router.push({path:"/goodsReceipt", name:"goodsReceipt"})
        },
        cpath(){
            this.$router.push({path:"/storageReceipt", name:"storageReceipt"})
        },
        dpath(){
            this.$router.push({path:"/truckReceipt", name:"truckReceipt"})
        },
        epath(){
            this.$router.push({path:"/stopInquire", name:"stopInquire"});
        },
        fpath(){
            this.$router.push({path:"/installManage", name:"installManage"})
        },
        gpath(){
            this.$router.push({path:"/marketInquire", name:"marketInquire"})
        },
        hpath(){
            this.$router.push({path:"/noUnloading", name:"noUnloading"})
        },
        ipath(){
            this.$router.push({path:"/freightInquire", name:"freightInquire"})
        },
        jpath(){
            this.$router.push({path:"/reprint", name:"reprint"})
        },
        kpath(){
            this.$router.push({path:"/identity", name:"identity"})
        },
        lpath(){
            this.$router.push({path:"/order", name:"order"})
        },
        mpath(){
            this.$router.push({path:"/orderDetail", name:"orderDetail"})
        }
    }
}
</script>
<style lang="less" scoped>
.container{
    margin-top: 44px;
    .van-nav-bar__title,.van-icon-arrow-left,.van-nav-bar__text{
        color: #ffffff;
    }
}
.cTitle{
    color: #ffffff;
    background-color: #3385ff; 
}
.flexDemo{
    height: 90px;
    text-align: center;
    font-size: 14px;
    border-bottom: 1px solid #E6E6E8;
    border-right: 1px solid #E6E6E8;
    padding: 18px 0px;
}
</style>