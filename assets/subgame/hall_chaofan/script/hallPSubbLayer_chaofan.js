

cc.Class({
    extends: cc.Component,

    properties: {
        back: cc.Node,
        exitbtn: cc.Node,
        ensurebtn: cc.Button,
        resetpass: cc.Node,
        bindyinhangka: cc.Node,
        officelogin: cc.Node,

        captchaimg1: cc.Sprite,
        captchaimg2: cc.Sprite,
        BankSelectItem: cc.Prefab,
        selectKaihushengContent: cc.Node,
        selectKaihushiContent: cc.Node,
        selectKaihuhangContent: cc.Node,
    },

    onLoad() {
        this.cities = hqq.getTip("cities")
        this.UILoad()
    },

    start() {
        // cc.log("hqq.gameGlobal.pay.pay_host: ", hqq.gameGlobal.pay.pay_host);
    },
    // UI动态加载
    UILoad() {
        if(!cc.isValid(this.node)){
            console.log("hallPSubbLayer UILoad 节点不存在")
            return;
        }
        this.back = cc.find("bigsublayer/p_bandalibg2")
        let closebtn = cc.find("bigsublayer/p_close")
        let surecg = cc.find("bigsublayer/surecg")

        let getcodebtn = cc.find("bigsublayer/resetpass/getcodebtn")
        this.btnlabel = cc.find("bigsublayer/resetpass/getcodebtn/btnlabel")
        this.btnlabel.getComponent(cc.Label).string = hqq.getTip("getcode")
        let phoneeditboxnode = cc.find("bigsublayer/resetpass/phoneeditbox")
        hqq.editboxTipLoad(phoneeditboxnode, "enterphone")
        let yanzheneditboxnode = cc.find("bigsublayer/resetpass/yanzheneditbox")
        hqq.editboxTipLoad(yanzheneditboxnode, "entercode")
        let capchaeditboxnode = cc.find("bigsublayer/resetpass/capchaeditbox")
        hqq.editboxTipLoad(capchaeditboxnode, "capchaed")
        let passeditboxnode = cc.find("bigsublayer/resetpass/passeditbox")
        hqq.editboxTipLoad(passeditboxnode, "enterlongpass")

        let kahaoeditbox = cc.find("bigsublayer/bindyinhangka/kahaoeditbox")
        hqq.editboxTipLoad(kahaoeditbox, "kahaoeditbox")
        let nameediftox = cc.find("bigsublayer/bindyinhangka/nameediftox")
        hqq.editboxTipLoad(nameediftox, "nameediftox")
        let kaihusheng = cc.find("bigsublayer/bindyinhangka/kaihusheng/kaihushenglabel")
        kaihusheng.getComponent(cc.Label).string = hqq.getTip("kaihusheng")
        let kaihushi = cc.find("bigsublayer/bindyinhangka/kaihushi/kaihushilabel")
        kaihushi.getComponent(cc.Label).string = hqq.getTip("kaihushi")
        let yinhangname = cc.find("bigsublayer/bindyinhangka/yinhangname/yinhanglabel")
        yinhangname.getComponent(cc.Label).string = hqq.getTip("yinhangname")
        let zhihang = cc.find("bigsublayer/bindyinhangka/zhihang")
        hqq.editboxTipLoad(zhihang, "zhihang")

        let getcodebtn2 = cc.find("bigsublayer/officelogin/getcodebtn")
        this.btnlabel2 = cc.find("bigsublayer/officelogin/getcodebtn/btnlabel")
        this.btnlabel2.getComponent(cc.Label).string = hqq.getTip("getcode")
        let phoneeditbox = cc.find("bigsublayer/officelogin/phoneeditbox")
        hqq.editboxTipLoad(phoneeditbox, "enterphone")
        let yanzheneditbox = cc.find("bigsublayer/officelogin/yanzheneditbox")
        hqq.editboxTipLoad(yanzheneditbox, "entercode")
        let capchaeditbox = cc.find("bigsublayer/officelogin/capchaeditbox")
        hqq.editboxTipLoad(capchaeditbox, "capchaed")
        let passeditbox = cc.find("bigsublayer/officelogin/passeditbox")
        hqq.editboxTipLoad(passeditbox, "enterlongpass")
        let tiplabel = cc.find("bigsublayer/officelogin/tiplabel")
        tiplabel.getComponent(cc.Label).string = hqq.getTip("officelogintiplabel")

        this.kaihushengbtn = cc.find("bigsublayer/bindyinhangka/kaihusheng/kaihushengxiala")
        this.kaihushibtn = cc.find("bigsublayer/bindyinhangka/kaihushi/kaihushixiala")
        this.yinhangnamebtn = cc.find("bigsublayer/bindyinhangka/yinhangname/yinghangnamexiala")
        this.title_resetpwd = cc.find("bigsublayer/resetpass/title_resetpwd")
        let bankcard_form = cc.find("bigsublayer/bindyinhangka/bankcard_form")
        this.title_bdbankcard = cc.find("bigsublayer/bindyinhangka/title_bdbankcard")
        let title_signup = cc.find("bigsublayer/officelogin/title_signup")
        let bpath = "base/img/"
        let hppath = "chaofan/personal/"
        let blpath = "base/language/" + hqq.language + "/img/"
        hqq.setSprite(this.back, { Res:hqq["hall_chaofan"],path: hppath + "p_bandalibg2" })
        hqq.setBtn(closebtn, { path: "base/img/p_close"})
        hqq.setBtn(surecg, { path: blpath + "surecg" })
        hqq.setBtn(getcodebtn, { path: bpath + "getcodebtn", pressed: bpath + "getcodehui", transition: cc.Button.Transition.SPRITE })
        hqq.setBtn(getcodebtn2, { path: bpath + "getcodebtn", pressed: bpath + "getcodehui", transition: cc.Button.Transition.SPRITE })

        hqq.setSprite(this.title_resetpwd, { path: blpath + "title_resetpwd" })
        hqq.setSprite(bankcard_form, { path: blpath + "bankcard_form" })
        hqq.setSprite(this.title_bdbankcard, { path: blpath + "title_bdbankcard" })
        hqq.setSprite(title_signup, { path: blpath + "title_signup" })

        hqq.setBtn(this.kaihushengbtn, { Res:hqq["hall_chaofan"],path: hppath + "1" })
        hqq.setBtn(this.kaihushibtn, { Res:hqq["hall_chaofan"],path: hppath + "1" })
        hqq.setBtn(this.yinhangnamebtn, { Res:hqq["hall_chaofan"],path: hppath + "1" })

        hqq.setSprite(cc.find("bigsublayer/resetpass/info_form"),{Res:hqq["hall_chaofan"],path:"chaofan/personal/info_form"})
        hqq.setSprite(cc.find("bigsublayer/officelogin/info_form"),{Res:hqq["hall_chaofan"],path:"chaofan/personal/info_form"})
    },

    init(subtype) {
        this.subtype = 0
        this.kaihuhangSelect = false
        this.kaihushengSelect = false
        this.kaihushiSelect = false
        this.selectIndex = 0
        this.time = 0
        this.ensurefunc = () => {
            this.onClickExit()
        }

        this.subtype = subtype;
        cc.log("hallPSubbLayer_chaofan=======init subtype=",subtype)
        switch (subtype) {
            case 1: // 重置密码
                this.resetpass.active = true
                this.bindyinhangka.active = false
                this.officelogin.active = false
                this.panelInit(1)
                this.ensurefunc = this.resetpassEnsure
                this.exitbtn.y = 290
                break;
            case 2: // 绑定银行卡
                this.resetpass.active = false
                this.bindyinhangka.active = true
                this.officelogin.active = false
                this.ensurebtn.node.y = -300
                this.back.height = 665
                this.ensurefunc = this.bindyinhangkaEnsure
                this.exitbtn.y = 315
                break;
            case 3: // 注册正式账号
                this.resetpass.active = false
                this.bindyinhangka.active = false
                this.officelogin.active = true
                this.panelInit(2)
                this.ensurefunc = this.officeloginEnsure
                this.exitbtn.y = 290
                break;
        }
    },

    onClickKaihushengXiala() {
        var results = hqq.getTip("results")
        if (!this.kaihushengSelect) {
            for (var i = 0; i < results.length; i++) {
                for (var i = 0; i < results.length; i++) {
                    var node = cc.instantiate(this.BankSelectItem);
                    if (hqq.app.pinpai == "fuxin" ) {
                        hqq.setSprite(node, { path: "base/fuxin/img/srk", width: 500, type: cc.Sprite.Type.SLICED })
                    } else if (hqq.app.pinpai == "juding" ) {
                        hqq.setSprite(node, { Res:hqq["hall_"+hqq.app.pinpai],path: "juding/img/kuang", width: 500, type: cc.Sprite.Type.SLICED , color:cc.color("#546277") })
                    }
                    this.selectKaihushengContent.addChild(node);
                    node.getChildByName('label').getComponent(cc.Label).string = results[i];
                    var clickEventHandler = new cc.Component.EventHandler();
                    clickEventHandler.target = this.node;
                    clickEventHandler.component = "hallPSubbLayer_chaofan";
                    clickEventHandler.customEventData = results[i];
                    clickEventHandler.handler = "onClickKaihushengItem";
                    let button = node.getComponent(cc.Button);
                    button.clickEvents.push(clickEventHandler);
                }
            }
            this.kaihushengSelect = true;
        } else {
            let templabel = this.bindyinhangka.getChildByName("kaihushi").getChildByName('kaihushilabel')
            templabel.getComponent(cc.Label).string = hqq.getTip("kaihushi")
            if(hqq.app.pinpai!="juding"){
                templabel.color = new cc.Color(187, 187, 187)
            }
            this.selectKaihushengContent.removeAllChildren();
            this.kaihushengSelect = false;
        }
    },
    onClickKaihushengItem(event, custom) {
        let templabel = this.bindyinhangka.getChildByName("kaihusheng").getChildByName('kaihushenglabel')
        templabel.getComponent(cc.Label).string = custom
        if(hqq.app.pinpai!="juding"){
            templabel.color = new cc.Color(255, 255, 255)
        }
        this.onClickKaihushengXiala()
    },
    onClickKaihushiXiala() {
        let sheng = this.bindyinhangka.getChildByName("kaihusheng").getChildByName('kaihushenglabel').getComponent(cc.Label).string
        if (!sheng || sheng == hqq.getTip("kaihusheng")) {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip22"))
            return
        }
        var results = this.cities[sheng]
        if (!this.kaihuhangSelect) {
            for (var i = 0; i < results.length; i++) {
                var node = cc.instantiate(this.BankSelectItem);
                if (hqq.app.pinpai == "fuxin" ) {
                    hqq.setSprite(node, { path: "base/fuxin/img/srk", width: 500, type: cc.Sprite.Type.SLICED })
                } else if (hqq.app.pinpai == "juding" ) {
                    hqq.setSprite(node, { Res:hqq["hall_"+hqq.app.pinpai],path: "juding/img/kuang", width: 500, type: cc.Sprite.Type.SLICED , color:cc.color("#546277") })
                }
                this.selectKaihushiContent.addChild(node);
                node.getChildByName('label').getComponent(cc.Label).string = results[i];
                var clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = this.node;
                clickEventHandler.component = "hallPSubbLayer_chaofan";
                clickEventHandler.customEventData = results[i];
                clickEventHandler.handler = "onClickKaihushiItem";
                let button = node.getComponent(cc.Button);
                button.clickEvents.push(clickEventHandler);
            }
            this.kaihuhangSelect = true;
        } else {
            this.selectKaihushiContent.removeAllChildren();
            this.kaihuhangSelect = false;
        }
    },
    onClickKaihushiItem(event, custom) {
        let templabel = this.bindyinhangka.getChildByName("kaihushi").getChildByName('kaihushilabel')
        templabel.getComponent(cc.Label).string = custom
        if(hqq.app.pinpai!="juding"){
            templabel.color = new cc.Color(255, 255, 255)
        }
        this.onClickKaihushiXiala()
    },

    onClickKaihuhangXiala() {
        if(!this.kaihuhangSelect){
            let url = hqq.gameGlobal.pay.pay_host + "/api/payment_account/getbankName"
            let dataStr = "?token=e40f01afbb1b9ae3dd6747ced5bca532"
            let callback = (response) => {
                if (response.status == 0) {
                    var results = Object.values(response.data);
                    for (var i = 0; i < results.length; i++) {
                        var node = cc.instantiate(this.BankSelectItem);
                        if (hqq.app.pinpai == "fuxin" ) {
                            hqq.setSprite(node, { path: "base/fuxin/img/srk", width: 500, type: cc.Sprite.Type.SLICED })
                        } else if (hqq.app.pinpai == "juding" ) {
                            hqq.setSprite(node, { Res:hqq["hall_"+hqq.app.pinpai],path: "juding/img/kuang", width: 500, type: cc.Sprite.Type.SLICED , color:cc.color("#546277") })
                        }
                        this.selectKaihuhangContent.addChild(node);
                        node.getChildByName('label').getComponent(cc.Label).string = results[i];
                        var clickEventHandler = new cc.Component.EventHandler();
                        clickEventHandler.target = this.node;
                        clickEventHandler.component = "hallPSubbLayer_chaofan";
                        clickEventHandler.customEventData = results[i];
                        clickEventHandler.handler = "onClickKaihuhangItem";
                        let button = node.getComponent(cc.Button);
                        button.clickEvents.push(clickEventHandler);
                    }
                    this.kaihuhangSelect = true;
                } else {
                    var results = hqq.getTip("kaihuhang")
                    for (var i = 0; i < results.length; i++) {
                        var node = cc.instantiate(this.BankSelectItem);
                        if (hqq.app.pinpai == "fuxin" ) {
                            hqq.setSprite(node, { path: "base/fuxin/img/srk", width: 500, type: cc.Sprite.Type.SLICED })
                        } else if (hqq.app.pinpai == "juding" ) {
                            hqq.setSprite(node, { Res:hqq["hall_"+hqq.app.pinpai],path: "juding/img/kuang", width: 500, type: cc.Sprite.Type.SLICED , color:cc.color("#546277") })
                        }
                        this.selectKaihuhangContent.addChild(node);
                        node.getChildByName('label').getComponent(cc.Label).string = results[i];
                        var clickEventHandler = new cc.Component.EventHandler();
                        clickEventHandler.target = this.node;
                        clickEventHandler.component = "hallPSubbLayer_chaofan";
                        clickEventHandler.customEventData = results[i];
                        clickEventHandler.handler = "onClickKaihuhangItem";
                        let button = node.getComponent(cc.Button);
                        button.clickEvents.push(clickEventHandler);
                    }
                    this.kaihuhangSelect = true;
                }
            }
            let failcallback = (status, forcejump, url, err, readyState) => {
                var results = hqq.getTip("kaihuhang")
                for (var i = 0; i < results.length; i++) {
                    var node = cc.instantiate(this.BankSelectItem);
                    if (hqq.app.pinpai == "fuxin" ) {
                        hqq.setSprite(node, { path: "base/fuxin/img/srk", width: 500, type: cc.Sprite.Type.SLICED })
                    } else if (hqq.app.pinpai == "juding" ) {
                        hqq.setSprite(node, { Res:hqq["hall_"+hqq.app.pinpai],path: "juding/img/kuang", width: 500, type: cc.Sprite.Type.SLICED , color:cc.color("#546277") })
                    }
                    this.selectKaihuhangContent.addChild(node);
                    node.getChildByName('label').getComponent(cc.Label).string = results[i];
                    var clickEventHandler = new cc.Component.EventHandler();
                    clickEventHandler.target = this.node;
                    clickEventHandler.component = "hallPSubbLayer_chaofan";
                    clickEventHandler.customEventData = results[i];
                    clickEventHandler.handler = "onClickKaihuhangItem";
                    let button = node.getComponent(cc.Button);
                    button.clickEvents.push(clickEventHandler);
                }
                this.kaihuhangSelect = true;
            }
            hqq.http.sendXMLHttpRequest({
                method: 'GET',
                urlto: url,
                endurl: dataStr,
                callback: callback,
                needJsonParse: true,
                failcallback: failcallback,
            })
        } else{
            this.selectKaihuhangContent.removeAllChildren();
            this.kaihuhangSelect = false;
        }
    },
    onClickKaihuhangItem(event, custom) {
        let templabel = this.bindyinhangka.getChildByName("yinhangname").getChildByName('yinhanglabel')
        templabel.getComponent(cc.Label).string = custom
        if(hqq.app.pinpai!="juding"){
            templabel.color = new cc.Color(255, 255, 255)
        }
        this.onClickKaihuhangXiala()
    },
    yinhangkaChange(event) { // 银行卡号输入后忽略空格符
        this.bindyinhangka.getChildByName("kahaoeditbox").getComponent(cc.EditBox).string = event.string.replace(/\s+/g, "")
    },
    // 是否是中文
    isChinese(s) {
        var ret = true;
        for (var i = 0; i < s.length; i++) {//遍历每一个文本字符bai
            ret = ret && (s.charCodeAt(i) >= 10000 || s.charCodeAt(i) == 183); //判断文本字符的unicode值 ,183 为 ·
        }
        return ret
    },
    // 绑定银行卡确定
    bindyinhangkaEnsure() {
        this.ensurebtn.interactable = false
        let card_num = this.bindyinhangka.getChildByName("kahaoeditbox").getComponent(cc.EditBox).string
        if (card_num.length == 0) {
            this.ensurebtn.interactable = true
            return hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip23"))
        }
        if (card_num.length < 15 || card_num.length > 19) {
            this.ensurebtn.interactable = true
            return hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip24"))
        }
        let card_name = this.bindyinhangka.getChildByName("nameediftox").getComponent(cc.EditBox).string
        if (card_name.length == 0) {
            this.ensurebtn.interactable = true
            return hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip25"))
        } else if (!this.isChinese(card_name)) {
            this.ensurebtn.interactable = true
            return hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip26"))
        }
        let sheng = this.bindyinhangka.getChildByName("kaihusheng").getChildByName('kaihushenglabel').getComponent(cc.Label).string
        if (sheng == hqq.getTip("kaihusheng") || sheng.length == 0) {
            this.ensurebtn.interactable = true
            return hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip27"))
        }
        let shi = this.bindyinhangka.getChildByName("kaihushi").getChildByName('kaihushilabel').getComponent(cc.Label).string
        if (shi == hqq.getTip("kaihushi") || shi.length == 0) {
            this.ensurebtn.interactable = true
            return hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip28"))
        }
        let bank_name = this.bindyinhangka.getChildByName("yinhangname").getChildByName('yinhanglabel').getComponent(cc.Label).string
        if (bank_name == hqq.getTip("yinhangname") || bank_name.length == 0) {
            this.ensurebtn.interactable = true
            return hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip29"))
        }
        let branch_name = this.bindyinhangka.getChildByName("zhihang").getComponent(cc.EditBox).string
        if (branch_name.length == 0) {
            this.ensurebtn.interactable = true
            return hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip30"))
        } else if (!this.isChinese(branch_name)) {
            this.ensurebtn.interactable = true
            return hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip31"))
        }

        let obj = {};
        obj = {
            card_num: card_num.replace(/\s+/g, ""),
            card_name: card_name,
            bank_name: bank_name,
            branch_name: branch_name,
            bank_province: sheng,
            bank_city: shi,
        };
        let info = JSON.stringify(obj);
        let dataStr = "user_id=" + hqq.gameGlobal.pay.user_id
        dataStr += "&user_name=" + hqq.gameGlobal.pay.user_name
        dataStr += "&action=add&type=3&info=" + info
        dataStr += "&client=" + hqq.gameGlobal.pay.client
        dataStr += "&proxy_user_id=" + hqq.gameGlobal.pay.proxy_user_id
        dataStr += "&proxy_name=" + hqq.gameGlobal.pay.proxy_name
        dataStr += "&package_id=" + hqq.gameGlobal.pay.package_id
        dataStr += "&token=e40f01afbb1b9ae3dd6747ced5bca532"
        dataStr += "&version=1"
        dataStr += "&center_auth=" + hqq.gameGlobal.token
        let callback = (response) => {
            this.ensurebtn.interactable = true
            if (response.status == 0) {
                hqq.eventMgr.dispatch(hqq.eventMgr.getPayInfo)
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("actsuccess"))
                this.onClickExit()
            } else {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, response.msg)
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            hqq.logMgr.log("bindyinhangkaEnsure failcallback", status, forcejump, url, err, readyState)
            this.ensurebtn.interactable = true
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("requestfail") + status + ",err:" + err)
        }
        let url = hqq.gameGlobal.pay.pay_host + "/api/payment_account/saveAccount"
        hqq.http.sendXMLHttpRequest({
            method: 'POST',
            urlto: url,
            param: dataStr,
            callback: callback,
            needJsonParse: true,
            failcallback: failcallback,
        })
    },

    onClickCaptcha() {
        this.panelInit(this.subtype)
    },

    // 注册正式账号初始化
    panelInit(mtype) {
        if (CC_JSB) {
            let fullPath = jsb.fileUtils.getWritablePath() + "yanzhenma.png";
            jsb.fileUtils.isFileExist(fullPath) && jsb.fileUtils.removeFile(fullPath);
            if (this.temptex) {
                cc.assetManager.releaseAsset(this.temptex);
            }
        }

        if (!hqq.app.gameUser) {
            cc.log("没有中心服数据")
            return
        }
        let imgurl = ''
        if (hqq.app.server.indexOf("http:") == -1 && hqq.app.server.indexOf("https:") == -1) {
            imgurl = "http://" + hqq.app.server + "/Game/Verify/createCaptcha?"
        } else {
            imgurl = hqq.app.server + "/Game/Verify/createCaptcha?"
        }
        imgurl += "id=" + hqq.app.gameUser.id;
        imgurl += "&token=" + hqq.gameGlobal.token;
        let self = this;
        var xhr = new XMLHttpRequest();
        xhr.open("get", imgurl, true);
        if (CC_JSB) {
            xhr.responseType = "arraybuffer";
        } else {
            xhr.responseType = "blob";
        }
        xhr.onload = function () {
            if (this.status == 200) {
                if (CC_JSB) {
                    var fullPath = jsb.fileUtils.getWritablePath() + "yanzhenma.png";
                    if (jsb.fileUtils.isFileExist(fullPath) && jsb.fileUtils.removeFile(fullPath)) {
                        if (jsb.fileUtils.writeDataToFile(new Uint8Array(this.response), fullPath)) {
                            cc.assetManager.loadRemote(fullPath, function (err, tex) {
                                if (err) {
                                    cc.error(err);
                                } else {
                                    if(!cc.isValid(self.captchaimg1)||!cc.isValid(self.captchaimg2))return;
                                    self.temptex = tex
                                    let mspriteFrame = new cc.SpriteFrame(tex);
                                    if (mspriteFrame) {
                                        if (mtype == 1) {
                                            self.captchaimg1.spriteFrame = mspriteFrame;
                                        } else {
                                            self.captchaimg2.spriteFrame = mspriteFrame;
                                        }
                                    }
                                }
                            });
                        } else {
                            cc.log('Remote write file failed.');
                        }
                    } else {
                        if (jsb.fileUtils.writeDataToFile(new Uint8Array(this.response), fullPath)) {
                            cc.assetManager.loadRemote(fullPath, function (err, tex) {
                                if (err) {
                                    cc.error(err);
                                } else {
                                    if(!cc.isValid(self.captchaimg1)||!cc.isValid(self.captchaimg2))return;
                                    self.temptex = tex
                                    let mspriteFrame = new cc.SpriteFrame(tex);
                                    if (mspriteFrame) {
                                        if (mtype == 1) {
                                            self.captchaimg1.spriteFrame = mspriteFrame;
                                        } else {
                                            self.captchaimg2.spriteFrame = mspriteFrame;
                                        }
                                    }
                                }
                            });
                        } else {
                            cc.log('Remote write file failed.');
                        }
                    }
                } else {
                    var blob = this.response;
                    let oFileReader = new FileReader();
                    oFileReader.onloadend = function (e) {
                        let base64 = e.target.result;
                        var img = new Image();
                        img.src = base64;
                        img.onload = function () {
                            if(!cc.isValid(self.captchaimg1)||!cc.isValid(self.captchaimg2))return;
                            var texture = new cc.Texture2D();
                            texture.initWithElement(img);
                            var newframe = new cc.SpriteFrame();
                            newframe.setTexture(texture);
                            if (mtype == 1) {
                                self.captchaimg1.spriteFrame = newframe;
                            } else {
                                self.captchaimg2.spriteFrame = newframe;
                            }
                        }
                    };
                    oFileReader.readAsDataURL(blob);
                }
                xhr.abort()
            }
        }
        xhr.ontimeout = () => {
            xhr.abort()
        }
        xhr.onerror = () => {
            xhr.abort()
        }
        xhr.send();
    },
    // 获取手机短信验证码
    onClickGetCaptcha(event, custom) {
        let phonenum
        let yanzhenmanum
        if (custom == 1) {
            phonenum = this.resetpass.getChildByName("phoneeditbox").getComponent(cc.EditBox).string
            yanzhenmanum = this.resetpass.getChildByName("yanzheneditbox").getComponent(cc.EditBox).string
        } else {
            phonenum = this.officelogin.getChildByName("phoneeditbox").getComponent(cc.EditBox).string
            yanzhenmanum = this.officelogin.getChildByName("yanzheneditbox").getComponent(cc.EditBox).string
        }
        if (phonenum == "") {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip32"))
            return
        }
        if (phonenum[0] != "1") {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip33"))
            return
        }
        if (yanzhenmanum == "") {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("entercode"))
            return
        }
        let self = this
        let callback = (data) => {
            if(!cc.isValid(this.node))return;
            if (data.code == 200) {
                let btn
                if (custom == 1) {
                    btn = self.resetpass.getChildByName("getcodebtn").getComponent(cc.Button)
                } else {
                    btn = self.officelogin.getChildByName("getcodebtn").getComponent(cc.Button)
                }
                btn.interactable = false
                let btnlabel = btn.node.getChildByName('btnlabel')
                let la = btnlabel.getComponent(cc.Label)
                la.string = hqq.getTip("str0") + "（60）"
                let lao = btnlabel.getComponent(cc.LabelOutline)
                if (hqq.app.pinpai == "xingui") {
                    btnlabel.color = new cc.Color(255, 0, 0)
                    lao.color = new cc.Color(255, 0, 0)
                } else {
                    btnlabel.color = new cc.Color(67, 67, 67)
                    lao.color = new cc.Color(67, 67, 67)
                }
                let time2 = 0
                this.timer = setInterval(() => {
                    if(!cc.isValid(this.node))return;
                    if(!cc.isValid(la))return;
                    time2++
                    let t = 60 - time2
                    la.string = hqq.getTip("str0") + "（" + t + "）"
                    if (time2 >= 60) {
                        clearInterval(this.timer);
                        btn.interactable = true
                        la.string = hqq.getTip("getcode")
                        if (hqq.app.pinpai == "xingui") {
                            btnlabel.color = new cc.Color(255, 255, 255)
                            lao.color = new cc.Color(255, 255, 255)
                        } else {
                            btnlabel.color = new cc.Color(67, 0, 0)
                            lao.color = new cc.Color(67, 0, 0)
                        }
                    }
                }, 1000)
            } else {
                if (data.code == 203 && data.msg == "图片验证码错误") {
                    hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip34"))
                } else if( data.msg == "can only be sent once in 60s"){
                    hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip35") + hqq.getTip("smstoomany"))
                } else {
                    hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip35") + data.msg)
                }
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            hqq.logMgr.log("onClickGetCaptcha failcallback", status, forcejump, url, err, readyState)
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("requestfail") + status + ",err:" + err)
        }
        let endurl = hqq.app.getIpPostEndUrl(7);
        let data = {
            id: hqq.gameGlobal.player.id,
            token: hqq.gameGlobal.token,
            phone_number: phonenum,
            captcha: yanzhenmanum,
        }
        
        hqq.http.sendXMLHttpRequest({
            method: 'POST',
            urlto: hqq.app.server + endurl,
            param: data,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: true,
        })
    },
    passJudge(str) {
        if (str.length < 6 || str.length > 12 || !str.match(/[0-9]/g) || !str.match(/[a-zA-Z]/g)) {
            return true
        }
        return false
    },
    // 注册正式账号 确定
    officeloginEnsure() {
        let phonenum = this.officelogin.getChildByName("phoneeditbox").getComponent(cc.EditBox).string
        let yanzhenmanum = this.officelogin.getChildByName("yanzheneditbox").getComponent(cc.EditBox).string
        let capchanum = this.officelogin.getChildByName("capchaeditbox").getComponent(cc.EditBox).string
        let passnum = this.officelogin.getChildByName("passeditbox").getComponent(cc.EditBox).string
        if (phonenum == "") {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip32"))
            return
        }
        if (capchanum == "") {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("capchaed"))
            return
        }
        if (passnum == "" || this.passJudge(passnum)) {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip36"))
            return
        }
        this.ensurebtn.interactable = false
        let callback = (responsedata) => {
            cc.log("responsedata", responsedata)
            // if (this.timer) {
            //     clearInterval(this.timer);
            // }
            if (responsedata.status != 0) {
                hqq.logMgr.log("officeloginEnsure callback responsedata", JSON.stringify(responsedata)," phonenum=",phonenum , " userid=",hqq.gameGlobal.pay.user_id)
                this.ensurebtn.interactable = true
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip37"));
            } else {
                if (hqq.app.pinpai == 'debi') {
                    hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip38"));
                } else if(hqq.app.pinpai == "ninetwo"){
                    hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("bindphonesucess"));
                } else {
                    hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip39"));
                }
                hqq.app.setPlayerinfo({ phone_number: phonenum });
                this.onClickExit();
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            hqq.logMgr.log("officeloginEnsure failcallback", status, forcejump, url, err, readyState)
            this.ensurebtn.interactable = true
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip40") + status);
        }
        let payUrl = hqq.gameGlobal.pay.pay_host + "/api/activity/bindPhone";
        let dataStr = "user_id=" + hqq.gameGlobal.pay.user_id;
        if (hqq.gameGlobal.pay.user_name) {
            dataStr = dataStr + "&user_name=" + hqq.gameGlobal.pay.user_name;
        } else {
            dataStr = dataStr + "&user_name=" + hqq.gameGlobal.pay.user_id; //if user_name is null, take the user_id instead, otherwise will get error.
        }
        dataStr = dataStr + "&package_id=" + hqq.gameGlobal.pay.package_id;
        dataStr = dataStr + "&token=e40f01afbb1b9ae3dd6747ced5bca532";
        dataStr = dataStr + "&phone_number=" + phonenum;
        dataStr = dataStr + "&captcha=" + yanzhenmanum;
        dataStr = dataStr + "&code=" + capchanum;
        dataStr = dataStr + "&password=" + passnum;
        dataStr = dataStr + "&center_token=" + hqq.gameGlobal.token;
        dataStr = dataStr + "&center_auth=" + hqq.gameGlobal.token
        hqq.http.sendXMLHttpRequest({
            method: 'POST',
            urlto: payUrl,
            param: dataStr,
            callback: callback,
            needJsonParse: true,
            failcallback: failcallback,
        })
    },
    // 重置账号密码 确定
    resetpassEnsure() {
        this.ensurebtn.interactable = false
        let phonenum = this.resetpass.getChildByName("phoneeditbox").getComponent(cc.EditBox).string
        let yanzhenmanum = this.resetpass.getChildByName("yanzheneditbox").getComponent(cc.EditBox).string
        let capchanum = this.resetpass.getChildByName("capchaeditbox").getComponent(cc.EditBox).string
        let passnum = this.resetpass.getChildByName("passeditbox").getComponent(cc.EditBox).string
        if (phonenum == "") {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip32"))
            return
        }
        if (yanzhenmanum == "") {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("entercode"))
            return
        }
        if (capchanum == "") {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("capchaed"))
            return
        }
        if (passnum == "" || this.passJudge(passnum)) {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip36"))
            return
        }

        let callback = (data) => {
            if (data.code == 200) {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip41"))
                this.onClickExit()
            } else {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip42") + data.msg)
            }
        }

        let failcallback = (status, forcejump, url, err, readyState) => {
            hqq.logMgr.log("officeloginEnsure failcallback", status, forcejump, url, err, readyState)
            this.ensurebtn.interactable = true
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("requestfail") + status + ",err:" + err)
        }

        let endurl = hqq.app.getIpPostEndUrl(4)
        let data = {
            phone_number: phonenum,
            id: hqq.gameGlobal.player.id,
            code: capchanum,
            password: passnum,
            captcha: yanzhenmanum,
            token: hqq.gameGlobal.token,
        }
        hqq.http.sendXMLHttpRequest({
            method: 'POST',
            urlto: hqq.app.server + endurl,
            param: data,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: true,
        })
    },

    onClickExit() {
        if (CC_JSB) {
            let fullPath = jsb.fileUtils.getWritablePath() + "yanzhenma.png";
            jsb.fileUtils.isFileExist(fullPath) && jsb.fileUtils.removeFile(fullPath);
            if (this.temptex) {
                cc.assetManager.releaseAsset(this.temptex);
            }
        }
        this.node.destroy()
    },

    onClickSure() {
        this.ensurefunc()
    },

    // update (dt) {},
});
