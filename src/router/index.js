import Vue from 'vue'
import Router from 'vue-router'
import VueI18n from 'vue-i18n'
import axios from "axios"
Vue.prototype.$ajax = axios

import Index from '../views/index'
import Container from '../views/container'

import FreightInquire from '../views/freightInquire'
import GoodsReceipt from '../views/goodsReceipt'
import Identity from '../views/identity'
import InstallManage from '../views/installManage'
import MarketInquire from '../views/marketInquire'
import NoUnloading from '../views/noUnloading'
import Reprint from '../views/reprint'
import StopInquire from '../views/stopInquire'
import StorageReceipt from '../views/storageReceipt'
import TruckReceipt from '../views/truckReceipt'

import AlreadyStorage from '../views/alreadyStorage'
import AlreadyTruck from '../views/alreadyTruck'
import AlreadyReceive from '../views/alreadyReceive'
import SiteDetailMsg from '../views/siteDetailMsg'

import Order from '../views/order'
import ServiceTerms from '../views/serviceTerms'
import Adresschange from '../views/adresschange'
import Adressedit from '../views/adressedit'
import Adresslist from '../views/adresslist'
import AddressAlter from '../views/adressalter.vue'
import SAddressList from '../views/sadresslist.vue'
import SAddressEdit from '../views/sadressedit.vue'
import OrderDetail from '../views/orderDetail'

import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)
Vue.use(Router)
Vue.use(VueI18n)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/container',
      name: 'container',
      component: Container
    },
    {
      path: '/freightInquire',
      name: 'freightInquire',
      component: FreightInquire
    },
    {
      path:'/goodsReceipt',
      name:'goodsReceipt',
      component: GoodsReceipt
    },
    {
      path:'/identity',
      name:'identity',
      component: Identity
    },
    {
      path:'/installManage',
      name:'installManage',
      component:InstallManage
    },
    {
      path:'/marketInquire',
      name:'marketInquire',
      component:MarketInquire
    },
    {
      path:'/noUnloading',
      name:'noUnloading',
      component:NoUnloading
    },
    {
      path:'/reprint',
      name:'reprint',
      component:Reprint
    },
    {
      path:'/stopInquire',
      name:'stopInquire',
      component:StopInquire
    },
    {
      path:'/storageReceipt',
      name:'storageReceipt',
      component:StorageReceipt
    },
    {
      path:'/truckReceipt',
      name:'truckReceipt',
      component:TruckReceipt
    },
    {
      path:'/alreadyStorage',
      name:'AlreadyStorage',
      component:AlreadyStorage
    },
    {
      path:'/alreadyTruck',
      name:'AlreadyTruck',
      component:AlreadyTruck
    },
    {
      path:'/alreadyReceive',
      name:'AlreadyReceive',
      component:AlreadyReceive
    },
    {
      path:'/siteDetailMsg',
      name:'siteDetailMsg',
      component:SiteDetailMsg
    },
    {
      path:'/order',
      name:'order',
      component:Order
    },
    {
      path:'/serviceTerms',
      name:'serviceTerms',
      component:ServiceTerms
    },
    {
      path:'/adresschange',
      name:'adresschange',
      component:Adresschange
    },
    {
      path:'/adressedit',
      name:'adressedit',
      component:Adressedit
    },
    {
      path:'/adresslist',
      name:'adresslist',
      component:Adresslist
    },
    {
      path:'/addressAlter',
      name:'addressAlter',
      component:AddressAlter
    },
    {
      path: '/sadresslist',
      name: 'sadresslist',
      component: SAddressList
    },
    {
      path: '/sadressedit',
      name: 'sadressedit',
      component: SAddressEdit
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: OrderDetail
    }
  ]
})
