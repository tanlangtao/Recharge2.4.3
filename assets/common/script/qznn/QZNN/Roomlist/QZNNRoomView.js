/**
 * Dawnson 2019-08-01
 * 15302765815@163.com
 */
var headerPanel = require("QZNNRoomTopPanel");
var centerPanel = require("QZNNRoomCenterPanel");

// var msgPanel = require("ImHallMsgNode");
cc.Class({
    extends: cc.Component,

    properties: {
        backMsgLock: true
    },

    onLoad: function() {
        cc.gg ? cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE) : cc.director("appStart");
        this._scene = this.node.getComponent("QZNNRoomScene");
        cc.gg.audioMgr.pauseAll();
        cc.gg.audioMgr.playBGM("public/nnMusic/roomBG")
    },
    start: function() {
        this.initView();
        this.initNode();
        //this.resetView();
        this.addEvenListener();
        var e = cc.view.getVisibleSize();
        e.width / 750 < 1 && this.node_center.setScale(e.width / 750, e.height / 1334);
        //播放音乐

    },
    initView: function() {
        this.node_header = cc.find("header", this.node);
        this.node_center = cc.find("center", this.node);


        this._topPancel = new headerPanel;
        this._centerPancel = new centerPanel;


        this._topPancel.initzation(this.node_header, this);
        this._centerPancel.initzation(this.node_center, this);


        //主节点
        this.QZNNGame = cc.find("nnGame", this.node._parent);
        this.roomList = cc.find("roomList", this.node._parent);

        //Ui节点
        this.node_UI = cc.find("node_UI", this.node);
    },
    resetView: function() {
        this._topPancel.resetView();
        this._centerPancel.resetView();
        this.node_UI.removeAllChildren();
    },
    addEvenListener: function() {
        //cc.gg.utils.addClickEventEND(this.backHall, this.backHallFun.bind(this));
        //cc.gg.utils.addClickEventEND(this.backHall, this.test.bind(this));
    },

    initNode: function() {
        //this.node_loading.active = false;

    },
    test: function(target) {
        console.log(target.name + "ceshi")
    },
    // 提供一个函数进入游戏
    joinGameRoom: function(data) {
        //销毁此场景监听的所有事件
        cc.gg.protoBuf.removeAllHandler();
        var self = this;
        if (!this.backMsgLock) {
            return
        }
        self.backMsgLock = false;
        cc.gg.global.gameRoomData = data;
        this.scheduleOnce(function() {
            self.QZNNGame.active = true;
            self.QZNNGame.getComponent("QZNNGameView").resetView()
            self.QZNNGame.getComponent("QZNNGameScene").resetSence()
            self.roomList.active = false;
            self.backMsgLock = true;

        }, 0.2)
    },
    //调取加载中
    playLoading: function() {
        var a = this;
        cc.loader.loadRes("public/prefab/loading", function(e, t) {
            if (e) console.log("加载出错:", e);
            else {
                var i = cc.instantiate(t);
                a.node_UI.addChild(i), a.scheduleOnce(function() {
                    //a._GameView.node_UI.removeChild(i)
                }, 1)
            }
        });
        //cc.gg.audioMgr.playSFX("public/nnMusic/kaishi2")
    },
    backMsgFun: function() {
        //销毁此场景监听的所有事件
        cc.gg.protoBuf.removeAllHandler();
        var self = this;
        if (!this.backMsgLock) {
            return
        }
        self.backMsgLock = false;

        this.scheduleOnce(function() {
            self.msg.active = true;
            self.msg.getComponent("QZNNGameView").resetView()
            self.msg.getComponent("QZNNGameScene").resetSence()
            self.hall.active = false;

            self.backMsgLock = true;

        }, 0)
    },
});