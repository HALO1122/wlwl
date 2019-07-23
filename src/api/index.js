import {
  axiosConfig
} from './articleList'
import {
  URLROUTER
} from './config'

// 用户登录接口
export function LoginVerification(config) {
  let Obj = {
    'url': URLROUTER + '/Mobile/LoginVerification',
    'method': "post"
  }
  return axiosConfig(Object.assign({}, Obj, config))
}
// 校检运单号是否正确
export function CheckDispatchOrderNo(config) {
  let Obj = {
    'url': URLROUTER + '/Mobile/DispatchOrder/CheckDispatchOrderNo',
    'method': "post"
  }
  return axiosConfig(Object.assign({}, Obj, config))
}
// 运单号获得相关的明细
export function GetQRDetailEntered(config) {
  let Obj = {
    'url': URLROUTER + '/Mobile/DispatchOrder/GetQRDetailEntered',
    'method': "post"
  }
  return axiosConfig(Object.assign({}, Obj, config))
}
// 物流站点模糊查询
export function SiteNameVagueSearch(config) {
  let Obj = {
    'url': URLROUTER + '/Mobile/DispatchOrder/SiteNameVagueSearch',
    'method': "post"
  }
  return axiosConfig(Object.assign({}, Obj, config))
}
// 收货单录入/修改
export function CreateDispatchOrder(config) {
  let Obj = {
    'url': URLROUTER + '/Mobile/DispatchOrder/CreateDispatchOrder',
    'method': "post"
  }
  return axiosConfig(Object.assign({}, Obj, config))
}
// 已收货运单查询
export function ClerkDispatchOrderSearch(config) {
  let Obj = {
    'url': URLROUTER + '/Mobile/DispatchOrder/ClerkDispatchOrderSearch',
    'method': "post"
  }
  return axiosConfig(Object.assign({}, Obj, config))
}
// 运单入库操作
export function DispatchOrderInstuck(config) {
  let Obj = {
    'url': URLROUTER + '/Mobile/DispatchOrder/DispatchOrderInstuck',
    'method': "post"
  }
  return axiosConfig(Object.assign({}, Obj, config))
}
// 入库签收查询接口
export function DispatchOrderInstuckSearch(config) {
  let Obj = {
    'url': URLROUTER + '/Mobile/DispatchOrder/DispatchOrderInstuckSearch',
    'method': "post"
  }
  return axiosConfig(Object.assign({}, Obj, config))
}
// 运单装车操作
export function DispatchOrderLoad(config) {
  let Obj = {
    'url': URLROUTER + '/Mobile/DispatchOrder/DispatchOrderLoad',
    'method': "post"
  }
  return axiosConfig(Object.assign({}, Obj, config))
}
// 装车运单查询
export function DispatchOrderLoadSearch(config) {
  let Obj = {
    'url': URLROUTER + '/Mobile/DispatchOrder/DispatchOrderLoadSearch',
    'method': "post"
  }
  return axiosConfig(Object.assign({}, Obj, config))
}
// 获得指定运单的运单明细
export function GetDispatchOrderDetailEntered(config) {
  let Obj = {
    'url': URLROUTER + '/Mobile/DispatchOrder/GetDispatchOrderDetailEntered',
    'method': "post"
  }
  return axiosConfig(Object.assign({}, Obj, config))
}
// 停发货查询接口
export function StopShipmentSearch(config) {
  let Obj = {
    'url': URLROUTER + '/Mobile/DispatchOrder/SuspensionDispatchOrderSearch',
    'method': "post"
  }
  return axiosConfig(Object.assign({}, Obj, config))
}
// 装车单生成查询
export function CreateLoadListSearch(config) {
  let Obj = {
    'url': URLROUTER + '/Mobile/DispatchOrder/CreateLoadListSearch',
    'method': "post"
  }
  return axiosConfig(Object.assign({}, Obj, config))
}
// 装车单生成
export function LoadListAdd(config) {
  let Obj = {
    'url': URLROUTER + '/Mobile/Load/LoadListAdd',
    'method': "post"
  }
  return axiosConfig(Object.assign({}, Obj, config))
}
// 装车单查询
export function LoadListSearchByNo(config) {
  let Obj = {
    'url': URLROUTER + '/Mobile/Load/LoadListSearchByNo',
    'method': "post"
  }
  return axiosConfig(Object.assign({}, Obj, config))
}
// 装车单修改
export function LoadListChange(config) {
  let Obj = {
    'url': URLROUTER + '/Mobile/Load/LoadListChange',
    'method': "post"
  }
  return axiosConfig(Object.assign({}, Obj, config))
}
// 市场收货查询接口
export function DispatchOrderPackSearch(config) {
  let Obj = {
    'url': URLROUTER + '/Mobile/DispatchOrder/DispatchOrderPackSearch',
    'method': "post"
  }
  return axiosConfig(Object.assign({}, Obj, config))
}
// 未卸车装车单查询
export function UnLoadListSearch(config) {
  let Obj = {
    'url': URLROUTER + '/Mobile/Load/UnLoadListSearch',
    'method': "post"
  }
  return axiosConfig(Object.assign({}, Obj, config))
}
// 交付运费查询接口
export function DispatchOrderUpCarriageSearch(config) {
  let Obj = {
    'url': URLROUTER + '/Mobile/DispatchOrder/DispatchOrderUpCarriageSearch',
    'method': "post"
  }
  return axiosConfig(Object.assign({}, Obj, config))
}
// 补打标签
export function GetMissQRCodeValue(config) {
  let Obj = {
    'url': URLROUTER + '/Mobile/DispatchOrder/GetMissQRCodeValue',
    'method': "post"
  }
  return axiosConfig(Object.assign({}, Obj, config))
}
// 人员认证信息绑定
export function StaffCustomerBind(config) {
  let Obj = {
    'url': URLROUTER + '/Mobile/Cert/StaffCustomerBind',
    'method': "post"
  }
  return axiosConfig(Object.assign({}, Obj, config))
}
// 身份证认证查询（调用照片）
export function UserIdCardAuthen(config) {
  let Obj = {
    'url': URLROUTER + '/Mobile/Cert/UserIdCardAuthen',
    'method': "post"
  }
  return axiosConfig(Object.assign({}, Obj, config))
}
// 物流客户微信下单
export function CreateOrder(config) {
  let Obj = {
    'url': URLROUTER + '/WlCustomerWeChat/CreateOrder',
    'method': "post",

  }
  return axiosConfig(Object.assign({}, Obj, config))
}

// 付款方式
export function PayTypeInfoSearch(config) {
  let Obj = {
    'url': URLROUTER + '/Basic/PayTypeInfoSearch',
    'method': "post",

  }
  return axiosConfig(Object.assign({}, Obj, config))
}
// 根据临时订单编号查询临时订单明细信息
export function GetTempOrderDetail(config) {
  let Obj = {
    'url': URLROUTER + '/InvoiceInput/GetTempOrderDetail',
    'method': "post",

  }
  return axiosConfig(Object.assign({}, Obj, config))
}
// 提交修改临时订单信息
export function ChangeWccyrTempOrder(config) {
  let Obj = {
    'url': URLROUTER + '/WccyrTempOrder/ChangeWccyrTempOrder',
    'method': "post",

  }
  return axiosConfig(Object.assign({}, Obj, config))
}
// 地址添加
export function AddressAdd(config) {
  let Obj = {
    'url': URLROUTER + '/WlCustomerWeChat/CommonlyUsedAddressAdd',
    'method': "post",

  }
  return axiosConfig(Object.assign({}, Obj, config))
}
// 地址展示
export function AddressListSearch(config) {
  let Obj = {
    'url': URLROUTER + '/WlCustomerWeChat/CommonlyUsedAddressListSearch',
    'method': "post",

  }
  return axiosConfig(Object.assign({}, Obj, config))
}
// order页面收货地址添加
export function shAddressAdd(config) {
  let Obj = {
    'url': URLROUTER + '/WlCustomerWeChat/CommonlyUsedAddressAdd',
    'method': "post",

  }
  return axiosConfig(Object.assign({}, Obj, config))
}
//地址修改
export function AddressSearchById(config) {
  let Obj = {
    'url': URLROUTER + '/WlCustomerWeChat/CommonlyUsedAddressSearchById',
    'method': "post",
  }
  return axiosConfig(Object.assign({}, Obj, config))
}
// 地址删除
export function AddressDelete(config) {
  let Obj = {
    'url': URLROUTER + '/WlCustomerWeChat/CommonlyUsedAddressDelete',
    'method': "post",
  }
  return axiosConfig(Object.assign({}, Obj, config))
}
// 省市县数据

export function AdminDivisionVagueSearch(config) {
  let Obj = {
    'url': URLROUTER + '/Basic/AdminDivisionVagueSearch',
    'method': "post",

  }
  return axiosConfig(Object.assign({}, Obj, config))
}
//地址修改之后的提交
export function CommonlyUsedAddressUpdate(config) {
  let Obj = {
    'url': URLROUTER + '/WlCustomerWeChat/CommonlyUsedAddressUpdate',
    'method': "post",
  }
  return axiosConfig(Object.assign({}, Obj, config))
}
// 运单流转
export function DispatchOrderMoveInfoSearch(config) {
  let Obj = {
    'url': URLROUTER + '/Search/DispatchOrderMoveInfoSearch',
    'method': "post",
  }
  return axiosConfig(Object.assign({}, Obj, config))
}
//二维码
export function CreatQrCode(config) {
  let Obj = {
    'url': URLROUTER + '/QrCode/CreatQrCode',
    'method': "post",
  }
  return axiosConfig(Object.assign({}, Obj, config))
}
// 解析二维码
export function ReadQrCode(config) {
  let Obj = {
    'url': URLROUTER + '/QrCode/ReadQrCode',
    'method': "post"
  }
  return axiosConfig(Object.assign({}, Obj, config))
}
// 运单详情
export function GetUserDispatchOrderDetailEntered(config) {
  let Obj = {
    'url': URLROUTER + '/InvoiceInput/GetUserDispatchOrderDetailEntered',
    'method': "post",

  }
  return axiosConfig(Object.assign({}, Obj, config))
}