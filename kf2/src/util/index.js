/**
 * Created by qgg on 2017/6/8.
 */
import Vue from 'vue'

//单例
export const getSingle = function(fn){
  let result
  return function(){
    return result || (result = fn.apply(this, arguments))
  }
}

//装饰
export const before = function(fn, beforefn){
  let self = this
  return function(){
      beforefn.apply(this, arguments)
      return self.apply(this, arguments)
  }
}

export const after = function(fn, afterfn){
  let self = this
  return function(){
    let result = self.apply(this, arguments)
    afterfn.apply(this, arguments)
    return result
  }
}

//节流
export const throttle = function(fn, interval){
  let timer = null
  return function(){
    if(timer){
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, interval || 300)
  }
}

//深拷贝
export const deepClone = function(initalObj,finalObj){
  let obj = finalObj || {};
  for(let i in initalObj){
    if(obj === initalObj[i]){
      continue;
    }
    if(typeof initalObj[i] === 'Object' ){
      obj[i] = initalObj.constructor === Array ? [] : {}
      deepClone(initalObj[i],obj[i])
    }else{
      obj[i] = initalObj[i]
    }
  }
  return obj;
}

export const setLocalData = window.setData = function(key, val){
   if(typeof val === 'string'){
     localStorage.setItem(key, val)
   }else{
     localStorage.setItem(key, JSON.stringify(val))
   }
}

export const getLocalData = window.getData = function(key){
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null
}

export const removeLocalData = function(key){
  localStorage.removeItem(key)
}
export const removeLocalAll = function(){
  localStorage.clear()
}

export const setSessionData = function(key, val){
  if(typeof val === 'string'){
    sessionStorage.setItem(key, val)
  }else{
    sessionStorage.setItem(key, JSON.stringify(val))
  }
}

export const getSessionData = function(key){
  return sessionStorage.getItem(key) ? JSON.parse(sessionStorage.getItem(key)) : null
}
//是否在微信浏览器
export const isWeiXin = function(){
  let ua = window.navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i) == 'micromessenger'){
    return true
  }else{
    return false
  }
}
//获取url中"?"符后的字串
export const getQueryString = function(name){
  var url = window.location.search;
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for(var i = 0; i < strs.length; i ++) {
      theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
    }
  }
  return theRequest[name] || theRequest;
}

export const toastText = function(text, width){
  let obj = {
    text: text,
    type: 'text'
  }
  if(width) obj.width = width
  return Vue.$vux.toast.show(obj)
}

export const toastSuccess = function(text){
  return Vue.$vux.toast.show({
    text: text,
    isShowMask: true
  })
}

export const confirm = function(title, content, confirmCb, cancelCb){
  return Vue.$vux.confirm.show({
    title: title,
    content: content,
    onConfirm(){
      confirmCb && confirmCb()
    },
    onCancel(){
      cancelCb && cancelCb()
    }
  })
}

export const alert = function(content, title, showCb, hideCb){
  return Vue.$vux.confirm.show({
    title,
    content,
    onShow () {
      showCb && showCb()
    },
    onHide () {
      hideCb && hideCb()
    }
  })
}

//判断横竖屏
export const orientation = function(lateral, vertical){
  //横屏
  if (window.orientation === 90 || window.orientation === -90 ){
    lateral && lateral()
  }
  //竖屏
  if (window.orientation === 180 || window.orientation === 0) {
    vertical && vertical()
  }
}

export const getRotateEvent = function(){
  return 'onorientationchange' in window ? 'orientationchange' : 'resize'
}

export const setHtmlFontSize = function(imageWidth = 750, rem = 100){
  const html = document.querySelector('html')
  const htmlWidth = window.innerWidth
  html.style.fontSize = htmlWidth / (imageWidth / rem) + 'px'
}

//判断object/json 是否为空
export const isEmpty = function (e) {
  for (let key in e){
    return false
  }
  return true
}

export const getFontSize = function(){
  return parseInt(window.getComputedStyle(document.querySelector('html'), null).fontSize, 10)
}

export const isPhone = function(phone){
  return (/^1(3|4|5|7|8)\d{9}$/.test(phone))
}
