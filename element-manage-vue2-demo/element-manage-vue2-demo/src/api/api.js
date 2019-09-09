
import axios from 'axios'
import { baseUrl, baseImgPath } from "../config/env";


var api = {
  /**
   *  是否开启调试模式
   */
  debug: true,


  /*
  * 路由地址对象
  * */
  urlObj: null,
  /*
  *  根路径
  * */
  // baseUrl: '//elm.cangdu.org',
  //   // baseImgPath : '//elm.cangdu.org/img/',
  baseUrl,
  baseImgPath,

  cityGuess: function () {
    return new Promise(function (resolve, reject) {
      axios.get(api.baseUrl + '/v1/cities',
        {
          params: {//请求参数
            type: 'guess'
          }
        }
      ).then((res) => {
        console.log(res);
        resolve(res)
        if (res.statusText) {
          resolve(res)
        } else {
          resolve({ ok: false, reason: res.reason })
        }
      }).catch((res) => {
        reject(res)
      })
    });
  },
  foodCategory: function (latitude, longitude) {
    return new Promise(function (resolve, reject) {
      axios.get(api.baseUrl + '/shopping/v2/restaurant/category',
        {
          params: {//请求参数
            type: 'guess'
          }
        }
      ).then((res) => {
        //api.debug &&
        console.log(res);
        resolve(res)
      }).catch((res) => {
        reject(res)
      })
    });
  },
  searchplace: function(cityid,value ){
    return new Promise(function (resolve,reject) {
      axios.get(api.baseUrl + '/v1/pois',{
        params:{
          type: 'search',
          city_id: cityid,
          keyword: value
        }
      }).then((res)=>{
        console.log(res)
        if(res.statusText){
          resolve(res)
        }
      }).catch((res)=>{
        reject(res)
      })
    })
  },
  addShop: function (data) {
  return new Promise(function (resolve, reject) {
    axios.post(api.baseUrl + '/shopping/addShop',
      data     //请求参数
    ).then((res) => {
      console.log(res);
      resolve(res)
    }).catch((res) => {
      reject(res)
    })
  });
},














  foodCategory11111: function (latitude, longitude) {
    return new Promise(function (resolve, reject) {
      axios.post(api.baseUrl + '/shopping/v2/restaurant/category',
        data     //请求参数
      ).then((res) => {
        console.log(res);
        resolve(res)
      }).catch((res) => {
        reject(res)
      })
    });
  },
}

export default api;
