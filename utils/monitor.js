const axios = require('axios');
const hooksMap = require('./events');

//下划线转驼峰
const toCamelCaseVar = (variable) =>
  variable.replace(/\_+[a-zA-Z]/g,
    (str,index) => index ? str.substr(-1).toUpperCase() : str
  )

class Monitor{
  constructor(options){
    if(!options.url) {
      console.log('请配置钩子监听器的url地址!');
      return;
    }
    // 监听器地址
    this.url = options.url;
    // 发送的方式
    this.method = (options.method || 'get').toLowerCase();
    // 是否启用
    this.status = options.status || true;
    // 需要触发的事件
    this.events = options.events || [];
    // 详情
    this.desc = options.desc || '';

    (options.events || []).forEach(event => {
      console.log('this.events', this.events, event);
      this.bindEvent(event);
    });
  }

  // 发送消息
  async sendMessage(message, hook){
    axios.post
    return await axios[this.method](this.url, {params: message})
      .then(console.log(`事件${hook}发送到${this.url}成功！发送数据${message}`))
      .catch(console.log(`事件${hook}发送到${this.url}失败！失败数据${message}`));
  }

  // 注册事件绑定
  bindEvent(event){
    if(this[event]) return;
    this[event] = hooksMap[toCamelCaseVar(event)];
    this[event].bind(this);
  }
}

module.exports = Monitor;
