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

  /**
   * 删除餐馆
   */
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
  /**
   * 更新餐馆信息
   */
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
  /**
   * 获取用户数量
   */
  getUserCount: function (data) {
    return new Promise(function (resolve, reject) {
      axios.get(api.baseUrl + '/v1/users/count', {
        params: {
          data
        }
      }).then(res => {
        console.log(res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 获取用户列表
   */
  getUserList: function (data) {
    return new Promise(function (resolve, reject) {
      axios.get(api.baseUrl + '/v1/users/list', {
        params: {
          // data
          offset: data.offset,
          limit: data.limit,
        }
      }).then(res => {
        console.log(res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 获取食品数量
   */
  getFoodsCount: function (data) {
    return new Promise(function (resolve, reject) {
      axios.get(api.baseUrl + '/shopping/v2/foods/count', {
        params: {
          // data
          restaurant_id: data,
        }
      }).then(res => {
        console.log(res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 获取食品列表
   */
  getFoods: function (data) {
    return new Promise(function (resolve, reject) {
      axios.get(api.baseUrl + '/shopping/v2/foods', {
        params: {
          data
        }
      }).then(res => {
        console.log(res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 获取餐馆详细信息
   */

  getResturantDetail: function (data) {
    return new Promise(function (resolve, reject) {
      axios.get(api.baseUrl + '/shopping/restaurant/' + data, {
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
   * 获取menu详情
   */
  getMenuById: function (data) {
    return new Promise(function (resolve, reject) {
      axios.get(api.baseUrl + '/shopping/v2/menu/' + data, {
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
   * 获取menu列表
   */
  getMenu: function (data) {
    return new Promise(function (resolve, reject) {
      axios.get(api.baseUrl + '/shopping/v2/menu', {
        params: {
          restaurant_id: data.restaurant_id,
          allMenu: data.allMenu,
        }
      }).then(res => {
        console.log(res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 删除食品
   */
  deleteFood: function (food_id) {
    return new Promise(function (resolve, reject) {
      axios.delete(api.baseUrl + '/shopping/v2/food/' + food_id, {
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
   * 更新食品信息
   */
  updateFood: function (data) {
    return new Promise(function (resolve, reject) {
      axios.post(api.baseUrl + '/shopping/v2/updatefood', {
        data
      }).then(res => {
        console.log(res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  /**
   * 获取订单数量
   */
  getOrderCount: function (data) {
    return new Promise(function (resolve, reject) {
      axios.get(api.baseUrl + '/bos/orders/count' + '?restaurant_id=' + data.restaurant_id, {
        params: {
          // data
        }
      }).then(res => {
        console.log(res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 获取订单列表
   */
  getOrderList: function (data) {
    return new Promise(function (resolve, reject) {
      // axios.get(api.baseUrl + '/bos/orders'+ '?offset='+ data.offset+'&limit='+ data.limit+ '&restaurant_id='+ data.restaurant_id,{
      axios.get(api.baseUrl + '/bos/orders', {
        params: {
          data
        }
      }).then(res => {
        console.log(res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 获取用户信息
   */
  getUserInfo: function (user_id) {
    return new Promise(function (resolve, reject) {
      axios.get(api.baseUrl + '/v1/user/' + user_id, {
        params: {
          // data
        }
      }).then(res => {
        console.log(res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 获取地址信息
   */
  getAddressById: function (address_id) {
    return new Promise(function (resolve, reject) {
      axios.get(api.baseUrl + '/v1/addresse/' + address_id, {
        params: {
          // data
        }
      }).then(res => {
        console.log(res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 管理员数量
   */
  adminCount: function () {
    return new Promise(function (resolve, reject) {
      axios.get(api.baseUrl + '/admin/count', {
        params: {
          // data
        }
      }).then(res => {
        console.log(res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 管理员列表
   */

  adminList: function (data) {
    return new Promise(function (resolve, reject) {
      axios.get(api.baseUrl + '/admin/all' + '?offset=' + data.offset + '&limit=' + data.limit, {
        params: {
          // data
        }
      }).then(res => {
        console.log(res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 获取用户分布信息
   */
  getUserCity: function (data) {
    return new Promise(function (resolve, reject) {
      axios.get(api.baseUrl + '/v1/user/city/count', {
        params: {
          // data
        }
      }).then(res => {
        console.log(res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 获取用户信息
   */
  getAdminInfo: function () {
    return new Promise(function (resolve, reject) {
      axios.get(api.baseUrl + '/admin/info',
        // data     //请求参数
      ).then((res) => {
        console.log(res);
        resolve(res)
      }).catch((res) => {
        reject(res)
      })
    });
  },
  /**
   * 用户注册量
   */
  userCount: function (date) {
    return new Promise(function (resolve, reject) {
      axios.get(api.baseUrl + '/statis/user/' + date + '/count',
        // data     //请求参数
      ).then((res) => {
        console.log(res);
        resolve(res)
      }).catch((res) => {
        reject(res)
      })
    });
  },

/**
 * 某一天订单数量
 */
orderCount: function (date) {
  return new Promise(function (resolve, reject) {
    axios.get(api.baseUrl + '/statis/order/' + date + '/count',
      // data     //请求参数
    ).then((res) => {
      console.log(res);
      resolve(res)
    }).catch((res) => {
      reject(res)
    })
  });
},


/**
 * 某一天管理员注册量
 */
 adminDayCount: function (date) {
  return new Promise(function (resolve, reject) {
    axios.get(api.baseUrl + '/statis/admin/' + date + '/count',
      // data     //请求参数
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
