<template>
    <div id="sitemsg">
        <van-nav-bar
            class="cTitle"
            left-arrow
            fixed
            @click-left="onClickLeft"
        />
        
        <van-search
            v-model="fname"
            placeholder="请输入搜索地址"
            show-action
            autofocus
            @focus="search_site"
        >
            <div slot="action">搜索</div>
        </van-search>

        <ul>
            <li v-for="(item,index) in this.siteDatas" :key="index" class="siteLi" @click="singleSite(index,item)">
                {{item.name}}
            </li>
        </ul>
    </div>
</template>

<script>
import {SiteNameVagueSearch} from '../api/index'
export default {
    data(){
        return{
            fname:"",
            fsiteList:"",
            fsiteLi:"",
            siteDatas:[],
            siteData:[] 
        }
    },
    methods:{
        onClickLeft(){
            var pageName =  JSON.parse(localStorage.getItem("pageName"));
            if(pageName == 'noloading'){
                this.$router.push({path:"/noUnloading", name:"noUnloading"})
            }
            if(pageName == 'gReceipt'){
                this.$router.push({path:"/goodsReceipt", name:"goodsReceipt"})
            }
            if(pageName == 'installManage'){
                this.$router.push({path:"/installManage", name:"installManage"})
            }
            
        },
        singleSite(index,item){
            sessionStorage.setItem('siteName',JSON.stringify(item.name));
            sessionStorage.setItem('siteNo',JSON.stringify(item.siteNo));

            var pageName =  JSON.parse(localStorage.getItem("pageName"));
            if(pageName == 'noloading'){
                this.$router.push({path:"/noUnloading", name:"noUnloading"})
            }
            if(pageName == 'gReceipt'){
                this.$router.push({path:"/goodsReceipt", name:"goodsReceipt"})
            }
            if(pageName == 'installManage'){
                this.$router.push({path:"/installManage", name:"installManage"})
            }
        },
        init(){
            let _self = this;
            let msg = {
                msgId: "1001005101",
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
                    fname:"",                  
                }
                
            };
            SiteNameVagueSearch({data:msg})
            .then(res => {
                if(res.msgBody != "" && res.msgBody != null){
                    _self.fsiteList = res.msgBody.pageOutBody.pageObjBody;
                    _self.siteDatas.push({name:"所有站点",siteNo:""})
                    _self.fsiteList.forEach(element => {
                        var eleName = element.fname;
                        var eleSite = element.fsiteNo;
                        _self.siteDatas.push({name:eleName,siteNo:eleSite})
                    });
                    // console.log(this.siteDatas)
                } else if(res.msgBody == null){
                    // _self.$toast.fail('暂无数据！')
                } else {
                    _self.$toast.fail('请求错误！')
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        search(value){
            let _self = this;
            if(!value){
                _self.siteDatas=[];
                return;
            }
            let msg = {
                msgId: "1001005101",
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
                    fname:this.fname,                  
                }	
            };
            SiteNameVagueSearch({data:msg})
            .then(res => {
                if(res.msgBody != "" && res.msgBody != null){
                    _self.fsiteLi = res.msgBody.pageOutBody.pageObjBody;
                    _self.siteData = [];
                    _self.fsiteLi.forEach(element => {
                        var eleName = element.fname;
                        var eleSite = element.fsiteNo;
                        _self.siteData.push({name:eleName,siteNo:eleSite})
                    });
                    _self.siteDatas = _self.siteData;
                    _self.fsiteList = this.fsiteLi;
                } else if(res.msgBody == null){
                    // _self.$toast.fail('暂无数据！')
                } else {
                    _self.$toast.fail('请求错误！')
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        // 站点输入框模糊查询
        search_site(){
            if(document.querySelector('input')==document.activeElement){
                this.search(this.fname.trim());
            }
            if(this.fname == ''){
                this.init();
            }
        }
    },
    mounted(){
        this.init()
    },
    watch: {
        fname:function(){
            this.search_site();
        }
    },
}
</script>

<style lang="less" scoped>
#sitemsg{
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
    .van-search {
        padding: 0px;
        border-bottom: 1px solid #cacaca;
        font-size: 16px;
    }
}
.cTitle{
    color: #ffffff;
    background-color: #3385ff; 
}
.siteLi{
    padding: 8px 10px;
    border-bottom: 1px solid #cccccc;
}
</style>
