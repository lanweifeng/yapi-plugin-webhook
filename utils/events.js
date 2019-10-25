const Config = require('./config');
const yapi = require('yapi.js');
const UserModel = require('models/user');
const projectModel = require('models/project.js');
const { showDiff } = require('./index');

let hooksMap = {
  /**
   * 第三方sso登录钩子，暂只支持设置一个
   */
  thirdLogin: third_login,
  /**
   * 客户端增加接口成功后触发
   */
  interfaceAdd: interface_add,
  /**
   * 客户端删除接口成功后触发
   */
  interfaceDel: interface_del,
  /**
   * 客户端更新接口成功后触发
   */
  interfaceUpdate: interface_update,
  /**
   * 客户端获取接口数据列表
   */
  interfaceList: interface_list,
  /**
   * 客户端获取一条接口信息触发
   */
  interfaceGet: interface_get,
  /**
   * 客户端增加一个新项目
   */
  projectAdd: project_add,
  /**
   * 客户端更新一个新项目
   */
  projectUp: project_up,
  /**
   * 客户端获取一个项目
   */
  projectGet: project_get,
  /**
   * 客户端删除删除一个项目
   */
  projectDel: project_del,
  /**
   * 导出 markdown 数据
   */
  exportMarkdown: export_markdown,
  /**
   * MockServer生成mock数据后触发
   */
  mockAfter: mock_after,
  /**
   * 增加路由的钩子
   */
  addRouter: add_router,
  /**
   * 增加websocket路由的钩子
   */
  addWsRouter: add_ws_router,

  importData: import_data,

  /**
   * addNoticePlugin(config)
   */
  addNotice: add_notice
};


/********************后端钩子事件***********************************/


async function third_login(){

}

async function interface_add(cbArgs){
  console.log('触发了新增接口的hook!当前监听器url:',this.url);
  let sendData = JSON.parse(JSON.stringify(cbArgs))
  sendData.event = 'yapi_interface_add';
  sendData.link = `http://${this.yapiAdress}:${this.yapiPort? this.yapiPort : (Config.port || '3000')}/project/${sendData.project_id}/interface/api/${sendData._id}`;
  if(sendData.uid){
    let userModel = yapi.getInst(UserModel);
    let user = await userModel.findById(sendData.uid);
    sendData.user_name = user.username;
  }
  if(sendData.project_id){
    let projectuserModel = yapi.getInst(projectModel);
    let project = await projectuserModel.get(sendData.project_id);
    sendData.project_name = project.name;
  }
  console.log('发送数据', sendData)
  this.sendMessage(sendData);
}

async function interface_del(delData){
  console.log('触发了删除接口的hook!当前监听器url:',this.url, delData);
  let sendData = {};
  if(typeof delData === 'object'){
    sendData = JSON.parse(JSON.stringify(delData));
  }else {
    sendData._id = delData;
  }
  sendData.event = 'yapi_interface_del';

  if(sendData.uid){
    let userModel = yapi.getInst(UserModel);
    let user = await userModel.findById(sendData.uid);
    sendData.user_name = user.username;
  }
  if(sendData.project_id){
    let projectuserModel = yapi.getInst(projectModel);
    let project = await projectuserModel.get(sendData.project_id);
    sendData.project_name = project.name;
  }
  console.log('发送数据', sendData)
  this.sendMessage(sendData);
}

async function interface_update(upData){
  console.log('触发了更新接口的hook!当前监听器url:',this.url);
  let sendData = {};
  let userModel = {};
  let projectuserModel = {};
  if(typeof upData === 'object'){
    userModel = yapi.getInst(UserModel);
    projectuserModel = yapi.getInst(projectModel);
    sendData = JSON.parse(JSON.stringify(upData));
    sendData.diff = showDiff(upData);
    sendData.link = `http://${this.yapiAdress}:${this.yapiPort? this.yapiPort : (Config.port || '3000')}/project/${sendData.current.project_id}/interface/api/${sendData.current._id}`;
  }else {
    sendData._id = upData;
  }
  sendData.event = 'yapi_interface_update';

  if(sendData.current && sendData.current.uid){
    let user = await userModel.findById(sendData.current.uid);
    sendData.current.user_name = user.username;
  }

  if(sendData.old && sendData.old.uid){
    let user = await userModel.findById(sendData.old.uid);
    sendData.old.user_name = user.username;
  }

  if(sendData.current && sendData.current.edit_uid){
    let user = await userModel.findById(sendData.current.uid);
    sendData.current.edit_name = user.username;
  }

  if(sendData.old && sendData.old.edit_uid){
    let user = await userModel.findById(sendData.old.uid);
    sendData.old.edit_name = user.username;
  }

  if(sendData.current && sendData.current.project_id){
    let project = await projectuserModel.get(sendData.current.project_id);
    sendData.current.project_name = project.name;
  }

  if(sendData.old && sendData.old.project_id){
    let project = await projectuserModel.get(sendData.old.project_id);
    sendData.old.project_name = project.name;
  }

  console.log('发送数据', sendData)
  this.sendMessage(sendData);
}

async function interface_list(){

}

async function interface_get() {

}

async function project_add() {

}

async function project_up() {

}

async function project_get() {

}

async function project_del() {

}

async function export_markdown() {

}

async function mock_after() {

}

async function add_router() {

}

async function add_ws_router() {

}

async function import_data() {

}

async function add_notice() {

}

module.exports = hooksMap;
