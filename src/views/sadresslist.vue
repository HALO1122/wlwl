<template>
  <div id="adress2">
    <van-nav-bar
      class="cTitle"
      title="收货常用地址"
      left-arrow
      fixed
      @click-left="onClickLeft"
    />
    <div class="adresslist">
      <ul class="shullist">
        <li
          v-for="(item,key) of sdzlist"
          :key="key"
          @click="fTouchLi(key,item)"
          :class="{ active: isActive == key }"
        >
          <div class="adressbox" @click="setDefault(item,key)">
            <van-row>
              <van-col span="8">
                <span class="name">{{item.fcontactorName}}</span>
              </van-col>
              <span class="tel">{{item.fcontactorMobile}}</span>
              <van-col span="8"></van-col>
              <van-col span="8"></van-col>
            </van-row>
            <van-row>
              <van-col span="24">
                <span
                  class="adress"
                >{{item.fprovinceCodeName}}{{item.fcityCodeName}}{{item.fcountyCodeName}}</span>
                <span class="sadress">{{item.fstreetAddress}}</span>
              </van-col>
            </van-row>
          </div>

          <div class="checkbox" @click="setDefault(item,key)">
            <van-radio :name="key" :value="item.value" v-model="radio" :max="1" ref="getRadio">默认地址</van-radio>
          </div>
          <div class="editbox">
            <span class="edit">
              <img @click="alter(item.fid)" src="../assets/images/bianij.png">
              <span @click="alter(item.fid)">修改</span>
            </span>
            <span class="remove">
              <img @click="del(item.fid)" src="../assets/images/remove.png">

              <span @click="del(item.fid)">删除</span>
            </span>
          </div>
        </li>
      </ul>
    </div>
    <div class="addressbtn">
      <button class="add2" @click="btnclick">添加新地址</button>
    </div>
    <div class="shpage">
      <van-pagination
        v-model="currentPage"
        :total-items="40"
        :page-count="20"
        :show-page-size="5"
        force-ellipses
        v-show="sadpageshow"
        @change="sadpagechange"
      />
    </div>
  </div>
</template>
<script>
import {
  AddressSearchById,
  AddressDelete,
  AddressListSearch
} from "@/api/index";
export default {
  data() {
    return {
      sadpageshow: false,
      currentPage: 1,
      isActive: false,
      chosenAddressId: "1",
      sdzlist: "",
      addressList: [],
      checked: "",
      radio: "",
      currentIndex: 0 //用来保存当前点击的li
    };
  },

  methods: {
    onClickLeft() {
      this.$router.push({ path: "/order", name: "order" });
    },

    btnclick() {
      this.$router.push({ path: "/sadressedit", name: "sadressedit" });
    },
    alter(fid) {
      this.$router.push({
        path: "/adressalter",
        name: "adressalter",
        params: { id: fid }
      });
    },
    del(fid) {
      this.addressList = this.sdzlist;
      let msg = {
        msgId: "1001006252",
        serId: 0,
        type: 1,
        key: 0,
        source: 1,
        msgBody: {
          fid: fid,
          ftype: 2,
          pageSetBody: {
            pageNo: -1,
            pageSize: 20
          }
        }
      };

      AddressDelete({
        data: msg
      }).then(res => {
        if (res.msgBody != "" && res.msgBody != null) {
          this.$toast.success(res.msgBody.staInfo);
          this.adressList();
        } else if (res.msgBody == null) {
          this.sdzlist = "";
        }
      });
    },
    setDefault: function(item, key) {
      this.radio = key;
      let morendz2 = {
        fcontactorName: item.fcontactorName,
        fcontactorMobile: item.fcontactorMobile,
        fsiteName: item.fsiteName,
        freceiverStreetAddress: item.fstreetAddress
      };
      localStorage.setItem("morendz2", JSON.stringify(morendz2));
      localStorage.setItem("fhmrfid2", JSON.stringify(item.fid));
      this.$router.push({ path: "/order", name: "order" });
    },
    fTouchLi(key, item) {
      this.isActive = key;
    },
    adressList() {
      let dzzsmsg = {
        msgId: "1001006253",
        serId: 0,
        type: 1,
        key: 0,
        source: 1,
        msgBody: {
          ftype: 2,
          pageSetBody: {
            pageNo: -1,
            pageSize: 20
          }
        }
      };
      AddressListSearch({ data: dzzsmsg })
        .then(res => {
          if (res.msgBody != "" && res.msgBody != null) {
            this.sdzlist = res.msgBody.pageOutBody.pageObjBody;
          } else if (res.msgBody == null) {
            this.sdzlist = "";
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    sadpagechange() {
      let dzzsmsg = {
        msgId: "1001006253",
        serId: 0,
        type: 1,
        key: 0,
        source: 1,
        msgBody: {
          ftype: 2,
          pageSetBody: {
            pageNo: this.currentPage - 1,
            pageSize: 20
          }
        }
      };
      AddressListSearch({ data: dzzsmsg })
        .then(res => {
          if (res.msgBody != "" && res.msgBody != null) {
            this.sdzlist = res.msgBody.pageOutBody.pageObjBody;
            this.sadpageshow = true;
          } else if (res.msgBody == null) {
            this.sdzlist = "";
            this.sadpageshow = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    let dzzsmsg = {
      msgId: "1001006253",
      serId: 0,
      type: 1,
      key: 0,
      source: 1,
      msgBody: {
        ftype: 2,
        pageSetBody: {
          pageNo: -1,
          pageSize: 20
        }
      }
    };
    AddressListSearch({ data: dzzsmsg })
      .then(res => {
        if (res.msgBody != "" && res.msgBody != null) {
          this.sdzlist = res.msgBody.pageOutBody.pageObjBody;
          this.sadpageshow = true;
        } else if (res.msgBody == null) {
          this.sdzlist = "";
          this.sadpageshow = false;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style lang="less">
#adress2{
  margin-top: 45px;
  .van-nav-bar__title,.van-icon-arrow-left,.van-nav-bar__text{
    color: #ffffff;
  }
  .cTitle{
    color: #ffffff;
    background-color: #3385ff; 
  }
}
.addressbtn {
  width: 100%;
}
.shullist {
  margin-bottom: 100px;
}
.shpage {
  position: fixed;
  bottom: 50px;
  width: 100%;
}
.checkbox {
  width: 50%;
  height: 37px;
  line-height: 40px;
  float: left;
  border-right: 1px solid #f0f0f3;
  border-bottom: 1px solid #f0f0f3;
  .van-icon {
    position: relative;
    top: -7px;
  }
}
.editbox {
  height: 37px;
  border-bottom: 1px solid #f0f0f3;
  border-right: 1px solid #f0f0f3;
}
.edit {
  float: left;
  display: flex;
  justify-content: center;
  span {
    margin-top: 5px;
  }
}
.remove {
  display: flex;
  justify-content: center;
  span {
    margin-top: 5px;
  }
}
.active {
  background-color: rgba(0, 153, 255, 0.3);
}
.add2 {
  width: 70%;
  height: 40px;
  background: #09f;
  color: #fff;
  position: fixed;
  margin-left: 15%;
  bottom: 10px;
}
</style>
