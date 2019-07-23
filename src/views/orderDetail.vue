<template>
  <div id="orderqueryDetails">
    <van-nav-bar
        class="cTitle"
        title="订单详情"
        left-arrow
        fixed
        @click-left="onClickLeft"
    />
    <van-cell-group>
      <van-field
          v-model="fdispatchOrderNo"
          id="fOrderNo"
          name="fOrderNo"
          autofocus
          label="运单号："
          placeholder="请扫描运单号"
      />
      <van-button class="OrderReceiptBtn" size="small" @click="disOrderSearch()">查询</van-button>
    </van-cell-group>


    <div id="orderqueryDetailsShow" v-if="detshow">
      <van-collapse v-model="activeNames">
        <van-collapse-item title="点击查看运单流转">
          <div class="ydflow">
            <div class="ydTrends">
              <div class="yddt">
                <p>运单动态</p>
              </div>
              <div class="yddt_content">
                <ul>
                  <li v-for="(yddtitem,yddtkey) of yddtlist" :key="yddtkey">
                    <van-row>
                      <van-col span="12">{{yddtitem.operaTime}}</van-col>
                      <van-col span="12">
                        <span>[{{yddtitem.fsiteName}}]</span>
                        <span>{{yddtitem.operaDescribe}}</span>
                      </van-col>
                    </van-row>
                  </li>
                </ul>
              </div>
            </div>
            <div class="moneyflow">
              <div class="dsk">
                <p>代收款流转</p>
              </div>
              <div class="dsk_content">
                <ul>
                  <li v-for="(dskitem,dskkey) of dsklist" :key="dskkey">
                    <van-row>
                      <van-col span="12">{{dskitem.operaTime}}</van-col>
                      <van-col span="12">
                        <span>[{{dskitem.fsiteName}}]</span>
                        <span>{{dskitem.operaDescribe}}</span>
                      </van-col>
                    </van-row>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
      <div class="Detailstable">
        <div class="Detailstablehead">
          <van-row>
            <van-col span="8">
              <img src="../assets/images/wlwl.png" alt />
            </van-col>
            <van-col span="11">
              <p class="wlwlp">万里物流</p>
              <p class="ywhz">业务合作：0371-55085777</p>
              <p class="kfzx">客服中心：0371-55085000</p>
            </van-col>
            <van-col span="5">
              <img src="../assets/images/wlwlewm.jpg" alt />
            </van-col>
          </van-row>
        </div>
        <div class="Detailstablexq">
          <van-row>
            <van-col span="13" class="Detailstablexq_left">
              <p class="sfwd">始发网点：{{ydDetails.fsendSiteName}}</p>
              <p class="fhr">发货人：{{ydDetails.fsenderName}}</p>
              <p class="fhr">发货人电话：{{ydDetails.fsenderMobile}}</p>
              <p class="fhr">收货人：{{ydDetails.freceiverName}}</p>
              <p class="fhr">收货人电话：{{ydDetails.freceiverMobile}}</p>
              <p class="daoda">到达地：{{ydDetails.freceiveSiteName}}</p>
            </van-col>
            <van-col span="10" class="Detailstablexq_right">
              <p class="fkfs">
                付款方式：
                {{fpType}}
              </p>
              <p class="fkfs">运费：{{ydDetails.orderFee.fcarriage}}</p>
              <p class="fkfs">送货费：{{ydDetails.orderFee.fdeliveryFee}}</p>
              <p class="fkfs">中转费：{{ydDetails.orderFee.ftransferFee}}</p>
              <p class="fkfs">保值金额：{{ydDetails.orderFee.fhedgeAmount}}</p>
              <p class="fkfs">接货费：{{ydDetails.orderFee.fpickFee}}</p>
            </van-col>
          </van-row>
        </div>
        <div class="Detailstablecard">
          <van-row>
            <van-col span="24">
              <span>会员卡号：{{ydDetails.fwlcardNo}}</span>
            </van-col>
          </van-row>
          <van-row>
            <van-col span="10">
              <span>代收金额：{{fcodTotal}}</span>
            </van-col>
            <van-col span="14">
              <span>大写：{{daxie}}</span>
            </van-col>
          </van-row>
        </div>
        <div class="Detailstablegoods">
          <ul>
            <li v-for="(goodsitem,key) of goodslist" :key="key" class="goodslist">
              <van-row>
                <van-col span="24">
                  <span>货物名称：{{goodsitem.fgoodsName}}</span>
                </van-col>
              </van-row>
              <van-row>
                <van-col span="10">
                  <span>件数：{{goodsitem.fgoodsNum}}</span>
                </van-col>
                <van-col span="14">
                  <span>包装：{{goodsitem.fpacket}}</span>
                </van-col>
              </van-row>
            </li>
          </ul>
        </div>
        <div class="Detailstablebz">
          <van-row>
            <van-col span="13" class="Detailstablebz_left">
              <p>运单编号</p>
              <van-row>
                <van-col span="4">
                  <div class="zistand">扫码打印运单详情</div>
                </van-col>
                <van-col span="20">
                  <img :src="bigewmsrc2" alt />
                </van-col>
              </van-row>

              <p>{{ydh}}</p>
            </van-col>
            <van-col span="10" class="Detailstablebz_right">
              <p class="bz">备注</p>
              <p class="bztext">{{fremark}}</p>
            </van-col>
          </van-row>
          <van-row class="time">
            <van-col span="24">{{ydDetails.fcreatedTime}}</van-col>
          </van-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import Vue from "vue";

import {
  DispatchOrderMoveInfoSearch,
  GetTempOrderDetail,
  CreatQrCode,
  GetUserDispatchOrderDetailEntered,

} from "@/api/index";

export default {
  data() {
    return {
      ydh: "",
      yddtlist: "",
      dsklist: "",
      bigewmsrc2: "",
      activeNames: ["1"],
      yddtContent: "",
      ydDetails: "",
      fpType: "",
      fcodTotal: "",
      dxfcodTotal: "",
      daxie: "",
      goodslist: "",
      fremark: "",
      detshow: false,
      searchyd: "",
      fdispatchOrderNo:""
    };
  },

  methods: {
    onClickLeft() {
      this.$router.push({ path: "/container", name: "container" });
    },
    dosearch() {
      if (this.searchyd !== "") {
        let ewmmsg = {
          msgId: "1001006500",
          serId: 0,
          type: 1,
          key: 0,
          source: 1,
          msgBody: {
            fcontent: this.searchyd,
            isEncryption: 0
          }
        };

        CreatQrCode({ data: ewmmsg })
          .then(res => {
            if (res.msgBody != "" && res.msgBody != null) {
              this.bigewmsrc2 = res.msgBody.qrCode;
              // localStorage.setItem("ewm", JSON.stringify(res.msgBody.qrCode));
            }
          })
          .catch(err => {
            console.log(err);
          });
        //   运单动态
        let ydflowmsg = {
          msgId: "1001001815",
          serId: 0,
          type: 1,
          key: 0,
          source: 1,
          msgBody: {
            fdispatchOrderNo: this.searchyd
          }
        };

        DispatchOrderMoveInfoSearch({ data: ydflowmsg })
          .then(res => {
            console.log(res);

            if (res.msgBody != "" && res.msgBody != null) {
              this.yddtlist = res.msgBody.describe;
              this.dsklist = res.msgBody.codDescribe;
            } else if (res.msgBody == null) {
            }
          })
          .catch(err => {
            console.log(err);
          });
        let ydxqmsg = {
          msgId: "1001001813",
          serId: 0,
          type: 1,
          key: 0,
          source: 1,
          msgBody: {
            fcompanyId: "1",
            fdispatchOrderNo: this.searchyd
          }
        };

        GetUserDispatchOrderDetailEntered({ data: ydxqmsg })
          .then(res => {
            if (res.msgBody != "" && res.msgBody != null) {
              this.detshow = true;
              this.ydDetails = res.msgBody;
              this.fremark = res.msgBody.fremark;
              this.goodslist = res.msgBody.goods;
              if (res.msgBody.cod != null) {
                this.dxfcodTotal = res.msgBody.cod.fcodTotal;
                this.fcodTotal = res.msgBody.cod.fcodTotal;
                this.dxtrans(res.msgBody.cod.fcodTotal);
              } else {
                this.dxfcodTotal = 0;
                this.fcodTotal = 0;
                this.daxie = "零";
              }
              if (res.msgBody.orderFee.fpayType == 1) {
                this.fpType = "交付";
              } else if (res.msgBody.orderFee.fpayType == 1) {
                this.fpType = "提付";
              } else {
                this.fpType = "合同户";
              }
            } else {
              alert("无效运单号，请重新输入！");
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$toast.fail("请输入运单号");
      }
    },
   
    dxtrans(dxfcodTotal) {
      // dxfcodTotal = localStorage.getItem("dxfcodTotal");
      var cnNums = new Array(
        "零",
        "壹",
        "贰",
        "叁",
        "肆",
        "伍",
        "陆",
        "柒",
        "捌",
        "玖"
      );
      //基本单位
      var cnIntRadice = new Array("", "拾", "佰", "仟");
      //对应整数部分扩展单位
      var cnIntUnits = new Array("", "万", "亿", "兆");
      //对应小数部分单位
      var cnDecUnits = new Array("角", "分", "毫", "厘");
      //整数金额时后面跟的字符
      var cnInteger = "整";
      //整型完以后的单位
      var cnIntLast = "元";
      //最大处理的数字
      var maxNum = 999999999999999.9999;
      //金额整数部分
      var integerNum;
      //金额小数部分
      var decimalNum;
      //输出的中文金额字符串
      // var this.daxie = "";
      //分离金额后用的数组，预定义
      var parts;
      if (dxfcodTotal == "") {
        return "";
      }
      dxfcodTotal = parseFloat(dxfcodTotal);
      if (dxfcodTotal >= maxNum) {
        //超出最大处理数字
        return "";
      }
      if (dxfcodTotal == 0) {
        this.daxie = cnNums[0] + cnIntLast + cnInteger;
        return this.daxie;
      }
      //转换为字符串
      dxfcodTotal = dxfcodTotal.toString();
      if (dxfcodTotal.indexOf(".") == -1) {
        integerNum = dxfcodTotal;
        decimalNum = "";
      } else {
        parts = dxfcodTotal.split(".");
        integerNum = parts[0];
        decimalNum = parts[1].substr(0, 4);
      }
      //获取整型部分转换
      if (parseInt(integerNum, 10) > 0) {
        var zeroCount = 0;
        var IntLen = integerNum.length;
        for (var i = 0; i < IntLen; i++) {
          var n = integerNum.substr(i, 1);
          var p = IntLen - i - 1;
          var q = p / 4;
          var m = p % 4;
          if (n == "0") {
            zeroCount++;
          } else {
            if (zeroCount > 0) {
              this.daxie += cnNums[0];
            }
            //归零
            zeroCount = 0;
            this.daxie += cnNums[parseInt(n)] + cnIntRadice[m];
          }
          if (m == 0 && zeroCount < 4) {
            this.daxie += cnIntUnits[q];
          }
        }
        this.daxie += cnIntLast;
        this.daxie = this.daxie;
      }
      //小数部分
      if (decimalNum != "") {
        var decLen = decimalNum.length;
        for (var i = 0; i < decLen; i++) {
          var n = decimalNum.substr(i, 1);
          if (n != "0") {
            this.daxie += cnNums[Number(n)] + cnDecUnits[i];
          }
        }
      }
      if (this.daxie == "") {
        this.daxie += cnNums[0] + cnIntLast + cnInteger;
      } else if (decimalNum == "") {
        this.daxie += cnInteger;
      }
    }
  },
  
   
};
</script>
<style lang="less">
#orderqueryDetails {
  width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    bottom: 0px;
    margin-top: 45px;
    background: #fff;
  .van-nav-bar__title,.van-icon-arrow-left,.van-nav-bar__text{
      color: #ffffff;
  }
  .cTitle{
      background-color: #3385ff; 
      color: #ffffff;
  }
  .time {
    border-top: 2px solid #000;
  }
}
.Detailstable {
  border: 2px solid #000;
  width: 96%;
  margin-left: 2%;
}
.Detailstablehead {
  border-bottom: 2px solid #000;
}
.wlwlp {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
}
.ywhz,
.kfzx {
  font-size: 8px;
  margin: 0;
}
.Detailstablexq_left {
  text-align: left;
  margin-left: 5px;
  border-right: 2px solid #000;
  p {
    margin: 2px;
  }
  .sfwd {
    font-weight: 800;
    font-size: 16px;
  }
  .fhr {
    font-size: 8px;
  }
  .daoda {
    font-weight: 800;
    font-size: 18px;
  }
}
.Detailstablexq_right {
  text-align: left;
  margin-left: 5px;
  p {
    margin: 3px;
    font-size: 8px;
  }
}
.Detailstablecard {
  border-top: 2px solid #000;
  text-align: left;
  padding-left: 5px;
  span {
    font-size: 10px;
  }
}
.Detailstablegoods {
  border-top: 2px solid #000;
  text-align: left;
  padding-left: 5px;
  span {
    font-size: 14px;
    font-weight: 600;
  }
}
.Detailstablebz {
  border-top: 2px solid #000;
}
.Detailstablebz_left {
  border-right: 2px solid #000;
  .zistand {
    width: 8px;
    margin: 0 auto;
    line-height: 18px;
    font-size: 14px;
  }
}
.Detailstablebz_right {
  .bz {
    font-size: 8px;
  }
}
.ydTrends {
  width: 100%;
  //   border: 1px solid #000;
  background-color: #fff;
  height: 230px;
  .yddt {
    border: 1px solid #0099ff;
    background-color: #0099ff;
    p {
      text-align: left;
      color: #fff;
      margin-left: 15px;
      font-size: 18px;
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
  .yddt_content {
    margin-top: 10px;
    border: 1px solid #99ccff;
    box-shadow: 2px 2px 2px#99ccff;
    height: 186px;
    border-top: none;
  }
}
.moneyflow {
  width: 100%;
  margin-top: 10px;
  //   border: 1px solid #000;
  background-color: #fff;
  height: 230px;
  .dsk {
    border: 1px solid #eb922d;
    background-color: #eb922d;

    p {
      text-align: left;
      color: #fff;
      margin-left: 15px;
      font-size: 18px;
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
  .dsk_content {
    margin-top: 10px;

    border: 1px solid #f1ba7a;
    box-shadow: 2px 2px 2px#f1ba7a;
    height: 186px;
    border-top: none;
  }
}
.OrderReceiptBtn{
    background-color: #CACACA;
    position: absolute;
    top: 6px;
    right: 10px;
}
</style>
