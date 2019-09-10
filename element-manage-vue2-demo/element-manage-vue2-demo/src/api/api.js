import axios from 'axios'
import {baseUrl, baseImgPath} from "../config/env";


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
  // baseImgPath : '//elm.cangdu.org/img/',
  baseUrl,
  baseImgPath,


  /**
   * 获取定位城市
   */
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
        // resolve(res)
        if (res.statusText) {
          resolve(res)
        } else {
          resolve({ok: false, reason: res.reason})
        }
      }).catch((res) => {
        reject(res)
      })
    });
  },
  /**
   * category 种类列表
   */
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
  /**
   * 获取搜索地址
   */
  searchplace: function (cityid, value) {
    return new Promise(function (resolve, reject) {
      axios.get(api.baseUrl + '/v1/pois', {
        params: {
          type: 'search',
          city_id: cityid,
          keyword: value
        }
      }).then((res) => {
        console.log(res)
        if (res.statusText) {
          resolve(res)
        }
      }).catch((res) => {
        reject(res)
      })
    })
  },
  /**
   * 添加商铺
   */
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
  /**
   * 获取当前店铺食品种类
   */
  getCategory: function (restaurant_id) {
    return new Promise(function (resolve, reject) {
      axios.get(api.baseUrl + '/shopping/getcategory/' + restaurant_id, {
          params: {}
        }
      ).then((res) => {
        console.log(res)
        resolve(res)
      }).catch((res) => {
        reject(res)
      })
    })
  },
  /**
   * 添加食品种类
   */
  addCategory: function (data) {
    return new Promise(function (resolve, reject) {
      axios.post(api.baseUrl + '/shopping/addcategory',
        data     //请求参数
      ).then((res) => {
        console.log(res);
        resolve(res)
      }).catch((res) => {
        reject(res)
      })
    });
  },
  /**
   * 添加食品
   */
  addFood: function (data) {
    return new Promise(function (resolve, reject) {
      axios.post(api.baseUrl + '/shopping/addfood', {
        data
      }).then((res) => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 获取餐馆数量
   */
  getResturantsCount: function () {
    return new Promise(function (resolve, reject) {
      axios.get(api.baseUrl + '/shopping/restaurants/count', {
        params: {}
      }).then(res => {
        console.log(res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 获取餐馆列表
   */
  getResturants: function (data) {
    return new Promise(function (resolve, reject) {
      axios.get(api.baseUrl + '/shopping/restaurants', {
        params: {
          latitude: data.latitude,
          longitude: data.longitude,
          offset: data.offset,
          limit: data.limit,
        }
      }).then((res) => {
        console.log(res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // foodCategory:function () {
  //     return new Promise(function(resolve, reject){
  //       axios.get(api.baseUrl + '/shopping/v2/restaurant/category',{
  //
  //       }).then(res=>{
  //         console.log(res)
  //         resolve(res)
  //       }).catch(err=>{
  //         reject(err)
  //       })
  //     })
  //   },

  deleteResturant: function (restaurant_id) {
    return new Promise(function (resolve, reject) {
      axios.delete(api.baseUrl + '/shopping/restaurant/' + restaurant_id, {
        params: {}

      }).then(res => {
        console.log(res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  updateResturant: function (data) {
    return new Promise(function (resolve, reject) {
      axios.post(api.baseUrl + '/shopping/updateshop', {
        data
      }).then(res => {
        console.log(res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
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
