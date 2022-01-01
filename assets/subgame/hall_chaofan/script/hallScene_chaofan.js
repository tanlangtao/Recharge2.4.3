let hallWebSocket = require("hallWebSocket");
cc.Class({
    extends: cc.Component,

    properties: {
        hbslFont: cc.LabelAtlas,
    },

    onLoad() {
        hqq.eventMgr.unregister(hqq.eventMgr.showBiglayer,"hqqViewCtr");
        hqq.eventMgr.unregister(hqq.eventMgr.showNotice,"hqqViewCtr");
        hqq.eventMgr.unregister(hqq.eventMgr.showRegister,"hqqViewCtr");

        hqq.eventMgr.register(hqq.eventMgr.showBiglayer, "hallScene_chaofan", this.showBigsublayer.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showNotice, "hallScene_chaofan", this.showNoticelayer.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showRegister, "hallRegisterLayer_chaofan", this.showRegisterlayer.bind(this))
        this.bindbtn = null;
        this.selectType = "all";
        this.scrollviewcotentX = undefined;
        this.test = true
        this.menuBtnInfoList = ["remen" , "duizhan", "tiyu", "shixun", "touzu", "dianzi"]
        this.remenlist = ["pg","cylhd","pg2","cdx","cq9","lhd","jdb","bjl","ppdz","ebg","ag","brnn","pt","hh","mg","caishendao","qt"];
        this.ninetwothirdlist = {"pg":'',"pg2":'',"ag":'',"pt":'',"cq9":'',"jdb":'',"pccp":'',"zhibo":'',"sbty1":'',"sbty2":'',"zrsx1":'',"zrsx2":'',"mg":'',"ppdz":''};
        this.subGameBtnMap = {};
        this.subGameBtnArr = [];
        this.subGameBtnState = { // 子游戏按钮状态
            needDown: 0,
            isWait: 1,
            progress: 2,
            canClick: 3,
            noOpen: 4,
        }
        this.isSubBtnClicked = false
        this.resetSubGameList();
        hqq.audioMgr.setButtonEffect(true);
        if (
            (hqq.app.huanjin == 'online' && hqq.app.pinpai == 'debi') ||
            (hqq.app.huanjin == 'pre' && hqq.app.pinpai == 'test') ||
            (hqq.app.huanjin == 'dev' && hqq.app.pinpai == 'test') ||
            (hqq.app.pinpai == 'xinsheng') ||
            (hqq.app.pinpai == 'xingui') ||
            (hqq.app.pinpai == 'xinhao') ||
            (hqq.app.pinpai == "xinlong") ||
            (hqq.app.pinpai == "juding")
        ) {
            if (!hqq.HBYTick) {
                hqq.HBYTick = {
                    startDate: [0, 0, 0],
                    endDate: [0, 0, 0],
                    hour: 0,
                    mintute: 0,
                    second: 0,
                    isInOpen: false,
                    isGet: false,
                }
            }
        }
        this.UILoad()
    },

    start() {
        let pn = hqq.addNode(this.node, {
            widget: { right: 150, top: 55 }
        })
        hqq.eventMgr.dispatch(hqq.eventMgr.showNetStateNode, { parent: pn, position: { x: 0, y: 0 } })

        if (hqq.app.needShowFree) {
            hqq.app.needShowFree = false
            hqq.eventMgr.dispatch(hqq.eventMgr.showPayActivityWeb, true);
        }
    },
    UILoad() {
        if(!cc.isValid(this.node)){
            console.log("hallScene UILoad 节点不存在")
            return;
        }
        let background = cc.find("Canvas/hallback") // 背景
        let touxiang = cc.find("Canvas/touxiang") // 头像背景框
        let mask = touxiang.getChildByName("mask") // 头像遮罩
        let btnjchd = cc.find("Canvas/btnjchd") // 精彩活动按钮
        let btnqmdl = cc.find("Canvas/btnqmdl") // 全民代理按钮
        let namebg = cc.find("Canvas/namebg") // 昵称背景框
        let btncopy = namebg.getChildByName("btncopy") // 复制昵称按钮
        let goldback = cc.find("Canvas/goldback") // 金币背景框
        let jinbi = goldback.getChildByName("jinbi") // 金币图片
        let btnplus = goldback.getChildByName("btnplus") // 增加金币按钮
        let btnmfjb = cc.find("Canvas/btnmfjb") // 免费金币按钮
        let btnchongzhi = cc.find("Canvas/btnchongzhi") // 充值按钮
        let subgameview = cc.find("Canvas/subgameview") // 子游戏按钮滑动界面

        this.btngonggao = cc.find("Canvas/btngonggao") // 公告按钮
        this.btngonggaopoint = this.btngonggao.getChildByName("redpoint")
        this.topbubble = this.btngonggao.getChildByName("topbubble")
        this.btnhby = cc.find("Canvas/btnhby") // 红包雨按钮
        this.HBYTimeLabel = this.btnhby.getChildByName("timelabel").getComponent(cc.Label) // 红包雨倒计时
        this.btnjfcj = cc.find("Canvas/btnjfcj") // 积分抽奖按钮
        this.jchdRedPoint = btnjchd.getChildByName("redpoint") // 精彩活动提示红点
        this.btnshouyi = cc.find("Canvas/btnshouyi") // 收益按钮
        this.shouyipoint = this.btnshouyi.getChildByName("redpoint") // 收益提示红点
        this.btnkefu = cc.find("Canvas/btnkefu") // 客服聊天按钮
        this.kefupoint = this.btnkefu.getChildByName("redpoint") // 客服提示红点
        this.namelabel = namebg.getChildByName("namelabel") // 昵称文本
        this.head = mask.getChildByName("head") // 头像
        this.coinlabel = goldback.getChildByName("coinlabel") // 金币文本
        this.suggameScrollView = subgameview.getComponent(cc.ScrollView) // 子游戏滚动界面
        this.itembtn = subgameview.getChildByName("itembtn") // 子游戏按钮模板
        this.youkeicon = touxiang.getChildByName("youkeicon") // 头像游客标志
        this.anilayer = cc.find("Canvas/anilayer") // 红包雨动画界面
        this.noticepanel = cc.find("Canvas/noticepanel") // 滚动公告

        hqq.setSprite(this.topbubble, { path: "base/language/" + hqq.language + "/img/topbubble", active: false })
        let hlpath = "language/" + hqq.language + "/img/"
        let hpath = "chaofan/"
        let hrpath = "language/" + hqq.language + "/"
        this.youkeicon.x = 25
        this.youkeicon.y = 25
        hqq.setSprite(this.btngonggaopoint, { path: "base/img/redpoint", position: { x: 30, y: 20 }, active: false })
        hqq.setSprite(this.jchdRedPoint, { path: "base/img/redpoint", position: { x: 30, y: 20 }, active: false })
        hqq.setSprite(this.shouyipoint, { path: "base/img/redpoint", position: { x: 0, y: 20 }, active: false })
        hqq.setSprite(this.kefupoint, { path: "base/img/redpoint", position: { x: -5, y: 20 }, active: false })
        hqq.setLabel(this.namelabel, { string: "", widget:{closeleft: true},x:-90});
        hqq.setLabel(this.coinlabel, { string: "" })
        // hqq.setSprite(background, { Res:hqq["hall_test"],path: hpath + "bigimg/roombgmin" })
        hqq.setBtn(touxiang, { Res:hqq["hall_chaofan"],path: hpath + "img/nhgc", widget: { top: 8, left: 20 }, callback: "onClickPlayerBtn", script: this })
        mask.getComponent(cc.Mask).spriteFrame = hqq.getSpriteFrame("base/img/p_head_mask")
        hqq.setSprite(namebg, { Res:hqq["hall_chaofan"],path: hpath + "img/namebg", widget: { left: 100, top: 25 ,target:background.parent} })
        hqq.setSprite(goldback, { Res:hqq["hall_chaofan"],path: hpath + "img/sp_num_bg", widget: { horizontalCenter: 0, top: 20 } })
        hqq.setSprite(jinbi, { path: "base/img/sp_coin2", widget: { horizontalCenter: -140 } })
        hqq.setBtn(btncopy, { Res:hqq["hall_chaofan"],normal: hpath + "img/copyname", widget: { horizontalCenter: 107 }, callback: "onClickPlayerBtn", script: this })
        hqq.setBtn(btnplus, { normal: "base/img/btn_refresh2", widget: { horizontalCenter: 145 }, callback: "onClickGetGold", script: this ,size: { height: 61, width: 61 }})

        // hqq.setBtn(this.btnhby, { path: hrpath + "dating_hby", aniname: "animation", loop: true, widget: { top: 36, right: 450 }, active: false, callback: "onClickHBY", script: this })
        // hqq.setBtn(this.btnjfcj, { path: hrpath + "dating_jfcj", aniname: "animation", loop: true, widget: { top: 45, right: 350 }, callback: "onClickJFCJ", script: this })
        hqq.setBtn(btnqmdl, { Res:hqq["hall_chaofan"],path: hlpath + "tuiguasng", widget: { left: 30, bottom: 0,closetop:true,closeright:true }, callback: "onClickQMDL", script: this })
        hqq.setBtn(btnjchd, { Res:hqq["hall_chaofan"],path: hlpath + "jingcaihuodong", widget: { left:300,bottom:0,closetop: true, closeright: true }, callback: "onClickJCHD", script: this })
        hqq.setBtn(this.btnkefu, { Res:hqq["hall_chaofan"],normal: hlpath + "kefu", widget: { left: 440, bottom: 0 }, callback: "onClickKF", script: this })
        hqq.setBtn(this.btngonggao, { Res:hqq["hall_chaofan"],normal: hlpath + "gonggao", widget: { left: 560, bottom: 0,closetop: true, closeright: true }, callback: "onClickGG", script: this })

        
        hqq.setBtn(this.btnshouyi, { Res:hqq["hall_chaofan"],normal: hlpath + "duihuan", widget: { closeleft:true,right: 250, bottom: 15 }, size: { width: 228, height: 68 }, callback: "onClickSY", script: this })
        // hqq.setBtn(btnmfjb, { Res:hqq["hall_chaofan"],normal: hlpath + "btnmfjb", widget: { left: 445, bottom: 30 }, callback: "onClickMFJB", script: this })
        hqq.setBtn(btnchongzhi, { Res:hqq["hall_chaofan"],path: hlpath + "chongzhi", widget: { right: 10, bottom: 15 }, size: { width: 228, height: 68 }, callback: "onClickCC", script: this })

        this.noticepanel.active = true
        
        hqq.setWidget(subgameview, { left: 250 })
        this.menuBtnListNode = cc.find("Canvas/hallback/chaofan/menu/dating_menu_di")
        this.btnMenuSelect = cc.find("Canvas/hallback/chaofan/menu/dating_btn_select_di")
        let btn_remen = this.menuBtnListNode.getChildByName("btn_remen")
        hqq.setBtn(btn_remen, { Res:hqq["hall_chaofan"],normal: hlpath + "remen1", pressed: hlpath + "remen2", custom: this.menuBtnInfoList[0], callback: "onClickMenuBtn", script: this, interactable: false })
        let btn_duizhan = this.menuBtnListNode.getChildByName("btn_duizhan")
        hqq.setBtn(btn_duizhan, { Res:hqq["hall_chaofan"],normal: hlpath + "qipai1", pressed: hlpath + "qipai2", custom: this.menuBtnInfoList[1], callback: "onClickMenuBtn", script: this })
        let btn_dianzi = this.menuBtnListNode.getChildByName("btn_dianzi")
        hqq.setBtn(btn_dianzi, { Res:hqq["hall_chaofan"],normal: hlpath + "dianziyouixi1", pressed: hlpath + "dianziyouixi2", custom: this.menuBtnInfoList[5], callback: "onClickMenuBtn", script: this })
        let btn_shixun = this.menuBtnListNode.getChildByName("btn_shixun")
        hqq.setBtn(btn_shixun, { Res:hqq["hall_chaofan"],normal: hlpath + "zhenrenyouxi1", pressed: hlpath + "zhenrenyouxi2", custom: this.menuBtnInfoList[3], callback: "onClickMenuBtn", script: this})
        let btn_touzu = this.menuBtnListNode.getChildByName("btn_touzu")
        hqq.setBtn(btn_touzu, { Res:hqq["hall_chaofan"],normal: hlpath + "caipiao1", pressed: hlpath + "caipiao2", custom: this.menuBtnInfoList[4], callback: "onClickMenuBtn", script: this })
        let btn_tiyu = this.menuBtnListNode.getChildByName("btn_tiyu")
        hqq.setBtn(btn_tiyu, { Res:hqq["hall_chaofan"],normal: hlpath + "tiyu1", pressed: hlpath + "tiyu2", custom: this.menuBtnInfoList[2], callback: "onClickMenuBtn", script: this })
        // let btn_jieji = this.menuBtnListNode.getChildByName("btn_jieji")
        // hqq.setBtn(btn_jieji, { Res:hqq["hall_chaofan"],normal: hrpath + "huangshi/btn_dianzi", pressed: hrpath + "huangshi/btn_dianzi2", custom: this.menuBtnInfoList[6], callback: "onClickMenuBtn", script: this , y:1.435})
        let pos = this.menuBtnListNode.children[1].getPosition().add(this.menuBtnListNode.getPosition())
        this.btnMenuSelect.x = pos.x
        this.btnMenuSelect.y = pos.y

        hqq.addNode(this.node, { normal: "base/language/"+hqq.language+"/img/vip_diamond", widget:{right:10,top:0} ,callback:"toogleManyCai",script:this});
        this.UILoadFinished();
    },
    UILoadFinished(){
        this.suggameScrollView._view.getComponent(cc.Widget).updateAlignment()

        if( hqq.app.pinpai != "ninetwo" ){
            hqq.addNode(this.node,{string:"version:"+hqq.app.version,widget:{bottom:0,right:10},fontSize:15,lineHeight:18,fontFamily:"Arial"});
        }
        this.scheduleOnce(() => {
            this.startInit();
            this.onClickGetGold()
        }, 0)
    },
    onClickGetGold() {
        let btnplus = cc.find("Canvas/goldback/btnplus");
        if(cc.director.getActionManager().getNumberOfRunningActionsInTarget(btnplus))return;
            btnplus.getComponent(cc.Button).interactable = false;
            cc.tween(btnplus)
			.by(0.01, {angle:-10})
			.repeatForever()
			.start();
            this.coinlabel.getComponent(cc.Label).string = hqq.getTip("str7");
            if(hqq.app.pinpai=="juding"){
                hqq.setSprite(btnplus,{Res:hqq["hall_"+hqq.app.pinpai],path:"juding/img/btn_refresh2"});
        }
        this.getGold();
        
    },
    getGold() {
        let btnplus = cc.find("Canvas/goldback/btnplus");
        let callback = (msg) => {
            cc.log("getGold callback msg", msg)
            if (msg.code !== 200) {
                cc.log("error:" + msg.code + ",msg:" + msg.msg)
                if(cc.isValid(btnplus)&& hqq.app.pinpai!='fuxin')
                {
                    btnplus.getComponent(cc.Button).interactable = true;
                    cc.Tween.stopAllByTarget(btnplus);
                    cc.tween(btnplus)
                        .by(0.5, {angle:-(360-(Math.abs(btnplus.angle)%360))})
                        .call(()=>{
                            if(cc.isValid(this.coinlabel)){
                                this.coinlabel.getComponent(cc.Label).string = 0;
                            }
                            if(hqq.app.pinpai=="juding"){
                                hqq.setSprite(btnplus,{Res:hqq["hall_"+hqq.app.pinpai],path:"juding/img/btn_refresh"});
                            }
                        })
                        .start();
                }
            } else {
                // 计算金币
                let gold = 0
                if (msg.msg.game_user) {
                    gold += msg.msg.game_user.game_gold
                }
                if (msg.msg.accounts) {
                    for (let i = 0; i < msg.msg.accounts.length; i++) {
                        gold += msg.msg.accounts[i].balance
                        for (let k in hqq.delaySub) {
                            if (msg.msg.accounts[i].game_id == hqq.delaySub[k]) {
                                gold -= msg.msg.accounts[i].lock_balance
                            }
                        }
                    }
                }
                if (gold < 0.01) {
                    gold = "0";
                } else {
                    gold = hqq.commonTools.formatGold(gold);
                }
                hqq.gameGlobal.player.gold = gold;
                if(cc.isValid(btnplus)&& hqq.app.pinpai!='fuxin')
                {
                    btnplus.getComponent(cc.Button).interactable = true;
                    cc.Tween.stopAllByTarget(btnplus);
                    cc.tween(btnplus)
                        .by(0.5, {angle:-(360-(Math.abs(btnplus.angle)%360))})
                        .call(()=>{
                            if(cc.isValid(this.coinlabel))
                            {
                                this.coinlabel.getComponent(cc.Label).string = gold;
                            }
                            if(hqq.app.pinpai=="juding"){
                                hqq.setSprite(btnplus,{Res:hqq["hall_"+hqq.app.pinpai],path:"juding/img/btn_refresh"});
                            }
                        })
                        .start();
                }
                if(hqq.app.pinpai != "juding")return;
                //          PRE环境 活动ID=140
                //          OL环境  活动ID=115
                let activity_id= 140
                if (hqq.app.huanjin == 'online'){
                    activity_id = 115
                }
                
                let url2 = `${hqq.gameGlobal.pay.pay_host}/api/activity/getApplyReimburseInfo?user_id=${hqq.gameGlobal.pay.user_id}&activity_id=${activity_id}`;
                url2 = url2+`&token=e40f01afbb1b9ae3dd6747ced5bca532&center_auth=${hqq.gameGlobal.token}`
                
                let self = this;
                let callback2 = (response)=>{
                    if(response.status == 0){
                        //开启状态
                        if( response.data.config.is_close == 2 ){
                            //申请了，未领取 ,未提现,first_pay_amount>100,当前余额大于限制金额
                            if( response.data.is_apply && !response.data.is_received &&
                                !response.data.is_withdraw && response.data.first_pay_amount > 100 &&
                                (gold >= response.data.max_withdraw_amount || gold < 10 ) ){
                                hqq.eventMgr.dispatch(hqq.eventMgr.showPublicAlert, {str:hqq.getTip("baopeitip"),position:cc.v2(0,250),parent:this.node})
                            }
                        }
                    }else{
                        hqq.eventMgr.dispatch(hqq.eventMgr.showPublicAlert, {str:response.msg,position:cc.v2(0,250),parent:this.node})
                    }
                }
                let failcallback2 = (errstatus)=>{
                    hqq.logMgr.log("包赔活动 hqq.gameGlobal.pay.pay_host=", hqq.gameGlobal.pay.pay_host);
                    hqq.eventMgr.dispatch(hqq.eventMgr.showPublicAlert, {str:"errstatus:"+errstatus,position:cc.v2(0,250),parent:this.node})
                }
                hqq.http.sendXMLHttpRequest({
                    method: "GET",
                    urlto: url2,
                    callback: callback2,
                    failcallback: failcallback2,
                    needJsonParse: true,
                    timeout: 5000,
                    failtimeout: 7000,
                })
            }
        }
        let failcallback = (msg) => {
            cc.log("getGold failcallback msg", msg)
            if(cc.isValid(btnplus)&& hqq.app.pinpai!='fuxin')
            {
                btnplus.getComponent(cc.Button).interactable = true;
                cc.Tween.stopAllByTarget(btnplus);
                cc.tween(btnplus)
                        .by(0.5, {angle:-(360-(Math.abs(btnplus.angle)%360))})
                        .call(()=>{
                            if(cc.isValid(this.coinlabel))
                            {
                                this.coinlabel.getComponent(cc.Label).string = 0;
                            }
                            if(hqq.app.pinpai=="juding"){
                                hqq.setSprite(btnplus,{Res:hqq["hall_"+hqq.app.pinpai],path:"juding/img/btn_refresh"});
                            }
                        })
                        .start();
            }
        }
        // 获取所有用户的游戏账户信息
        let url = hqq.app.server + "/Game/User/GetGameAccountsInfo?id=" + hqq.gameGlobal.player.id + "&token=" + hqq.gameGlobal.token
        // cc.log("请求地址：", url)
        hqq.http.sendXMLHttpRequest({
            method: "GET",
            urlto: url,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: true,
            timeout: 5000,
            failtimeout: 7000,
        });
    },
    
    // 显示红包雨按钮
    UISetHBY() {
        hqq.setBtn(this.btnhby, { Res:hqq["hall_chaofan"],path: "language/" + hqq.language + "/dating_hby", aniname: "animation", loop: true, widget: { top: -20, right: 260 }, callback: "onClickHBY", script: this })
    },
    // 显示积分抽奖按钮
    UISetJFCJ() {
        hqq.setBtn(this.btnjfcj, { Res:hqq["hall_chaofan"],path: "language/" + hqq.language + "/dating_jfcj", aniname: "animation", loop: true, widget: { top: 0, right: 350 }, callback: "onClickJFCJ", script: this })
    },
    // 最先注册，及时监听来自子游戏的退出事件
    startInit() {
        hqq.eventMgr.register(hqq.eventMgr.hotCheckup, "hallScene_chaofan", this.isupdataCallback.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.hotFail, "hallScene_chaofan", this.failCallback.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.hotProgress, "hallScene_chaofan", this.progressCallback.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.hotFinish, "hallScene_chaofan", this.finishCallback.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.hotUp, "hallScene_chaofan", this.setSubGameBtnUp.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.hotCheck, "hallScene_chaofan", this.setSubGameBtnCheck.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.hotWait, "hallScene_chaofan", this.setSubGameBtnUpWait.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.refreshPlayerinfo, "hallScene_chaofan", this.setPlayerInfo.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.onReceiveBroadcast, "hallScene_chaofan", this.onReceiveBroadcast.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.refreshPlayerGold, "hallScene_chaofan", this.onClickGetGold.bind(this))
        hqq.audioMgr.playBg("hallbg");
        this.scheduleOnce(() => {
            this.setPlayerInfo();
            this.checkSubModule();
        }, 0)
    },
    // 子模块更新检查 im，充提，全民代理地址
    checkSubModule() {
        if (1 == hqq.gameGlobal.imReceive) {
            this.kefupoint.active = true
        }
        if (1 == hqq.gameGlobal.payReceive) {
            this.shouyipoint.active = true
        }
        if (!hqq.isDebug) {
            if (hqq.gameGlobal.im_host == ""
                || hqq.gameGlobal.proxy.proxy_host == ""
                || hqq.gameGlobal.pay.pay_host == "") {
                hqq.app.checkSubServer();
            }
            if (hqq.gameGlobal.proxy.temp_host == "") {
                hqq.loginMgr.checkFatestTempHost();
            }
        }
        this.scheduleOnce(() => {
            this.initWebSoketAndHttp();
        }, 0)
    },
    // 是否热更新返回
    isupdataCallback(bool, enname,isfail=false) {
        if (bool) { // 需要更新 自动更新，无需处理
            if( hqq.app.pinpai == "xinhao" || hqq.app.pinpai == "xinsheng" ){
                if(hqq.game1to2[enname]){
                    enname = hqq.game1to2[enname];
                }
            }
            if (enname == "zrsx") {
                this.setSubGameBtnState("zrsx1", this.subGameBtnState.isWait)
                this.setSubGameBtnState("zrsx2", this.subGameBtnState.isWait)
            } else if (enname == "sbty") {
                this.setSubGameBtnState("sbty1", this.subGameBtnState.isWait)
                this.setSubGameBtnState("sbty2", this.subGameBtnState.isWait)
            } else if (enname == "jdb") {
                this.setSubGameBtnState("jdb", this.subGameBtnState.isWait)
                this.setSubGameBtnState("wlby", this.subGameBtnState.isWait)
                this.setSubGameBtnState("csby", this.subGameBtnState.isWait)
            } else {
                this.setSubGameBtnState(enname, this.subGameBtnState.isWait)
            }
        } else {
            this.finishCallback(enname);
        }
    },
    // 子游戏热更新失败
    failCallback(enname) {
        hqq.logMgr.log("子游戏", enname, "下载失败");
        hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip44"))
        if ( hqq.app.pinpai == "xinhao" || hqq.app.pinpai == "xinsheng"){
            if( hqq.game1to2[ enname ] ){
                enname = hqq.game1to2[ enname ];
            }
        }
        this.setSubGameBtnUp(enname)
    },
    // 下载进度
    progressCallback(progress, enname) {
        if (enname == "apk" || enname == "hall" || enname == "jiazai") {
            return
        }
        if (isNaN(progress) || progress == 0) {
            return
        }
        let mprogress = (progress * 100).toString()
        if (mprogress.includes(".")) {
            mprogress = mprogress.substring(0, mprogress.indexOf("."))
        }
        mprogress += "%"

        if( hqq.app.pinpai == "xinhao" || hqq.app.pinpai == "xinsheng" ){
            if(hqq.game1to2[enname]){
                enname = hqq.game1to2[enname];
            }
        }

        if (enname == "zrsx") {
            if (!this.subGameBtnMap["zrsx1"] && !this.subGameBtnMap["zrsx1"]) {
                return
            }
            this.setSubGameBtnState("zrsx1", this.subGameBtnState.progress)
            this.setSubGameBtnState("zrsx2", this.subGameBtnState.progress)
            this.subGameBtnMap["zrsx1"].progress.getComponent(cc.ProgressBar).progress = progress;
            this.subGameBtnMap["zrsx1"].progresslabel.string = mprogress
            this.subGameBtnMap["zrsx2"].progress.getComponent(cc.ProgressBar).progress = progress;
            this.subGameBtnMap["zrsx2"].progresslabel.string = mprogress
        } else if (enname == "sbty") {
            if (!this.subGameBtnMap["sbty1"] && !this.subGameBtnMap["sbty2"]) {
                return
            }
            this.setSubGameBtnState("sbty1", this.subGameBtnState.progress)
            this.setSubGameBtnState("sbty2", this.subGameBtnState.progress)
            this.subGameBtnMap["sbty1"].progress.getComponent(cc.ProgressBar).progress = progress;
            this.subGameBtnMap["sbty1"].progresslabel.string = mprogress
            this.subGameBtnMap["sbty2"].progress.getComponent(cc.ProgressBar).progress = progress;
            this.subGameBtnMap["sbty2"].progresslabel.string = mprogress
        }  else if (enname == "jdb") {
            if (!this.subGameList["jdb"] && !this.subGameList["wlby"] &&
                !this.subGameList["csby"]) {
                return
            }
            this.setSubGameBtnState("jdb", this.subGameBtnState.progress)
            this.setSubGameBtnState("wlby", this.subGameBtnState.progress)
            this.setSubGameBtnState("csby", this.subGameBtnState.progress)
            this.subGameBtnMap["jdb"].progress.getComponent(cc.ProgressBar).progress = progress;
            this.subGameBtnMap["jdb"].progresslabel.string = mprogress
            if(cc.isValid(this.subGameBtnMap["wlby"])){
                this.subGameBtnMap["wlby"].progress.getComponent(cc.ProgressBar).progress = progress;
                this.subGameBtnMap["wlby"].progresslabel.string = mprogress
            }
            if(cc.isValid(this.subGameBtnMap["csby"])){
                this.subGameBtnMap["csby"].progress.getComponent(cc.ProgressBar).progress = progress;
                this.subGameBtnMap["csby"].progresslabel.string = mprogress
            }
        } else {
            if (!this.subGameBtnMap[enname]) {
                return
            }
            this.setSubGameBtnState(enname, this.subGameBtnState.progress)
            this.subGameBtnMap[enname].progress.getComponent(cc.ProgressBar).progress = progress;
            this.subGameBtnMap[enname].progresslabel.string = mprogress
        }
    },
    // 子游戏热更新结束
    finishCallback(enname) {
        cc.log("finishCallback", enname)
        let enname2 = enname;
        if( hqq.app.pinpai == "xinhao" || hqq.app.pinpai == "xinsheng" ){
            if(hqq.game1to2[enname]){
                enname = hqq.game1to2[enname];
            }
        }
        if (enname == "zrsx") {
            if (!this.subGameList["zrsx1"] && !this.subGameList["zrsx2"]) {
                return
            }
            this.setSubGameBtnState("zrsx1", this.subGameBtnState.canClick)
            this.setSubGameBtnState("zrsx2", this.subGameBtnState.canClick)
            if (!this.subGameList['zrsx1'].hasAccount && !hqq.isDebug) {
                hqq.loginMgr.createSubAccount("zrsx1")
            }
        } else if (enname == "sbty") {
            if (!this.subGameList["sbty1"] && !this.subGameList["sbty2"]) {
                return
            }
            this.setSubGameBtnState("sbty1", this.subGameBtnState.canClick)
            this.setSubGameBtnState("sbty2", this.subGameBtnState.canClick)
            if (!this.subGameList['sbty1'].hasAccount && !hqq.isDebug) {
                hqq.loginMgr.createSubAccount("sbty1")
            }
        } else if (enname == "jdb") {
            if (!this.subGameList["jdb"] && !this.subGameList["wlby"] &&
                !this.subGameList["csby"]) {
                return
            }
            this.setSubGameBtnState("jdb", this.subGameBtnState.canClick)
            this.setSubGameBtnState("wlby", this.subGameBtnState.canClick)
            this.setSubGameBtnState("csby", this.subGameBtnState.canClick)
            if (!this.subGameList['jdb'].hasAccount && !hqq.isDebug) {
                hqq.loginMgr.createSubAccount("jdb")
            }
        } else {
            if (!this.subGameList[enname]) {
                return
            }
            this.setSubGameBtnState(enname, this.subGameBtnState.canClick)
            if (!this.subGameList[enname].hasAccount && !hqq.isDebug) {
                hqq.loginMgr.createSubAccount(enname)
            }
            if(enname == "pg"){
                if (this.subGameList["pg2"]) {
                    if (!this.subGameList["pg2"].hasAccount && !hqq.isDebug) {
                        hqq.loginMgr.createSubAccount("pg2")
                    }
                }
            } else if(enname == "pg2"){
                if (this.subGameList["pg"]) {
                    if (!this.subGameList["pg"].hasAccount && !hqq.isDebug) {
                        hqq.loginMgr.createSubAccount("pg")
                    }
                }
            }
        }
        if (enname == 'sgj') {
            this.sgjConnect()
        } else if (enname == 'hbsl') {
            this.hbslConnect()
        } else if (enname == 'hbld') {
            this.hbldConnect()
        }
        if (hqq.app.isRelease) {
            this.loadBundle(enname2)
        }
    },
    // 设置子游戏按钮等待下载状态
    setSubGameBtnUp(enname) {
        if (enname == "zrsx") {
            this.setSubGameBtnState("zrsx1", this.subGameBtnState.needDown)
            this.setSubGameBtnState("zrsx2", this.subGameBtnState.needDown)
        } else if (enname == "sbty") {
            this.setSubGameBtnState("sbty1", this.subGameBtnState.needDown)
            this.setSubGameBtnState("sbty2", this.subGameBtnState.needDown)
        } else if (enname == "jdb") {
            this.setSubGameBtnState("jdb", this.subGameBtnState.needDown)
            this.setSubGameBtnState("wlby", this.subGameBtnState.needDown)
            this.setSubGameBtnState("csby", this.subGameBtnState.needDown)
        } else {
            if ( hqq.app.pinpai == "xinhao" || hqq.app.pinpai == "xinsheng"){
                if( hqq.game1to2[ enname ] ){
                    enname = hqq.game1to2[ enname ];
                }
            }
            this.setSubGameBtnState(enname, this.subGameBtnState.needDown)
        }
    },
    // 设置按钮状态为检测文件
    setSubGameBtnCheck(enname) {
        let str1 = hqq.getTip("str1")
        if (enname == 'zrsx') {
            if (!this.subGameBtnMap["zrsx1"] && !this.subGameBtnMap["zrsx2"]) {
                return
            }
            this.subGameBtnMap['zrsx1'].progresslabel.string = str1;
            this.subGameBtnMap['zrsx2'].progresslabel.string = str1;
        } else if (enname == 'sbty') {
            if (!this.subGameBtnMap["sbty1"] && !this.subGameBtnMap["sbty2"]) {
                return
            }
            this.subGameBtnMap['sbty1'].progresslabel.string = str1;
            this.subGameBtnMap['sbty2'].progresslabel.string = str1;
        } else if (enname == 'jdb') {
            if (!this.subGameList["jdb"] && !this.subGameList["wlby"] &&
                !this.subGameList["csby"]) {
                return
            }
            this.subGameBtnMap['jdb'].progresslabel.string = str1;
            if(cc.isValid(this.subGameBtnMap['wlby'])){
                this.subGameBtnMap['wlby'].progresslabel.string = str1;
            }
            if(cc.isValid(this.subGameBtnMap['csby'])){
                this.subGameBtnMap['csby'].progresslabel.string = str1;
            }
        } else {
            if (!this.subGameBtnMap[enname]) {
                return
            }
            if ( hqq.app.pinpai == "xinhao" || hqq.app.pinpai == "xinsheng"){
                if( hqq.game1to2[ enname ] ){
                    enname = hqq.game1to2[ enname ];
                }
            }
            this.subGameBtnMap[enname].progresslabel.string = str1;
        }
    },
    // 设置子游戏按钮更新状态为等待
    setSubGameBtnUpWait(subgamern) {
        if (subgamern == "zrsx") {
            this.setSubGameBtnState("zrsx1", this.subGameBtnState.isWait)
            this.setSubGameBtnState("zrsx2", this.subGameBtnState.isWait)
        } else if (subgamern == "sbty") {
            this.setSubGameBtnState("sbty1", this.subGameBtnState.isWait)
            this.setSubGameBtnState("sbty2", this.subGameBtnState.isWait)
        } else if (subgamern == "jdb") {
            this.setSubGameBtnState("jdb", this.subGameBtnState.isWait)
            this.setSubGameBtnState("wlby", this.subGameBtnState.isWait)
            this.setSubGameBtnState("csby", this.subGameBtnState.isWait)
        } else {
            if ( hqq.app.pinpai == "xinhao" || hqq.app.pinpai == "xinsheng"){
                if( hqq.game1to2[ subgamern ] ){
                    subgamern = hqq.game1to2[ subgamern ];
                }
            }
            this.setSubGameBtnState(subgamern, this.subGameBtnState.isWait)
        }
    },
    // 设置玩家信息
    setPlayerInfo(msg) {
        if (msg) {
            if (msg.game_nick) {
                this.namelabel.getComponent(cc.Label).string = msg.game_nick;
            }
            if (msg.game_gold || msg.game_gold == 0) {
                this.coinlabel.getComponent(cc.Label).string = msg.game_gold;
            }
            if (msg.game_img) {
                if (hqq.app.pinpai == "fuxin" || hqq.app.pinpai == "juding") {
                    hqq.commonTools.loadHeadRes(msg.game_img, this.head.getComponent(cc.Sprite), 65);
                } else if (hqq.app.pinpai == "xinsheng"|| hqq.app.pinpai == "xinlong") {
                    hqq.commonTools.loadHeadRes(msg.game_img, this.head.getComponent(cc.Sprite), 60);
                } else if (hqq.app.pinpai == "huaxing") {
                    hqq.commonTools.loadHeadRes(msg.game_img, this.head.getComponent(cc.Sprite), 90);
                } else if (hqq.app.pinpai == "ninetwo") {
                    hqq.commonTools.loadHeadRes(msg.game_img, this.head.getComponent(cc.Sprite), 74);
                } else {
                    hqq.commonTools.loadHeadRes(msg.game_img, this.head.getComponent(cc.Sprite));
                }
            }
            if (msg.ischangeAccount) {
                if (msg.phone_number) {
                    this.youkeicon.active = false
                } else {
                    this.youkeicon.active = true
                }
                this.resetSubGameList();
            }

            if (msg.phone_number){
                if(cc.isValid(this.bindbtn)){
                    this.bindbtn.active = false;
                }
            }else{
                if(cc.isValid(this.bindbtn)){
                    this.bindbtn.active = true;
                }
            }
        } else {
            let player = hqq.gameGlobal.player;
            this.namelabel.getComponent(cc.Label).string = player.nick;
            this.coinlabel.getComponent(cc.Label).string = player.gold;
            if (hqq.app.pinpai == "fuxin" || hqq.app.pinpai == "juding") {
                hqq.commonTools.loadHeadRes(player.headurl, this.head.getComponent(cc.Sprite), 65);
            } else if (hqq.app.pinpai == "xinsheng" || hqq.app.pinpai == "xinlong") {
                hqq.commonTools.loadHeadRes(player.headurl, this.head.getComponent(cc.Sprite), 60);
            } else if (hqq.app.pinpai == "huaxing") {
                hqq.commonTools.loadHeadRes(player.headurl, this.head.getComponent(cc.Sprite), 90);
            } else if (hqq.app.pinpai == "ninetwo") {
                hqq.commonTools.loadHeadRes(player.headurl, this.head.getComponent(cc.Sprite), 74);
            } else {
                hqq.commonTools.loadHeadRes(player.headurl, this.head.getComponent(cc.Sprite));
            }
            if (hqq.gameGlobal.player.phonenum != "") {
                this.youkeicon.active = false
                if(cc.isValid(this.bindbtn)){
                    this.bindbtn.active = false;
                }
            } else {
                this.youkeicon.active = true
                if(cc.isValid(this.bindbtn)){
                    this.bindbtn.active = true;
                }
            }
        }
    },
    // 网络连接
    initWebSoketAndHttp() {
        if (!hqq.isDebug && !hqq.hallWebSocket) {
            hqq.hallWebSocket = new hallWebSocket();
            hqq.hallWebSocket.init();
            let url = hqq.app.server;
            if (url.indexOf("://") == -1) {
                url = "ws://" + url;
            } else {
                var socket = url.split("://")[1];
                var header = url.split("://")[0];
                var socketHeader = '';
                if (header == "http") {
                    socketHeader = "ws://"
                } else if (header == "https") {
                    socketHeader = "ws://"
                }
                url = socketHeader + socket;
            }
            hqq.hallWebSocket.connect(url);
        }
        this.scheduleOnce(() => {
            this.initSubGameBtn();
        }, 0)
    },
    // 加载子游戏的子包 包含静态子包和动态子包
    loadBundle(subname) {
        // if (CC_DEBUG) {
        //     return
        // }
        // if (subname != "ddz") {
        //     return
        // }
        //有分皮肤加载的子游戏资源
        let subGamePinPaiResList = { 
            "fuxin":["bjl","lhd"]
        };
        if(subGamePinPaiResList[hqq.app.pinpai] ){
            let key2 = null;
            for( key2 in subGamePinPaiResList[hqq.app.pinpai] ){
                if( key2 == subdata ){
                    cc.assetManager.loadBundle(subdata + "_" + hqq.app.pinpai, (err) => {
                        if (err) {
                            return cc.log('load subpackage script fail.', subdata + "_" + hqq.app.pinpai);
                        }
                        hqq[subdata + "_" + hqq.app.pinpai] = cc.assetManager.getBundle(subdata + "_" + hqq.app.pinpai );
                        cc.log('load subpackage script successfully.', subdata + "_" + hqq.app.pinpai );
                        this.loadNextScene(subdata);
                    });
                    return;
                }
            }
        }
        if (!cc.assetManager.getBundle(subname)) {
            cc.assetManager.loadBundle(subname, (err) => {
                if (err) {
                    return cc.log('load subpackage script fail.', subname);
                }
                hqq[subname] = cc.assetManager.getBundle(subname);
                cc.log('load subpackage script successfully.', subname);
            });
        }
        if (!cc.assetManager.getBundle(subname +"Res")) {
            cc.assetManager.loadBundle(subname +"Res", (err) => {
                if (err) {
                    return cc.log('load subpackage script fail.', subname + 'Res');
                }
                hqq[subname + 'Res'] = cc.assetManager.getBundle(subname +"Res");
                cc.log('load subpackage script successfully.', subname + 'Res');
            });
        }
    },
    /**
    * @Description: 根据id获取服务器子游戏信息
    */
    getRemoteSubgame(game_id) {
        if (!hqq.app || !hqq.app.remoteGamelist) {
            return
        }
        let remotedata = hqq.app.remoteGamelist[0];
        for (let i = 0; i < hqq.app.remoteGamelist.length; i++) {
            if (game_id === hqq.app.remoteGamelist[i].game_id) {
                remotedata = hqq.app.remoteGamelist[i];
                break;
            }
        }
        return remotedata;
    },
    // 加载大厅子游戏按钮UI资源
    loadIconRes(node, name, key, i) {
        let path = "language/" + hqq.language + "/img/icon" + this.subGameList[key].enname
        hqq.setSprite(node, { Res:hqq["hall_"+hqq.app.pinpai],normal: path ,size: { width: 310, height: 310 } })
        let tempbool = node.parent.active;
        if(!tempbool){
            node.parent.active = true;
        }
        hqq.setNode(node,{ width: 310, height: 310 })
        if(!tempbool){
            node.parent.active = false;
        }
    },
    onscrollEvents(scrollview, eventType, customEventData) {
        let pos = this.suggameScrollView.content.getPosition();
        let tempitembtnwidth = this.itembtn.width / 2.1;
        let tempx = Math.abs(pos.x - (this.scrollviewcotentX - tempitembtnwidth));
        let tempx2 = tempx + this.suggameScrollView.node.getChildByName("view").width + (this.itembtn.width);
        let tempmenubtninfolist = this.menuBtnInfoList;
        let temptype = 2;
        for (let key in this.subGameList){
            let ani = this.suggameScrollView.content.getChildByName(key);
            if(cc.isValid(ani)){
                let type = null;
                for (let i = 0; i < tempmenubtninfolist.length; i++) {
                    if (this.selectType.match(tempmenubtninfolist[i])) {
                        type = i - temptype
                        break
                    }
                }
                let isremen = false;
                for(let j = 0; j < this.remenlist.length;j++){
                    if( key === this.remenlist[j]){
                        isremen = true;
                        break;
                    }
                }
                // cc.log("key=",key," pos.x=",pos.x, " ani.x=",ani.x," tempx=",tempx," tempx2=",tempx2, " this.selectType=",this.selectType," type=",type)
                if( (ani.x < tempx || ani.x > tempx2)){
                    if(ani.active){
                        if(( pos.x > this.scrollviewcotentX && (ani.x == 158.5 || ani.x == 460.5 || ani.x == 762.5) )){
                            ani.active = true;
                        } else{
                            ani.active = false;
                        }
                    }
                } else if( (this.selectType == "remen" && isremen) ||
                            this.subGameList[key].gameType == type ){
                    ani.active = true;
                }
            }
        };
    },
    /** 子游戏初始化 */
    initSubGameBtn() {
        let width = (Math.ceil(Object.getOwnPropertyNames(this.subGameList).length / 2) * (this.itembtn.width + 15)) + 30;
        if (hqq.app.pinpai == "xinsheng" || hqq.app.pinpai == "xingui" || hqq.app.pinpai == "fuxin"  || hqq.app.pinpai == "xinlong"||hqq.app.pinpai=="juding"||hqq.app.pinpai=="huaxing") {
            width = (Math.ceil(Object.getOwnPropertyNames(this.subGameList).length / 2) * (290 + 15)) + 15;
        }
        this.selectType = "remen";
        this.suggameScrollView.getComponent(cc.ScrollView).content.width = width
        this.suggameScrollView.getComponent(cc.ScrollView).setContentPosition(cc.v2(-this.suggameScrollView.node.width / 2, 0))
        this.suggameScrollView.getComponent(cc.ScrollView).enabled = false;
        for( let i = 1;i<this.menuBtnListNode.children.length;i++){
            if(cc.isValid(this.menuBtnListNode.children[i].getComponent(cc.Button))){
                this.menuBtnListNode.children[i].getComponent(cc.Button).interactable = false;
            }
        }
        let delayTime = 0.01;
        let sortArray = [];
        for(let i = 0; i < this.remenlist.length;i++){
            for (let key in this.subGameList){
                if(key === this.remenlist[i] ){
                    sortArray.push(key);
                    break;
                }
            }
        }
        cc.log("sortArray=",sortArray)
        for (let key in this.subGameList){
            let findkey = false;
            for(let i = 0; i < sortArray.length;i++){
                if(sortArray[i] == key ){
                    findkey = true;
                    break;
                }
            }
            if(!findkey){
                sortArray.push(key);
            }
        }
        let btnnum = 0;
        for (let i = 0; i<sortArray.length;i++) {
            let key = sortArray[ i ];
            this.scheduleOnce(()=>{
                if(!cc.isValid(this.node))return;
                let tempdata = this.subGameList[key];
                if(!tempdata){
                    cc.log("null key =" , key)
                    return;
                }
                let itembtn = cc.instantiate(this.itembtn);
                itembtn.name = key;
                let itemhot = itembtn.getChildByName("hot")
                let itemwait = itembtn.getChildByName("wait")
                let itemexp = itembtn.getChildByName("experience")
                itembtn.downflag = itembtn.getChildByName('downFlag');
                itembtn.downflag2 = itembtn.getChildByName('downFlag2');
                itembtn.progress = itembtn.getChildByName('progress');
                itembtn.jiantou = itembtn.getChildByName('jiantou');
                itembtn.tempdata = tempdata;
                itembtn.progresslabel = itembtn.getChildByName('progresslabel').getComponent(cc.Label);
                btnnum++;

                itembtn.scale = 0.9;
                hqq.setSprite(itemhot, { path: "base/language/" + hqq.language + "/img/hot" })
                hqq.setSprite(itemwait, { path: "base/language/" + hqq.language + "/img/wait" })
                hqq.setSprite(itemexp, { path: "base/language/" + hqq.language + "/img/experience" })
                hqq.setSprite(itembtn.jiantou,{path:"base/test/img/jiantou"});
                
                itembtn.progress.active = false;
                itembtn.progress = itembtn.getChildByName("progress2");
                hqq.setSprite(itembtn.progress,{Res:hqq["hall_"+hqq.app.pinpai],path:"chaofan/img/xz2"});
                hqq.setSprite(itembtn.progress.getChildByName("tuoyuan"),{Res:hqq["hall_"+hqq.app.pinpai],path:"chaofan/img/xz2"});
                hqq.setSprite(itembtn.jiantou,{Res:hqq["hall_"+hqq.app.pinpai],path:"chaofan/img/xz1",width:35,height:47});
                itembtn.progresslabel.fontSize = 25;
                itembtn.progresslabel.lineHeight = 25;

                if(key=="pg2"){
                    hqq.addNode(itembtn,{path: "base/language/" + hqq.language + "/img/vipLine",x:-97,y:57,name:"pg1"});
                    hqq.addNode(itembtn,{path: "base/language/" + hqq.language + "/img/icon_pgOfficial",x:100,y:85,name:"pg2"});
                }
                let isremen = false;
                for(let i = 0; i < this.remenlist.length;i++){
                    if( key === this.remenlist[i]){
                        isremen = true;
                        break;
                    }
                }
                if (isremen) {
                    this.setSubBtnPos(itembtn, i)
                } else{
                    btnnum--;
                    itembtn.active = false;
                }
                // this.setSubBtnPos(itembtn, tempdata.hallid);
                this.suggameScrollView.content.addChild(itembtn);
                this.loadIconRes(itembtn.getChildByName("ani"), itembtn.getChildByName("nameimg"), key, i);
                if (key == "zjh" || key == "ddz" || key == "hwby") {
                    itembtn.getChildByName("experience").active = true;
                }
                if ((key == "hbld" && (hqq.app.pinpai != "huaxing" && hqq.app.pinpai != "ninetwo") ) || key == "brnn" || key == 'jbpby'||
                    key == "fkxw" || key == "lhd" || key == "bjl") {
                    itembtn.getChildByName("hot").active = true;
                }
                if(hqq.app.pinpai == "xinhao" || hqq.app.pinpai == "xinsheng" ){
                    if ( key == "zjh2" || key == "ddz2" ||key == "qznn2" || key == "sss2") {
                        itembtn.getChildByName("experience").active = true;
                    }
                    if ( key == "lhd2" || key == "hbld2" ||
                         key == "brnn2" || key == 'bjl2'||
                         key == "caishendao" || key == "hh2" ) {
                        itembtn.getChildByName("hot").active = true;
                    }
                }
                this.subGameBtnMap[tempdata.enname] = itembtn;
                this.subGameBtnArr[tempdata.hallid] = itembtn;
                if (hqq.hotUpdateMgr.getSubGameIsOnUp(tempdata.enname)) { // 子游戏在更新列表中
                    this.setSubGameBtnUpWait(tempdata.enname);
                } else if (!hqq.isDebug) {
                    this.checkSubGameDownload(tempdata.enname);
                } else {
                    let subgamern = tempdata.enname
                    if (tempdata.enname == "zrsx1" || tempdata.enname == "zrsx2") {
                        subgamern = "zrsx"
                        if (tempdata.enname == "zrsx1") {
                            this.loadBundle(subgamern)
                        }
                    } else if (tempdata.enname == "sbty1" || tempdata.enname == "sbty2") {
                        subgamern = "sbty"
                        if (tempdata.enname == "sbty1") {
                            this.loadBundle(subgamern)
                        }
                    }  else if (tempdata.enname == "wlby" || tempdata.enname == "csby") {
                        subgamern = "jdb"
                        this.loadBundle(subgamern)
                    }
                    else if(hqq.game2to1[enname]){
                        subgamern = hqq.game2to1[enname];
                        this.loadBundle(subgamern);
                    }
                    else {
                        this.loadBundle(subgamern)
                    }
                    this.setSubGameBtnState(tempdata.enname, this.subGameBtnState.canClick);
                }
            },i*delayTime)
        }
        
        let scrollEventHandler = new cc.Component.EventHandler();
        scrollEventHandler.target = this.node;
        scrollEventHandler.component = "hallScene_chaofan";
        scrollEventHandler.customEventData = "1";
        scrollEventHandler.handler = "onscrollEvents";
        this.suggameScrollView.scrollEvents.push(scrollEventHandler);
        this.scheduleOnce(()=>{
            this.scrollviewcotentX = this.suggameScrollView.content.x;
            this.refreshSubGameBtn("remen")
            this.suggameScrollView.getComponent(cc.ScrollView).enabled = true;
            let tempfindfirstbtn = false;
            for( let i = 0;i<this.menuBtnListNode.children.length;i++){
                let tempmenubtn = this.menuBtnListNode.children[i].getComponent(cc.Button);
                if(cc.isValid(tempmenubtn)){
                    tempmenubtn.interactable = tempfindfirstbtn;
                    tempfindfirstbtn = true;
                }
            }
            // this.onscrollEvents(this.suggameScrollView);
        },Object.keys(this.subGameList).length*delayTime)
        
        this.scheduleOnce(() => {
            !hqq.isDebug && this.sgjConnect()
            !hqq.isDebug && this.hbslConnect()
            !hqq.isDebug && this.hbldConnect()
            !hqq.isDebug && this.getNotice();
            !hqq.isDebug && this.getEmail();
            this.getHBYConfig();
        }, 0.5)
    },
    /** 判断子游戏是否下载更新等 */
    checkSubGameDownload(enname) {
        let enname2 = enname;
        if(hqq.game2to1[enname]){
            enname = hqq.game2to1[enname];
        }
        let subdata = this.getRemoteSubgame(this.subGameList[enname2].game_id)
        if (subdata && subdata.open == 0) {
            this.setSubGameBtnState(enname2, this.subGameBtnState.noOpen)
        } else {
            let subgamev;
            let localsubv = hqq.localStorage.get(enname, "versionKey");
            if (enname == 'zrsx1' || enname == 'zrsx2') {
                localsubv = hqq.localStorage.get('zrsx', "versionKey");
                subgamev = hqq.app.subGameVersion['zrsx'];
            } else if (enname == 'sbty1' || enname == 'sbty2') {
                localsubv = hqq.localStorage.get('sbty', "versionKey");
                subgamev = hqq.app.subGameVersion['sbty'];
            } else if (enname == 'wlby' || enname == 'csby') {
                localsubv = hqq.localStorage.get('jdb', "versionKey");
                subgamev = hqq.app.subGameVersion['jdb'];
            } else {
                subgamev = hqq.app.subGameVersion[enname];
            }
            // let txt = "local version: " + localsubv + " | remote version:" + subgamev;
            let needup = hqq.commonTools.versionCompare(localsubv, subgamev)
            if (needup && !cc.sys.isBrowser && enname != "aga") { // && cc.sys.os != "Windows"
                // cc.log(txt + " | subgame : " + enname + " need update");
                this.setSubGameBtnState(enname2, this.subGameBtnState.needDown)
            } else {
                // cc.log(txt + " | subgame : " + enname + " not need update")
                this.setSubGameBtnState(enname2, this.subGameBtnState.canClick)
                if (hqq.app.isRelease) {
                    let subgamern = enname
                    if (enname == "zrsx1" || enname == "zrsx2") {
                        subgamern = "zrsx"
                        if (enname == "zrsx1") {
                            this.loadBundle(subgamern)
                        }
                    } else if (enname == "sbty1" || enname == "sbty2") {
                        subgamern = "sbty"
                        if (enname == "sbty1") {
                            this.loadBundle(subgamern)
                        }
                    }  else if (enname == "wlby" || enname == "csby") {
                        subgamern = "jdb"
                        this.loadBundle(subgamern)
                    } else if (subgamern != "aga") {
                        this.loadBundle(enname);
                    }
                }
            }
        }
    },
    /** 玩家设置 */
    onClickPlayerBtn(event) {
        this.clickDelay(event)
        hqq.viewCtr.showLayer("prefab/personallayer","hallPersonLayer_chaofan",null,1000,false,hqq["hall_chaofan"]);
    },
    
    // 点击左侧菜单按钮统一回调
    onClickMenuBtn(event, customEventData) {
        cc.log("onClickMenuBtn customEventData=",customEventData)
        for (let i = 1; i < this.menuBtnListNode.children.length; i++) {
            if (this.menuBtnListNode.children[i].name.match(customEventData)) {
                this.menuBtnListNode.children[i].getComponent(cc.Button).interactable = false
                if (this.btnMenuSelect) {
                    let pos = this.menuBtnListNode.children[i].getPosition().add(this.menuBtnListNode.getPosition())
                    this.btnMenuSelect.x = pos.x
                    this.btnMenuSelect.y = pos.y
                }
                cc.log("onClickMenuBtn 1111111111111")
                this.refreshSubGameBtn(customEventData)
            } else {
                this.menuBtnListNode.children[i].getComponent(cc.Button).interactable = true
            }
        }
    },
    /** 点击子游戏按钮统一回调 */
    onClickSubgame(event, enname) {
        if (this.isSubBtnClicked) {
            this.scheduleOnce(function () {
                this.isSubBtnClicked = false
            }, 0.5)
            return
        }
        this.isSubBtnClicked = true
        if (enname == "aga") {
            hqq.eventMgr.dispatch(hqq.eventMgr.showAgaLayer, null)
            return
        }
        let loginHistory = this.getSubGameLoginHistory(enname)
        loginHistory.push(new Date().getTime())
        hqq.localStorage.set(enname, "loginHistory", loginHistory)
        if (hqq.isDebug) {
            this.jumpToSubGame(enname)
        } else if (this.subGameList[enname].hasAccount) {
            if( enname == "pg" || enname == "pg2" ){
                hqq.loginMgr.createSubAccount("pg", ()=>{
                    hqq.loginMgr.createSubAccount("pg2", this.jumpToPGORPG2.bind(this),enname)
                })
                return;   
            }
            this.jumpToSubGame(enname)
        } else {
            if( enname == "pg" ){
                hqq.loginMgr.createSubAccount(enname, ()=>{
                    hqq.loginMgr.createSubAccount("pg2", this.jumpToPGORPG2.bind(this),"pg")
                })
                return;
            } else if( enname == "pg2" ){
                hqq.loginMgr.createSubAccount(enname, ()=>{
                    hqq.loginMgr.createSubAccount("pg", this.jumpToPGORPG2.bind(this),"pg2")
                })
                return;
            }
            hqq.loginMgr.createSubAccount(enname, this.jumpToSubGame.bind(this))
        }
    },

    jumpToPGORPG2(enname){
        let checkpgorpg2 = (enname)=>{
            if( hqq.gameGlobal.pg2winrate <= 0 && hqq.gameGlobal.pgwinrate <= 0 ){
                // hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("pgweihu"))
                // return;
            } else if( hqq.gameGlobal.pg2winrate <= 0 && hqq.gameGlobal.pgwinrate > 0 ){
                enname = "pg";
            } else if( hqq.gameGlobal.pgwinrate <= 0 && hqq.gameGlobal.pg2winrate > 0 ){
                enname = "pg2";
            } else{
                let rand = Math.random();
                if( rand <= 0.9 ){
                    if( hqq.gameGlobal.pg2winrate > hqq.gameGlobal.pgwinrate ){
                        this.jumpToSubGame("pg2");
                        return;
                    } else{
                        this.jumpToSubGame("pg");
                        return;
                    }
                }
            }
            this.jumpToSubGame(enname);
        }
        let callback2 = (response, url)=>{
            if(response.code === 0 ){
                hqq.gameGlobal.pg2winrate = response.data;
            } else{
                hqq.gameGlobal.pg2winrate = 0;
            }
            checkpgorpg2(enname);
        }
        let failcallback2 = (status, forcejump, url, err, readyState) => {
            hqq.gameGlobal.pg2winrate = 0;
            checkpgorpg2(enname);
        }
        let callback = (response, url)=>{
            if(response.code === 0 ){
                hqq.gameGlobal.pgwinrate = response.data;
            } else{
                hqq.gameGlobal.pgwinrate = 0;
            }
            this.getPlayerBetsSummationTotal("pg2",callback2,failcallback2)
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            hqq.gameGlobal.pgwinrate = 0;
            this.getPlayerBetsSummationTotal("pg2",callback2,failcallback2)
        }
        this.getPlayerBetsSummationTotal("pg",callback,failcallback)
    },

    getPlayerBetsSummationTotal(enname,callback,failcallback){
        let url = hqq.app.server.replace("center","game")+"/"+enname+"/api/getPlayerBetsSummationTotal";
        url += "?game_id=" + this.subGameList[enname].game_id;
        
        hqq.http.sendXMLHttpRequest({
            method: 'GET',
            urlto: url,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: true,
        })
    },

    // 跳转至子游戏场景
    jumpToSubGame(enname) {
        let key = enname
        if (enname == "sbty1" || enname == "sbty2") {
            key = "sbty"
        } else if (enname == "zrsx1" || enname == "zrsx2") {
            key = "zrsx"
        } else if (enname == "wlby" ) {
            key = "jdb";
            hqq.gameGlobal.jdb.MType = 7004;
        } else if (enname == "csby" ){
            key = "jdb";
            hqq.gameGlobal.jdb.MType = 7003;
        }
        else if(hqq.game2to1[enname]){
            key = hqq.game2to1[enname];
        }
        hqq.audioMgr.stopBg();
        if (enname == "hbsl" || enname == 'zrsx1' || enname == 'zrsx2'
            || enname == 'pccp' || enname == 'sbty1' || enname == 'sbty2'
            || enname == 'fctbj') { //  真人视讯 红包扫雷 派彩 沙巴体育 发财推币机竖屏
            hqq.reflect && hqq.reflect.setOrientation("portrait")
            if (enname == 'zrsx1') {
                hqq.gameGlobal.subGameType = 40
            } else if (enname == 'zrsx2') {
                hqq.gameGlobal.subGameType = 24
            } else if (enname == 'sbty1') {
                hqq.gameGlobal.subGameType = 0
            } else if (enname == 'sbty2') {
                hqq.gameGlobal.subGameType = 1
            }
        }
        cc.log("jumpToSubGame enname=",enname , " this.subGameList[enname]=",this.subGameList[enname], " this.subGameList[enname].hasRes=",this.subGameList[enname].hasRes)
        this.loadNextScene(enname);
    },
    loadNextScene(enname) {
        if (hqq.app.pinpai == "fuxin" ) {
            cc.director.preloadScene(this.subGameList[enname].fuxin_lanchscene, this.preloadSceneOnProgress, (err, scene) => {
                if (err) {
                    cc.log(err)
                    hqq.logMgr.logerror(err)
                    return
                }
                cc.director.loadScene(this.subGameList[enname].fuxin_lanchscene);
            })
        } else {
            cc.director.preloadScene(this.subGameList[enname].lanchscene, this.preloadSceneOnProgress, (err, scene) => {
                if (err) {
                    cc.log(err)
                    hqq.logMgr.logerror(err)
                    return
                }
                cc.director.loadScene(this.subGameList[enname].lanchscene);
            })
        }
    },
    // 金币数字后的加号按钮
    onClickPlus(event, customEventData) {
        cc.log("onClickPlus")
        this.clickDelay(event)
        if (hqq.app.pinpai == "yuyu" ) {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("str8"))
            return
        }
        hqq.eventMgr.dispatch(hqq.eventMgr.showPayScene, "hall")
    },
    // 充值
    onClickCC(event, customEventData) {
        cc.log("onClickCC")
        this.clickDelay(event)
        if (hqq.app.pinpai == "yuyu" ) {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("str8"))
            return
        }
        hqq.eventMgr.dispatch(hqq.eventMgr.showPayScene, "hall")
    },
    // 免费金币
    onClickMFJB(event, customEventData) {
        cc.log("onClickMFJB")
        this.clickDelay(event)
        if(hqq.app.pinpai == "juding"){
            hqq.eventMgr.dispatch(hqq.eventMgr.showNotice, 2)
            return;
        }
        if (hqq.gameGlobal.player.phonenum != "") {
            hqq.eventMgr.dispatch(hqq.eventMgr.showPayActivityWeb, true);
        } else {
            hqq.eventMgr.dispatch(hqq.eventMgr.showRegister, null);
        }
    },
    // 聊天客服
    onClickKF(event, customEventData) {
        cc.log("onClickKF")
        this.clickDelay(event)
        // if (hqq.subModel.im.lanchscene != "") {
        //     hqq.gameGlobal.imReceive = 0;
        //     hqq.reflect && hqq.reflect.setOrientation("portrait")
        //     cc.director.loadScene(hqq.subModel.im.lanchscene)
        // } else {
        //     cc.log("请配置im场景")
        // }
        if(hqq.app.pinpai == "ninetwo" ){
            hqq.eventMgr.dispatch(hqq.eventMgr.showKeFuPanel, true );
        } else{
            hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, { type: 11 });
        }
    },
    // 收益 兑换提现
    onClickSY(event, customEventData) {
        cc.log("onClickSY")
        this.clickDelay(event)
        if (hqq.app.pinpai == "yuyu" ) {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("str8"))
            return
        }
        if (hqq.subModel.cash.lanchscene != "") {
            let payStr = "pay_" + hqq.app.pinpai;
            for(let i = 0; i < hqq.loginMgr.payversionList.length;i++){
                if(hqq.app.pinpai == hqq.loginMgr.payversionList[i]){
                    payStr = "pay_test";
                    break;
                }
            }
            if(hqq.app.pinpai === "xinlong"){
                payStr = "pay_xinsheng";
            }
            
            cc.assetManager.loadBundle(payStr, (err)=> {
                if (err) {
                    return cc.log('load subpackage script fail.', payStr + "_" + hqq.app.pinpai);
                }
                hqq[payStr] = cc.assetManager.getBundle(payStr);
                cc.log('load subpackage script successfully.', payStr);
                cc.director.preloadScene(hqq.subModel.cash.lanchscene, this.preloadSceneOnProgress.bind(this), (err, scene) => {
                    if (err) {
                        cc.log(err)
                        hqq.logMgr.logerror(err)
                        return
                    }
                    cc.director.loadScene(hqq.subModel.cash.lanchscene);
                })
            })
        } else {
            cc.log("请配置提现场景")
        }
    },
    // 获取红包雨活动信息
    getHBYConfig() {
        if (hqq.isDebug) {
            return
        }
        if (hqq.HBYinfo) {
            if(hqq.JFCJinfo){
                if (hqq.JFCJinfo.is_close == 1) { // 活动关闭
                } else {
                    this.UISetJFCJ()
                }
            }
            if (hqq.HBYinfo.is_close == 1) { // 活动关闭
            } else {
                this.UISetHBY()
                if (!hqq.HBYTick.isGet) {
                    this.getHBYFlag()
                } else {
                    this.dealHBYConfig()
                }
            }
        } else {
            let callback = (data, url) => {
                // cc.log("获取红包雨活动信息", data)
                // this.UISetHBY()
                // this.UISetJFCJ()
                for (let k in data.data) {
                    if (data.data[k].name == "四季发财红包雨2" || data.data[k].name == "四季发财红包雨8" || data.data[k].name == "四季发财红包雨9" || data.data[k].name == "四季发财红包雨11") {
                        let info = JSON.parse(data.data[k].info)
                        // cc.log(info)
                        hqq.HBYinfo = info
                        hqq.HBYinfo.is_close = data.data[k].is_close
                        hqq.HBYinfo.activity_id = data.data[k].id
                        if (hqq.HBYinfo.is_close == 1) { // 活动关闭
                        } else {
                            this.UISetHBY()
                            if (!hqq.HBYTick.isGet) {
                                this.getHBYFlag()
                            } else {
                                this.dealHBYConfig()
                            }
                        }
                    } else if (data.data[k].name == "幸运轮盘2" || data.data[k].name == "幸运轮盘8" || data.data[k].name == "幸运轮盘9" || data.data[k].name == "幸运轮盘11") {
                        let info = JSON.parse(data.data[k].info)
                        hqq.JFCJinfo = info
                        hqq.JFCJinfo.is_close = data.data[k].is_close
                        hqq.JFCJinfo.activity_id = data.data[k].id
                        if (hqq.JFCJinfo.is_close == 1) { // 活动关闭
                            cc.log("精彩活动关闭")
                        } else {
                            this.UISetJFCJ()
                        }
                    }
                }
            }
            let failcallback = (status, forcejump, url, err, readyState) => {
                cc.log("获取红包雨活动信息", status, forcejump, url, err, readyState)
            }
            hqq.http.sendXMLHttpRequest({
                method: 'GET',
                urlto: hqq.gameGlobal.pay.pay_host + "/api/activity_config/activityConfig?package_id=" + hqq.app.remoteSeverinfo.id + "&token=e40f01afbb1b9ae3dd6747ced5bca532",
                callback: callback,
                needJsonParse: true,
                failcallback: failcallback,
            })
        }
    },
    // 红包雨是否领取
    getHBYFlag() {
        let callback = (data, url) => {
            if (data.data.received_packet == 1) { // 已领取
                hqq.HBYTick.isGet = true
            } else {
                hqq.HBYTick.isGet = false
            }
            this.dealHBYConfig()
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            cc.log("获取红包雨活动信息", status, forcejump, url, err, readyState)
        }
        hqq.http.sendXMLHttpRequest({
            method: 'GET',
            urlto: hqq.gameGlobal.pay.pay_host + "/api/activity/getUserPacketFlag?token=e40f01afbb1b9ae3dd6747ced5bca532&user_id=" + hqq.gameGlobal.player.id,
            callback: callback,
            needJsonParse: true,
            failcallback: failcallback,
        })
    },
    // 分析处理红包雨配置，并修改倒计时
    dealHBYConfig() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        hqq.HBYTick.startDate = hqq.HBYinfo.start_date.split("-")
        for (let i = 0; i < hqq.HBYTick.startDate.length; i++) {
            hqq.HBYTick.startDate[i] = parseInt(hqq.HBYTick.startDate[i])
        }
        hqq.HBYTick.endDate = hqq.HBYinfo.end_date.split("-")
        for (let i = 0; i < hqq.HBYTick.endDate.length; i++) {
            hqq.HBYTick.endDate[i] = parseInt(hqq.HBYTick.endDate[i])
        }
        if (year < hqq.HBYTick.startDate[0] &&
            month < hqq.HBYTick.startDate[1] &&
            day < hqq.HBYTick.startDate[2]) {
            this.HBYTimeLabel.string = hqq.getTip("str3")
            return
        }
        if (year > hqq.HBYTick.endDate[0] &&
            month > hqq.HBYTick.endDate[1] &&
            day > hqq.HBYTick.endDate[2]) {
            this.HBYTimeLabel.string = hqq.getTip("str4")
            return
        }
        hqq.HBYTick.mintute = 59 - minute
        hqq.HBYTick.second = 59 - second
        if (!cc.director.getScheduler().isScheduled(this.timeTickHBY, this)) {
            this.schedule(this.timeTickHBY, 1)
        }
        for (let i = 0; i < hqq.HBYinfo.packetList.length; i++) {
            if (hour < hqq.HBYinfo.packetList[i].start) { // 倒计时
                hqq.HBYTick.isInOpen = false
                hqq.HBYinfo.curPacket = hqq.HBYinfo.packetList[i]
                hqq.HBYinfo.nextPacketIndex = (i + 1) == hqq.HBYinfo.packetList.length ? 0 : (i + 1)
                hqq.HBYTick.hour = hqq.HBYinfo.packetList[i].start - hour - 1
                return
            } else if (hour == hqq.HBYinfo.packetList[i].start && minute < hqq.HBYinfo.packetList[i].mintute) { // 开抢中
                hqq.HBYTick.isInOpen = true
                hqq.HBYinfo.curPacket = hqq.HBYinfo.packetList[i]
                hqq.HBYinfo.nextPacketIndex = (i + 1) == hqq.HBYinfo.packetList.length ? 0 : (i + 1)
                return
            }
        }
        if (year > hqq.HBYTick.endDate[0] &&
            month > hqq.HBYTick.endDate[1] &&
            (day + 1) > hqq.HBYTick.endDate[2]) {
            this.HBYTimeLabel.string = hqq.getTip("str4")
            return
        }
        hqq.HBYTick.hour = hqq.HBYinfo.packetList[0].start + 23 - hour
        hqq.HBYTick.isInOpen = false
        hqq.HBYinfo.curPacket = hqq.HBYinfo.packetList[0]
    },
    // 红包雨倒计时及判断
    timeTickHBY() {
        if (!cc.isValid(this.HBYTimeLabel)) {
            return
        }
        if (hqq.HBYTick.isInOpen) {
            this.HBYTimeLabel.string = hqq.getTip("str5")
            let minute = new Date().getMinutes();
            if (minute >= hqq.HBYinfo.curPacket.mintute) { // 此次红包雨结束，开始下一轮
                hqq.HBYTick.isInOpen = false
                hqq.HBYTick.isGet = false
                this.dealHBYConfig()
            }
            if (!hqq.HBYTick.isGet && hqq.HBYTick.isInOpen) {
                this.showHBYAni()
            }
            return
        }
        if (hqq.HBYTick.second == 0) {
            if (hqq.HBYTick.mintute == 0) {
                if (hqq.HBYTick.hour == 0) { // 时机已到，开奖中
                    hqq.HBYTick.isInOpen = true
                    this.HBYTimeLabel.string = hqq.getTip("str5")
                    let minute = new Date().getMinutes();
                    if (minute >= hqq.HBYinfo.curPacket.mintute) { // 此次红包雨结束，开始下一轮
                        hqq.HBYTick.isInOpen = false
                        hqq.HBYTick.isGet = false
                        this.dealHBYConfig()
                    }
                    if (!hqq.HBYTick.isGet && hqq.HBYTick.isInOpen) {
                        this.showHBYAni()
                    }
                    return
                } else {
                    hqq.HBYTick.hour -= 1
                    hqq.HBYTick.mintute = 59
                    hqq.HBYTick.second = 59
                }
            } else {
                hqq.HBYTick.mintute -= 1
                hqq.HBYTick.second = 59
            }
        } else {
            hqq.HBYTick.second -= 1
        }
        let tempstr = "" + hqq.HBYTick.hour
        if (hqq.HBYTick.hour < 10) {
            tempstr = "0" + hqq.HBYTick.hour
        }
        if (hqq.HBYTick.mintute < 10) {
            tempstr += ":0" + hqq.HBYTick.mintute
        } else {
            tempstr += ":" + hqq.HBYTick.mintute
        }
        if (hqq.HBYTick.second < 10) {
            tempstr += ":0" + hqq.HBYTick.second
        } else {
            tempstr += ":" + hqq.HBYTick.second
        }
        this.HBYTimeLabel.string = tempstr
    },
    // 红包雨
    onClickHBY(event, customEventData) {
        cc.log("onClickHBY")
        if (hqq.HBYTick.isGet) {
            hqq.eventMgr.dispatch(hqq.eventMgr.showHBYLayer, {
                start_date: hqq.HBYinfo.start_date,
                end_date: hqq.HBYinfo.end_date,
                start: hqq.HBYinfo.packetList[hqq.HBYinfo.nextPacketIndex].start,
                total: hqq.HBYinfo.packetList[hqq.HBYinfo.nextPacketIndex].total,
            })
        } else if (hqq.HBYTick.isInOpen) {
            this.showHBYAni()
        } else if (hqq.HBYinfo) {
            hqq.eventMgr.dispatch(hqq.eventMgr.showHBYLayer, {
                start_date: hqq.HBYinfo.start_date,
                end_date: hqq.HBYinfo.end_date,
                start: hqq.HBYinfo.curPacket.start,
                total: hqq.HBYinfo.curPacket.total,
            })
        } else {
            cc.log("未获取到红包雨活动信息")
        }
    },
    // 显示红包雨特效
    showHBYAni() {
        if (this.anilayer.active) {
            return
        }
        this.anilayer.active = true
        let ani2node = this.anilayer.getChildByName('clickopen')
        let z1 = ani2node.getChildByName('z1')
        let btn_close = ani2node.getChildByName('btn_close')
        let ani2 = this.anilayer.getChildByName('clickopen')
        if (hqq.app.pinpai == "xinsheng" || hqq.app.pinpai == "xinlong" ) {
            hqq.setSkeleton(this.anilayer.getChildByName('rain'), { Res:hqq["hall_"+hqq.app.pinpai],path: "language/" + hqq.language + "/xinshenghby", aniname: "hb_rain", loop: true })
            hqq.setSkeleton(ani2, { Res:hqq["hall_"+hqq.app.pinpai],path: "language/" + hqq.language + "/xinshenghby", aniname: "hb_click", loop: true })
        } else {
            hqq.setSkeleton(this.anilayer.getChildByName('rain'), { path: "base/ani_hongbaoyu", aniname: "hb_rain", loop: true })
            hqq.setSkeleton(ani2, { path: "base/ani_hongbaoyu", aniname: "hb_click", loop: true })
        }
        let numlabel = ani2node.getChildByName('numlabel').getComponent(cc.Label)
        numlabel.string = ""
        let clicknode = this.anilayer.getChildByName('clicknode')
        let hasclick = false
        let callback = (gold) => {
            if (hqq.app.pinpai == "xinsheng" || hqq.app.pinpai == "xinlong") {
                hqq.setSprite(z1, { Res:hqq["hall_"+hqq.app.pinpai],path: "language/" + hqq.language + "/xinshenghby/z1" })
                hqq.setBtn(btn_close, { Res:hqq["hall_"+hqq.app.pinpai],path: "language/" + hqq.language + "/xinshenghby/btn_close" })
            } else {
                hqq.setSprite(z1, { path: "base/language/" + hqq.language + "/img/z1" })
                hqq.setBtn(btn_close, { path: "base/test/img/btn_close" })
            }
            btn_close.on(cc.Node.EventType.TOUCH_END, (event) => {
                this.anilayer.active = false
            })
            numlabel.string = gold
            ani2node.setScale(0.2)
            let act1 = cc.scaleTo(0.2, 1, 1.1)
            let act2 = cc.scaleTo(0.2, 1, 1)
            ani2node.runAction(cc.sequence(act1, act2))
            ani2.getComponent(sp.Skeleton).setAnimation(0, 'hb_open', true)
        }
        clicknode.on(cc.Node.EventType.TOUCH_END, (event) => {
            if (hasclick) {
                cc.log("已经点击过  四季发财红包雨")
                return
            }
            hasclick = true
            setTimeout(() => {
                hasclick = false
            }, 3000);
            this.requestHBY(callback)
        })
    },
    // 拆红包
    requestHBY(mcallback) {
        let callback = (data, url) => {
            cc.log("拆红包", data, url)
            hqq.HBYTick.isGet = true
            if (data.status == -1) {
                cc.log("拆红包失败", data.msg)
                this.anilayer.active = false
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, data.msg)
            } else {
                mcallback(data.data.packet)
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            cc.log("failcallback 拆红包失败", status, forcejump, url, err, readyState)
        }
        hqq.http.sendXMLHttpRequest({
            method: 'POST',
            urlto: hqq.gameGlobal.pay.pay_host + "/api/activity/getPacket",
            param: "token=e40f01afbb1b9ae3dd6747ced5bca532&user_id=" + hqq.gameGlobal.player.id + "&activity_id=" + hqq.HBYinfo.activity_id + "&package_id=" + hqq.app.remoteSeverinfo.id,
            callback: callback,
            needJsonParse: true,
            failcallback: failcallback,
        })
    },
    // 积分抽奖
    onClickJFCJ(event, customEventData) {
        cc.log("onClickJFCJ")
        this.clickDelay(event)
        hqq.eventMgr.dispatch(hqq.eventMgr.showPayActivityWeb, true);
    },
    // 精彩活动
    onClickJCHD(event, customEventData) {
        cc.log("onClickJCHD")
        this.clickDelay(event)
        
        this.jchdRedPoint && (this.jchdRedPoint.active = false, hqq.hallactivitybtn = true);
        hqq.eventMgr.dispatch(hqq.eventMgr.showPayActivityWeb, true);
    },
    // 全名代理
    onClickQMDL(event, customEventData) {
        cc.log("onClickQMDL")
        this.clickDelay(event)
        if (hqq.app.pinpai == "yuyu" ) {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("str8"))
            return
        }
        if (hqq.subModel.proxy.lanchscene != "") {
            hqq.eventMgr.dispatch(hqq.eventMgr.showJumpScene,"proxy");
        } else {
            cc.log("请配置全民代理场景")
        }
    },
    // 公告
    onClickGG(event, customEventData) {
        cc.log("onClickGG")
        // this._creatSubAccount()
        // return
        this.clickDelay(event)
        hqq.eventMgr.dispatch(hqq.eventMgr.showNotice, 1)
    },
    // 按钮点击延时
    clickDelay(event) {
        event.target.getComponent(cc.Button).interactable = false
        this.scheduleOnce(function () {
            if(cc.isValid(event.target)){
                event.target.getComponent(cc.Button).interactable = true
            }
        }, 0.5)
    },
    // 设置子游戏按钮状态
    setSubGameBtnState(enname, state) {
        if (!this.subGameBtnMap[enname]) {
            return
        }
        if (this.subGameBtnMap[enname].subGameState == state) {
            return
        }
        this.subGameBtnMap[enname].subGameState = state
        if (state == this.subGameBtnState.needDown) { // 需要下载状态
            this.subGameList[enname].isDown = false
            if(hqq.app.pinpai=="juding"){
                this.subGameBtnMap[enname].downflag2.active = true;
            } else if(hqq.app.pinpai == "ninetwo" ){
                this.subGameBtnMap[enname].downflag.active = true;
                this.subGameBtnMap[enname].downflag.getComponent(cc.Sprite).spriteFrame = null;
            } else{
                this.subGameBtnMap[enname].downflag.active = true;
            }
            this.subGameBtnMap[enname].jiantou.active = true;
            this.subGameBtnMap[enname].progresslabel.string = "";
            this.subGameBtnMap[enname].progress.active = true;
            this.subGameBtnMap[enname].progress.getComponent(cc.ProgressBar).progress = 0;
            if (this.subGameBtnMap[enname].getComponent(cc.Button).clickEvents.length > 0) {
                this.subGameBtnMap[enname].getComponent(cc.Button).clickEvents[0].handler = "downloadSubGame"
            } else {
                let clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = this.node;
                clickEventHandler.component = "hallScene_chaofan";
                clickEventHandler.customEventData = enname;
                clickEventHandler.handler = "downloadSubGame";
                this.subGameBtnMap[enname].getComponent(cc.Button).clickEvents.push(clickEventHandler);
            }
        } else if (state == this.subGameBtnState.isWait) { // 下载检测准备状态
            this.subGameList[enname].isDown = false
            if(hqq.app.pinpai=="juding"){
                this.subGameBtnMap[enname].downflag2.active = true;
            } else if(hqq.app.pinpai == "ninetwo" ){
                this.subGameBtnMap[enname].downflag.active = true;
                this.subGameBtnMap[enname].downflag.getComponent(cc.Sprite).spriteFrame = null;
            } else{
                this.subGameBtnMap[enname].downflag.active = true;
            }
            this.subGameBtnMap[enname].jiantou.active = false;
            this.subGameBtnMap[enname].progresslabel.string = hqq.getTip("str2");
            this.subGameBtnMap[enname].progress.active = true;
            this.subGameBtnMap[enname].progress.getComponent(cc.ProgressBar).progress = 0;
            if (this.subGameBtnMap[enname].getComponent(cc.Button).clickEvents.length > 0) {
                this.subGameBtnMap[enname].getComponent(cc.Button).clickEvents[0].handler = "downloadSubGame"
            } else {
                let clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = this.node;
                clickEventHandler.component = "hallScene_chaofan";
                clickEventHandler.customEventData = enname;
                clickEventHandler.handler = "downloadSubGame";
                this.subGameBtnMap[enname].getComponent(cc.Button).clickEvents.push(clickEventHandler);
            }
        } else if (state == this.subGameBtnState.progress) { // 下载进度状态
            if(hqq.app.pinpai=="juding"){
                this.subGameBtnMap[enname].downflag2.active = true;
            } else if(hqq.app.pinpai == "ninetwo" ){
                this.subGameBtnMap[enname].downflag.active = true;
                this.subGameBtnMap[enname].downflag.getComponent(cc.Sprite).spriteFrame = null;
            } else{
                this.subGameBtnMap[enname].downflag.active = true;
            }
            this.subGameBtnMap[enname].jiantou.active = false;
            this.subGameBtnMap[enname].progress.active = true;
            if (this.subGameBtnMap[enname].getComponent(cc.Button).clickEvents.length > 0) {
                this.subGameBtnMap[enname].getComponent(cc.Button).clickEvents[0].handler = "downloadSubGame"
            } else {
                let clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = this.node;
                clickEventHandler.component = "hallScene_chaofan";
                clickEventHandler.customEventData = enname;
                clickEventHandler.handler = "downloadSubGame";
                this.subGameBtnMap[enname].getComponent(cc.Button).clickEvents.push(clickEventHandler);
            }
        } else if (state == this.subGameBtnState.canClick) { // 可点击状态
            this.subGameList[enname].isDown = true
            this.subGameBtnMap[enname].downflag.active = false;
            this.subGameBtnMap[enname].downflag2.active = false;
            this.subGameBtnMap[enname].jiantou.active = false;
            this.subGameBtnMap[enname].progresslabel.string = "";
            this.subGameBtnMap[enname].progress.active = false;
            this.subGameBtnMap[enname].progress.getComponent(cc.ProgressBar).progress = 0;
            if (this.subGameBtnMap[enname].getComponent(cc.Button).clickEvents.length > 0) {
                this.subGameBtnMap[enname].getComponent(cc.Button).clickEvents[0].handler = "onClickSubgame"
            } else {
                let clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = this.node;
                clickEventHandler.component = "hallScene_chaofan";
                clickEventHandler.customEventData = enname;
                clickEventHandler.handler = "onClickSubgame";
                this.subGameBtnMap[enname].getComponent(cc.Button).clickEvents.push(clickEventHandler);
            }
        } else if (state == this.subGameBtnState.noOpen) { // 不开放状态
            this.subGameBtnMap[enname].getChildByName("wait").active = true;
            this.subGameBtnMap[enname].getChildByName("hot").active = false;
            this.subGameBtnMap[enname].getChildByName("experience").active = false;
            if(enname=="pg2"&&hqq.app.pinpai != "fuxin"&&hqq.app.pinpai != "xingui"&&
               hqq.app.pinpai != "xinsheng"&&hqq.app.pinpai != "xingui"&&
               hqq.app.pinpai != "xinlong"&&hqq.app.pinpai != "juding"&&
               hqq.app.pinpai != "huaxing"){
                let pg1 = this.subGameBtnMap[enname].getChildByName("pg1");
                let pg2 = this.subGameBtnMap[enname].getChildByName("pg2")
                if(cc.isValid(pg1)){
                    pg1.active = false;
                }
                if(cc.isValid(pg2)){
                    pg2.active = false;
                }
            }
            this.subGameList[enname].isDown = false
            if(hqq.app.pinpai=="juding"){
                this.subGameBtnMap[enname].downflag2.active = true;
            } else if(hqq.app.pinpai == "ninetwo" ){
                this.subGameBtnMap[enname].downflag.active = true;
                this.subGameBtnMap[enname].downflag.getComponent(cc.Sprite).spriteFrame = null;
            } else{
                this.subGameBtnMap[enname].downflag.active = true;
            }
        }
    },
    /** 下载子游戏 */
    downloadSubGame(event, enname) {
        this.clickDelay(event)
        let mycallback = () => {
            let mainversion = hqq.localStorage.globalGet(hqq.app.versionKey)
            mainversion = mainversion ? mainversion : ''
            /* if (mainversion != hqq.app.subGameVersion.hall) {
                hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, {
                    type: 10,
                    msg: hqq.getTip("showtip69") + "\nlocalv:" + mainversion + "remotev:" + hqq.app.subGameVersion.hall,
                    ensurefunc: () => {
                        hqq.hallWebSocket.close();
                        cc.audioEngine.stopAll();
                        cc.game.restart();
                    }
                })
            } else */ {
                let subgamern = enname
                if (enname == "zrsx1" || enname == "zrsx2") {
                    subgamern = "zrsx"
                } else if (enname == "sbty1" || enname == "sbty2") {
                    subgamern = "sbty"
                } else if (enname == "wlby" || enname == "csby") {
                    subgamern = "jdb"
                } else if(hqq.game2to1[enname]){
                    subgamern = hqq.game2to1[enname];
                }
                let localsubv = hqq.localStorage.get(subgamern, "versionKey") || null;
                if(hqq.pinpaiSubGameList[hqq.app.pinpai])
                {
                    if( hqq.pinpaiSubGameList[hqq.app.pinpai][subgamern])
                    {
                        subgamern = subgamern + "_" + hqq.app.pinpai;
                    }
                }
                let upstate = hqq.hotUpdateMgr.checkUpdate({
                    subname: subgamern,
                    version: localsubv || "1.0.0",
                })
                if (upstate) {
                    this.setSubGameBtnUpWait(subgamern)
                    if(subgamern == "pg"){
                        let localsubv2 = hqq.localStorage.get("pg2", "versionKey") || null;
                        let upstate2 = hqq.hotUpdateMgr.checkUpdate({
                            subname: "pg2",
                            version: localsubv2 || "1.0.0",
                        })
                        this.setSubGameBtnUpWait("pg2")
                    } else if(subgamern == "pg2"){
                        let localsubv2 = hqq.localStorage.get("pg", "versionKey") || null;
                        let upstate2 = hqq.hotUpdateMgr.checkUpdate({
                            subname: "pg",
                            version: localsubv2 || "1.0.0",
                        })
                        this.setSubGameBtnUpWait("pg")
                    }
                } else {
                    this.setSubGameBtnState(subgamern, this.subGameBtnState.needDown)
                }
            }
        }
        hqq.loginMgr.requestVersionJson(mycallback)
    },
    // 设置子游戏按钮位置(2列)
    setSubBtnPos(itembtn, index) {
        if(!cc.isValid(itembtn))return;
        itembtn.active = true
        itembtn.x = Math.floor(index / 2) * (this.itembtn.width + 15) + this.itembtn.width / 2 + 15;
        itembtn.y = -index % 2 * (this.itembtn.height + 20 ) + this.itembtn.height / 2;
    },
    // 设置子游戏按钮位置(一列)
    setSubBtnPosOne(itembtn, index) {
        if(!cc.isValid(itembtn))return;
        itembtn.active = true
        if (hqq.app.pinpai == "ninetwo"){
            itembtn.x = this.itembtn.width / 2 + index * (this.itembtn.width+10);
            itembtn.y = 0;
            itembtn.getChildByName("wait").setPosition(-40,150)
            itembtn.getChildByName("wait").opacity = 255;
        }
    },
    // 获取子游戏登陆历史
    getSubGameLoginHistory(enname) {
        let nowd = new Date().getTime()
        let deletenum = 0
        let loginHistory = hqq.localStorage.get(enname, "loginHistory")
        if (loginHistory) {
            for (let i = 0; i < loginHistory.length; i++) {
                let jumptime = nowd - loginHistory[i]
                let days = Math.floor(jumptime / (24 * 3600 * 1000))
                if (days > 7) {
                    deletenum++
                }
            }
            if (deletenum > 0) {
                loginHistory.splice(0, deletenum)
            }
            return loginHistory
        }
        return []
    },
    // 刷新子游戏按钮
    refreshSubGameBtn(customEventData) {
        this.suggameScrollView.scrollToLeft(0.5)
        let btnnum = 0
        this.selectType = customEventData;
        if (customEventData == 'remen') {
            let i = 0;
            let j = 0;
            for (i = 0; i < this.subGameBtnArr.length; i++) {
                if(cc.isValid(this.subGameBtnArr[i])){
                    let isremen = false;
                    for(j = 0; j < this.remenlist.length;j++){
                        if( this.subGameBtnArr[i].tempdata.enname === this.remenlist[j]){
                            isremen = true;
                            break;
                        }
                    }
                    if( isremen ){
                        this.setSubBtnPos(this.subGameBtnArr[i], j)
                        btnnum++
                    } else{
                        this.subGameBtnArr[i].active = false
                    }
                }
            }
        } else {
            let type = 0
            for (let i = 0; i < this.menuBtnInfoList.length; i++) {
                if (customEventData.match(this.menuBtnInfoList[i])) {
                    type = i - 1;
                    break
                }
            }
            let index = 0
            for (let i = 0; i < this.subGameBtnArr.length; i++) {
                if(cc.isValid(this.subGameBtnArr[i])){
                    let key = this.subGameBtnArr[i].tempdata.enname
                    if (this.subGameList[key].gameType == type) {
                        this.setSubBtnPos(this.subGameBtnMap[key], index)
                        btnnum++
                        index++
                    } else {
                        let itembtn = this.subGameBtnMap[key]
                        itembtn && (itembtn.active = false)
                    }
                }
            }
        }
        // let width = (Math.ceil(Object.getOwnPropertyNames(this.subGameList).length / 2) * (this.itembtn.width + 15)) + 15;
        cc.log("refreshSubGameBtn customEventData=",customEventData," btnnum=",btnnum)
        let width = (Math.ceil(btnnum / 2) * (this.itembtn.width + 15)) + 15;
        
        this.suggameScrollView.content.width = width;
        this.suggameScrollView.content.x = -this.suggameScrollView.node.width / 2
    },
    
    preloadSceneOnProgress(completedCount, totalCount, item) {
    },
    // 收到聊天消息
    onReceiveBroadcast(mtype) {
        if (mtype == 1000) {
            this.kefupoint.active = true;
        }
    },
    /**
     * @Description: 水果机奖金池连接
     */
    sgjConnect() {
        if (!this.subGameList["sgj"]) {
            return
        }
        /* if (cc.sys.os != "Windows")  */{ // 不是模拟器
            this.getSgjPool()
            if (!cc.director.getScheduler().isScheduled(this.getSgjPool, this)) {
                this.schedule(this.getSgjPool, 3)
            }
        }
    },
    getSgjPool() {
        let failcallback = () => {
            this.unschedule(this.getSgjPool, this)
        }
        let url = this.subGameList["sgj"].serverUrl.replace("ws", "http") + "/api/jackpot"
        this.sgjxhr = hqq.http.sendXMLHttpRequest({
            method: 'GET',
            urlto: url,
            callback: this.showsgjPoolNum.bind(this),
            needJsonParse: true,
            failcallback: failcallback,
        })
    },
    showsgjPoolNum(data) {
        if (!cc.isValid(this.subGameBtnMap["sgj"])) {
            return
        }
        let gold = 0
        if (data < 0.01) {
            gold = 0;
        } else {
            gold = hqq.commonTools.formatGold(data);
        }
        if (this && this.subGameBtnMap && this.subGameBtnMap["sgj"] && hqq.app.pinpai != "xinsheng") {
            if (this.subGameBtnMap["sgj"].getChildByName("goldlabel")) {
                this.subGameBtnMap["sgj"].getChildByName("goldlabel").getComponent(cc.Label).string = gold
            } else {
                let node = new cc.Node();
                let label = node.addComponent(cc.Label);
                label.font = this.hbslFont
                label.fontSize = 28
                label.string = gold
                node.name = "goldlabel"
                if (/* hqq.app.pinpai == "xinsheng" || */ hqq.app.pinpai == "xingui" || hqq.app.pinpai == "xinlong") {
                    node.setPosition(0, 0)
                    let node0 = new cc.Node();
                    node0.setPosition(0, 3)
                    hqq.setSprite(node0, { path: "base/xinsheng/img/poolback" })
                    this.subGameBtnMap["sgj"].addChild(node0,this.subGameBtnMap["sgj"].getChildByName("ani").zIndex)
                } else if( hqq.app.pinpai == "huaxing"){
                    hqq.addNode(this.subGameBtnMap["sgj"].getChildByName("ani"),{Res:hqq["hall_"+hqq.app.pinpai],path: "huaxing/img/jjck",x:0,y:70,zIndex:-1});
                    node.setPosition(0, 68)
                } else if( hqq.app.pinpai == "ninetwo"){
                    label.fontSize = 22
                    let tempbool = this.subGameBtnMap["sgj"].active;
                    if( !tempbool ){
                        this.subGameBtnMap["sgj"].active = true;
                    }
                    hqq.addNode(this.subGameBtnMap["sgj"].getChildByName("ani"),{Res:hqq["hall_"+hqq.app.pinpai],path: "ninetwo/img/jjck",x:3,y:70,zIndex:-1,width:170,type: cc.Sprite.Type.SLICED});
                    if( !tempbool ){
                        this.subGameBtnMap["sgj"].active = false;
                    }
                    node.setPosition(0, 63)
                } else {
                    node.setPosition(0, 68)
                }
                this.subGameBtnMap["sgj"].addChild(node)
            }
        }
    },
    /**
     * @Description: 红包扫雷奖金池连接
     */
    hbslConnect() {
        if (!this.subGameList["hbsl"]) {
            return
        }
        /* if (cc.sys.os != "Windows") */ { // 不是模拟器
            this.getHbslPool()
            if (!cc.director.getScheduler().isScheduled(this.getHbslPool, this)) {
                this.schedule(this.getHbslPool, 3)
            }
        }
    },
    getHbslPool() {
        let failcallback = () => {
            this.unschedule(this.getHbslPool, this)
        }
        let url = this.subGameList["hbsl"].serverUrl.replace("ws", "http") + "/api/jackpot"
        this.hbslxhr = hqq.http.sendXMLHttpRequest({
            method: 'GET',
            urlto: url,
            callback: this.showhbslPoolNum.bind(this),
            needJsonParse: true,
            failcallback: failcallback,
        })
    },
    showhbslPoolNum(data) {
        if (!cc.isValid(this.subGameBtnMap["hbsl"])) {
            return
        }
        let gold = 0
        if (data < 0.01) {
            gold = 0;
        } else {
            gold = hqq.commonTools.formatGold(data);
        }
        if (this && this.subGameBtnMap && this.subGameBtnMap["hbsl"] && hqq.app.pinpai != "xinsheng" ) {
            if (this.subGameBtnMap["hbsl"].getChildByName("goldlabel")) {
                this.subGameBtnMap["hbsl"].getChildByName("goldlabel").getComponent(cc.Label).string = gold
            } else {
                let node = new cc.Node();
                let label = node.addComponent(cc.Label);
                label.font = this.hbslFont
                label.fontSize = 28
                label.string = gold
                node.name = "goldlabel"
                if (/* hqq.app.pinpai == "xinsheng" || */ hqq.app.pinpai == "xingui" || hqq.app.pinpai == "xinlong") {
                    node.setPosition(0, 0)
                    let node0 = new cc.Node();
                    node0.setPosition(0, 3)
                    hqq.setSprite(node0, { path: "base/xinsheng/img/poolback" })
                    this.subGameBtnMap["hbsl"].addChild(node0,this.subGameBtnMap["hbsl"].getChildByName("ani").zIndex)
                }  else if( hqq.app.pinpai == "huaxing"){
                    hqq.addNode(this.subGameBtnMap["hbsl"].getChildByName("ani"),{Res:hqq["hall_"+hqq.app.pinpai],path: "huaxing/img/jjck",x:0,y:70,zIndex:-1});
                    node.setPosition(0, 68)
                } else if( hqq.app.pinpai == "ninetwo"){
                    label.fontSize = 22
                    let tempbool = this.subGameBtnMap["hbsl"].active;
                    if( !tempbool ){
                        this.subGameBtnMap["hbsl"].active = true;
                    }
                    hqq.addNode(this.subGameBtnMap["hbsl"].getChildByName("ani"),{Res:hqq["hall_"+hqq.app.pinpai],path: "ninetwo/img/jjck",x:3,y:70,zIndex:-1,width:170,type: cc.Sprite.Type.SLICED});
                    if( !tempbool ){
                        this.subGameBtnMap["hbsl"].active = false;
                    }
                    node.setPosition(0, 63)
                } else {
                    node.setPosition(0, 68)
                }
                this.subGameBtnMap["hbsl"].addChild(node)
            }
        }
    },
    /**
     * @Description: hbld奖金池获取
     */
    hbldConnect() {
        if (!this.subGameList["hbld"]) {
            return
        }
        /* if (cc.sys.os != "Windows") */ { // 不是模拟器
            this.getHbldPool()
            if (!cc.director.getScheduler().isScheduled(this.getHbldPool, this)) {
                this.schedule(this.getHbldPool, 3)
            }
        }
    },
    getHbldPool() {
        let failcallback = () => {
            this.unschedule(this.getHbldPool, this)
        }
        let url = this.subGameList["hbld"].serverUrl.replace("ws", "http") + "/api/jackpot"
        this.hbldxhr = hqq.http.sendXMLHttpRequest({
            method: 'GET',
            urlto: url,
            callback: this.showhbldPoolNum.bind(this),
            needJsonParse: true,
            failcallback: failcallback,
        })
    },
    showhbldPoolNum(data) {
        if (!cc.isValid(this.subGameBtnMap["hbld"])) {
            return
        }
        let gold = 0
        if (data < 0.01) {
            gold = 0;
        } else {
            gold = hqq.commonTools.formatGold(data);
        }
        if (this && this.subGameBtnMap && this.subGameBtnMap["hbld"] && hqq.app.pinpai != "xinsheng" ) {
            if (this.subGameBtnMap["hbld"].getChildByName("goldlabel")) {
                this.subGameBtnMap["hbld"].getChildByName("goldlabel").getComponent(cc.Label).string = gold
            } else {
                let node = new cc.Node();
                let label = node.addComponent(cc.Label);
                label.font = this.hbslFont
                label.fontSize = 28
                label.string = gold
                node.name = "goldlabel"
                if (/* hqq.app.pinpai == "xinsheng" || */ hqq.app.pinpai == "xingui" || hqq.app.pinpai == "xinlong") {
                    node.setPosition(0, 0)
                    let node0 = new cc.Node();
                    node0.setPosition(0, 3)
                    hqq.setSprite(node0, { path: "base/xinsheng/img/poolback" })
                    this.subGameBtnMap["hbld"].addChild(node0,this.subGameBtnMap["hbld"].getChildByName("ani").zIndex)
                } else if( hqq.app.pinpai == "huaxing"){
                    hqq.addNode(this.subGameBtnMap["hbld"].getChildByName("ani"),{Res:hqq["hall_"+hqq.app.pinpai],path: "huaxing/img/jjck",x:0,y:70,zIndex:-1});
                    node.setPosition(0, 68)
                } else if( hqq.app.pinpai == "ninetwo"){
                    label.fontSize = 22
                    let tempbool = this.subGameBtnMap["hbld"].active;
                    if( !tempbool ){
                        this.subGameBtnMap["hbld"].active = true;
                    }
                    hqq.addNode(this.subGameBtnMap["hbld"].getChildByName("ani"),{Res:hqq["hall_"+hqq.app.pinpai],path: "ninetwo/img/jjck",x:3,y:70,zIndex:-1,width:170,type: cc.Sprite.Type.SLICED});
                    if( !tempbool ){
                        this.subGameBtnMap["hbld"].active = false;
                    }
                    node.setPosition(0, 63)
                } else {
                    node.setPosition(0, 68)
                }
                this.subGameBtnMap["hbld"].addChild(node)
            }
        }
    },
    /**
     * @Description: 设置公告提示状态
     */
    setNoticeReadState(msg) {
        this.btngonggaopoint.active = !msg.hidenoticetip;
        if(hqq.needShowBubble){
            this.topbubble.active = !msg.hidenoticetip;
        }
    },
    /**
     * @Description: 获取公告
     */
    getNotice() {
        if (hqq.gameGlobal.noticeList.length > 0) {
            let isallread = true
            for (let i = 0; i < hqq.gameGlobal.noticeList.length; i++) {
                if (hqq.gameGlobal.noticeList[i].isread == 0) {
                    isallread = false
                    break
                }
            }
            if (!isallread) {
                this.btngonggaopoint.active = true
                if(hqq.needShowBubble){
                    this.topbubble.active = true;
                }
                hqq.eventMgr.register(hqq.eventMgr.refreshHallTips, "hallScene_chaofan", this.setNoticeReadState.bind(this))
            }
            return
        }
        let callback = (data, url) => {
            // cc.log("公告 callback", data)
            if (data.code == 200) {
                if (!data.msg || data.msg.length == 0) {
                    // cc.log("没有公告需要显示")
                } else {
                    let deleteNotice = hqq.localStorage.getGlobal().noticeDeleteKey
                    data.msg.sort((a, b) => a.sort - b.sort).forEach((e, i) => {
                        if (e.type === 2) { // type == 2 是公告 == 1 是活动  is_slider
                            let isdelete = false
                            if (deleteNotice) {
                                for (let j = 0; j < deleteNotice.length; j++) {
                                    if (deleteNotice[j] == e.create_time) {
                                        isdelete = true
                                        break
                                    }
                                }
                            }
                            if (!isdelete) {
                                let notice = {
                                    key: hqq.gameGlobal.noticeList.length,
                                    isread: 0,
                                    type: e.type,
                                    title: e.title,
                                    words: e.words,
                                    create_time: e.create_time,
                                    end_time: e.end_time,
                                    start_time: e.start_time,
                                };
                                hqq.gameGlobal.noticeList.push(notice)
                            }
                        }
                        if (e.is_slider === 1) { // 是否跑马灯
                            let needinsert = true
                            for (let i = 0; i < hqq.gameGlobal.slideNoticeList.length; i++) {
                                if (hqq.gameGlobal.slideNoticeList[i].notice == e.words.replace(/\s+/g, "")) {
                                    needinsert = false
                                    break
                                }
                            }
                            if (needinsert) {
                                hqq.gameGlobal.slideNoticeList.push({
                                    time: 1,
                                    rollforver: true,
                                    notice: e.words.replace(/\s+/g, "")
                                })
                            }
                        }
                    })
                    if (hqq.gameGlobal.noticeList.length > 0) {
                        this.btngonggaopoint.active = true;
                        if(hqq.needShowBubble){
                            this.topbubble.active = true;
                        }
                        hqq.eventMgr.register(hqq.eventMgr.refreshHallTips, "hallScene_chaofan", this.setNoticeReadState.bind(this))
                        // if (hqq.needShowNotice&&hqq.app.pinpai!="xinhao"&&hqq.app.pinpai!="juding"&&hqq.app.pinpai!="nineone"&&hqq.app.pinpai!="huaxing"&&hqq.app.pinpai!="xinsheng") {
                        //     hqq.needShowNotice = false
                        //     // if (CC_DEBUG) {
                        //     //     return
                        //     // }
                        //     hqq.eventMgr.dispatch(hqq.eventMgr.showNotice, 1)
                        // }
                    }
                    if (hqq.gameGlobal.slideNoticeList.length > 0) {
                        hqq.eventMgr.dispatch(hqq.eventMgr.addSliderNotice, hqq.gameGlobal.slideNoticeList)
                    }
                }
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            cc.log("getNotice failcallback",status, forcejump, url, err, readyState)
        }
        let endurl = hqq.app.getIpGetEndurl(4);
        hqq.http.sendXMLHttpRequest({
            method: "GET",
            urlto: hqq.app.server,
            endurl: endurl,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: true,
        });
    },
    // update (dt) {},
    onDestroy() {
        hqq.audioMgr.setButtonEffect(false);
        this.unschedule(this.getSgjPool, this)
        this.unschedule(this.getHbslPool, this)
        this.unschedule(this.getHbldPool, this)
        this.unschedule(this.timeTickHBY, this)
        this.sgjxhr && this.sgjxhr.abort()
        this.hbslxhr && this.hbslxhr.abort()
        this.hbldxhr && this.hbldxhr.abort()
        hqq.eventMgr.unregister(hqq.eventMgr.hotCheckup, "hallScene_chaofan")
        hqq.eventMgr.unregister(hqq.eventMgr.hotFail, "hallScene_chaofan")
        hqq.eventMgr.unregister(hqq.eventMgr.hotProgress, "hallScene_chaofan")
        hqq.eventMgr.unregister(hqq.eventMgr.hotFinish, "hallScene_chaofan")
        hqq.eventMgr.unregister(hqq.eventMgr.hotUp, "hallScene_chaofan")
        hqq.eventMgr.unregister(hqq.eventMgr.hotCheck, "hallScene_chaofan")
        hqq.eventMgr.unregister(hqq.eventMgr.hotWait, "hallScene_chaofan")
        hqq.eventMgr.unregister(hqq.eventMgr.refreshPlayerinfo, "hallScene_chaofan")
        hqq.eventMgr.unregister(hqq.eventMgr.refreshHallTips, "hallScene_chaofan")
    },
    /**
     * @description: 批量创建子游戏账号
     */
    _creatSubAccount() {
        let mgameid = [
                        "5b1f3a3cb76a451e211229",
                        // "5b1f3a3cb76a451e210919",
                        // "5b1f3a3cb76a451e210920",
                        // "5b1f3a3cb76a451e210913",
                        // "5b1f3a3cb76a451e210914",
                        // "5b1f3a3cb76a451e210926",
                        // "5b1f3a3cb76a451e210821",
                        // "5b1f3a3cb76a451e210822",
                    ]

        let sub = [
            591231899,
            982862673,
            441347436,
            440070442,
            739895080
        ]
        if (typeof this.tempindex == 'undefined') {
            this.tempindex = 0;
        }
        if (typeof this.tempindex2 == 'undefined') {
            this.tempindex2 = 0;
        }
        if (this.tempindex >= sub.length) {
            this.tempindex = 0;
            this.tempindex2++;
            if(this.tempindex2 >= mgameid.length){
                return;
            }
        }
        let account = sub[this.tempindex];
        let pass = "123456";

        let onReceiveLoginTemp = (token) => {
            let callback = (data) => {
                cc.log("创建子游戏账号 callback", data)
                this._creatSubAccount()
            }
            let failcallback = () => {
                cc.log("创建子游戏账号 超时")
            }
            let endurl = "/Game/User/createGameAccount";
            let data = {
                game_id: mgameid[this.tempindex2],
                package_id: 1,
                balance: hqq.gameGlobal.player.gold,
                id: hqq.gameGlobal.player.id,
                token: token,
            }
            hqq.http.sendXMLHttpRequest({
                method: 'POST',
                urlto: hqq.app.server + endurl,
                param: data,
                callback: callback,
                failcallback: failcallback,
                needJsonParse: true,
            })
        }

        hqq.hallWebSocket.unregister("/Game/Login/login", "hallScene_chaofan")
        hqq.hallWebSocket.close()
        let mcallback = (issucess, token) => {
            if (issucess) {
                cc.log("切换账号成功", sub[this.tempindex])
                this.tempindex++
                onReceiveLoginTemp(token)
            } else {
                cc.log("切换账号失败")
            }
        }
        hqq.loginMgr.accountChange(account, pass, mcallback)
    },
    toogleManyCai()
    {
        if( hqq.app.pinpai == "fuxin" ){
            cc.sys.openURL( "https://www.manycai.club/member_verified?id=4797" );
        } else{
            cc.sys.openURL( "https://www.manycai.com/" )
        }
    },
    /**
     * @Description: 获取邮件
     */
     getEmail() {
        if(hqq.app.pinpai != "juding")return;
        if (hqq.gameGlobal.emailList.length > 0) {
            let isallread = true
            for (let i = 0; i < hqq.gameGlobal.emailList.length; i++) {
                if (hqq.gameGlobal.emailList[i].isread == 0) {
                    isallread = false
                    break
                }
            }
            if (!isallread) {
                this.btngonggaopoint.active = true
                if(hqq.needShowBubble){
                    this.topbubble.active = true;
                }
                hqq.eventMgr.register(hqq.eventMgr.refreshHallTips, "hallScene_chaofan", this.setNoticeReadState.bind(this))
            }
            return
        }
        let callback = (data, url) => {
            console.log("邮件 callback", data)
            if (data.status == 0) {
                if (!data.data || data.data.length == 0) {
                    // console.log("111111111没有邮件需要显示")
                } else {
                    // console.log("222222222有邮件需要显示")
                    hqq.gameGlobal.emailList = [];
                    let i = 0;
                    let j = 0;
                    for( i = 0; i < data.data.length; i++){
                        let email = {
                            key: hqq.gameGlobal.emailList.length,
                            isread: 0,
                            id: data.data[i].id,
                            title: data.data[i].title,
                            words: data.data[i].content,
                            created_at: data.data[i].created_at,
                        };
                        let emailKey = hqq.localStorage.getGlobal().emailKey
                        if (!emailKey) {
                            emailKey = []
                        }
                        for(let k = 0; k < emailKey.length;k++){
                            if( emailKey[k] == email.id ){
                                email.isread = 1;
                                break;
                            }
                        }
                        hqq.gameGlobal.emailList.push(email);
                    }
                    i = null;
                    j = null;
                    if (hqq.gameGlobal.emailList.length > 0) {
                        this.btngonggaopoint.active = true;
                        if(hqq.needShowBubble){
                            this.topbubble.active = true;
                        }
                        hqq.eventMgr.register(hqq.eventMgr.refreshHallTips, "hallScene_chaofan", this.setNoticeReadState.bind(this))
                    }
                }
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
        }
        hqq.http.sendXMLHttpRequest({
            method: "GET",
            urlto: hqq.gameGlobal.pay.pay_host + "/api/backend/getEmailDetail?token=e40f01afbb1b9ae3dd6747ced5bca532&user_id=" + hqq.gameGlobal.player.id + "&center_auth="+hqq.gameGlobal.token,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: true,
        });
    },

    resetSubGameList(){
        delete hqq.subGameList["zhibo"];
        delete hqq.subGameList["szffc"];
        delete hqq.subGameList["ygxb"];
        // delete hqq.subGameList["zhibo"];
        this.subGameList = hqq.subGameList;
        this.subGameList["sbty1"].gameType = 1;
        this.subGameList["sbty2"].gameType = 1;
        this.subGameList["sanshengtiyu"].gameType = 1;

        this.subGameList["cylhd"].gameType = 0;
        this.subGameList["lhd"].gameType = 0;
        this.subGameList["cdx"].gameType = 0;
        this.subGameList["lp"].gameType = 0;
        this.subGameList["shaibao"].gameType = 0;
        this.subGameList["duofuduocai"].gameType = 0;
        this.subGameList["caishendao"].gameType = 0;
        // this.subGameList["ygxb"].gameType = 0;
        this.subGameList["fctbj"].gameType = 0;
        this.subGameList["fkxw"].gameType = 0;
        this.subGameList["sgj"].gameType = 0;
        this.subGameList["jbpby"].gameType = 0;
        this.subGameList["bcbm"].gameType = 0;
        this.subGameList["hwby"].gameType = 0;
        this.subGameList["szwg"].gameType = 0;
        this.subGameList["cbzb"].gameType = 0;
        this.subGameList["brnn"].gameType = 0;
        this.subGameList["bjl"].gameType = 0;
        this.subGameList["ebg"].gameType = 0;
        this.subGameList["hbld"].gameType = 0;
        this.subGameList["hh"].gameType = 0;

        if( this.subGameList["cyqp"])
        {
            this.subGameList["cyqp"].gameType = -1;
        }
    },
    onClickSheZhi(event, customEventData){
        this.clickDelay(event)
        hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, { type: 16 })
    },
    // 大奖池
    onClickDJC(event, customEventData) {
        console.log("onClickDJC")
        this.clickDelay(event)
        
        this.jchdRedPoint && (this.jchdRedPoint.active = false, hqq.hallactivitybtn = true);
        hqq.eventMgr.dispatch(hqq.eventMgr.showPayActivityWeb, [true,"棋牌大奖池"]);
    },
    onClickBindPhone() {
        hqq.eventMgr.dispatch(hqq.eventMgr.showBiglayer, 3)
    },
    onClickNineTwoGameTypeDown(){
        let menuScrollView = cc.find("Canvas/hallback/ninetwo/menu/dating_menu_di/menuScrollView");
        if(cc.isValid(menuScrollView)){
            menuScrollView.getComponent(cc.ScrollView).scrollToBottom(0.1);
        }
    },
    onClickNineTwoScrollViewLeft(){
        let subgameview = cc.find("Canvas/subgameview");
        if(cc.isValid(subgameview)){
            subgameview.getComponent(cc.ScrollView).scrollToLeft(0.1);
        }
    },
    onClickNineTwoScrollViewRight(){
        let subgameview = cc.find("Canvas/subgameview");
        if(cc.isValid(subgameview)){
            subgameview.getComponent(cc.ScrollView).scrollToRight(0.1);
        }
    },
    showBigsublayer(data){
        hqq.viewCtr.showLayer("prefab/bigsublayer","hallPSubbLayer_chaofan",data,1000,false,hqq["hall_chaofan"]);
    },
    showNoticelayer(data){
        hqq.viewCtr.showLayer("prefab/noticelayer","hallNoticeLayer_chaofan",data,1000,false,hqq["hall_chaofan"]);
    },
    showRegisterlayer(data){
        hqq.viewCtr.showLayer("prefab/registerlayer","hallRegisterLayer_chaofan",data,1000,false,hqq["hall_chaofan"]);
    },
});