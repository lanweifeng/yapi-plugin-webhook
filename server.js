const yapi = require('yapi.js');
const Config = require('./utils/config');
const Monitor = require('./utils/monitor');

module.exports = function(options) {
  if(!options || !Object.keys(options).length > 0){
    console.log('请配置webhook！', options);
    return;
  }
  // 获取配置文件中的hook监听器
  Config.instance = options;

  const originalSaveLog = this.commons.saveLog;

  this.commons.saveLog = function() {
    const args = Array.prototype.slice.call(arguments);
    originalSaveLog.apply(this, args);
    try {
      yapi.commons.log('yapi-plugin-webhook: 开始运行');
      const logData = args[0];
      if (!logData || logData.type != 'project') {
        yapi.commons.log('yapi-plugin-webhook: 日志不是 project 类型，不记录。');
        return;
      }
    } catch(err) {
      yapi.commons.log(err, 'error');
    }
  }

  // 生成监听器实例
  let monitors = [];
  (Object.keys(options)).forEach(monitor => {
    if(options[monitor].status === false) return;
    console.log(`生成监听器: ${monitor}`, options[monitor]);
    monitors.push(new Monitor(options[monitor], monitor));
  })

  //绑定事件
  monitors.forEach(monitor => {
    monitor.events.forEach(event => {
      this.bindHook(event, (cbArgs)=>{
        monitor[event](cbArgs);
      })
    })
  });
}
