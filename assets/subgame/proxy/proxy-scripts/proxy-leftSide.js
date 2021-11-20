let gHandler = require("gHandler");
const Database = require('../Database');
cc.Class({
  extends: cc.Component,

  properties: {
    btn_box: {
      type: cc.Node,
      default: null,
    },
  },
  onLeftSideSwich: function (e, num) {
    cc.log(num, `btn${num}_active`);
    let btn_box = this.btn_box;
    //关闭所有按钮选项
    btn_box.getChildByName("btn1").getChildByName("btn1_active").active = false;
    btn_box.getChildByName("btn2").getChildByName("btn2_active").active = false;
    btn_box.getChildByName("btn3").getChildByName("btn3_active").active = false;
    btn_box.getChildByName("btn4").getChildByName("btn4_active").active = false;
    btn_box.getChildByName("btn5").getChildByName("btn5_active").active = false;
    btn_box.getChildByName("btn6").getChildByName("btn6_active").active = false;
    if (gHandler.app.pinpai == 'fuxin' || gHandler.app.pinpai == 'xingui' || gHandler.app.pinpai == 'yuyu' || gHandler.app.pinpai == 'xinhao' || gHandler.app.pinpai == 'xinlong' || gHandler.app.pinpai == 'nineone' || gHandler.app.pinpai == 'huangshi' || gHandler.app.pinpai == 'juding'|| gHandler.app.pinpai == 'huaxing') {
      btn_box.getChildByName("btn7").getChildByName("btn7_active").active = false;
      btn_box.getChildByName("btn8").getChildByName("btn8_active").active = false;
      btn_box.getChildByName("btn9").getChildByName("btn9_active").active = false;
      btn_box.getChildByName("btn10").getChildByName("btn10_active").active = false;
      if (gHandler.app.pinpai == 'juding') {
        btn_box.getChildByName("btn12").getChildByName("btn12_active").active = false;
      }
      if (gHandler.app.pinpai == 'huaxing') {
        btn_box.getChildByName("btn13").getChildByName("btn13_active").active = false;
      }

    }
    if (gHandler.app.pinpai == 'xingui' || gHandler.app.pinpai == 'xinhao' || gHandler.app.pinpai == 'xinlong' || gHandler.app.pinpai == 'nineone' || gHandler.app.pinpai == 'huangshi') {
      btn_box.getChildByName("btn11").getChildByName("btn11_active").active = false;
    }
    //打开选中按钮
    btn_box.getChildByName(`btn${num}`).getChildByName(`btn${num}_active`).active = true;
    cc.find("Canvas/baseView/home/page2/detailTable").removeAllChildren();
    cc.find("Canvas/baseView/home/page2/basePage").active = true;
    cc.find("Canvas/baseView/home/page1").getComponent("proxy-page1").count = 0;
    //关闭打开所有页面
    this.node
      .getParent()
      .getChildByName("home")
      .getChildByName(`page1`).active = false;
    this.node
      .getParent()
      .getChildByName("home")
      .getChildByName(`page2`).active = false;
    this.node
      .getParent()
      .getChildByName("home")
      .getChildByName(`page3`).active = false;
    this.node
      .getParent()
      .getChildByName("home")
      .getChildByName(`page4`).active = false;
    this.node
      .getParent()
      .getChildByName("home")
      .getChildByName(`page5`).active = false;
    this.node
      .getParent()
      .getChildByName("home")
      .getChildByName(`page6`).active = false;
    if (gHandler.app.pinpai == 'xingui' || gHandler.app.pinpai == 'xinhao' || gHandler.app.pinpai == 'xinlong' || gHandler.app.pinpai == 'nineone' || gHandler.app.pinpai == 'huangshi') {
      this.node
        .getParent()
        .getChildByName("home")
        .getChildByName(`page11`).active = false;
    }


    if (gHandler.app.pinpai == 'fuxin' || gHandler.app.pinpai == 'xingui' || gHandler.app.pinpai == 'yuyu' || gHandler.app.pinpai == 'xinhao' || gHandler.app.pinpai == 'xinlong' || gHandler.app.pinpai == 'nineone' || gHandler.app.pinpai == 'huangshi' || gHandler.app.pinpai == 'juding'|| gHandler.app.pinpai == 'huaxing') {
      this.node
        .getParent()
        .getChildByName("home")
        .getChildByName(`page7`).active = false;
      this.node
        .getParent()
        .getChildByName("home")
        .getChildByName(`page8`).active = false;
      this.node
        .getParent()
        .getChildByName("home")
        .getChildByName(`page9`).active = false;
      this.node
        .getParent()
        .getChildByName("home")
        .getChildByName(`page10`).active = false;
    }
    if (gHandler.app.pinpai == 'juding') {
      this.node
        .getParent()
        .getChildByName("home")
        .getChildByName(`page12`).active = false;
    }
    if (gHandler.app.pinpai == 'huaxing') {
      this.node
        .getParent()
        .getChildByName("home")
        .getChildByName(`page13`).active = false;
    }
    //打开所选页面
    this.node
      .getParent()
      .getChildByName("home")
      .getChildByName(`page${num}`).active = true
    Database.clickSound(Database.hall_sound)
    if (num == 4 || num == 5 || num == 6 || num == 8 || num == 9 || num == 10 || num == 12) {
      this.node.getParent().getChildByName("home").getChildByName(`page${num}`).getComponent(`proxy_page${num}`).checkMyAgent(1, 1)
    }
  },
  // onLoad () {},

  start() { }

  // update (dt) {},
});