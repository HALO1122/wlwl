<template>
    <div id="sInquire">
        <van-nav-bar
            class="cTitle"
            title="停发货查询"
            left-arrow
            fixed
            @click-left="onClickLeft"
        />

        <div class="list-content" id="list-content">
            <van-list
                loading-text="正在查询，请稍后..."
                v-model="loading"
                :finished="finished"
                immediate-check:true
                loading:true
                finished-text="数据加载完毕"
                :offset="2"
                @load="onLoad"
            >
                <van-cell class="fListStyle" v-for="(item,index) in this.list" :key="index">
                    <van-row>
                        <van-col span="12">
                            <span class="fListOrderNo">运单号：{{item.fdispatchOrderNo}}</span>
                        </van-col>
                        <van-col span="12">
                            <span>入库日期：{{item.fcreatedTime.substring(0,10)}}</span>
                        </van-col>
                    </van-row>
                    <p style="margin:3px 0px">发货地：{{item.fsendSiteName}}</p>
                    <van-row>
                        <van-col span="12"><span> 到达地：{{item.freceiveSiteName}}</span></van-col>
                        <van-col span="12"><span>件数：{{item.fgoodsNums}}</span></van-col>
                    </van-row>
                </van-cell>
            </van-list>
        </div>
    </div>
</template>

<script>
import {StopShipmentSearch} from "../api/index.js"
export default {
    data(){
        return{
            fList:"",
            fList2:"",
            list:[],
            loading:false,
            finished: false,
            currentPage:0,
        }
    },
    methods:{
        onClickLeft(){
            this.$router.push({path:"/container", name:"container"})
        },
        onLoad() {
            // 异步更新数据
            var timeId = setTimeout(() => {
                let msg = {
                    msgId: "1001005117",
                    serId: 1,
                    type: 1,
                    key: 0,
                    source: 1,
                    tokenSta:0,
                    msgBody:{
                        pageSetBody: {
                            pageNo: this.currentPage++,
                            pageSize: 20
                        }
                    }
                };
                StopShipmentSearch({data:msg})
                .then(res => {
                    if(res.msgBody != ""){
                        // 存放每页数据
                        this.fList = res.msgBody.pageOutBody.pageObjBody;
                        // 总数据条数
                        this.fList2 = res.msgBody.pageOutBody;
                        // 存放总数据
                        this.fList.forEach(element => {
                            this.list.push(element)
                        });
                        console.log(this.list)
                    }  else{
                        this.$toast.fail('数据错误')
                    }
                })
                .catch(error => {
                    console.log(error)
                    this.$toast.fail('请求服务器超时')
                })
                // 加载状态结束
                this.loading = false;
                // 数据全部加载完成
                if (this.fList.length >= this.fList2.count) {
                    this.finished = true;
                }
            }, 5000);
            // clearTimeout(timeId)
        }
    },
    mounted(){
        let winHeight = document.documentElement.clientHeight                          //视口大小
        document.getElementById('list-content').style.height = (winHeight - 46) +'px'  //调整上拉加载框高度
    }
}
</script>

<style lang="less" scoped>
#sInquire{
    background-color: #EEEEEE;
    margin-top: 45px;
    .van-cell,.van-button--normal{
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
.list-content{
    overflow:scroll;
    .fListStyle{
        margin: 10px 0px;
        padding: 4px 8px;
        background-color: #ffffff !important ;
        .fListOrderNo{
            color: #0A1C6D;
            font-size: 18px;
            font-weight: 500;
        }
    }
}

</style>
