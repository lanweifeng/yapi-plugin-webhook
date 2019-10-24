const axios = require('axios');

var hooksMap = {
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


function third_login(){

}

function interface_add(cbArgs){
  console.log('触发了新增接口的监听器!', cbArgs);
  console.log('当前钩子url:',this.url);
  cbArgs.event = 'yapi_interface_add'
  this.sendMessage(cbArgs);
}

function interface_del(){

}

function interface_update(){

}

function interface_list(){

}

function interface_get() {

}

function project_add() {

}

function project_up() {

}

function project_get() {

}

function project_del() {

}

function export_markdown() {

}

function mock_after() {

}

function add_router() {

}

function add_ws_router() {

}

function import_data() {

}

function add_notice() {

}

module.exports = hooksMap;
