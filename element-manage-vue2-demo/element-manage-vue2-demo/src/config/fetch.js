

import { baseUrl } from './env'

export default async (url = '', data = {}, type = 'GET', method = 'fetch') => {
  url = baseUrl + url
  type = type.toUpperCase()

  //GET请求
  if (type === 'GET') {
    let dataStr = '' //数据拼接字符串（get请求拼接字符串url）
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&';
    })

    if (dataStr != '') {
      // dataStr = dataStr.slice(0,dataStr.lastIndexOf('&')); slice() 方法提取某个字符串的一部分，并返回一个新的字符串，且不会改动原字符串。
      dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))    //substring() 方法返回一个字符串,str.substring(indexStart[, indexEnd]);返回值包含给定字符串的指定部分的新字符串。
      url = url + '?' + dataStr
    }
  }

  if (window.fetch && method == 'fetch') {
    let requestConfig = {
      credentials: 'include',//让浏览器发送包含凭据的请求
      method: type,   //请求使用的方法，如 GET、POST。
      headers: {      //请求的头信息
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',     //请求的模式
      cache: 'force-cache',   //请求的 cache 模式
    }

    if (type === 'POST') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      })
    }

    try {

      const response = fetch(url, requestConfig);
      // const responseJson = response.json()
      const responseJson = response
      return responseJson
    } catch (error) {
      throw new Error(error)
    }
  } else {
    return new Promise((resolve, reject) => {
      let requestObj;
      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest();
      } else {
        requestObj = new ActiveXObject;
      }
      let sendData = '';
      if (type === 'POST') {
        sendData = JSON.stringify(data)
      }
      requestObj.open(type, url, true);
      requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      requestObj.send(sendData);

      requestObj.onreadystatechange = () => {
        if (requestObj.readyState == 4) {
          if (requestObj.status === 200) {
            let obj = requestObj.response
            if (typeof obj !== 'object') {
              obj = JSON.parse(obj);
            }
            resolve(obj)
          } else {
            reject(requestObj)
          }
        }
      }
    })
  }
}
