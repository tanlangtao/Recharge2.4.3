let gHandler = require('gHandler')
let commonVal = require('proxy-http')
var Database = require("Database");
let myReflect = require('myReflect')

cc.Class({
  extends: cc.Component,
  properties: {
    messagePrefab: {
      type: cc.Prefab,
      default: null
    },
    xs_viewPrefab: {
      type: cc.Prefab,
      default: null
    },
    xg_viewPrefab: {
      type: cc.Prefab,
      default: null
    },
    viewPrefab: {
      type: cc.Prefab,
      default: null
    },
    fx_viewPrefab: {
      type: cc.Prefab,
      default: null
    },
    aaaa_viewPrefab: {
      type: cc.Prefab,
      default: null
    },
    xh_viewPrefab: {
      type: cc.Prefab,
      default: null
    },
    xl_viewPrefab: {
      type: cc.Prefab,
      default: null
    },
    nineone_viewPrefab: {
      type: cc.Prefab,
      default: null
    },
    huangshi_viewPrefab: {
      type: cc.Prefab,
      default: null
    },
    juding_viewPrefab: {
      type: cc.Prefab,
      default: null
    },
    huaxing_viewPrefab: {
      type: cc.Prefab,
      default: null
    },
    massage: {
      type: cc.Prefab,
      default: null
    }
  },
  onLoad() {
    commonVal.account_name = gHandler.gameGlobal.player.account_name

    commonVal.package_id = gHandler.gameGlobal.proxy.package_id
    if (gHandler.app.pinpai == 'debi') {
      Database.base_dividend_n = 0.02

    }
    //获取大厅音效开关状态 true开 false 关
    // if (gHandler.audioMgr) {
    //   Database.hall_sound = gHandler.audioMgr.getBgState();
    // }
    Database.hall_sound = true;//根据需求默认开启
    // "package_id": 1      特斯特游戏     100% 1
    // "package_id": 2      德比游戏        100% 1
    // "package_id": 3      杏吧娱乐    100%   1
    // "package_id": 6      渔鱼游戏      100%
    // "package_id": 8      新盛游戏     100%  1
    // "package_id": 9      新贵游戏      80%   0.8
    // "package_id": 10    富鑫II游戏     80%
    if (gHandler.app.pinpai == 'xinsheng') {
      Database.base_dividend_discount = 1;
      let baseview = cc.instantiate(this.xs_viewPrefab)
      cc.find('Canvas').addChild(baseview)
      let mas = cc.instantiate(this.massage)
      cc.find('Canvas').addChild(mas)
      Database.base_dividend_n = 0.02


    } else if (gHandler.app.pinpai == 'xingui') {
      Database.base_dividend_discount = 0.8;
      Database.base_dividend_control = 10;
      Database.base_dividend_n = 0.03;


      let baseview = cc.instantiate(this.xg_viewPrefab)
      cc.find('Canvas').addChild(baseview)
      let mas = cc.instantiate(this.massage)
      cc.find('Canvas').addChild(mas)

    } else if (gHandler.app.pinpai == 'xinhao') {
      Database.base_dividend_discount = 0.8;
      Database.base_dividend_control = 5;
      Database.base_dividend_n = 0.03;


      let baseview = cc.instantiate(this.xh_viewPrefab)
      cc.find('Canvas').addChild(baseview)
      let mas = cc.instantiate(this.massage)
      cc.find('Canvas').addChild(mas)

    } else if (gHandler.app.pinpai == 'fuxin' || gHandler.app.pinpai == 'yuyu' ) {
      if (gHandler.app.pinpai == 'yuyu') {
        Database.base_dividend_discount = 1;
        Database.base_dividend_n = 0

      } else {
        Database.base_dividend_discount = 0.8;
        Database.base_dividend_control = 5;
      }
      let baseview = cc.instantiate(this.fx_viewPrefab)
      cc.find('Canvas').addChild(baseview)
      let mas = cc.instantiate(this.massage)
      cc.find('Canvas').addChild(mas)

    } else if ( gHandler.app.pinpai == 'juding') {
     
        Database.base_dividend_discount = 0.8;
        Database.base_dividend_control = 5;
      
      let baseview = cc.instantiate(this.juding_viewPrefab)
      cc.find('Canvas').addChild(baseview)
      let mas = cc.instantiate(this.massage)
      cc.find('Canvas').addChild(mas)

    } else if (gHandler.app.pinpai == 'test') {
      Database.base_dividend_discount = 1;
      let baseview = cc.instantiate(this.aaaa_viewPrefab)
      cc.find('Canvas').addChild(baseview)
      let mas = cc.instantiate(this.massage)
      cc.find('Canvas').addChild(mas)

    } else if (gHandler.app.pinpai == 'xinlong') {
      Database.base_dividend_discount = 1;
      let baseview = cc.instantiate(this.xl_viewPrefab)
      cc.find('Canvas').addChild(baseview)
      let mas = cc.instantiate(this.massage)
      cc.find('Canvas').addChild(mas)


    } else if (gHandler.app.pinpai == 'nineone') {
      Database.base_dividend_discount = 0.8;
      let baseview = cc.instantiate(this.nineone_viewPrefab)
      cc.find('Canvas').addChild(baseview)
      let mas = cc.instantiate(this.massage)
      cc.find('Canvas').addChild(mas)


    } else if (gHandler.app.pinpai == 'huangshi') {
      Database.base_dividend_discount = 1;
      let baseview = cc.instantiate(this.huangshi_viewPrefab)
      cc.find('Canvas').addChild(baseview)
      let mas = cc.instantiate(this.massage)
      cc.find('Canvas').addChild(mas)
      Database.base_dividend_n = 0.05

      

    } else if (gHandler.app.pinpai == 'huaxing') {
      Database.base_dividend_discount = 0.8;
      let baseview = cc.instantiate(this.huaxing_viewPrefab)
      cc.find('Canvas').addChild(baseview)
      let mas = cc.instantiate(this.massage)
      cc.find('Canvas').addChild(mas)


    } else {
      Database.base_dividend_discount = 1;
      let baseview = cc.instantiate(this.viewPrefab)
      cc.find('Canvas').addChild(baseview)
      let mas = cc.instantiate(this.massage)
      cc.find('Canvas').addChild(mas)
    }
  },
  onMessagePrefabNeeded: function (e, string) {
    cc.log('onMessagePrefabNeeded', e, string)
    var message = cc.instantiate(this.messagePrefab)
    //获取预制资源中的js组件，并作出相应操作
    var messageScript = message.getComponent('proxy-messagePrefab')
    //开始操作JS组件脚本
    messageScript.setMessage(string) //开始为JS组件进行初始化操作,action 为自定义初始化方法
    //将预制资源添加到父节点
    cc.find('Canvas/message').addChild(message)
  },
  onCopyClick: function (e, string) {
    //web平台复制到剪切板
    // var save = function(e) {
    //   e.clipboardData.setData("text/plain", "待复制本文");
    //   e.preventDefault();
    // }.bind(this);
    // document.addEventListener("copy", save);
    // document.execCommand("copy");
    // document.removeEventListener("copy", save);

    //音效
    Database.clickSound(Database.hall_sound)

    if (gHandler.reflect) {
      if (gHandler.reflect.setClipboard(string)) {
        // gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "复制id成功");
        this.onMessagePrefabNeeded(null, '复制成功')
      } else {
        // gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "复制id失败");
        this.onMessagePrefabNeeded(null, '复制失败')
      }
    } else {
      this.onMessagePrefabNeeded(null, '操作失败')
    }
    // gHandler.Reflect && gHandler.Reflect.setClipboard(string);
  },
  start() { },
  onExit() {
    //音效
    Database.clickSound(Database.hall_sound)
    Database.a_num = 0;
    cc.director.loadScene(gHandler.hallConfig.lanchscene)
  }

  // update (dt) {},
})
