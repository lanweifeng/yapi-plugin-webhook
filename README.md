yapi-plugin-webhook
===

yapi地址：
本插件主要功能：可以为yapiHook配置监听器，当yapiHook被触发时，发送相应的数据到指定的监听器。
该插件支持添加多个监听器，且可以自由配置监听器是否生效。

### TODO

* [x] 初始化监听器配置
* [x] 支持接口增删改hook的推送
* [x] 支持多个监听器
* [ ] 支持项目改动hook推送
* [ ] 支持页面修改监听器配置

### 安装

* 执行命令 `yapi plugin --name yapi-plugin-webhook`
* 修改配置文件
* 重启服务

### 配置

* `host` 是项目的域名，用于拼接接口的链接。

### 配置示例

``` json
{
...
   "plugins": [
         {
            "name": "webhook",
            "options": {
                "monitor1": {
                    "yapiAdress": "192.168.214.111",
                    "yapiPort": "3000",
                    "url": "http://192.168.211.11:7780/api/v1",
                    "method": "post",
                    "status": true,
                    "events": ["interface_add", "interface_del","interface_update"],
                    "desc": "监听器1"
                },
                "monitor2": {
                    "yapiAdress": "192.168.214.111",
                    "url": "www.google.com",
                    "method": "post",
                    "status": false,
                    "events": ["interface_add"],
                    "desc": "监听器2"
                }
            }
         }
      ]
}
```

###配置说明

* `yapiAdress` 选填，默认就是你部署yapi机器的Ip,如果你是用docker部署的yapi,请填入宿主机的真实Ip
* `yapiPort` 选填， 默认就是config配置的port， 如果你是用dokcer部署的yapi,请填入你暴露的端口
* `url` 必填，监听器的地址
* `method` 选填， 默认以get方式推送消息到监听器
* `status` 选填， 默认启用监听器
* `events` 必填， events是个字符串数组，值是yapi支持的钩子名称
* `desc` 选填， 该监听器的描述

### 注意

* options下每一个key都是监听器的名字
