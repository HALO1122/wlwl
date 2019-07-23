<template>
  <div id="adressfh">
    <van-nav-bar
      class="cTitle"
      title="发货常用地址"
      left-arrow
      fixed
      @click-left="onClickLeft"
    />
    <!-- <van-search placeholder="请输入搜索关键词"/> -->
    <div class="adresslist">
      <ul class="ullist">
        <li
          :class="{ active: isActive == key }"
          v-for="(item,key) of sdzlist"
          :key="key"
          @click="fTouchLi(key,item)"
        >
          <div class="adressbox" @click="setDefault(item,key)">
            <van-row>
              <van-col span="8">
                <span class="name">{{item.fcontactorName}}</span>
              </van-col>
              <van-col span="8">
                <span class="tel">{{item.fcontactorMobile}}</span>
              </van-col>
              <van-col span="8">
                <span class="wlcardNo">{{item.fwlCardNo}}</span>
              </van-col>
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
        <!-- <li class="tel" v-for="(item,index) of list" :key="index">{{item.fsenderMobile}}</li> -->
      </ul>
    </div>
    <div class="addressbtn">
      <button class="add" @click="btnclick">+添加新地址</button>
    </div>
  </div>
</template>
<script>
import {
  AddressSearchById,
  AddressDelete,
  AddressListSearch
} from "@/api/index";
import axios from "axios";
export default {
  data() {
    return {
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
    // 左上角返回键点击事件
    onClickLeft() {
      this.$router.push({ path: "/order", name: "order" });
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    onAdd() {
      Toast("新增地址");
    },
    onEdit(item, index) {
      Toast("编辑地址:" + index);
    },
    btnclick() {
      this.$router.push({ path: "/adressedit", name: "adressedit" });
    },
    alter(fid) {
      this.$router.push({
        path: "/adresschange",
        name: "adresschange",
        params: { id: fid }
      });
    },
    fTouchLi(key, item) {
      this.isActive = key;
    },
    del(fid) {
      this.addressList = this.sdzlist;

      // this.addressList.splice(key, 1);
      let msg = {
        msgId: "1001006252",
        serId: 0,
        type: 1,
        key: 0,
        source: 1,
        msgBody: {
          fid: fid,
          ftype: 1,
          pageSetBody: {
            pageNo: -1,
            pageSize: 20
          }
        }
      };

      AddressDelete({
        data: msg
      }).then(res => {
        if (res.msgBody != "") {
          if (res.msgBody.sta == "ok") {
            this.$toast.success(res.msgBody.staInfo);
            this.adressList();
            // window.reload();
          }
        }
      });
    },
    setDefault: function(item, key) {
      this.radio = key;
      let morendz = {
        fcontactorName: item.fcontactorName,
        fcontactorMobile: item.fcontactorMobile,
        fwlCardNo: item.fwlCardNo,
        fsiteName: item.fsiteName
      };
      localStorage.setItem("morendz", JSON.stringify(morendz));
      // localStorage.setItem("fhfsiteName", JSON.stringify(item.fsiteName));
      localStorage.setItem("fwlCardNo", JSON.stringify(item.fwlCardNo));
      localStorage.setItem("fhmrfid", JSON.stringify(item.fid));
      this.$router.push({ path: "/order", name: "order" });
    },
    adressList() {
      let dzzsmsg = {
        msgId: "1001006253",
        serId: 0,
        type: 1,
        key: 0,
        source: 1,
        msgBody: {
          ftype: 1,
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
        ftype: 1,
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
  }
};
</script>
<style lang="less">
#adressfh{
  margin-top: 45px;
  .van-nav-bar__title,.van-icon-arrow-left,.van-nav-bar__text{
    color: #ffffff;
  }
  .cTitle{
    color: #ffffff;
    background-color: #3385ff; 
  }
}
.ullist {
  margin-bottom: 55px;
}
p {
  margin-top: 0;
  margin-bottom: 0;
}
.addressbtn {
  width: 100%;
}

.add {
  width: 70%;
  height: 40px;
  background: #09f;
  color: #fff;
  position: fixed;
  margin-left: 15%;
  bottom: 10px;
}
.adressbox {
  border: 2px solid #f0f0f3;
  padding-left: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: left;
}

.checkbox {
  width: 50%;
  height: 37px;
  line-height: 40px;
  float: left;
  border-right: 1px solid #f0f0f3;
  border-bottom: 1px solid #f0f0f3;
  border-left: 1px solid #f0f0f3;
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
</style>
