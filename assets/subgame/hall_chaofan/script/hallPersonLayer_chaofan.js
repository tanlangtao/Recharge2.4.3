

cc.Class({
    extends: cc.Component,

    properties: {
        txt_se: cc.Node,
        txt_bgm: cc.Node,
        versionlabel: cc.Label,
        phonebindbtn: cc.Node,
        alipaybindbtn: cc.Node,
        yinhangkabindbtn: cc.Node,

        musictoggle: cc.Toggle,
        audiotoggle: cc.Toggle,

        headimg: cc.Sprite,
        goldlabel: cc.Label,
        nicklabel: cc.Label,
        idlabel: cc.Label,
        phonelabel: cc.Label,
        alipaylabel: cc.Label,
        yinghangkalabel: cc.Label,
    },

    onLoad() {
        this.UILoad()
        this.num0 = 0
        this.num1 = 0
        let str = "版本m:" + (hqq.localStorage.globalGet(hqq.app.versionKey) || "1.0.0")
        // if (cc.sys.isNative && cc.sys.os != "Windows" && hqq.reflect.getClipboard()) {
        //     str += "\n剪切板：" + hqq.reflect.getClipboard()
        // }
        if (hqq.app.reginIpData) {
            str += "\n注册ip-api:" + hqq.app.reginIpData.query + ",地址:" + hqq.app.reginIpData.regionName
        }
        if (hqq.app.reginIpData2) {
            str += "\n注册ipinfo:" + hqq.app.reginIpData2.ip + "地址:" + hqq.app.reginIpData2.region
        }
        if (hqq.gameGlobal.ipapiData) {
            str += "\n登陆ip-api:" + hqq.gameGlobal.ipapiData.query + ",地址" + hqq.gameGlobal.ipapiData.regionName
        }
        if (hqq.gameGlobal.ipinfoData) {
            str += "\n登陆ipinfo:" + hqq.gameGlobal.ipinfoData.ip + ",地址" + hqq.gameGlobal.ipinfoData.region
        }
        this.versionlabel.string = str
        if (cc.Button.prototype.setSoundEffect) {
            this.txt_bgm.getComponent(cc.Button).setSoundEffect(false)
            this.txt_se.getComponent(cc.Button).setSoundEffect(false)
        }
    },

    start() {
    },
    // UI动态加载
    UILoad() {
        if(!cc.isValid(this.node)){
            console.log("hallPersonLayer UILoad 节点不存在")
            return;
        }
        let title_personal = cc.find("personallayer/title_personal")
        let personal_form = cc.find("personallayer/person/personal_form")
        let phone = cc.find("personallayer/person/personal_form/phone")
        let alipay = cc.find("personallayer/person/personal_form/alipay")
        let yinhangka = cc.find("personallayer/person/personal_form/yinhangka")
        phone.getComponent(cc.Label).string = hqq.getTip("notbindphone")
        // alipay.getComponent(cc.Label).string = hqq.getTip("notbindaliypay")
        alipay.getComponent(cc.Label).string = hqq.getTip("notbindusdt")
        yinhangka.getComponent(cc.Label).string = hqq.getTip("notbindyinhangka")

        let headfram3 = cc.find("personallayer/person/headfram3")
        let changebt = cc.find("personallayer/person/changebt")
        let btn_copy = cc.find("personallayer/person/btn_copy")
        let phone_btn_bind = cc.find("personallayer/person/phone_btn_bind")
        let alipay_btn_bind = cc.find("personallayer/person/alipay_btn_bind")
        let yinghangka_btn_bind = cc.find("personallayer/person/yinghangka_btn_bind")
        let qiehuan = cc.find("personallayer/person/qiehuan")
        let txt_se = cc.find("personallayer/set/txt_se")
        let txt_bgm = cc.find("personallayer/set/txt_bgm")
        let yinyuetogglenode = cc.find("personallayer/set/yinyuetoggle")
        let yinyuetoggle = yinyuetogglenode.getComponent(cc.Toggle)
        let yinxiaotogglenode = cc.find("personallayer/set/yinxiaotoggle")
        let yinxiaotoggle = yinxiaotogglenode.getComponent(cc.Toggle)

        let closebtn = cc.find("personallayer/p_new_saver_return")
        let background = cc.find("personallayer/personal_di")

        let hlpath = "language/" + hqq.language + "/img/"
        let hlbpath = "language/" + hqq.language + "/bigimg/"
        hqq.setWidget(headfram3, { left: 83 })
        hqq.setBtn(closebtn, { Res:hqq["hall_chaofan"],path: "chaofan/img/p_new_saver_return" })
        hqq.setSprite(background, { Res:hqq["hall_chaofan"],path: "chaofan/bigimg/personal_di", widget: { left: 0, right: 0, top: 0, bottom: 0 } })
        hqq.setSprite(title_personal, {Res:hqq["hall_chaofan"],path: hlbpath + "title_personal" })
        hqq.setSprite(personal_form, {Res:hqq["hall_chaofan"],path: hlpath + "personal_form" })

        hqq.setBtn(changebt, {Res:hqq["hall_chaofan"],path: hlpath + "changebt", widget: { left: 86 } })
        hqq.setBtn(btn_copy, {Res:hqq["hall_chaofan"],path: hlpath + "btn_copy" })
        hqq.setBtn(phone_btn_bind, {Res:hqq["hall_chaofan"],path: hlpath + "btn_bind" })
        hqq.setBtn(alipay_btn_bind, {Res:hqq["hall_chaofan"],path: hlpath + "btn_bind" })
        hqq.setBtn(yinghangka_btn_bind, {Res:hqq["hall_chaofan"],path: hlpath + "btn_bind" })
        hqq.setBtn(qiehuan, {Res:hqq["hall_chaofan"],path: hlpath + "qiehuan" })
        hqq.setSprite(txt_se, {Res:hqq["hall_chaofan"],path: hlpath + "txt_se" })
        hqq.setSprite(txt_bgm, {Res:hqq["hall_chaofan"],path: hlpath + "txt_bgm" })
        hqq["hall_chaofan"].load(hlpath + "opensp", cc.SpriteFrame, (err, frame) => {
            if (err) {
                cc.log("加载图片失败", err)
                return;
            }
            if(!cc.isValid(this.node))return;
            yinyuetoggle.checkMark.spriteFrame = frame;
            yinxiaotoggle.checkMark.spriteFrame = frame;
        })
        hqq["hall_chaofan"].load(hlpath + "closesp", cc.SpriteFrame, (err, frame) => {
            if (err) {
                cc.log("加载图片失败", err)
                return;
            }
            if(!cc.isValid(this.node))return;
            yinyuetoggle.target.getComponent(cc.Sprite).spriteFrame = frame;
            yinxiaotoggle.target.getComponent(cc.Sprite).spriteFrame = frame;
        })
    },

    init(data) {
        let player = hqq.gameGlobal.player
        hqq.commonTools.loadHeadRes(player.headurl, this.headimg)
        this.goldlabel.string = player.gold.toString().replace(".", "/")
        this.nicklabel.string = player.nick
        this.idlabel.string = player.id
        cc.find("person/change1",this.node).active = false;
        if(hqq.app.pinpai=="juding"){
            if(player.nick == player.id.toString() || player.nick.match(/\d+/g)){
                cc.find("person/change1",this.node).active = true;
            }
        }
        if (player.phonenum) {
            this.phonelabel.string = player.phonenum
            if(hqq.app.pinpai!="juding"){
                this.phonelabel.node.color = new cc.Color(225, 225, 225)
            }
            this.phonebindbtn.active = false
        }
        // if (player.alipay) {
        //     this.alipaylabel.string = player.alipay.substring(0, 2) + "** **** **" + player.alipay.substring(player.alipay.length - 2, player.alipay.length)
        //     this.alipaylabel.node.color = new cc.Color(225, 225, 225)
        //     // this.alipaybindbtn.active = false
        // }
        if (player.usdtaddr) {
            this.alipaylabel.string = player.usdtaddr.substring(0, 3) + "* **** **" + player.usdtaddr.substring(player.usdtaddr.length - 4, player.usdtaddr.length)
            if(hqq.app.pinpai!="juding"){
                this.alipaylabel.node.color = new cc.Color(225, 225, 225)
            }
            this.alipaybindbtn.active = false

        }
        if (player.yinhangka) {
            let kahaostr = player.yinhangka.toString()
            this.yinghangkalabel.string = kahaostr.substring(0, 3) + "* **** **** " + kahaostr.substring(kahaostr.length - 4, kahaostr.length)
            if(hqq.app.pinpai!="juding"){
                this.yinghangkalabel.node.color = new cc.Color(225, 225, 225)
            }
            this.yinhangkabindbtn.active = false
        }
        hqq.audioMgr && hqq.audioMgr.bgIsOpen ? this.musictoggle.check() : this.musictoggle.uncheck()
        hqq.audioMgr && hqq.audioMgr.effectIsOpen ? this.audiotoggle.check() : this.audiotoggle.uncheck()
        hqq.eventMgr.register(hqq.eventMgr.refreshPlayerinfo, "hallPersonLayer", this.setPlayerInfo.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.getPayInfo, "hallPersonLayer", this.getPayInfo.bind(this))
        this.getPayInfo(); // 存在解绑的情况，所以每次进来都重新拉取一次支付宝和银行卡信息
    },

    getPayInfo() {
        let endurl = "/api/with_draw/index?user_id=" + hqq.gameGlobal.pay.user_id
        endurl += "&token=e40f01afbb1b9ae3dd6747ced5bca532&package_id=" + hqq.gameGlobal.pay.package_id
        endurl += "&version=1"
        let callback = (data) => {
            if (data && data.status == 0) {
                cc.log("data", data)
                let list = data.data.list
                let isNoAlipay = true
                let isNotyinhang = true
                for (let i = 0; i < list.length; i++) {
                    if (list[i].type == "3") {
                        hqq.gameGlobal.player.yinhangka = JSON.parse(list[i].info).card_num
                        let kahaostr = hqq.gameGlobal.player.yinhangka.toString()
                        this.yinghangkalabel.string = kahaostr.substring(0, 3) + "* **** **** " + kahaostr.substring(kahaostr.length - 4, kahaostr.length)
                        if(hqq.app.pinpai != "juding" ){
                            this.yinghangkalabel.node.color = new cc.Color(225, 225, 225)
                        }
                        this.yinhangkabindbtn.active = false
                        isNotyinhang = false
                        // } else if (list[i].type == "2") {
                        // hqq.gameGlobal.player.alipay = JSON.parse(list[i].info).account_card
                        // let alistr = hqq.gameGlobal.player.alipay
                        // this.alipaylabel.string = alistr.substring(0, 2) + "** **** **" + alistr.substring(alistr.length - 2, alistr.length)
                        // this.alipaylabel.node.color = new cc.Color(225, 225, 225)
                        // // this.alipaybindbtn.active = false
                        // isNoAlipay = false
                    } else if (list[i].type == "4") {
                        hqq.gameGlobal.player.usdtaddr = JSON.parse(list[i].info).wallet_addr
                        let usdtaddr = JSON.parse(list[i].info).wallet_addr.toString()
                        this.alipaylabel.string = usdtaddr.substring(0, 3) + "* **** **** " + usdtaddr.substring(usdtaddr.length - 4, usdtaddr.length)
                        if( hqq.app.pinpai != "juding" ){
                            this.alipaylabel.node.color = new cc.Color(225, 225, 225)
                        }
                        isNoAlipay = false
                        this.alipaybindbtn.active = false
                    }
                }
                if (isNoAlipay && cc.isValid(this.alipaylabel)) {
                    // this.alipaylabel.string = hqq.getTip("notbindaliypay")
                    this.alipaylabel.string = hqq.getTip("notbindusdt")
                    if( hqq.app.pinpai != "juding" ){
                        this.alipaylabel.node.color = new cc.Color(152, 152, 152)
                    }
                    this.alipaybindbtn.active = true
                }
                if (isNotyinhang && cc.isValid(this.yinghangkalabel)) {
                    this.yinghangkalabel.string = hqq.getTip("notbindyinhangka")
                    if( hqq.app.pinpai != "juding" ){
                        this.yinghangkalabel.node.color = new cc.Color(152, 152, 152)
                    }
                    this.yinhangkabindbtn.active = true
                }
            } else {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("revisefail") + data.msg)
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("requestfail") + status + ",err:" + err, forcejump, readyState)
        }
        if (hqq.gameGlobal.pay.pay_host == "") {
            hqq.logMgr.time("最快的pay地址")
            let qcallback = (data, url) => {
                hqq.logMgr.timeEnd("最快的pay地址", url)
                hqq.gameGlobal.pay.pay_host = url;
                hqq.http.sendXMLHttpRequest({
                    method: "GET",
                    urlto: url,
                    endurl: endurl,
                    callback: callback,
                    failcallback: failcallback,
                    needJsonParse: true,
                });
            }
            hqq.http.requestFastestUrlLine({
                urllist: hqq.app.remoteSeverinfo.pay_host,
                endurl: "/checked",
                callback: qcallback,
                needJsonParse: false,
            })
        } else {
            hqq.http.sendXMLHttpRequest({
                method: "GET",
                urlto: hqq.gameGlobal.pay.pay_host,
                endurl: endurl,
                callback: callback,
                failcallback: failcallback,
                needJsonParse: true,
            });
        }
    },

    setPlayerInfo(msg) {
        if (msg.game_nick) {
            this.nicklabel.string = msg.game_nick;
            hqq.gameGlobal.player.nick = msg.game_nick;
            hqq.gameGlobal.pay.game_nick = msg.game_nick;

            cc.find("person/change1",this.node).active = false;
            if(hqq.app.pinpai=="juding"){
                let player = hqq.gameGlobal.player
                if(player.nick == player.id.toString() || player.nick.match(/\d+/g)){
                    cc.find("person/change1",this.node).active = true;
                }
            }
        }
        if (msg.game_gold || msg.game_gold == 0) {
            this.goldlabel.string = msg.game_gold.toString().replace(".", "/")
        }
        if (msg.game_img) {
            hqq.commonTools.loadHeadRes(msg.game_img, this.headimg)
        }
        if (msg.phone_number) {
            this.phonelabel.string = msg.phone_number
            if(hqq.app.pinpai != "juding"){
                this.phonelabel.node.color = new cc.Color(225, 225, 225)
            }
            this.phonebindbtn.active = false
        } else if (msg.ischangeAccount) {
            this.phonelabel.string = hqq.getTip("showtip71")
            if(hqq.app.pinpai != "juding"){
                this.phonelabel.node.color = new cc.Color(152, 152, 152)
            }
            this.phonebindbtn.active = true
        }
        // if (msg.alipay) {
        //     this.alipaylabel.string = msg.alipay.substring(0, 2) + "** **** **" + msg.alipay.substring(msg.alipay.length - 2, msg.alipay.length)
        //     this.alipaylabel.node.color = new cc.Color(225, 225, 225)
        //     // this.alipaybindbtn.active = false
        // }
        if (msg.usdtaddr) {
            this.alipaylabel.string = msg.usdtaddr.substring(0, 3) + "* **** **" + msg.usdtaddr.substring(msg.usdtaddr.length - 4, msg.usdtaddr.length)
            if(hqq.app.pinpai!="juding"){
                this.alipaylabel.node.color = new cc.Color(225, 225, 225)
            }
            this.alipaybindbtn.active = false
        }
        if (msg.yinhangka) {
            this.yinghangkalabel.string = msg.yinhangka.substring(0, 3) + "* **** **** " + msg.yinhangka.substring(msg.yinhangka.length - 4, msg.yinhangka.length)
            if(hqq.app.pinpai!="juding"){
                this.yinghangkalabel.node.color = new cc.Color(225, 225, 225)
            }
            this.yinhangkabindbtn.active = false
        }
        if (msg.ischangeAccount) {
            this.idlabel.string = msg.id
            if (!msg.usdtaddr || !msg.yinhangka) {
                this.getPayInfo();
            }
        }
    },

    onClickExit() {
        // cc.log("关闭")
        this.node.destroy()
    },

    onClickChangeHeadImg() {
        hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, { type: 1 })
    },

    onClickNick() {
        hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, { type: 3 })
    },

    onClickCopy() {
        if (hqq.reflect) {
            if (hqq.reflect.setClipboard(this.idlabel.string)) {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip20"))
            } else {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip21"))
            }
        }
    },

    obnClickPhoneBind() {
        hqq.eventMgr.dispatch(hqq.eventMgr.showBiglayer, 3)
    },

    onClickAlipayBind() {
        hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, { type: 14 })
    },

    onClickYinHangKaBind() {
        hqq.eventMgr.dispatch(hqq.eventMgr.showBiglayer, 2)
    },

    onClickChangeAccount() {
        hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, { type: 4 })
    },

    onClickMusic(event) {
        hqq.audioMgr && hqq.audioMgr.setBgState(event.isChecked)
        if(hqq.app.pinpai == "juding" || hqq.app.pinpai == "huaxing" ){
            if(event.isChecked){
                event.node.getChildByName("Background").active = false;
            } else{
                event.node.getChildByName("Background").active = true;
            }
        }
    },

    onClickAudio(event) {
        hqq.audioMgr && hqq.audioMgr.setEffectState(event.isChecked)
        if(hqq.app.pinpai == "juding" || hqq.app.pinpai == "huaxing" ){
            if(event.isChecked){
                event.node.getChildByName("Background").active = false;
            } else{
                event.node.getChildByName("Background").active = true;
            }
        }
    },

    onClicktxt_se() {
        this.num0++
        if (this.num0 > 10 && this.num1 > 10) {
            hqq.eventMgr.dispatch(hqq.eventMgr.showConsole, null)
        }

        if( this.num0 > 15 && this.num1 > 15 )
        {
            let str = "版本m:" + (hqq.localStorage.globalGet(hqq.app.versionKey) || "1.0.0")
            if (cc.sys.isNative && cc.sys.os != "Windows" && hqq.reflect.getClipboard()) {
                str += "\n剪切板：" + hqq.reflect.getClipboard()
            }
            if (hqq.app.reginIpData) {
                str += "\n注册ip-api:" + hqq.app.reginIpData.query + ",地址:" + hqq.app.reginIpData.regionName
            }
            if (hqq.app.reginIpData2) {
                str += "\n注册ipinfo:" + hqq.app.reginIpData2.ip + "地址:" + hqq.app.reginIpData2.region
            }
            if (hqq.gameGlobal.ipapiData) {
                str += "\n登陆ip-api:" + hqq.gameGlobal.ipapiData.query + ",地址" + hqq.gameGlobal.ipapiData.regionName
            }
            if (hqq.gameGlobal.ipinfoData) {
                str += "\n登陆ipinfo:" + hqq.gameGlobal.ipinfoData.ip + ",地址" + hqq.gameGlobal.ipinfoData.region
            }
            str += "\n大厅版号:" + hqq.app.hallVersion;
            this.versionlabel.string = str
        }
    },
    onClicktxt_bgm() {
        this.num1++
        if (this.num0 > 10 && this.num1 > 10) {
            hqq.eventMgr.dispatch(hqq.eventMgr.showConsole, null)
        }

        if( this.num0 > 15 && this.num1 > 15 )
        {
            let str = "版本m:" + (hqq.localStorage.globalGet(hqq.app.versionKey) || "1.0.0")
            if (cc.sys.isNative && cc.sys.os != "Windows" && hqq.reflect.getClipboard()) {
                str += "\n剪切板：" + hqq.reflect.getClipboard()
            }
            if (hqq.app.reginIpData) {
                str += "\n注册ip-api:" + hqq.app.reginIpData.query + ",地址:" + hqq.app.reginIpData.regionName
            }
            if (hqq.app.reginIpData2) {
                str += "\n注册ipinfo:" + hqq.app.reginIpData2.ip + "地址:" + hqq.app.reginIpData2.region
            }
            if (hqq.gameGlobal.ipapiData) {
                str += "\n登陆ip-api:" + hqq.gameGlobal.ipapiData.query + ",地址" + hqq.gameGlobal.ipapiData.regionName
            }
            if (hqq.gameGlobal.ipinfoData) {
                str += "\n登陆ipinfo:" + hqq.gameGlobal.ipinfoData.ip + ",地址" + hqq.gameGlobal.ipinfoData.region
            }
            str += "\n大厅版号:" + hqq.app.hallVersion;
            this.versionlabel.string = str
        }
    },

    onclickDownApk() {
        hqq.app.idDownApk = true
        cc.director.loadScene('loading')
    },

    // update (dt) {},

    onEnable() {
        hqq.eventMgr.register(hqq.eventMgr.refreshPlayerinfo, "hallPersonLayer", this.setPlayerInfo.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.getPayInfo, "hallPersonLayer", this.getPayInfo.bind(this))
    },

    onDisable() {
        hqq.eventMgr.unregister(hqq.eventMgr.getPayInfo, "hallPersonLayer")
        hqq.eventMgr.unregister(hqq.eventMgr.refreshPlayerinfo, "hallPersonLayer")
    },

    onDestroy() {
        hqq.eventMgr.unregister(hqq.eventMgr.getPayInfo, "hallPersonLayer")
        hqq.eventMgr.unregister(hqq.eventMgr.refreshPlayerinfo, "hallPersonLayer")
    },
});
