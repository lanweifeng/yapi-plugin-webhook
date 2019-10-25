const axios = require('axios');
const hooksMap = require('./events');
const {toCamelCaseVar, getIPAdress} = require('./index');

class Monitor{
  constructor(options, name){
    if(!options.url) {
      console.log('请配置钩子监听器的url地址!');
      return;
    }
    //监听器名称
    this.name = name || '';
    // 监听器地址
    this.url = options.url;
    //yapi项目地址
    this.yapiAdress = options.yapiAdress || getIPAdress();
    //yapi项目端口
    this.yapiPort = options.yapiPort;
    // 发送的方式
    this.method = (options.method || 'get').toLowerCase();
    // 是否启用
    this.status = options.status || true;
    // 需要触发的事件
    this.events = options.events || [];
    // 详情
    this.desc = options.desc || '';

    (options.events || []).forEach(event => {
      this.bindEvent(event);
    });
  }

  // 发送消息
  async sendMessage(sendData){
    if(!sendData) return ;

    return await axios({
      method: this.method,
      url: this.url,
      data: sendData,
    })
      .then(res => {
        console.log(`事件${sendData.event}发送到${this.url}成功！\n响应状态${res.status}`);
        console.log('响应头', res.headers)
      })
      .catch(err => {
        console.log(`事件${sendData.event}发送到${this.url}失败！\n失败报错${err}`);
      });
  }

  // 注册事件绑定
  bindEvent(event){
    if(this[event]) return;
    console.log(`监听器${this.name}绑定事件:${event}`);
    this[event] = hooksMap[toCamelCaseVar(event)];
    this[event].bind(this);
  }

}



module.exports = Monitor;
