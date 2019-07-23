<template>
  <div id="order">
    <!-- <van-nav-bar
            class="cTitle"
            title="网点预下单"
            left-arrow
            fixed
            @click-left="onClickLeft"
    /> -->
    <div id="ordertop">
      <!-- 发货栏 -->
      <router-link to="adresslist">
        <div class="jititle">
          <span class="span1">发货人信息</span>
          <span class="span2">地址簿 ></span>
        </div>
      </router-link>
      <div class="ji_content">
        <van-row>
          <van-col span="12">
            <van-field id="fsenderName" name="fsenderName" label="姓名：" v-model="fsenderName"/>
          </van-col>
          <van-col span="12">
            <van-field id="fwlCardNo" name="fwlCardNo" label="会员卡号：" v-model="fwlCardNo"/>
          </van-col>
        </van-row>
        <hr>

        <van-row>
          <van-col span="24">
            <van-field id="fsenderMobile" name="fsenderMobile" label="电话：" v-model="fsenderMobile"/>
          </van-col>
        </van-row>
      </div>
      <!-- 收货栏 -->
      <router-link to="sadresslist">
        <div class="jititle">
          <span class="span1">收货人信息</span>
          <span class="span2">地址簿 ></span>
        </div>
      </router-link>
      <div class="ji_content">
        <van-row>
          <div class="van-col van-col--24">
            <div class="van-cell van-field">
              <div class="van-cell__title">
                <span>目的地：</span>
              </div>
              <div class="van-cell__value">
                <div class="van-field__body">
                  <input
                    type="text"
                    id="freceiveSiteName"
                    readonly="readonly"
                    @click="wdxz"
                    name="freceiveSiteName"
                    v-model="freceiveSiteName"
                    class="van-field__control"
                  >
                </div>
              </div>
            </div>
          </div>
        </van-row>
        <hr>

        <van-row>
          <van-col span="12">
            <van-field id="freceiverName" name="freceiverName" label="姓名：" v-model="freceiverName"/>
          </van-col>
          <div class="van-col van-col--12">
            <div class="van-cell van-field">
              <div class="van-cell__title" id="dzreadonly_title">
                <span>地址：</span>
              </div>
              <div class="van-cell__value">
                <div class="van-field__body">
                  <input
                    type="text"
                    readonly="readonly"
                    v-model="freceiverStreetAddress"
                    id="dzreadonly"
                    name="fgoodsName"
                    class="van-field__control"
                  >
                </div>
              </div>
            </div>
          </div>
        </van-row>
        <hr>

        <van-row>
          <van-col span="24">
            <van-field
              id="freceiverMobile"
              name="freceiverMobile"
              label="电话："
              v-model="freceiverMobile"
            />
          </van-col>
        </van-row>
        <van-popup v-model="zdshows" position="top" :overlay="true">
          <div id="sitelist">
            <van-nav-bar title="站点选择"/>
            <van-search
              v-model="orderSiteName"
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
            </div>
          </div>
        </van-popup>
      </div>
      <!-- 货物信息 -->
      <div id="hwxx">
        <div class="hwxx_title">
          <p>货物信息</p>
        </div>
        <div class="hwxx_content">
          <van-row>
            <van-col span="18">
              <van-field
                id="fgoodsName"
                name="fgoodsName"
                label="货物名称："
                v-model="goods.fgoodsName"
                placeholder="必填 货物名称"
              />
            </van-col>
            <van-col span="6">
              <div class="hwxx_contentp" @click="jsckg">
                <p>重量体积计算</p>
              </div>
            </van-col>
          </van-row>
          <hr>
          <van-row>
            <van-col span="4">
              <van-field
                id="fgoodsName"
                name="zhi"
                type="number"
                pattern="[0-9]*"
                v-model="goods.fgoodsNum1"
                label="纸："
              />
            </van-col>
            <van-col span="4">
              <van-field
                id="fgoodsName"
                name="dai"
                type="number"
                pattern="[0-9]*"
                v-model="goods.fgoodsNum2"
                label="袋："
              />
            </van-col>
            <van-col span="5">
              <van-field
                id="fgoodsName"
                name="mu"
                type="number"
                pattern="[0-9]*"
                v-model="goods.fgoodsNum3"
                label="木："
              />
            </van-col>
            <van-col span="5">
              <van-field
                id="fgoodsName"
                name="wu"
                type="number"
                pattern="[0-9]*"
                v-model="goods.fgoodsNum4"
                label="无："
              />
            </van-col>
            <van-col span="6">
              <van-field
                id="fgoodsName"
                name="qita"
                type="number"
                pattern="[0-9]*"
                v-model="goods.fgoodsNum5"
                label="其它:"
              />
            </van-col>
          </van-row>
        </div>
      </div>
      <div id="fyxx">
        <div class="hwxx_title">
          <p>费用信息</p>
        </div>
        <div class="fyxx_content">
          <van-row>
            <van-col span="12">
              <van-field
                id="fgoodsName"
                name="fgoodsName"
                type="number"
                pattern="[0-9]*"
                v-model="serve.fcarriage"
                label="运费："
                placeholder="运费 单位元"
              />
            </van-col>
            <van-col span="12">
              <van-field
                id="fgoodsName"
                name="fgoodsName"
                type="number"
                pattern="[0-9]*"
                v-model="serve.fdeliveryFee"
                label="送货费："
                placeholder="送货费 单位元"
              />
            </van-col>
          </van-row>
          <hr>
          <div class="van-cell van-field" clearable>
            <div class="van-cell__title">
              <span>保值价值：</span>
            </div>
            <div class="van-cell__value">
              <div class="van-field__body">
                <van-row>
                  <van-col span="8">
                    <input
                      v-model="fmaintenanceFee"
                      type="number"
                      pattern="[0-9]*"
                      placeholder="保值费"
                      class="van-field__control"
                      name="fsenderAddress"
                    >
                  </van-col>
                  <van-col span="8">
                    <input
                      v-model="serve.fhedgeRatio"
                      placeholder="税率"
                      class="van-field__control"
                      name="fhedgeRatio"
                      readonly
                    >
                  </van-col>
                  <van-col span="8">
                    <input
                      readonly="readonly"
                      v-model="serve.fhedgeAmount"
                      placeholder="保值金额"
                      class="van-field__control"
                      name="fhedgeAmount"
                    >
                  </van-col>
                </van-row>
              </div>
            </div>
          </div>
          <hr>
          <van-row>
            <van-col span="12">
              <van-field
                id="fgoodsName"
                name="fgoodsName"
                type="number"
                pattern="[0-9]*"
                v-model="serve.fpickFee"
                label="接货费："
                placeholder="接货费"
              />
            </van-col>

            <van-col class="hd" span="12">
              <van-row>
                <van-col span="8">
                  <span>回单</span>
                </van-col>

                <van-col span="16">
                  <van-radio-group v-model="radio">
                    <van-row>
                      <van-col span="12">
                        <van-radio name="1">否</van-radio>
                      </van-col>
                      <van-col span="12">
                        <van-radio name="2">是</van-radio>
                      </van-col>
                    </van-row>
                  </van-radio-group>
                </van-col>
              </van-row>
            </van-col>
          </van-row>
        </div>
      </div>
      <div class="van-cell van-field" id="fkfs">
        <div class="van-cell__title">
          <span>代收金额：</span>
        </div>
        <div class="van-cell__value">
          <div class="van-field__body">
            <input
              name="fcodTotal"
              type="number"
              pattern="[0-9]*"
              v-model="fcodTotal"
              placeholder="代收货款的金额 单位元"
              class="van-field__control"
            >
          </div>
        </div>
      </div>

      <div id="fkfs">
        <van-row>
          <van-col span="6">
            <span>付款方式：</span>
          </van-col>
          <van-col span="18">
            <van-radio-group v-model="radio2">
              <van-row>
                <van-col span="8">
                  <van-radio name="1">交付</van-radio>
                </van-col>
                <van-col span="8">
                  <van-radio name="2">提付</van-radio>
                </van-col>

                <van-col span="8">
                  <van-radio name="3">合同户</van-radio>
                </van-col>
              </van-row>
            </van-radio-group>
          </van-col>
        </van-row>

        <van-popup v-model="show2" :overlay="true" id="popup">
          <p>请输入货物长宽高</p>
          <van-cell-group>
            <van-field
              id="fgoodsWeight"
              name="fgoodsWeight"
              v-model="goods.fgoodsWeight"
              label="重量："
              placeholder
            />
            <van-field
              id="fgoodsStatus"
              name="fgoodsStatus"
              v-model="goods.fgoodsLong"
              label="长："
              placeholder
            />
            <van-field
              id="fgoodsStatus"
              name="fgoodsStatus"
              v-model="goods.fgoodsWidth"
              label="宽："
              placeholder
            />
            <van-field
              id="fgoodsStatus"
              name="fgoodsStatus"
              v-model="goods.fgoodsHeight"
              label="高："
              placeholder
            />
            <van-field
              id="fgoodsVolume"
              name="fgoodsVolume"
              v-model="goods.fgoodsVolume"
              label="体积："
              placeholder
            />
          </van-cell-group>
          <p class="qvxiao" @click="qvxiao1">取消</p>
          <p class="jisuan" @click="jisuan1">计算</p>
        </van-popup>
        <van-popup v-model="show3" :overlay="true" id="popup">
          <p id="qxzshr">请选择收货人</p>
          <ul>
            <li
              class="sllist"
              :class="{ zdbgactive: isActive == slkey }"
              v-for="(shitem,shkey) of newaboutsh"
              :key="shkey"
            >
              <p @click="chooseshr(shitem,shkey)" class="sitelistP">{{shitem}}</p>
            </li>
          </ul>
        </van-popup>
      </div>
      <div class="van-cell van-field" id="fkfs">
        <div class="van-cell__title">
          <span>备注</span>
        </div>
        <div class="van-cell__value">
          <div class="van-field__body">
            <input
              v-model="msgBody.fremark"
              placeholder="请输入备注信息"
              class="van-field__control"
              name="fremark"
              type="textarea"
              rows="1"
              autosize
            >
          </div>
        </div>
      </div>
    </div>
    <div id="order-botom">
      <van-row class="vanRow">
        <van-col span="16">
          <div id="bottom-left" class="van-cell van-cell--clickable">
            <div class="van-cell__title">
             
              <div class="isagree">
                <input id="weuiAgree" type="checkbox" v-model="checked" @click="checktj">
                <span class="weui-agree__text">
                  我同意
                  <a href="javascript:void(0);" @click="serviceTerms" class="fwtk">《服务条款》</a>
                </span>
              </div>
            </div>
          </div>
        </van-col>
        <van-col span="8">
          <van-button
            type="default"
            id="buttonstyle"
            v-on:="checktj"
            :disabled="disabled"
            @click="commit"
          >提交</van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
import {
  CreateOrder,
  PayTypeInfoSearch,
  GetTempOrderDetail,
  ChangeWccyrTempOrder,
  SiteNameVagueSearch,
  AddressAdd,
  AddressListSearch,
  shAddressAdd
} from "@/api/index";
import axios from "axios";
import $ from "jquery";
export default {
  data() {
    return {
      isActive:'',
      aboutsh: "",
      newaboutsh: [],
      abuotshpop: false,
      zancundz: "",
      zancunfid: "",
      msgBody: {
        fremark: "" //备注
      },
      goodsnumlist: "",
      pingoodsnum: "",
      fsenderName: "",
      fsenderMobile: "",
      fwlCardNo: "WL",
      fcodTotal: "",
      fsiteNo: "",
      freceiverName: "",
      freceiverMobile: "",
      freceiveSiteName: "",
      freceiverStreetAddress: "",
      fpayName: "提付",
      fpayType: "2",
      checked: "true",
      fkfscolumns: [],
      orderSiteName: "",
      sllist: "",
      goods: {
        fgoodsName: "",
        fpacket: "",
        fgoodsWeight: "",
        fgoodsVolume: "",
        fgoodsLong: "0",
        fgoodsWidth: "0",
        fgoodsHeight: "0",
        fgoodsNum: "",
        fremark: "",
        fgoodsNum1: "",
        fgoodsNum2: "",
        fgoodsNum3: "",
        fgoodsNum4: "",
        fgoodsNum5: ""
      },
      fmaintenanceFee: "", //保值费
      serve: {
        fisHuidan: "",
        fhedgeAmount: "", //保值金额
        fhedgeRatio: "÷ 3‰ =", //税率
        fcarriage: "", //运费
        fdeliveryFee: "", //送货费
        fpickFee: "", //接货费
        ftotalFee: ""
      },
      zdshows: false,
      show: false,
      show2: false,
      show3: false,
      odzshow1: true,
      odzshow2: true,
      beizhushow1: false,
      beizhushow2: false,
      disabled: false,
      radio: "1",
      radio2: "2",

      show2: false //回单单选框
    };
  },
  created: function() {
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
          this.aboutsh = res.msgBody.pageOutBody.pageObjBody;
        } else if (res.msgBody == null) {
          this.abuotshpop = false;
        }
      })
      .catch(err => {
        console.log(err);
      });
    //不是从微信下单历史的修改中过来的页面情况
    if (this.$route.params.id == undefined) {
    } else if (this.$route.params.id != undefined) {
      //从微信下单历史的修改中过来的页面情况
      localStorage.setItem("orderalterfid3", JSON.stringify("2"));
      localStorage.setItem(
        "orderalterfid",
        JSON.stringify(this.$route.params.id)
      );
      localStorage.setItem(
        "orderftempOrderNo",
        JSON.stringify(this.$route.params.ftempOrderNo)
      );
      this.zancundz = JSON.parse(localStorage.getItem("morendz"));
      this.zancunfid = JSON.parse(localStorage.getItem("fhmrfid"));

      let changermsg = {
        msgId: "1001001805",
        serId: 0,
        type: 1,
        key: 0,
        source: 1,
        msgBody: {
          ftempOrderNo: this.$route.params.ftempOrderNo
        }
      };
      GetTempOrderDetail({ data: changermsg })
        .then(res => {
          if (res.msgBody != "" && res.msgBody != null) {
            // 修改过来的发货信息显示姓名电话网点物流卡号
            this.fsenderName = res.msgBody.fsenderName;
            this.fsenderMobile = res.msgBody.fsenderMobile;
            this.fwlCardNo = res.msgBody.fwlcardNo;
            // 修改过来的收货信息显示姓名电话站点
            this.freceiverName = res.msgBody.freceiverName;
            this.freceiverMobile = res.msgBody.freceiverMobile;
            this.freceiveSiteName = res.msgBody.freceiveSiteName;
            // 货物信息
            this.goods.fgoodsName = res.msgBody.goods[0].fgoodsName;
            this.goods.fgoodsWeight = res.msgBody.goods[0].fgoodsWeight;
            this.goods.fgoodsVolume = res.msgBody.goods[0].fgoodsVolume;
            this.goods.fgoodsLong = res.msgBody.goods[0].fgoodsLong;
            this.goods.fgoodsWidth = res.msgBody.goods[0].fgoodsWidth;
            this.goods.fgoodsHeight = res.msgBody.goods[0].fgoodsHeight;
            this.goodsnumlist = res.msgBody.goods[0].fremark.split(",");

            this.goods.fgoodsNum1 = this.goodsnumlist[0];
            this.goods.fgoodsNum2 = this.goodsnumlist[1];
            this.goods.fgoodsNum3 = this.goodsnumlist[2];
            this.goods.fgoodsNum4 = this.goodsnumlist[3];
            this.goods.fgoodsNum5 = this.goodsnumlist[4];
            // 增值服务
            this.fmaintenanceFee = res.msgBody.orderFee.fmaintenanceFee;
            this.serve.fhedgeAmount = res.msgBody.orderFee.fhedgeAmount; //保值金额
            this.serve.fcarriage = res.msgBody.orderFee.fcarriage; //保值金额
            this.serve.fdeliveryFee = res.msgBody.orderFee.fdeliveryFee; //保值金额
            this.serve.fpickFee = res.msgBody.orderFee.fpickFee; //保值金额
            // 备注
            this.msgBody.fremark = res.msgBody.fremark;
            // 本地保存默认地址防止页面跳转回的时候就没有params.id
            localStorage.setItem(
              "morendz",
              JSON.stringify({
                fcontactorName: res.msgBody.fsenderName,
                fcontactorMobile: res.msgBody.fsenderMobile,
                fsiteName: res.msgBody.fsendSiteName,
                fwlCardNo: res.msgBody.fwlcardNo
              })
            );

            localStorage.setItem(
              "morendz2",
              JSON.stringify({
                fcontactorName: res.msgBody.freceiverName,
                fcontactorMobile: res.msgBody.freceiverMobile,
                fsiteName: res.msgBody.freceiveSiteName
              })
            );
            localStorage.setItem(
              "fhmrfid",
              JSON.stringify(res.msgBody.fsendId)
            );

            localStorage.setItem(
              "fremark",
              JSON.stringify(res.msgBody.fremark)
            );
            localStorage.setItem(
              "goodsfremark",
              JSON.stringify(res.msgBody.goods[0].fremark.split(","))
            );
            localStorage.setItem(
              "fhmrfid2",
              JSON.stringify(res.msgBody.freceiveId)
            );
            localStorage.setItem("goods", JSON.stringify(res.msgBody.goods));
            localStorage.setItem("serve", JSON.stringify(res.msgBody.orderFee));
            localStorage.setItem(
              "fwlCardNo",
              JSON.stringify(res.msgBody.fwlcardNo)
            );

            if (res.msgBody.cod == null) {
            } else {
              localStorage.setItem(
                "fcodTotal",
                JSON.stringify(res.msgBody.cod.fcodTotal)
              );
            }
            if (res.msgBody.cod != null) {
              this.fcodTotal = res.msgBody.cod.fcodTotal;
            }
          }
        })
        .catch(err => {
          // console.log(err);
        });
    }
    //调取付款方式接口
    let fkfsmsg = {
      msgId: "1001000904",
      serId: 0,
      type: 1,
      key: 0,
      source: 1,
      msgBody: {
        fcompanyId: 1,
        fpayTypeNo: -1,
        fpayName: "",
        fisAbled: 1,
        pageSetBody: { pageNo: 0, pageSize: -1 }
      }
    };
    PayTypeInfoSearch({ data: fkfsmsg })
      .then(res => {
        if (res.msgBody != "") {
          this.fkfscolumns = res.msgBody.pageOutBody.pageObjBody;
          this.fkfscolumns.unshift("请选择...");
        }
      })
      .catch(err => {
        console.log(err);
      });
    // 页面加载时从本地缓存中拿出保存的默认地址显示在页面上
    if (localStorage.getItem("orderalterfid3") == "2") {
      let lofcodTotal = JSON.parse(localStorage.getItem("fcodTotal"));
      if (lofcodTotal != null || lofcodTotal != "undefined") {
        this.fcodTotal = JSON.parse(localStorage.getItem("fcodTotal"));
      }

      this.msgBody.fremark = JSON.parse(localStorage.getItem("fremark"));
      //修改过来的情况下在这里拿货物信息和金额的值并赋值
      var localgoods = JSON.parse(localStorage.getItem("goods"));
      this.goods.fgoodsName = localgoods.fgoodsName;
      this.goods.fpacket = localgoods.fpacket;
      this.goods.fgoodsWeight = localgoods.fgoodsWeight;
      this.goods.fgoodsVolume = localgoods.fgoodsVolume;
      this.goods.fgoodsLong = localgoods.fgoodsLong;
      this.goods.fgoodsWidth = localgoods.fgoodsWidth;
      this.goods.fgoodsHeight = localgoods.fgoodsHeight;
    }

    let fhxxi = JSON.parse(localStorage.getItem("morendz"));
    let shxxi = JSON.parse(localStorage.getItem("morendz2"));
    let goodsmsg = JSON.parse(localStorage.getItem("goods"));
    let servemsg = JSON.parse(localStorage.getItem("serve"));

    let lofremark = JSON.parse(localStorage.getItem("fremark"));

    if (fhxxi != "" && fhxxi != null) {
      if (fhxxi.fcontactorName != undefined) {
        this.odzshow1 = true;
        this.beizhushow1 = false;
        this.fsenderName = fhxxi.fcontactorName;
        this.fsenderMobile = fhxxi.fcontactorMobile;
        this.fwlCardNo = fhxxi.fwlCardNo;
        this.fcodTotal = JSON.parse(localStorage.getItem("fcodTotal"));
      } else {
        this.odzshow1 = true;
        this.beizhushow1 = false;
        this.fsenderName = fhxxi.fcontactorName;
        this.fsenderMobile = fhxxi.fcontactorMobile;
        this.fwlCardNo = fwlCardNo;
      }
    } else if (localStorage.getItem("orderalterfid3") == "1") {
      this.beizhushow1 = true;
      this.odzshow1 = false;
    }
    if (shxxi != "" && shxxi != null) {
      if (shxxi.fcontactorName != undefined) {
        this.odzshow2 = true;
        this.beizhushow2 = false;
        this.freceiverName = shxxi.fcontactorName;
        this.freceiverMobile = shxxi.fcontactorMobile;
        this.freceiveSiteName = shxxi.fsiteName;
        this.freceiverStreetAddress = shxxi.freceiverStreetAddress;
      } else {
        this.odzshow2 = true;
        this.beizhushow2 = false;
        this.freceiverName = shxxi.fcontactorName;
        this.freceiverMobile = shxxi.fcontactorMobile;
        this.freceiveSiteName = shxxi.fsiteName;
        this.freceiverStreetAddress = shxxi.freceiverStreetAddress;
      }
    } else if (localStorage.getItem("orderalterfid3") == "1") {
      this.beizhushow2 = true;
      this.odzshow2 = false;
    }
    if (goodsmsg != "" && goodsmsg != null) {
      if (goodsmsg[0].fgoodsName != undefined) {
        this.goodsnumlist = JSON.parse(localStorage.getItem("goodsfremark"));
        this.goods.fgoodsName = goodsmsg[0].fgoodsName;
        this.goods.fgoodsWeight = goodsmsg[0].fgoodsWeight;
        this.goods.fgoodsVolume = goodsmsg[0].fgoodsVolume;
        this.goods.fgoodsLong = goodsmsg[0].fgoodsLong;
        this.goods.fgoodsWidth = goodsmsg[0].fgoodsWidth;
        this.goods.fgoodsHeight = goodsmsg[0].fgoodsHeight;

        this.goods.fgoodsNum1 = this.goodsnumlist[0];
        this.goods.fgoodsNum2 = this.goodsnumlist[1];
        this.goods.fgoodsNum3 = this.goodsnumlist[2];
        this.goods.fgoodsNum4 = this.goodsnumlist[3];
        this.goods.fgoodsNum5 = this.goodsnumlist[4];
      }
    }
    if (servemsg != "" && servemsg != null) {
      if (servemsg.fcarriage != undefined) {
        this.fmaintenanceFee = servemsg.fmaintenanceFee;
        this.serve.fhedgeAmount = servemsg.fhedgeAmount;
        this.serve.fcarriage = servemsg.fcarriage;
        this.serve.fdeliveryFee = servemsg.fdeliveryFee;
        this.serve.fpickFee = servemsg.fpickFee;
      }
    }
    if (lofremark != "" && lofremark != null) {
      this.msgBody.fremark = lofremark;
    }
    // 请求站点数据
    let msgzd1 = {
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

    SiteNameVagueSearch({ data: msgzd1 })
      .then(res => {
        if (res.msgBody != "") {
          this.sllist = res.msgBody.pageOutBody.pageObjBody;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  watch: {
    fmaintenanceFee: "jsfhedgeAmount",
    orderSiteName: "onSearch"
  },
  methods: {
    // 计算保值价值
    jsfhedgeAmount() {
      this.serve.fhedgeAmount =
        Math.round((this.fmaintenanceFee / 0.003) * 100) / 100;

      if (this.fmaintenanceFee == "") {
        this.serve.fhedgeAmount = "";
      }
    },
    // onClickLeft() {
    //   this.$router.push({ path: "/container", name: "container" });
    // },
    jsckg() {
      this.show2 = true;
    },
    wdxz() {
      this.zdshows = true;
    },
    choosesite(slitem, slkey) {
      this.zdshows = false;
      this.isActive = slkey;
      this.fsiteNo = slitem.fsiteNo;
      this.freceiveSiteName = slitem.fname;
      var shstr = "";
      var choosezd = slitem.fname;
      this.aboutsh.forEach(function(s) {
        if (choosezd == s.fsiteName) {
          shstr += s.fcontactorName + ",";
        }
      });
      shstr = shstr.substring(0, shstr.length - 1);
      console.log(shstr);

      this.newaboutsh = shstr.split(",");
      this.newaboutsh = this.newaboutsh.slice(0, 6);
      // console.log(this.newaboutsh)
      if (this.newaboutsh.length > 1) {
        this.show3 = true;
      } else {
        this.show3 = false;
      }
    },
    chooseshr(shitem, shkey) {
      this.freceiverName = shitem;
      let shdz = "";
      let shdh = "";
      this.aboutsh.forEach(function(ss) {
        if (shitem == ss.fcontactorName) {
          shdz = ss.fstreetAddress;
          shdh = ss.fcontactorMobile;
        }
      });
      this.freceiverStreetAddress = shdz;
      this.freceiverMobile = shdh;

      this.show3 = false;
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
          fname: this.orderSiteName,
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
    qvxiao1() {
      this.show2 = false;
    },
    jisuan1() {
      var tiji1 = "";
      tiji1 =
        this.goods.fgoodsLong *
        this.goods.fgoodsWidth *
        this.goods.fgoodsHeight;
      this.goods.fgoodsVolume = tiji1;
      this.show = false;
    },
    serviceTerms() {
      this.$router.push({ path: "/serviceTerms", name: "serviceTerms" });
    },
    popshow() {
      this.show = true;
    },
    onChange(picker, value, index) {
      this.fpayName = value.fpayName;
    },
    onCancel() {
      this.show = false;
    },
    onConfirm(picker, value, index) {
      this.show = false;
    },
    checktj() {
      let checka = this.checked;
      this.disabled = checka;
    },
    commit() {
      let fhxxi = JSON.parse(localStorage.getItem("morendz"));
      if (fhxxi != "" && fhxxi != null) {
        if (fhfid != null || fhfid != "") {
          if (
            this.fsenderName != fhxxi.fcontactorName ||
            this.fsenderMobile != fhxxi.fcontactorMobile
          ) {
            localStorage.removeItem("fhmrfid");
            localStorage.removeItem("morendz");
          }
        }
      }

      if (this.fwlCardNo.length < 3) {
        this.fwlCardNo = "";
      }

      if (this.goods.fgoodsNum1 != "") {
        this.goods.fpacket = "纸";
      } else if (this.goods.fgoodsNum2 != "") {
        this.goods.fpacket = "纸袋";
      } else if (this.goods.fgoodsNum3 != "") {
        this.goods.fpacket = "木";
      } else if (this.goods.fgoodsNum4 != "") {
        this.goods.fpacket = "无";
      } else {
        this.goods.fpacket = "其它";
      }
      if (this.goods.fgoodsNum1 == "") {
        this.goods.fgoodsNum1 = parseInt(0);
      }
      if (this.goods.fgoodsNum2 == "") {
        this.goods.fgoodsNum2 = parseInt(0);
      }
      if (this.goods.fgoodsNum3 == "") {
        this.goods.fgoodsNum3 = parseInt(0);
      }
      if (this.goods.fgoodsNum4 == "") {
        this.goods.fgoodsNum4 = parseInt(0);
      }
      if (this.goods.fgoodsNum5 == "") {
        this.goods.fgoodsNum5 = parseInt(0);
      }
      this.pingoodsnum =
        this.goods.fgoodsNum1 +
        "," +
        this.goods.fgoodsNum2 +
        "," +
        this.goods.fgoodsNum3 +
        "," +
        this.goods.fgoodsNum4 +
        "," +
        this.goods.fgoodsNum5;

      this.goods.fgoodsNum =
        parseFloat(this.goods.fgoodsNum1) +
        parseFloat(this.goods.fgoodsNum2) +
        parseFloat(this.goods.fgoodsNum3) +
        parseFloat(this.goods.fgoodsNum4) +
        parseFloat(this.goods.fgoodsNum5);

      if (this.radio == "1") {
        this.serve.fisHuidan = 0;
      } else {
        this.serve.fisHuidan = 1;
      }
      if (this.radio2 == "1") {
        this.fpayName = "交付";
        this.fpayType = 1;
      } else if (this.radio2 == "2") {
        this.fpayName = "提付";
        this.fpayType = 2;
      } else {
        this.fpayName = "合同户";
        this.fpayType = 3;
      }
      if (this.msgBody.fremark == null) {
        this.msgBody.fremark = "";
      }
      if (this.serve.fdeliveryFee == "") {
        this.serve.fdeliveryFee = parseInt(0);
      }
      if (this.serve.fpickFee == "") {
        this.serve.fpickFee = parseInt(0);
      }
      if (this.fmaintenanceFee == "") {
        this.fmaintenanceFee = parseInt(0);
      }

      let fhfid = JSON.parse(localStorage.getItem("fhmrfid"));
      let shfid = JSON.parse(localStorage.getItem("fhmrfid2"));
      if (fhfid == null || fhfid == "") {
        this.fhdzadd();
      } else if (shfid == null || shfid == "") {
        this.shdzadd();
      } else if (this.goods.fgoodsName == "") {
        this.$toast.fail("请填写货物名称");
      } else if (this.goods.fgoodsNum == "") {
        this.$toast.fail("请填写货物件数");
      } else if (this.serve.fcarriage == "") {
        this.$toast.fail("请填写运费");
        let orderalterfid3 = JSON.parse(localStorage.getItem("orderalterfid3"));
      } else {
        this.serve.ftotalFee =
          parseFloat(this.serve.fcarriage) +
          parseFloat(this.serve.fdeliveryFee) +
          parseFloat(this.serve.fpickFee) +
          parseFloat(this.fmaintenanceFee);
        // 数据填写完整可以提交了
        this.disabled = true;
        let orderalterfid3 = JSON.parse(localStorage.getItem("orderalterfid3"));
        // 正常下单情况
        if (orderalterfid3 == "1") {
          if (
            this.fcodTotal == "" ||
            this.fcodTotal == null ||
            this.fcodTotal == undefined
          ) {
            let wxxdmsg = {
              msgId: "1001006201",
              serId: 0,
              type: 1,
              key: 0,
              source: 1,
              msgBody: {
                fwlCardNo: this.fwlCardNo,
                fsendId: fhfid,
                freceiveId: shfid,
                fremark: this.msgBody.fremark,
                goods: [
                  {
                    fgoodsName: this.goods.fgoodsName,
                    fpacket: this.goods.fpacket,
                    fgoodsWeight: this.goods.fgoodsWeight,
                    fgoodsVolume: this.goods.fgoodsVolume,
                    fgoodsNum: this.goods.fgoodsNum,
                    fgoodsLong: "0",
                    fgoodsWidth: "0",
                    fgoodsHeight: "0",
                    fremark: this.pingoodsnum
                  }
                ],
                orderFee: {
                  fpayType: this.fpayType,
                  fcarriage: this.serve.fcarriage,
                  fdeliveryFee: this.serve.fdeliveryFee,
                  fhedgeAmount: this.serve.fhedgeAmount,
                  fmaintenanceFee: this.fmaintenanceFee,
                  fhedgeRatio: "3", //税率
                  fisHuidan: this.serve.fisHuidan,
                  fpickFee: this.serve.fpickFee,
                  ftotalFee: this.serve.ftotalFee
                }
              }
            };
            CreateOrder({
              data: wxxdmsg
            }).then(res => {
              if (res.msgBody != "" && res.msgBody != null) {
                if (res.msgBody.sta == "ok") {
                  this.disabled = false;
                  this.$toast.success("下单成功");
                  localStorage.removeItem("serve");
                  localStorage.removeItem("goods");
                  // localStorage.removeItem("fhmrfid");
                  localStorage.removeItem("fhmrfid2");
                  localStorage.removeItem("fcodTotal");
                  localStorage.setItem("orderalterfid3", JSON.stringify("1"));
                  let momo = {
                    fwlCardNo: this.fwlCardNo,
                    fcontactorName: this.fsenderName,
                    fcontactorMobile: this.fsenderMobile
                  };
                  localStorage.setItem("morendz", JSON.stringify(momo));
                  this.$router.push({ path: "/container", name: "container" });
                } else {
                  this.disabled = false;
                  this.$toast.success(res.msgBody.staInfo);
                }
              }
            });
          } else {
            let wxxdmsg = {
              msgId: "1001006201",
              serId: 0,
              type: 1,
              key: 0,
              source: 1,
              msgBody: {
                fwlCardNo: this.fwlCardNo,
                fsendId: fhfid,
                freceiveId: shfid,
                fremark: this.msgBody.fremark,
                goods: [
                  {
                    fgoodsName: this.goods.fgoodsName,
                    fpacket: this.goods.fpacket,
                    fgoodsWeight: this.goods.fgoodsWeight,
                    fgoodsVolume: this.goods.fgoodsVolume,
                    fgoodsNum: this.goods.fgoodsNum,
                    fgoodsLong: "0",
                    fgoodsWidth: "0",
                    fgoodsHeight: "0",
                    fremark: this.pingoodsnum
                  }
                ],
                orderFee: {
                  fpayType: this.fpayType,
                  fcarriage: this.serve.fcarriage,
                  fdeliveryFee: this.serve.fdeliveryFee,
                  fhedgeAmount: this.serve.fhedgeAmount,
                  fmaintenanceFee: this.fmaintenanceFee,
                  fhedgeRatio: "3", //税率
                  fisHuidan: this.serve.fisHuidan,
                  fpickFee: this.serve.fpickFee,
                  ftotalFee: this.serve.ftotalFee
                },
                orderCod: { fcodTotal: this.fcodTotal }
              }
            };
            CreateOrder({
              data: wxxdmsg
            }).then(res => {
              if (res.msgBody != "" && res.msgBody != null) {
                if (res.msgBody.sta == "ok") {
                  this.disabled = false;
                  this.$toast.success("下单成功");
                  localStorage.removeItem("serve");
                  localStorage.removeItem("goods");
                  // localStorage.removeItem("fhmrfid");
                  localStorage.removeItem("fhmrfid2");
                  localStorage.removeItem("fcodTotal");
                  localStorage.setItem("orderalterfid3", JSON.stringify("1"));
                  this.$router.push({ path: "/container", name: "container" });
                  let momo = {
                    fwlCardNo: this.fwlCardNo,
                    fcontactorName: this.fsenderName,
                    fcontactorMobile: this.fsenderMobile
                  };
                  localStorage.setItem("morendz", JSON.stringify(momo));
                } else {
                  this.disabled = false;
                  this.$toast.success(res.msgBody.staInfo);
                }
              }
            });
          }
          // 修改下单情况
        } else {
          let orderalterfid3 = JSON.parse(
            localStorage.getItem("orderalterfid3")
          );
          if (orderalterfid3 == "2") {
            if (
              this.fcodTotal == "" ||
              this.fcodTotal == null ||
              this.fcodTotal == undefined
            ) {
              let orderaltermsg = {
                msgId: "1001007003",
                serId: 0,
                type: 1,
                key: 0,
                source: 1,
                msgBody: {
                  fid: JSON.parse(localStorage.getItem("orderalterfid")),
                  ftempOrderNo: JSON.parse(
                    localStorage.getItem("orderftempOrderNo")
                  ),

                  fwlCardNo: this.fwlCardNo,
                  fsendId: fhfid,
                  freceiveId: shfid,
                  fremark: this.msgBody.fremark,
                  goods: [
                    {
                      fgoodsName: this.goods.fgoodsName,
                      fpacket: this.goods.fpacket,
                      fgoodsWeight: this.goods.fgoodsWeight,
                      fgoodsVolume: this.goods.fgoodsVolume,
                      fgoodsNum: this.goods.fgoodsNum,
                      fgoodsLong: "0",
                      fgoodsWidth: "0",
                      fgoodsHeight: "0",
                      fremark: this.pingoodsnum
                    }
                  ],
                  orderFee: {
                    fpayType: this.fpayType,
                    fcarriage: this.serve.fcarriage,
                    fdeliveryFee: this.serve.fdeliveryFee,
                    fhedgeAmount: this.serve.fhedgeAmount,
                    fmaintenanceFee: this.fmaintenanceFee,
                    fhedgeRatio: "3", //税率
                    fisHuidan: this.serve.fisHuidan,
                    fpickFee: this.serve.fpickFee,
                    ftotalFee: this.serve.ftotalFee
                  }
                }
              };

              ChangeWccyrTempOrder({
                data: orderaltermsg
              }).then(res => {
                if (res.msgBody != "" && res.msgBody != null) {
                  if (res.msgBody.sta == "ok") {
                    this.disabled = false;
                    this.$toast.success(res.msgBody.staInfo);
                    this.$router.push({ path: "/container", name: "container" });
                    localStorage.removeItem("serve");
                    localStorage.removeItem("goods");
                    // localStorage.removeItem("fhmrfid");
                    localStorage.removeItem("fhmrfid2");
                    localStorage.removeItem("fcodTotal");
                    localStorage.setItem("orderalterfid3", JSON.stringify("1"));
                    localStorage.setItem(
                      "morendz",
                      JSON.stringify(this.zancundz)
                    );
                    localStorage.setItem(
                      "fhmrfid",
                      JSON.stringify(this.zancunfid)
                    );
                  } else {
                    this.disabled = false;
                    this.$toast.success(res.msgBody.staInfo);
                  }
                }
              });
            } else {
              let orderaltermsg = {
                msgId: "1001007003",
                serId: 0,
                type: 1,
                key: 0,
                source: 1,
                msgBody: {
                  fid: JSON.parse(localStorage.getItem("orderalterfid")),
                  ftempOrderNo: JSON.parse(
                    localStorage.getItem("orderftempOrderNo")
                  ),

                  fwlCardNo: this.fwlCardNo,
                  fsendId: fhfid,
                  freceiveId: shfid,
                  fremark: this.msgBody.fremark,
                  goods: [
                    {
                      fgoodsName: this.goods.fgoodsName,
                      fpacket: this.goods.fpacket,
                      fgoodsWeight: this.goods.fgoodsWeight,
                      fgoodsVolume: this.goods.fgoodsVolume,
                      fgoodsNum: this.goods.fgoodsNum,
                      fgoodsLong: "0",
                      fgoodsWidth: "0",
                      fgoodsHeight: "0",
                      fremark: this.pingoodsnum
                    }
                  ],
                  orderFee: {
                    fpayType: this.fpayType,
                    fcarriage: this.serve.fcarriage,
                    fdeliveryFee: this.serve.fdeliveryFee,
                    fhedgeAmount: this.serve.fhedgeAmount,
                    fmaintenanceFee: this.fmaintenanceFee,
                    fhedgeRatio: "3", //税率
                    fisHuidan: this.serve.fisHuidan,
                    fpickFee: this.serve.fpickFee,
                    ftotalFee: this.serve.ftotalFee
                  },
                  orderCod: { fcodTotal: this.fcodTotal }
                }
              };

              ChangeWccyrTempOrder({
                data: orderaltermsg
              }).then(res => {
                if (res.msgBody != "" && res.msgBody != null) {
                  if (res.msgBody.sta == "ok") {
                    this.disabled = false;
                    this.$toast.success(res.msgBody.staInfo);
                    this.$router.push({ path: "/container", name: "container" });
                    localStorage.removeItem("serve");
                    localStorage.removeItem("goods");
                    // localStorage.removeItem("fhmrfid");
                    localStorage.setItem(
                      "morendz",
                      JSON.stringify(this.zancundz)
                    );
                    localStorage.setItem(
                      "fhmrfid",
                      JSON.stringify(this.zancunfid)
                    );
                    localStorage.removeItem("fhmrfid2");
                    localStorage.removeItem("fcodTotal");
                    localStorage.setItem("orderalterfid3", JSON.stringify("1"));
                  } else {
                    this.disabled = false;
                    this.$toast.success(res.msgBody.staInfo);
                  }
                }
              });
            }
          }
        }
      }
    },
    fhdzadd() {
      let addadressmag = {
        msgId: "1001006250",
        serId: 0,
        type: 1,
        key: 0,
        source: 1,
        msgBody: {
          fweight: "1",
          fwlCardNo: this.fwlCardNo,
          fcontactorName: this.fsenderName,
          fcontactorMobile: this.fsenderMobile,
          fcontactorIdcardNo: "",
          fprovinceCode: "",
          fcityCode: "",
          fcountyCode: "",
          fprovinceCodeName: "",
          fcityCodeName: "",
          fcountyCodeName: "",
          fstreetAddress: "",
          fsiteNo: "1000",
          fsiteName: "配送中心总部",
          ftype: 1
        }
      };
      AddressAdd({ data: addadressmag })
        .then(res => {
          if (res.msgBody != "") {
            if (res.msgBody.sta == "ok") {
              localStorage.setItem("fhmrfid", JSON.stringify(res.msgBody.fid));

              this.commit();
            } else {
              this.$toast.fail(res.msgBody.staInfo);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    shdzadd() {
      let addadressmag = {
        msgId: "1001006250",
        serId: 0,
        type: 1,
        key: 0,
        source: 1,
        msgBody: {
          fweight: "1",
          fsiteName: this.freceiveSiteName,
          fsiteNo: this.fsiteNo,
          fcontactorName: this.freceiverName,
          fcontactorMobile: this.freceiverMobile,
          fcontactorIdcardNo: "",
          fprovinceCode: "",
          fcityCode: "",
          fcountyCode: "",
          fprovinceCodeName: "",
          fcityCodeName: "",
          fcountyCodeName: "",
          fstreetAddress: "",
          ftype: 2
        }
      };
      shAddressAdd({ data: addadressmag })
        .then(res => {
          if (res.msgBody != "") {
            if (res.msgBody.sta == "ok") {
              localStorage.setItem("fhmrfid2", JSON.stringify(res.msgBody.fid));
              this.commit();
            } else {
              this.$toast.fail(res.msgBody.staInfo);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="less">
#app{
   margin-top: 0px !important;
}
#qxzshr {
  font-size: 20px;
}
#order {
  * {
    padding: 0;
    margin: 0;
  }
  background-color: #f0f0f3;
  .van-field__body {
    background: rgba(238, 240, 242, 0.7);
  }
  .van-nav-bar__title,.van-icon-arrow-left,.van-nav-bar__text{
     color: #ffffff;
  }
}
#ordertop {
  margin-bottom: 50px;
}
.ji {
  border: 1px solid #eb922d;
  border-radius: 50%;
  background: #eb922d;
  width: 30px;
  height: 30px;
  margin: 5px;
  float: left;
}
.jititle {
  background: rgba(0, 153, 255, 0.7);
  height: 32px;
  //   margin-bottom: 8px;
  span {
    color: #fff;
  }
  .span1 {
    float: left;
    line-height: 32px;
    padding-left: 5px;
    // margin-left: 5px;
  }
  .span2 {
    float: right;
    line-height: 32px;
    padding-right: 5px;
  }
}
.ji_content {
  .van-cell {
    padding: 0;
  }
}
.jileft {
  color: #000;
  line-height: 30px;

  margin-top: 6px;
  text-align: left;
  span {
    font-size: 10px;
  }
}
.ji-right {
  display: block;
  color: #fff;
  font-size: 15px;
  text-align: center;
  line-height: 30px;
  font-family: 微软雅黑;
}
.jibeizhu {
  color: #000;
}

#dzreadonly,
#dzreadonly_title {
  background-color: #fff;
}

.van-cell {
  background-color: #fff;
}

#hwzz {
  text-align: left;
  height: 100px;
}
.hwxx_title {
  background: rgba(0, 153, 255, 0.7);
  p {
    color: #fff;
    padding: 5px 0;
  }
}
.hwxx_content {
  .van-cell {
    padding: 5px 5px;
  }
  .hwxx_contentp {
    background: #fff;
    border-left: #6e6e6e solid 1px;
  }
  p {
    color: #0099ff;
    font-size: 8px;
    padding: 9px 0;
  }
}
#fyxx {
  margin-top: 8px;
  .van-cell {
    padding: 5px 5px;
  }
}
.hd {
  background: #fff;
  padding: 7px 0;
  border-left: #f0f0f3 solid 1px;
}
#zzfw {
  p {
    margin-top: 0;
  }
  i {
    display: block;
    line-height: 90px;
  }
}
.hw-p1 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
}
#fkfs {
  margin-top: 5px;
  background: #fff;

  font-size: 14px;
  .van-cell {
    padding: 5px 5px;
  }
  span {
    margin: 2px;
  }
}
.feiyong {
  color: red;
}
.cankao {
  font-style: italic;
  margin-left: 30px;
}
#order-botom {
  width: 100%;
  height: 40px;

  position: fixed;
  bottom: 0;
  border-top: 2px solid #f0f0f3;
  text-align: left;
  .van-row {
    margin-top: 0px;
  }
}
.vanRow {
  margin-top: 0px;
}

#bottom-left {
  background-color: #fff;
  color: #000;
}
.fwtk {
  color: #0099ff;
  margin-left: 30px;
}
.isagree {
  font-size: 14px;
  //   margin-top: 10px;
}
#buttonstyle {
  width: 100%;
  //   height: 40px;
  font-size: 20px;
  background-color: #0099ff;
  color: #fff;
}
.qvxiao {
  display: block;
  width: 50%;
  float: left;
  padding: 5px 0;
  border-right: 1px solid #f0f0f3;
  border-bottom: 1px solid #f0f0f3;
}
.jisuan {
  display: block;
  width: 48%;
  float: right;
  padding: 5px 0;
  color: #0099ff;
  border-bottom: 1px solid #f0f0f3;
}
</style>
