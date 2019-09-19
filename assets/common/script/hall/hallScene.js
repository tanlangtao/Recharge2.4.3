/*
 * @Author: burt
 * @Date: 2019-07-27 14:58:41
 * @LastEditors: burt
 * @LastEditTime: 2019-09-19 13:55:56
 * @Description: 大厅场景
 */
let gHandler = require("gHandler");
let hqqAudioMgr = require("hqqAudioMgr");
let hallWebSocket = require("hallWebSocket");

cc.Class({
    extends: cc.Component,

    properties: {
        headimg: cc.Sprite, // 玩家头像
        namelabel: cc.Label, // 玩家昵称
        coinlabel: cc.Label, // 玩家金币
        topbubble: cc.Node, // 你有新消息

        chatbtn: cc.Node, // 聊天按钮
        duihuanbtn: cc.Node, // 兑换按钮
        huodongbtn: cc.Node, // 活动按钮

        pageview: cc.PageView, // 活动页面
        itembtn: cc.Node, // 子游戏按钮
        subgameview: cc.ScrollView, // 子游戏按钮缓动面板
        web: cc.WebView, // 网页
    },

    /** 脚本组件初始化，可以操作this.node // use this for initialization */
    onLoad() {
        this.topbubble.active = false;
        if (cc.sys.isBrowser) {
            this.browserDeal();
        }
        if (gHandler.gameGlobal.isdev) {
            let hqqBase64 = require("hqqBase64");
            gHandler.base64 = hqqBase64;
            let hqqEvent = require("hqqEvent");
            gHandler.eventMgr = hqqEvent.init();
            let hqqCommonTools = require("hqqCommonTools");
            gHandler.commonTools = hqqCommonTools;
            let hqqLogMgr = require("hqqLogMgr");
            gHandler.logMgr = hqqLogMgr.init();
            let hqqLocalStorage = require("hqqLocalStorage");
            gHandler.localStorage = hqqLocalStorage.init();
            let hqqHttp = require("hqqHttp");
            gHandler.http = hqqHttp;
        }
        gHandler.audioMgr = hqqAudioMgr.init(gHandler.hallResManager);
        gHandler.audioMgr.playBg("hallbg");
        this.subGameBtnMap = {};
        this.subGameBtnArr = [];
        this.addSubgame();
        this.scheduleOnce(() => {
            this.checkSubModule();
        }, 0)
        this.isupdating = false;
    },
    /** enabled和active属性从false变为true时 */
    // onEnable() { },
    /** 通常用于初始化中间状态操作 */
    start() {
        this.namelabel.string = gHandler.gameGlobal.player.account_name;
        this.coinlabel.string = gHandler.gameGlobal.player.gold;
        gHandler.commonTools.setDefaultHead(this.headimg);

        if (!gHandler.gameGlobal.isdev) {
            gHandler.hallWebSocket = new hallWebSocket();
            gHandler.hallWebSocket.init();
            gHandler.hallWebSocket.register("/Game/login/login", "hallScene", this.onReceiveLogin.bind(this))
            let url = gHandler.appGlobal.server + "/Game/login/login";
            if (cc.sys.isBrowser) {
                url = "ws://" + url;
            }
            gHandler.hallWebSocket.connect(url);
        }

        gHandler.eventMgr.register("isupdataCallback", "hallScene", this.isupdataCallback.bind(this))
        gHandler.eventMgr.register("failCallback", "hallScene", this.failCallback.bind(this))
        gHandler.eventMgr.register("progressCallback", "hallScene", this.progressCallback.bind(this))
        gHandler.eventMgr.register("finishCallback", "hallScene", this.finishCallback.bind(this))
    },

    /** 登陆 */
    onReceiveLogin(msg) {
        console.log("大厅登陆收到回调", msg.token)
        gHandler.gameGlobal.token = msg.token
    },
    /** 子模块更新检查 im，充提 */
    checkSubModule() {
        // todo 检查子模块
        this.chatbtn.getChildByName("redpoint").active = false;
        this.duihuanbtn.getChildByName("redpoint").active = false;
        this.huodongbtn.getChildByName("redpoint").active = false;
        if (!gHandler.gameGlobal.isdev) {
            if (gHandler.gameGlobal.im_host == "") {
                let callback = (url) => {
                    console.log("最快的im地址", url)
                    gHandler.gameGlobal.im_host = url;
                }
                gHandler.http.requestFastestUrl(gHandler.appGlobal.remoteSeverinfo.im_host, null, "/checked", callback)
            }
        }
    },
    /** 子游戏初始化 */
    addSubgame() {
        this.subgameview.content.width = Math.ceil(Object.getOwnPropertyNames(gHandler.gameConfig.gamelist).length / 2) * (this.itembtn.width + 5) + this.pageview.node.width + 15;
        for (let key in gHandler.gameConfig.gamelist) {
            let i = gHandler.gameConfig.gamelist[key].hallid;
            let tempdata = gHandler.commonTools.jsonCopy(gHandler.gameConfig.gamelist[key]);
            let itembtn = cc.instantiate(this.itembtn);
            itembtn.x = Math.floor(i / 2) * (this.itembtn.width + 5) + this.itembtn.width / 2 + 15 + this.pageview.node.width;
            itembtn.y = -i % 2 * this.itembtn.height - this.itembtn.height * 0.5 - 20;
            itembtn.active = true;
            this.subgameview.content.addChild(itembtn);
            let namelabel = itembtn.getChildByName("nameimg").getComponent(cc.Sprite);
            namelabel.spriteFrame = gHandler.hallResManager.getHallBtnImg(tempdata.resid);
            let ani = itembtn.getChildByName("ani").getComponent('sp.Skeleton');
            ani.skeletonData = gHandler.hallResManager.getHallBtnAni(tempdata.resid);
            ani.animation = "animation";
            itembtn.getChildByName("wait").active = false;
            itembtn.getChildByName("experience").active = false;
            this.subGameBtnMap[tempdata.enname] = itembtn;
            this.subGameBtnArr.push(itembtn);
            tempdata.itembtn = itembtn;
            if (cc.sys.isNative && !gHandler.gameGlobal.isdev) {
                this.checkSubGameDownload(tempdata);
            } else {
                let downflag = tempdata.itembtn.getChildByName("downFlag");
                let progress = tempdata.itembtn.getChildByName("progress");
                var clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = this.node;
                clickEventHandler.component = "hallScene";
                clickEventHandler.customEventData = tempdata;
                downflag.active = false;
                progress.active = false;
                clickEventHandler.handler = "onClickSubgame";
                let button = tempdata.itembtn.getComponent(cc.Button);
                button.clickEvents.push(clickEventHandler);
            }
        }
        this.scheduleOnce(() => {
            this.subGameBtnEffect()
        }, 0.5)
    },
    /** 初始化后的按钮特效 */
    subGameBtnEffect() {
        // console.log("初始化后的按钮特效")
        for (let i = 0; i < this.subGameBtnArr.length; i += 2) {
            this.subGameBtnArr[i] && this.subGameBtnArr[i].runAction(cc.sequence(cc.delayTime(i * 0.02), cc.scaleTo(0.1, 1.03), cc.scaleTo(0.1, 1)))
            this.subGameBtnArr[i + 1] && this.subGameBtnArr[i + 1].runAction(cc.sequence(cc.delayTime(i * 0.02), cc.scaleTo(0.1, 1.03), cc.scaleTo(0.1, 1)))
        }
    },
    /** web端需要做的处理 */
    browserDeal() {
        let url = window.location.search;
        if (url.indexOf("?") != -1) {
            // var str = url.substr(1);
            // let strs = str.split("&")
            let strs = url.split("?")[1].split("&");
            for (let i = 0; i < strs.length; i++) {
                // let temp = unescape(strs[i].split("=")[1])
                let temp = strs[i].split("=")[1];
                console.log(temp)
            }
        }
    },
    /** 根据id获取服务器子游戏信息 */
    getRemoteSubgame(game_id) {
        if (!gHandler.appGlobal || !gHandler.appGlobal.remoteGamelist) {
            return
        }
        let remotedata = gHandler.appGlobal.remoteGamelist[0];
        for (let i = 0; i < gHandler.appGlobal.remoteGamelist.length; i++) {
            if (game_id === gHandler.appGlobal.remoteGamelist[i].game_id) {
                remotedata = gHandler.appGlobal.remoteGamelist[i];
                break;
            }
        }
        return remotedata;
    },
    /** 判断子游戏是否下载更新等 */
    checkSubGameDownload(data) {
        let downflag = data.itembtn.getChildByName("downFlag");
        let progress = data.itembtn.getChildByName("progress");
        let clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "hallScene";
        clickEventHandler.customEventData = data;
        let subgamev = this.getRemoteSubgame(data.game_id).version;
        let localsubv = gHandler.localStorage.get(data.enname, "versionKey");
        let needup = false
        if (!localsubv) {
            needup = true;
        } else {
            // let vA = subgamev.split('.');
            // let vB = localsubv.split('.');
            // for (let i = 0; i < vA.length; ++i) {
            //     let a = parseInt(vA[i]);
            //     let b = parseInt(vB[i] || 0);
            //     if (a != b) {
            //         needup = true;
            //         break;
            //     }
            // }
            // if (vB.length != vA.length) {
            //     needup = true;
            // }
        }
        // let txt = "local version: " + localsubv + " | remote version:" + subgamev;
        if (needup) {
            // console.log(txt + " | subgame : " + data.enname + " need update");
            downflag.active = true;
            progress.active = true;
            clickEventHandler.handler = "downloadSubGame";
        } else {
            // console.log(txt + " | subgame : " + data.enname + " not need update")
            downflag.active = false;
            progress.active = false;
            clickEventHandler.handler = "onClickSubgame";
            !gHandler.gameGlobal.isdev && cc.loader.downloader.loadSubpackage(data.enname, function (err) {
                if (err) {
                    return console.error(err);
                }
                console.log('load subpackage script successfully.');
            });
        }
        let button = data.itembtn.getComponent(cc.Button);
        button.clickEvents.push(clickEventHandler);
    },
    /** 创建子游戏账号 */
    createSubAccount(subgameconfig, mcallback, custom) {
        if (subgameconfig.hasAccount) {
            console.log("已经有账号了")
            mcallback && mcallback(custom);
            return
        }
        let subdata = gHandler.appGlobal.remoteGamelist[0]
        for (let i = 0; i < gHandler.appGlobal.remoteGamelist.length; i++) {
            if (subgameconfig.game_id == gHandler.appGlobal.remoteGamelist[i].game_id) {
                subdata = gHandler.appGlobal.remoteGamelist[i]
                break;
            }
        }
        let callback = (data) => {
            console.log("创建子游戏账号 callback", JSON.parse(data))
            for (let k in gHandler.gameConfig.gamelist) {
                gHandler.gameConfig.gamelist[k].hasAccount = true;
                gHandler.localStorage.set(k, "hasAccount", true);
            }
            mcallback && mcallback(custom);
        }
        let outcallback = () => {
            console.log("创建子游戏账号 超时")
        }
        let endurl = "/Game/User/createGameAccount";
        let data = {
            game_id: subdata.game_id,
            package_id: subdata.package_id,
            balance: gHandler.gameGlobal.player.gold,
            id: gHandler.gameGlobal.player.id,
            token: gHandler.gameGlobal.token,
        }
        gHandler.http.sendRequestIpPost(gHandler.appGlobal.server + endurl, data, callback, outcallback);
    },
    /** 下载子游戏 */
    downloadSubGame(event, data) {
        gHandler.logMgr.log("download or updata subgame", data.enname);
        if (this.isupdating) {
            console.log("正在更新中")
            // todo 图片修改
            // let progress = data.itembtn.getChildByName("progress") 
            // let jiantou = progress.getChildByName("jiantou")
            // let zanting = progress.getChildByName("zanting")
            // jiantou.active = !jiantou.active
            // zanting.active = !jiantou.active
        } else {
            this.isupdating = true
        }
        if (!data.hasAccount && !gHandler.gameGlobal.isdev) {
            this.createSubAccount(data)
        }
        let localsubv = gHandler.localStorage.get(data.enname, "versionKey") || null;
        gHandler.hotUpdateMgr.checkUpdate({
            subname: data.enname,
            version: localsubv || "0.0.1",
        })
    },
    isupdataCallback(bool) {
        // console.log("isupdataCallback", bool)
        if (bool) { // 需要更新
            // 自动更新，无需处理
        } else {
        }
    },
    failCallback(enname) {
        console.log("failCallback")
        gHandler.logMgr.log("subgame", enname, "download fail");
    },
    progressCallback(progress, enname) {
        // console.log("下载进度：", enname, progress)
        if (isNaN(progress)) {
            progress = 0;
        }
        let progressnode = this.subGameBtnMap[enname].getChildByName("progress");
        let progressbar = progressnode.getComponent(cc.ProgressBar);
        progressbar.progress = progress;
    },
    finishCallback(enname) {
        console.log("finishCallback & change btn callback")
        this.isupdating = false;
        this.subGameBtnMap[enname].getChildByName("progress").active = false;
        this.subGameBtnMap[enname].getChildByName("downFlag").active = false;;
        this.subGameBtnMap[enname].getComponent(cc.Button).clickEvents[0].handler = "onClickSubgame";
        !gHandler.gameGlobal.isdev && cc.loader.downloader.loadSubpackage(enname, function (err) {
            if (err) {
                return console.error(err);
            }
            console.log('load subpackage script successfully.');
        });
    },
    /** 点击子游戏按钮统一回调 */
    onClickSubgame(event, subgameconfig) {
        console.log("jump to subgame", subgameconfig.enname)
        let callback = function () {
            gHandler.audioMgr.stopBg();
            if (subgameconfig.enname == 'zrsx') { //  真人视讯 竖屏
                gHandler.Reflect && gHandler.Reflect.setOrientation("portrait", 640, 1136)
            }
            cc.director.loadScene(subgameconfig.lanchscene);
        }
        if (gHandler.gameGlobal.isdev) {
            callback()
        } else if (subgameconfig.hasAccount) {
            callback()
        } else {
            this.createSubAccount(subgameconfig, callback)
        }
    },
    /** 复制名字 */
    onClickCopyNameBtn() {
        console.log("复制名字")
        let text = this.namelabel.string;
        gHandler.Reflect && gHandler.Reflect.setClipboard(text);
    },
    /** 充值 */
    onClickChongZhiBtn() {
        console.log("chongzhi")
        if (gHandler.gameGlobal.isdev) {
            if (gHandler.gameGlobal.pay.pay_host == "") {
                let callback = (url) => {
                    gHandler.gameGlobal.pay.pay_host = url;
                    if (gHandler.gameConfig.subModel.pay.lanchscene != "") {
                        cc.director.loadScene(gHandler.gameConfig.subModel.pay.lanchscene)
                    } else {
                        console.log("请配置充值场景")
                    }
                }
                gHandler.http.requestFastestUrl(gHandler.appGlobal.remoteSeverinfo.pay_host, null, "/checked", callback)
            } else {
                if (gHandler.gameConfig.subModel.pay.lanchscene != "") {
                    cc.director.loadScene(gHandler.gameConfig.subModel.pay.lanchscene)
                } else {
                    console.log("请配置充值场景")
                }
            }
        }
    },
    /** 全民代理  */
    onClickQMDL() {
        console.log("全民代理")
    },
    /** 公告 */
    onClickGongGaoBtn() {
        console.log("公告")
    },
    /** 设置 */
    onClickSettingBtn() {
        console.log("设置")
    },
    /** 聊天 */
    onClickChatBtn() {
        console.log("聊天")
    },
    /** 兑换 提现 */
    onClickDuiHuanBtn() {
        console.log("兑换")
        if (gHandler.gameGlobal.isdev) {
            if (gHandler.gameGlobal.pay.pay_host == "") {
                let callback = (url) => {
                    gHandler.gameGlobal.pay.pay_host = url;
                    if (gHandler.gameConfig.subModel.cash.lanchscene != "") {
                        cc.director.loadScene(gHandler.gameConfig.subModel.cash.lanchscene)
                    } else {
                        console.log("请配置提现场景")
                    }
                }
                gHandler.http.requestFastestUrl(gHandler.appGlobal.remoteSeverinfo.pay_host, null, "/checked", callback)
            } else {
                if (gHandler.gameConfig.subModel.cash.lanchscene != "") {
                    cc.director.loadScene(gHandler.gameConfig.subModel.cash.lanchscene)
                } else {
                    console.log("请配置提现场景")
                }
            }
        }
    },
    /** 活动 */
    onClickHuoDongBtn() {
        console.log("活动")
    },
    /** 活动页面 */
    onClickADPage(event, custom) {
        console.log("点击活动页面", custom)
        // this.web.active = true;
        // this.web.url = "https://www.baidu.com"
        // this.web.onEnable()

        if (!gHandler.gameConfig.oldGameList['brnn'].hasAccount) {
            this.createSubAccount(gHandler.gameConfig.oldGameList['brnn'], this.enterSubWeb.bind(this), custom)
        } else {
            this.enterSubWeb(custom)
        }
    },
    enterSubWeb(custom) {
        if (custom == 1) {
            this.web.active = true;
            this.web.url = "https://www.baidu.com"
            this.web.onEnable()
        } else if (custom == 2) {
            gHandler.audioMgr.stopBg();
            cc.director.loadScene('web')
        }
        // let getIconPath = () => {
        //     let packageName = gHandler.appGlobal.packgeName;
        //     let pathName = packageName + "/images/icon";
        //     return gHandler.appGlobal.remoteSeverinfo.source_host[0] + "/" + pathName + "/";
        // }

        // let info = JSON.stringify({
        //     id: gHandler.gameGlobal.player.id, // 用户ID
        //     game_id: gHandler.gameConfig.oldGameList['brnn'].remoteData.game_id, // 游戏ID
        //     server_url: gHandler.gameConfig.oldGameList['brnn'].remoteData.game_host[0], // game_host
        //     password: gHandler.gameGlobal.player.account_pass // 用户密码
        // });
        // info = gHandler.base64.encode(info);

        // let url = gHandler.appGlobal.remoteSeverinfo.temp_host[0] + gHandler.gameConfig.oldGameList['brnn'].remoteData.web_down_webgl +
        //     "?info=" + info +
        //     "&os=" + gHandler.appGlobal.os +
        //     "&iconPath=" + getIconPath() + // 头像资源地址(图片地址)
        //     "&version=" + gHandler.gameConfig.oldGameList['brnn'].remoteData.version +// 游戏版本号
        //     "&env=" + "dev" + // 环境 online dev pre
        //     "&time=" + new Date().getTime();// 时间戳
        // console.log(url)
        // this.web.url = url;
        // this.web.active = true;
        // this.web.onEnable();
    },

    /** 每帧调用一次 // called every frame */
    // update(dt) { },
    /** 所有组件update执行完之后调用 */
    // lateUpdate() { },
    /** 调用了 destroy() 时回调，当帧结束统一回收组件 */
    onDestroy() {
        console.log("onDestroy")
        if (gHandler.hallWebSocket) {
            gHandler.hallWebSocket.unregister("/Game/login/login", "hallScene")
            gHandler.hallWebSocket.close()
        }
        gHandler.eventMgr.unregister("isupdataCallback", "hallScene")
        gHandler.eventMgr.unregister("failCallback", "hallScene")
        gHandler.eventMgr.unregister("progressCallback", "hallScene")
        gHandler.eventMgr.unregister("finishCallback", "hallScene")
    },
});