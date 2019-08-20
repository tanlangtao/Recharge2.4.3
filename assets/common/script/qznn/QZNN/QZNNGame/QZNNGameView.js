/**
 * Dawnson 2019-08-01
 * 15302765815@163.com
 */
var headerPanel = require("QZNNGameTopPancel");
var centerPanel = require("QZNNGameCenterPanel");
var pokerPanel = require("PokerNode");
var avatarPanel = require("QZNNGameAvatarPanel");
var nnTool = require("QZNNTool");
var cmd = require("QZNNCMD");
var Animation = require("Animation");
cc.Class({
    extends: cc.Component,

    properties: {
        backMsgLock: true,
        gameCardType: cc.SpriteAtlas, // 17381
        pokerDianshu: cc.SpriteAtlas,
        goldImg: cc.Sprite,
    },

    onLoad: function() {
        cc.gg ? cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE) : cc.director("appStart");
        this._scene = this.node.getComponent("QZNNGameScene");
    },
    start: function() {
        this.initView();
        this.initNode();
        //this.resetView();
        this.addEvenListener();
        var e = cc.view.getVisibleSize();
        e.width / 750 < 1 && this.node_center.setScale(e.width / 750, e.height / 1334);

    },
    initView: function() {
        this.node_header = cc.find("header", this.node);
        this.node_center = cc.find("center", this.node);


        this._topPancel = new headerPanel;
        this._centerPancel = new centerPanel;
        this._cardPanel = new pokerPanel;
        this._avatarPanel = new avatarPanel;


        this._topPancel.initzation(this.node_header, this);
        this._centerPancel.initzation(this.node_center, this);
        this._cardPanel.initzation(this.node_center, this);
        this._avatarPanel.initzation(this.node_center, this);


        //主节点
        this.QZNNGame = cc.find("nnGame", this.node._parent);
        this.roomList = cc.find("roomList", this.node._parent);
        this.node.active = false;

        this.node_UI = cc.find("node_UI", this.node);
    },
    resetView: function() {
        this._topPancel.resetView();
        this._centerPancel.resetView();
        this._avatarPanel.resetView(cmd.GAME_PLAYER);
        this._cardPanel.resetView(cmd.GAME_PLAYER);

        //测试播放动画
        // this.gameStartAni.play()
    },
    addEvenListener: function() {
        //cc.gg.utils.addClickEventEND(this.backHall, this.backHallFun.bind(this));
        //cc.gg.utils.addClickEventEND(this.backHall, this.test.bind(this));
    },

    initNode: function() {
        //this.node_loading.active = false;
        this._TimerClass = this._centerPancel.time.getComponent("time");
        this.node_gold = this._centerPancel.node_gold;
        Animation.Init()
    },
    //翻牌的动画
    setSendCardAni: function(e, t, i) {
        this._cardPanel.setSendCardAni(e, t, i)
    },
    setTurnCardAni: function(e) {
        this._cardPanel.setTurnCardAni(e)
    },
    test: function(target) {
        console.log(target.name + "ceshi")
    },
    setTableUserCount: function() {

    },
    setGameTimer: function(e) {
        var self = this;
        console.log("设置定时器：：：", e);
        this._TimerClass.setGameTimer({
            TimeCount: e,
            flag: !0,
            onTimerMessageFunc: self._scene.onTimerMessage
        })
    },
    onUpdateUser: function(e) {
        var t = e.account_id,
            i = T.getLocalIndex(t);
        //2 == e.account_status && this.setViewReadySign(i, !0), 
        this._avatarPanel.setUserInfo(i, e);
    },
    // 提供一个函数退出游戏
    backRoomList: function(data) {
        this._scene.sendLeaveRoom()
        console.log("我在退出游戏")
            //销毁此场景监听的所有事件
        cc.gg.protoBuf.removeAllHandler();
        var self = this;
        if (!this.backMsgLock) {
            return
        }
        self.backMsgLock = false;
        this.scheduleOnce(function() {
            self.roomList.active = true;
            self.roomList.getComponent("QZNNRoomView").resetView()
            self.roomList.getComponent("QZNNRoomScene").resetSence()
            self.QZNNGame.active = false;
            self.backMsgLock = true;
        }, 0.2)
    },
    //设置游戏状态标示
    setViewStatus: function(type) {
        var types = type ? cmd.Game_Status[type] : false
        this._centerPancel.setViewStatus(types);
    },
    clearViewUser: function(e) {
        this._avatarPanel.clearUserFace(e)
    },
    //调取牌类组件的发牌动画
    // setSendCardAni: function(data) {
    //     this._cardPanel.setSendCardAni(data);
    // },
    onUpdateUser: function(e) {
        console.log("更新用户头像" + e.serial_num), console.log(e);
        var t = e.account_id,
            i = nnTool.getLocalIndex(t);
        // console.log(i), 2 == e.account_status && this.setViewReadySign(i, !0),
        this._avatarPanel.setUserInfo(i, e);
        // 0 == e.online_status ? this.setViewUserOffLine(i, !0) : 1 == e.online_status && this.setViewUserOffLine(i, !1)
    },
    onGrabBankerAni: function(e, t) {
        var i = this,
            a = [],
            o = cmd.INVALE_CHAIR;
        if (e.players_status) {
            for (var n = 0; n < e.players_status.length; n++) {
                a[n] = nnTool.getLocalIndex(e.players_status[n].account_id);
            }
            for (n = 0; n < e.players_status.length; n++) {
                1 == e.players_status[n].is_banker &&
                    (o = nnTool.getLocalIndex(e.players_status[n].account_id));
            }

            this.setViewGrabBankerAni(a, o, function() {
                //隐藏所有人的状态
                i.hideUserStatus();
                //设置庄家标示
                i._avatarPanel.setViewBankerSign(o, !0);
                //设置庄家倍数
                e.grab_multiple = e.grab_multiple ? e.grab_multiple : "1";
                i._avatarPanel.setUserGrabMultiple(o, e.grab_multiple);
                //设置下注标示
                i._centerPancel.setViewStatus(cmd.Game_Status["StarBet"])
                if (nnTool.UserisExist()) {
                    //自己是庄家
                    console.log(o + "我是庄家对座位号");
                    if (0 === o) {

                    } else {
                        console.log(i._scene._wMeStatus + "我是当前玩家对状态");
                        //非观战玩家
                        if (i._scene._wMeStatus > 2) {
                            i._centerPancel.betBtn.active = !0
                        } else {
                            //显示等待下一句
                        }
                    }

                } else {
                    console.log("都不存在 ??????????")
                }
                console.log("->>>>>>>>抢庄动画结束设置庄家", new Date), t && t()
            })
        } else console.log("已经定庄啦")
    },
    hideUserStatus: function() {
        this._avatarPanel.hideUserStatus()
    },
    setViewGrabBankerAni: function(t, e, i) {
        console.log("&&&&&&&&&&抢庄动画开始->>>1111111111111", new Date);
        if (t.length <= 1) {
            i && i()
        } else {
            for (var a = [], o = 0, n = 0; n < t.length; n++) a[n] = this._avatarPanel.player[t[n]].getChildByName("blink"), e == t[n] && (o = n);
            var s = .1,
                c = 20;
            t.length <= 4 && (s = .2, c = 10);
            var r = 0,
                l = 0,
                d = cc.sequence(cc.delayTime(s), cc.callFunc(function() {
                    for (var e = 0; e < t.length; e++) a[e].active = !1;
                    c - 1 <= ++l ? a[o].active = !0 : a[r].active = !0, r++, r = parseInt(r % t.length)
                })),
                h = cc.sequence(cc.repeat(d, c), cc.delayTime(.5), cc.callFunc(function() {
                    for (var e = 0; e < t.length; e++) a[e].active = !1;
                    i && i()
                }));
            this.node.runAction(h)
        }
    },
    onGameViewEndAni: function(data) {
        var a = this,
            o = data,
            t = [],
            i = [],
            n = [],
            h = {},
            s = [];
        for (var k = 0; k < o.cards_scores.length; k++) {
            var item = o.cards_scores[k];
            var r = item.account_id;
            var l = nnTool.getLocalIndex(r),
                d = item.game_scores;
            n.push(l),
                s.push(d),
                d <= 0 ? r != o.banker_id && t.push(this._avatarPanel.player[l]) :
                r != o.banker_id && i.push(this._avatarPanel.player[l]);
            var u = item.scores;
            h[l] = u
        }
        // for (var c in o.game_scores) {
        //     var r = c,
        //         l = y.getLocalIndex(r),
        //         d = o.game_scores[r];
        //     n.push(l), s.push(d), d <= 0 ? r != o.banker_id && t.push(this._avatarPanel.player[l]) : r != o.banker_id && i.push(this._avatarPanel.player[l])
        // }
        // var h = {};
        // for (var g in o.scores) {
        //     r = g, l = y.getLocalIndex(r);
        //     var u = o.scores[g];
        //     h[l] = u
        // }
        var gold = this.goldImg.getComponent(cc.Sprite).spriteFrame
        var m = nnTool.getLocalIndex(o.banker_id),
            _ = this._avatarPanel.player[m],
            //p = this.gameCardType.getSpriteFrame("chip_s"),
            p = gold,
            f = this.node_gold;
        if (4 != this._scene._playMode) 6 != this._scene._playMode ?
            Animation.SetGoldAnimation(f, p, _, t, !0, function() {
                Animation.SetGoldAnimation(f, p, _, i, !1, function() {
                    a.setViewScoreAni(n, s, function() {
                        for (var e in h) {
                            var t = e,
                                i = h[e];
                            a._avatarPanel.setUserScore(t, i)
                        }
                        a._scene._gameNewNum == a._scene._gameTotalNum ? a._scene.gameTotalData && a.setGameEndLayer(a._scene.gameTotalData) : 1 == a.getAutoReady() ? a._scene.onSendUserReady() : (0 != a._scene._wMeStatus && (a._scene._wMeStatus = 1), 1 == y.UserisExist() && (a._centerPanel.btn_ready.setScale(1), a._centerPanel.btn_ready.active = !0, 0 == m && 5 == a._scene._playMode && 3 <= o.game_num && (console.log("显示下庄按钮"), a._centerPanel.setBtnReaby()), a.setViewStatus("reset")))
                    })
                })
            }) : Animation.SetGoldAnimation(f, p, f, i, !1, function() {
                a.setViewScoreAni(n, s, function() {
                    for (var e in h) {
                        var t = e,
                            i = h[e];
                        a._avatarPanel.setUserScore(t, i)
                    }
                    a._scene._gameNewNum == a._scene._gameTotalNum ? a._scene.gameTotalData && a.setGameEndLayer(a._scene.gameTotalData) : 1 == a.getAutoReady() ? a._scene.onSendUserReady() : (0 != a._scene._wMeStatus && (a._scene._wMeStatus = 1), 1 == y.UserisExist() && (console.log("我进入了结算啊啊啊"), a._centerPanel.btn_ready.active = !0, a.setViewStatus("reset")))
                })
            });
        else {
            var C = nnTool.getLocalIndex(o.winner_id),
                b = this._avatarPanel.player[C];
            Animation.SetGoldAnimation(f, p, b, t, !0, function() {
                a.setViewScoreAni(n, s, function() {
                    for (var e in h) {
                        var t = e,
                            i = h[e];
                        a._avatarPanel.setUserScore(t, i)
                    }
                    a._scene._gameNewNum == a._scene._gameTotalNum ? a._scene.gameTotalData && a.setGameEndLayer(a._scene.gameTotalData) : 1 == a.getAutoReady() ? a._scene.onSendUserReady() : (0 != a._scene._wMeStatus && (a._scene._wMeStatus = 1), 1 == y.UserisExist() && (console.log("我进入了结算啊啊啊"), a._centerPanel.btn_ready.active = !0, a.setViewStatus("reset")))
                })
            })
        }
    },
    // setViewScoreAni: function(e, t, i) {
    //     console.log("setViewScoreAni-----\x3e>>>飘分动画"), 0 == e.length && i && i();
    //     for (var a = 0; a < e.length; a++) {
    //         var o = e[a],
    //             n = t[a];
    //         this._avatarPanel.flutterScore(o, n)
    //     }
    //     this.scheduleOnce(function() { i && i() }, 2.1)
    // },
    setViewScoreAni: function(e, t, i) {
        console.log("setViewScoreAni-----\x3e>>>飘分动画"), 0 == e.length && i && i();
        for (var a = 0; a < e.length; a++) {
            var o = e[a],
                n = t[a];
            this._avatarPanel.flutterScore(o, n)
        }
        this.scheduleOnce(function() { i && i() }, 2.1)
            // console.log("setViewScoreAni..>....................>setViewScoreAni");
            // var a = this.node_gold,
            //     o = new cc.Color(255, 246, 0),
            //     n = new cc.Color(36, 255, 0);
            // 0 == e.length && i && i();
            // for (var s = 0; s < e.length; s++) {
            //     var c = e[s],
            //         r = this.players[c].getPosition(),
            //         l = !0;
            //     c < Math.floor(cmd.GAME_PLAYER / 2) && (l = !1);
            //     var d = new cc.Node,
            //         h = new cc.Node,
            //         g = new cc.Node;
            //     h.addComponent(cc.Sprite),
            //         h.getComponent(cc.Sprite).spriteFrame = this.publicAtlas.getSpriteFrame("df_1"),
            //         t[c] < 0 && (h.getComponent(cc.Sprite).spriteFrame = this.publicAtlas.getSpriteFrame("df_2")),
            //         r.y = r.y + 40, 1 == l ? (r.x = r.x + 95, d.anchorX = 0) : (r.x = r.x - 95, d.anchorX = 1),
            //         d.setPosition(r), d.addChild(h),
            //         a.addChild(d),
            //         g.addComponent(cc.Label),
            //         g.getComponent(cc.Label).string = 0 < t[c] ? "+" + t[c] : t[c],
            //         g.color = o, t[c] < 0 && (g.color = n), d.addChild(g);
            //     var u = cc.sequence(cc.moveTo(1, cc.v2(r.x, r.y - 40)),
            //         cc.delayTime(1.4),
            //         cc.callFunc(function() {
            //             a.removeAllChildren(),
            //                 i && i()
            //         }));
            //     d.runAction(u)
            // }
    },
    setViewOpenCard: function(e) {
        var self = this,
            t = nnTool.getLocalIndex(e.account_id),
            i = nnTool.getUserSexByID(e.account_id),
            a = e.cards_info;
        console.log("用户视图座位号:", t);
        console.log("摊牌类型:", a.kind);
        // 0 == t && (console.log("自己的展示牌值:", a.cards),
        //         this._cardPanel.cardData = null,
        //         this._centerPanel.btn_open.active = !1,
        //         this._cardPanel.setBtnLook(1, !1)),
        // this._cardPanel.setOpenCardAni(t, a);
        // this._cardPanel.setTypeSprite(t, i, a.kind)
        // this._cardPanel.setViewOpenCard(t, a.cards, function() {
        //     self._cardPanel.setTypeSprite(t, i, a.kind)
        // })
        this._cardPanel.setOpenCardAni(t, a.cards, function() {
            self._cardPanel.setTypeSprite(t, i, a.kind)
        })
    },
    //我在恢复别人的场景
    onScenePlayerView: function(datas) {
        for (var t = 0; t < datas.all_gamers.length; t++) {
            var data = datas.all_gamers[t],
                pos = nnTool.getLocalIndex(data.account_id);
            if (0 != pos || 1 != nnTool.UserisExist()) {
                var status = data.account_status;
                console.log("其他玩家状态", pos, status);
                if (status > 2 && status < 8) {
                    this._cardPanel.showUserCardBack(pos);
                    if (status == 4) {
                        this._avatarPanel.setUserGrabMultiple(pos, 0)
                    } else if (status == 5) {
                        this._avatarPanel.setUserGrabMultiple(pos, data.grab_multiple)
                    } else if (status == 6) {
                        if (data.account_id == datas.banker_id) {
                            this._avatarPanel.setUserGrabMultiple(pos, data.grab_multiple)
                            this._avatarPanel.setViewBankerSign(pos, true)
                        } else {
                            if (data.multiples != 0) {
                                this._avatarPanel.setUserMultiple(pos, data.multiples)
                            }
                        }
                    } else if (status == 7) {
                        // this._avatarPanel.setUserMultiple(pos, data.multiples)
                    } else if (status == 8) {
                        this._cardPanel.setViewOpenCard(pos, data.show_cards.cards)
                        this._cardPanel.setTypeSprite(pos, null, data.kind)
                    }
                }
            }
        }
    },
    //我在恢复自己的场景
    onSceneView: function(datas) {
        for (var t = 0; t < datas.all_gamers.length; t++) {
            var data = datas.all_gamers[t];
            var pos = nnTool.getLocalIndex(data.account_id);
            if (pos == 0) {
                console.log("我进入了几次?")
                if (data.account_status <= 2) {
                    this._centerPancel.showWait()
                    return void console.log("中途进入游戏");
                }
                var status = data.account_status
                if (2 < status && status < 8) {
                    if (status == 3) {
                        this._centerPancel.grabBankerBtn.active = !0;
                        this.setViewStatus("GameStart");
                    } else if (4 == status) {
                        this._avatarPanel.setUserGrabMultiple(pos, 0)
                    } else if (5 == status) {
                        this._avatarPanel.setUserGrabMultiple(pos, data.grab_multiple)
                    } else if (6 == status) {
                        if (data.account_id == datas.banker_id) {
                            this._avatarPanel.setViewBankerSign(pos, true);
                            this._avatarPanel.setUserGrabMultiple(pos, data.grab_multiple)
                                // t = "xianjiaxiazhu";
                            this.setViewStatus("StarBet");
                        } else {
                            if (data.multiples != 0) {
                                this._avatarPanel.setUserMultiple(pos, data.multiples)
                            } else {
                                this._centerPancel.betBtn.active = !0;
                            }
                            // t = "dengdaixiazhu";
                            this.setViewStatus("StarBet");
                        }
                    } else if (7 == status) {
                        // 6 == this._scene._playMode ? this._avatarPanel.setUserChipScore(0, data.multiples) : this._avatarPanel.setUserMultiple(0, data.multiples);
                        // t = "dengdaitanpai";
                        // this._centerPancel.setSprScene(t), this._cardPanel.btn_look.active = !1, this._centerPancel.btn_open.active = !0
                    } else if (8 == status) {
                        this._avatarPanel.setUserMultiple(0, data.multiples);
                        // t = "dengdaitanpai";
                        // this._centerPancel.setSprScene(t)
                    }
                }
                console.log("->>>>>>>>>>>重连牌值->>>>>>", data.show_cards.cards),
                    data.show_cards.cards && this._cardPanel.setViewOpenCard(0, data.show_cards.cards);
                if (status == 8) {
                    data.show_cards.kind && this._cardPanel.setTypeSprite(0, null, data.show_cards.kind)
                }

            }
        }

    },
});