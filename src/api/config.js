import axios from 'axios'

// export const URLROUTER = "http://wl.56ps.cn:8893"
export const URLROUTER = "http://192.168.1.169:8893"


export const ERROK = "0"
export const NOTLOGIN = 301
export const AMOUNT = 10
export const options = {
  param: 'jsonpCallback'
}

// 全局的请求次数和请求间隙
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;

// axios.defaults.timeout = 60000;
axios.defaults.baseURL = process.env.BASE_API;

// 添加请求拦截器
axios.interceptors.request.use(config => {
  config.headers = {
    'Content-Type': 'application/json',
  }
  let token = localStorage.getItem("tokenInfoToken");
  if (token != "" && token != 'undefined' ){

    config.headers.packet_token = JSON.parse(localStorage.getItem("tokenInfoToken"));
    config.headers.packet_check = JSON.parse(localStorage.getItem("tokenInfoCheck"));
    config.headers.packet_type = JSON.parse(localStorage.getItem("tokenInfoType"));
  } else if(token == 'undefined'){
    // 清缓存
    window.localStorage.removeItem("tokenInfoToken")
    window.localStorage.removeItem("tokenInfoCheck")
    window.localStorage.removeItem("tokenInfoType")
  }

  let formData = new FormData()
  formData.append('msg', JSON.stringify(config.data))

  config.data = formData
  return config;
},
  err => Promise.reject(err)
)

// 添加响应拦截器
axios.interceptors.response.use(
  
  response => {
    // console.log(response)
    localStorage.setItem('tokenInfoToken',JSON.stringify(response.headers.packet_token))
    localStorage.setItem('tokenInfoCheck',JSON.stringify(response.headers.packet_check))
    localStorage.setItem('tokenInfoType',JSON.stringify(response.headers.packet_type))
    return Promise.resolve(response)
  },  
  error => {
    
    var config = error.config;
    // 如果config不存在活未设置重试选项，请拒绝
    if(!config || !config.retry){
      return Promise.reject(error);
    }
    // 设置变量跟踪重复次数
    config._retryCount = config._retryCount || 0;
    // 检查是否已经到达最大重复次数
    if(config._retryCount >= config.retry){
      // 抛出错误信息
      return Promise.reject(error);
    }
    // 增加请求重复次数
    config._retryCount += 1;

  }
)



export default axios;
