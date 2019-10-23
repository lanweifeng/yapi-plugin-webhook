const yapi = require('yapi.js');
//const mongoose = require('mongoose');
const Config = require('./utils/config');

module.exports = function(options) {
  // 获取配置文件中的hook监听器
  Config.instance = options;

  const originalSaveLog = this.commons.saveLog;

  this.commons.saveLog = function() {
    const args = Array.prototype.slice.call(arguments);
    originalSaveLog.apply(this, args);
    try {
      console.log('yapi-plugin-webhook: 开始运行')
      yapi.commons.log('yapi-plugin-webhook: 开始运行');
      const logData = args[0];
      if (!logData || logData.type != 'project') {
        yapi.commons.log('yapi-plugin-webhook: 日志不是 project 类型，不记录。');
        return;
      }
      /*(new SendLogViaDingDingSender(logData)).send().then().catch((err) => {
        yapi.commons.log(err, 'error');
      });*/
    } catch(err) {
      yapi.commons.log(err, 'error');
    }
  }

  // 绑定接口修改hook
  this.bindHook('interface_update', function(router) {
    console.log('成功触发接口更新监听器!');
  });
}
