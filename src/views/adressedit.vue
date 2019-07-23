<template>
  <div id="adedit">
    <van-nav-bar
      class="cTitle"
      title="新增发货地址"
      left-arrow
      fixed
      @click-left="onClickLeft"
    />
    <!-- <van-nav-bar title="新增发货地址" left-text="返回" left-arrow @click-left="onClickLeft"/> -->
    <van-cell-group>
      <van-field
        id="fsenderName"
        name="fsenderName"
        required
        v-model=" msgBody.fsenderName"
        label="姓名"
        placeholder="请输入发货人姓名"
      />
      <van-field
        id="fsenderMobile"
        name="fsenderMobile"
        required
        v-model=" msgBody.fsenderMobile"
        label="联系电话"
        placeholder="请输入手机或固话"
      />
      <van-field
        id="fsenderIdcardNo"
        name="fsenderIdcardNo"
        v-model=" msgBody.fsenderIdcardNo"
        label="身份证号"
        placeholder="请输入身份证号"
      />
      <van-field
        id="fwlCardNo"
        name="fwlCardNo"
        type="number"
        v-model="fwlCardNo"
        label="代收卡号"
        placeholder="万里卡号"
      />
      <div class="van-cell van-field" id="diqv" required clearable>
        <div class="van-cell__title">
          <span>所在地区</span>
        </div>
        <div class="van-cell__value">
          <div class="van-field__body">
            <van-row>
              <van-col span="8" id="shqborder">
                <input
                  v-model="shengfen"
                  @click="shengpopshow"
                  placeholder="请选择省份"
                  class="van-field__control"
                  name="fsenderAddress"
                >
              </van-col>
              <van-col span="8" id="shqborder">
                <input
                  v-model="chengshi"
                  @click="shipopshow"
                  placeholder="请选择城市"
                  class="van-field__control"
                  name="fsenderAddress"
                >
              </van-col>
              <van-col span="8" id="shqborder">
                <input
                  v-model="diqv"
                  @click="qvpopshow"
                  placeholder="请选择地区"
                  class="van-field__control"
                  name="fsenderAddress"
                >
              </van-col>
            </van-row>
          </div>
        </div>
      </div>
      <van-field
        id="fsenderStreetAddress"
        name="fsenderStreetAddress"
        v-model=" msgBody.fsenderStreetAddress"
        label="详细地址"
        placeholder="请输入详细地址不包含省市区"
      />
      <div class="van-cell van-cell--required van-field">
        <div class="van-cell__title">
          <span>网点选择</span>
        </div>
        <div class="van-cell__value">
          <div class="van-field__body">
            <input
              v-model="msgBody.fsendSiteName"
              @click="zdpopshow"
              placeholder="请选择所在网点"
              class="van-field__control"
              name="fsendSiteName"
            >
          </div>
        </div>
        <!-- 省份pop -->
        <van-popup v-model="shengshow" position="bottom" :overlay="true">
          <van-picker
            show-toolbar
            title="请选择所在省份"
            value-key="fareaName"
            :columns="scolumns"
            @cancel="shengCancel"
            @confirm="shengConfirm"
            @change="shengChange"
          ></van-picker>
        </van-popup>
        <!-- 市的pop -->
        <van-popup v-model="shishow" position="bottom" :overlay="true">
          <van-picker
            show-toolbar
            title="请选择所在城市"
            value-key="fareaName"
            :columns="shicolumns"
            @cancel="shiCancel"
            @confirm="shiConfirm"
            @change="shiChange"
          ></van-picker>
        </van-popup>
        <!-- 区的pop -->
        <van-popup v-model="qvshow" position="bottom" :overlay="true">
          <van-picker
            show-toolbar
            title="请选择所在地区"
            value-key="fareaName"
            :columns="qvcolumns"
            @cancel="qvCancel"
            @confirm="qvConfirm"
            @change="qvChange"
          ></van-picker>
        </van-popup>
        <!-- 站点pop -->
        <van-popup v-model="zdshows" position="bottom" :overlay="true">
          <div id="sitelist">
            <van-nav-bar title="站点选择"/>
            <van-search
              v-model="siteName"
              placeholder="请输入搜索关键词"
              show-action
              shape="round"
              @search="onSearch"
            >
              <div slot="action" @click="onSearch">搜索</div>
            </van-search>
            <div class="sitelistContent">
              <ul>
                <li
                  class="sllist"
                  :class="{ zdbgactive: isActive == slkey }"
                  v-for="(slitem,slkey) of sllist"
                  :key="slkey"
                >
                  <p @click="choosesite(slitem,slkey)" class="sitelistP">{{slitem.fname}}</p>
                </li>
              </ul>
              <span class="zdload">
                <van-loading v-show="zdloadshow" type="spinner" color="white"/>
              </span>
            </div>
          </div>
          <!-- <van-picker
            show-toolbar
            title="请选择所在网点"
            value-key="fname"
            :columns="dzcolumns"
            @cancel="Cancel"
            @confirm="Confirm"
            @change="Change"
          ></van-picker>-->
        </van-popup>
      </div>
    </van-cell-group>
    <button class="adbutton" @click="saveadress">确定</button>
  </div>
</template>
<script>
// import areaList from "@/assets/js/area";
import {
  SiteNameVagueSearch,
  AddressAdd,
  AdminDivisionVagueSearch,
  CommonlyUsedAddressUpdate
} from "@/api/index";

export default {
  data() {
    return {
      isActive: false,
      sllist: "",
      siteName: "",
      zdloadshow: true,
      msgBody: {
        ftype: "1",
        fsenderName: "",
        fsenderMobile: "",
        fsenderIdcardNo: "",
        fsenderAddress: "",
        fsenderStreetAddress: "",
        fsendSiteName: "",
        fprovinceCode: "",
        fcityCode: "",
        fcountyCode: "",
        fprovinceCodeName: "",
        fcityCodeName: "",
        fcountyCodeName: "",

        fsiteNo: ""
      },
      fwlCardNo: "",
      chengshi: "",
      diqv: "",
      shengfen: "",
      templist: [],
      show: false,
      shengshow: false,
      shishow: false,
      qvshow: false,
      zdshows: false,
      dzcolumns: [],
      scolumns: [],
      shicolumns: [],
      qvcolumns: []
    };
  },
  created: function() {
    // let sitename = JSON.parse(localStorage.getItem("sitename"));
    // if (sitename == null || sitename == undefined) {
    //   this.msgBody.fsendSiteName = "";
    // } else {
    //   this.msgBody.fsendSiteName = JSON.parse(localStorage.getItem("sitename"));
    // }
    // 请求省份数据
    let smsg = {
      msgId: "1001000408",
      serId: 0,
      type: 1,
      key: 0,
      source: 1,
      msgBody: { fparentAreaCode: "0", fcompanyId: "1", fareaName: "" }
    };
    AdminDivisionVagueSearch({ data: smsg })
      .then(res => {
        if (res.msgBody != "") {
          this.scolumns = res.msgBody.pageOutBody.pageObjBody;
          this.scolumns.unshift("请选择...");
        }
      })
      .catch(err => {
        console.log(err);
      });

    // 请求站点数据
    let msgzd = {
      msgId: "1001000706",
      serId: 0,
      type: 1,
      key: 0,
      source: 1,
      msgBody: {
        fcompanyId: "1",
        fname: "",
        fsiteNo: "",
        ftype: "-1",
        flevel: "-1",
        fshowCom: 0,
        msgid: "1001000706",
        pageSetBody: { pageNo: 0, pageSize: "-1" }
      }
    };

    SiteNameVagueSearch({ data: msgzd })
      .then(res => {
        if (res.msgBody != "") {
          this.sllist = res.msgBody.pageOutBody.pageObjBody;
          this.zdloadshow = false;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    onClickLeft() {
      this.$router.push({ path: "/adresslist", name: "adresslist" });
    },
    // 省市区的
    shengpopshow() {
      this.shengshow = true;
    },
    shipopshow() {
      this.shishow = true;
    },
    qvpopshow() {
      this.qvshow = true;
    },
    //站点的
    zdpopshow() {
      this.zdshows = true;
    },
    choosesite(slitem, slkey) {
      this.zdshows = false;
      this.isActive = slkey;
      this.msgBody.fsiteNo = slitem.fsiteNo;
      this.msgBody.fsendSiteName = slitem.fname;
    },
    onSearch() {
      let msgzd = {
        msgId: "1001000706",
        serId: 0,
        type: 1,
        key: 0,
        source: 1,
        msgBody: {
          fcompanyId: "1",
          fname: this.siteName,
          fsiteNo: "",
          ftype: "-1",
          flevel: "-1",
          fshowCom: 0,
          msgid: "1001000706",
          pageSetBody: { pageNo: 0, pageSize: "-1" }
        }
      };

      SiteNameVagueSearch({ data: msgzd })
        .then(res => {
          if (res.msgBody != "") {
            this.sllist = res.msgBody.pageOutBody.pageObjBody;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    shengCancel() {
      this.shengshow = false;
    },
    shiCancel() {
      this.shishow = false;
    },
    qvCancel() {
      this.qvshow = false;
    },
    //  省份选择
    shengChange(picker, value, index) {
      this.shengfen = value.fareaName;
      this.msgBody.fprovinceCode = value.fareaCode;
      this.msgBody.fprovinceCodeName = value.fareaName;
      return {
        fsenderAddress: "${value}"
      };
    },
    // 省份确认并发请求请求市的数据
    shengConfirm() {
      this.shengshow = false;
      let shimsg = {
        msgId: "1001000408",
        serId: 0,
        type: 1,
        key: 0,
        source: 1,
        msgBody: {
          fparentAreaCode: this.msgBody.fprovinceCode,
          fareaName: ""
        }
      };
      AdminDivisionVagueSearch({ data: shimsg })
        .then(res => {
          if (res.msgBody != "") {
            this.shicolumns = res.msgBody.pageOutBody.pageObjBody;
            this.shicolumns.unshift("请选择...");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //  市份选择
    shiChange(picker, value, index) {
      this.chengshi = value.fareaName;

      this.msgBody.fcityCode = value.fareaCode;
      this.msgBody.fcityCodeName = value.fareaName;

      console.log(index);
      return {
        fsendSiteName: "${value}"
      };
    },
    // 市确认并发请求请求地区的数据
    shiConfirm() {
      this.shishow = false;
      let shimsg = {
        msgId: "1001000408",
        serId: 0,
        type: 1,
        key: 0,
        source: 1,
        msgBody: {
          fparentAreaCode: this.msgBody.fcityCode,
          fareaName: ""
        }
      };
      AdminDivisionVagueSearch({ data: shimsg })
        .then(res => {
          if (res.msgBody != "") {
            this.qvcolumns = res.msgBody.pageOutBody.pageObjBody;
            this.qvcolumns.unshift("请选择...");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //  地区选择
    qvChange(picker, value, index) {
      this.diqv = value.fareaName;

      this.msgBody.fcountyCode = value.fareaCode;
      this.msgBody.fcountyCodeName = value.fareaName;

      console.log(index);
      return {
        fareaName: "${value}"
      };
    },
    qvConfirm(picker, value, index) {
      this.qvshow = false;
    },
    Change(picker, value, index) {
      this.msgBody.fsendSiteName = value.fname;
      this.msgBody.fsiteNo = value.fsiteNo;
      // console.log(`${value}`);
    },
    Cancel() {
      this.zdshows = false;
    },
    Confirm(picker, value, index) {
      this.zdshows = false;
    },
    saveadress() {
      if (this.msgBody.fsenderName == "") {
        this.$toast.fail("请输入发货人姓名");
      } else if (this.msgBody.fsenderMobile == "") {
        this.$toast.fail("请输入发货人电话");
      } else if (this.msgBody.fsendSiteName == "") {
        this.$toast.fail("请选择所在网点");
      } else {
        if (this.fwlCardNo != "") {
          this.fwlCardNo = "WL" + this.fwlCardNo;
        }
        let addadressmag = {
          msgId: "1001006250",
          serId: 0,
          type: 1,
          key: 0,
          source: 1,
          msgBody: {
            fweight: "1",
            fwlCardNo: this.fwlCardNo,
            fcontactorName: this.msgBody.fsenderName,
            fcontactorMobile: this.msgBody.fsenderMobile,
            fcontactorIdcardNo: this.msgBody.fsenderIdcardNo,
            fprovinceCode: this.msgBody.fprovinceCode,
            fcityCode: this.msgBody.fcityCode,
            fcountyCode: this.msgBody.fcountyCode,
            fprovinceCodeName: this.msgBody.fprovinceCodeName,
            fcityCodeName: this.msgBody.fcityCodeName,
            fcountyCodeName: this.msgBody.fcountyCodeName,
            fstreetAddress: this.msgBody.fsenderStreetAddress,
            fsiteNo: this.msgBody.fsiteNo,
            fsiteName: this.msgBody.fsendSiteName,
            ftype: 1
          }
        };
        AddressAdd({ data: addadressmag })
          .then(res => {
            if (res.msgBody != "") {
              if (res.msgBody.sta == "ok") {
                this.$toast.success("新增地址成功");

                this.$router.push({
                  path: "/adresslist",
                  name: "adresslist"
                });
              } else {
                this.$toast.fail(res.msgBody.staInfo);
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      }

      // var templist = JSON.parse(localStorage.getItem("msgBody") || "[]");
      // templist.push(this.msgBody);
      // localStorage.setItem("msgBody", JSON.stringify(templist));
      // this.$router.push({
      //   path: "/adresslist",
      //   name: "adresslist"
      // });
    }
  }
};
</script>
<style lang="less">
#adedit {
  text-align: left;
  margin-top: 45px;
  .van-nav-bar__title,.van-icon-arrow-left,.van-nav-bar__text{
    color: #ffffff;
  }
  .cTitle{
    color: #ffffff;
    background-color: #3385ff; 
  }
}
.adbutton {
  position: fixed;
  bottom: 50px;
  width: 70%;
  height: 40px;
  background: #0099ff;
  color: #fff;
  margin-left: 15%;
}
#shqborder {
  border: 1px solid #0099ff;
}
.sllist {
  border-bottom: 1px solid #f0f0f3;
  p {
    font-size: 18px;
  }
}
.zdbgactive {
  background-color: rgba(0, 153, 255, 0.3);
}
.sitelistP {
  margin: 8px 0;
}
</style>

