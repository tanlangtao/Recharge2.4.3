

cc.Class({
    extends: cc.Component,

    properties: {
        usdtnode: cc.Node,
        proxycode: cc.Node,
        register: cc.Node,
        changehead: cc.Node,
        bindalipay: cc.Node,
        nickchange: cc.Node,
        login: cc.Node,
        nologin: cc.Node,
        download: cc.Node,
        tiplayer: cc.Node,
        tiplayerinfo: cc.Label,
        imnode: cc.Node,

        exitbtn: cc.Node,
        surecg: cc.Node,

        headscroll: cc.ScrollView,
        headitem: cc.Node,

        weblogin:cc.Node,
        setting:cc.Node,
    },

    onLoad() {
        
    },

    start() {

    },
    // UI动态加载
    UILoad() {
        if(!cc.isValid(this.node)){
            console.log("hallPSubsLayer UILoad 节点不存在")
            return;
        }
        this.back = cc.find("smallsublayer/p_bandalibg")
        let closebtn = cc.find("smallsublayer/p_close")
        let surecg = cc.find("smallsublayer/surecg")

        let title_changehead = cc.find("smallsublayer/changehead/title_changehead")

        // let title_bdali = cc.find("smallsublayer/bindalipay/title_bdali")
        // let bdali_form = cc.find("smallsublayer/bindalipay/bdali_form")
        // let alipayeditboxnode = cc.find("smallsublayer/bindalipay/alipayeditbox")
        // let shoukuanrennode = cc.find("smallsublayer/bindalipay/shoukuanren")
        // hqq.editboxTipLoad(alipayeditboxnode, "alipayaccount")
        // hqq.editboxTipLoad(shoukuanrennode, "receivername")

        let titile_tip = cc.find("smallsublayer/nickchange/titile_tip")
        let inputurnickname = cc.find("smallsublayer/nickchange/inputurnickname")
        let nickeditbox = cc.find("smallsublayer/nickchange/nickeditbox")
        if(hqq.app.pinpai==="juding"){
            hqq.editboxTipLoad(nickeditbox, "changenickname")
        } else{
            hqq.editboxTipLoad(nickeditbox, "largelen")
        }

        let title_login = cc.find("smallsublayer/login/title_login")
        let txt_forgetpwd = cc.find("smallsublayer/login/txt_forgetpwd")
        let login_form = cc.find("smallsublayer/login/login_form")
        let phoneeditboxnode = cc.find("smallsublayer/login/phoneeditbox")
        let passeditboxnode = cc.find("smallsublayer/login/passeditbox")
        hqq.editboxTipLoad(phoneeditboxnode, "enteridorphone")
        hqq.editboxTipLoad(passeditboxnode, "enterpass")

        let label = cc.find("smallsublayer/nologin/label")
        label.getComponent(cc.Label).string = hqq.getTip("accontloginother")

        let copybtn = cc.find("smallsublayer/download/copybtn")
        let downlabel = cc.find("smallsublayer/download/downlabel")
        downlabel.getComponent(cc.Label).string = hqq.getTip("reinstall")
        let downlabel2 = cc.find("smallsublayer/download/downlabel2")
        downlabel2.getComponent(cc.Label).string = hqq.getTip("downtip")
        let btnlabel = cc.find("smallsublayer/download/copybtn/btnlabel")
        btnlabel.getComponent(cc.Label).string = hqq.getTip("copy")

        let title = cc.find("smallsublayer/imnode/title")

        let weblabel = cc.find("smallsublayer/imnode/web/weblabel")

        let applabel = cc.find("smallsublayer/imnode/app/applabel")
        let webbtn = cc.find("smallsublayer/imnode/web")
        let appbtn = cc.find("smallsublayer/imnode/app")

        let accountnode = cc.find("smallsublayer/register/account")
        hqq.editboxTipLoad(accountnode, "enteraccount")
        let pass0node = cc.find("smallsublayer/register/pass0")
        hqq.editboxTipLoad(pass0node, "pass0")
        let pass1node = cc.find("smallsublayer/register/pass1")
        hqq.editboxTipLoad(pass1node, "pass1")
        let registertitle = cc.find("smallsublayer/register/title")
        registertitle.getComponent(cc.Label).string = hqq.getTip("registertitle")
        let title0 = cc.find("smallsublayer/register/title0")
        title0.getComponent(cc.Label).string = hqq.getTip("account")
        let tip0 = cc.find("smallsublayer/register/tip0")
        tip0.getComponent(cc.Label).string = hqq.getTip("tip0")
        let title1 = cc.find("smallsublayer/register/title1")
        title1.getComponent(cc.Label).string = hqq.getTip("title1")
        let tip1 = cc.find("smallsublayer/register/tip1")
        tip1.getComponent(cc.Label).string = hqq.getTip("tip1")
        let title2 = cc.find("smallsublayer/register/title2")
        title2.getComponent(cc.Label).string = hqq.getTip("title2")

        let info = cc.find("smallsublayer/proxycode/info")
        info.getComponent(cc.Label).string = hqq.getTip("proxy")
        let codeeditboxnode = cc.find("smallsublayer/proxycode/codeeditbox")
        hqq.editboxTipLoad(codeeditboxnode, "enterproxy")

        let usdttitle = cc.find("smallsublayer/bindusdt/title_usdt")
        let usdteditboxback = cc.find("smallsublayer/bindusdt/popup_usdt_frame")
        this.usdtadress = cc.find("smallsublayer/bindusdt/adress")
        hqq.editboxTipLoad(this.usdtadress, "usdtaddress")
        let usdttip = cc.find("smallsublayer/bindusdt/tishi")
        usdttip.getComponent(cc.Label).string = hqq.getTip("usdttip")
        this.usdttype = cc.find("smallsublayer/bindusdt/type")

        hqq.setBtn(cc.find("login",this.weblogin),{callback:"weblogin_login",script:this});
        hqq.setBtn(cc.find("register",this.weblogin),{callback:"weblogin_register",script:this});

        if (hqq.app.pinpai == "fuxin" ) {
            tip0.getComponent(cc.Label).fontSize = 28
            tip0.getComponent(cc.Label).lineHeight = 28
            tip1.getComponent(cc.Label).fontSize = 28
            tip1.getComponent(cc.Label).lineHeight = 28
            let bpath = "base/fuxin/img/"
            let blpath = "base/language/" + hqq.language + "/fuxin/"
            hqq.addNode(this.back, { path: bpath + "tck", width: 420, anchorX: 1, type: cc.Sprite.Type.SLICED })
            hqq.addNode(this.back, { path: bpath + "tck", width: 420, anchorX: 1, scaleX: -1, type: cc.Sprite.Type.SLICED })

            hqq.setBtn(surecg, { path: bpath + "anniu4" })
            hqq.addNode(surecg, { path: blpath + "qr" })
            hqq.setBtn(closebtn, { path: bpath + "guanbi", x: 400, y: 250 })
             
            hqq.setSprite(title_changehead, { path: blpath + "txxg", y: 250 })
            let changehead_di = cc.find("smallsublayer/changehead/changehead_di")
            changehead_di.active = false

            hqq.setSprite(titile_tip, { path: blpath + "denglubiaoti", y: 250 })
            hqq.setSprite(inputurnickname, { path: bpath + "srk", y: 20, width: 600, type: cc.Sprite.Type.SLICED })

            hqq.setSprite(title_login, { path: blpath + "denglubiaoti", y: 250 })
            login_form.active = false
            let login = cc.find("smallsublayer/login")
            hqq.addNode(login, { path: bpath + "srk", zIndex: -1, width: 560, y: 100, type: cc.Sprite.Type.SLICED })
            hqq.addNode(login, { path: bpath + "srk", zIndex: -1, width: 560, type: cc.Sprite.Type.SLICED })
            hqq.addNode(login, { path: bpath + "1", x: -250, y: 100, })
            hqq.addNode(login, { path: bpath + "2", x: -250, y: 0, })
            hqq.setBtn(txt_forgetpwd, { path: blpath + "wjmm" })

            hqq.setBtn(copybtn, { path: bpath + "anniu4" })
            hqq.setNode(btnlabel, { color: cc.color(187, 187, 187) })

            hqq.setSprite(title, { path: blpath + "kefubiaoti", y: 245 })
            hqq.setBtn(webbtn, { path: bpath + "anniu3" })
            hqq.setBtn(appbtn, { path: bpath + "anniu3", active: false })
            weblabel.color = new cc.Color(255, 255, 255)
            applabel.color = new cc.Color(255, 255, 255)
            weblabel.getComponent(cc.Label).string = hqq.getTip("weblabel")
            applabel.getComponent(cc.Label).string = hqq.getTip("applabel")

            let rlogin_form = cc.find("smallsublayer/register/login_form")
            rlogin_form.active = false
            let login_form1 = cc.find("smallsublayer/register/login_form1")
            login_form1.active = false
            let register = cc.find("smallsublayer/register")
            hqq.addNode(register, { path: bpath + "srk", zIndex: -1, width: 460, x: 40, y: 105, type: cc.Sprite.Type.SLICED })
            hqq.addNode(register, { path: bpath + "srk", zIndex: -1, width: 460, x: 40, y: 5, type: cc.Sprite.Type.SLICED })
            hqq.addNode(register, { path: bpath + "srk", zIndex: -1, width: 460, x: 40, y: -95, type: cc.Sprite.Type.SLICED })
            hqq.setNode(registertitle, { y: 250, color: cc.color(255, 255, 255) })

            let proxycodechangehead_di = cc.find("smallsublayer/proxycode/changehead_di")
            hqq.setSprite(proxycodechangehead_di, { path: bpath + "srk", width: 550, type: cc.Sprite.Type.SLICED })

            let bindusdt = cc.find("smallsublayer/bindusdt")
            hqq.addNode(bindusdt, { path: bpath + "srk", zIndex: -1, width: 570, x: 80, y: 105, type: cc.Sprite.Type.SLICED })
            hqq.addNode(bindusdt, { path: bpath + "srk", zIndex: -1, width: 460, x: 25, y: -15, type: cc.Sprite.Type.SLICED })
            hqq.setSprite(usdttitle, { path: blpath + "usdtbiaoti", x:50 , y: 250 })
            hqq.addNode(bindusdt, { path: blpath + "llx", x: -250, y: -15 })
            hqq.addNode(bindusdt, { path: blpath + "qbdz", x: -260, y: 105 })

            info.getComponent(cc.Label).string = hqq.getTip("proxy2")
            
        } else if (hqq.app.pinpai == "xingui") {
            let bpath = "base/xingui/img/"
            let blpath = "base/language/" + hqq.language + "/xingui/"
            hqq.setSprite(this.back, { path: "base/xingui/img/d_tc", size: { width: 880 } })
            hqq.setBtn(surecg, { path: "base/xingui/img/btn_1" })
            hqq.addNode(surecg, { path: blpath + "qued" })
            hqq.setBtn(closebtn, { path: bpath + "btn_x", position: { x: 395, y: 200 } })

            hqq.setBtn(copybtn, { path: "base/xingui/img/btn_1" })

            hqq.setSprite(title_changehead, { path: blpath + "txxg", position: { x: 0, y: 205 } })

            hqq.setSprite(title_login, { path: blpath + "dengl", position: { x: 0, y: 205 } })
            hqq.setBtn(txt_forgetpwd, { path: "base/language/" + hqq.language + "/img/txt_forgetpwd" })

            hqq.setBtn(webbtn, { path: "base/xingui/img/btn_1" })
            hqq.setBtn(appbtn, { path: "base/xingui/img/btn_1", active: false })
            weblabel.color = new cc.Color(255, 255, 255)
            applabel.color = new cc.Color(255, 255, 255)

            hqq.setSprite(usdttitle, { path: blpath + "bd", y: 200 })
            hqq.setSprite(usdteditboxback, { path: blpath + "z1" })

            weblabel.getComponent(cc.Label).string = hqq.getTip("weblabel")
            applabel.getComponent(cc.Label).string = hqq.getTip("applabel")
        } else if (hqq.app.pinpai == "xinsheng" || hqq.app.pinpai == "xinlong") {
            let xpath = "base/xinsheng/img/"
            let xlpath = "base/language/" + hqq.language + "/xinsheng/"
            hqq.setSprite(this.back, { path: xpath + "back1", size: { width: 880 } })
            hqq.setBtn(surecg, { path: xpath + "btnback" })
            hqq.setBtn(closebtn, { path: xpath + "exit", position: { x: 395, y: 225 } })
            let node = new cc.Node();
            hqq.setSprite(node, { path: xlpath + "queding" })
            surecg.addChild(node)
            hqq.setBtn(surecg, { path: xpath + "btnback", position: { x: 0, y: -210 } })

            hqq.setSprite(title_changehead, { path: xlpath + "txxg", position: { x: -250, y: 216 } })

            // hqq.setSprite(title_bdali, { path: blpath + "title_bdali" })
            // hqq.setSprite(bdali_form, { path: blpath + "bdali_form" })

            // hqq.setSprite(titile_tip, { path: blpath + "titile_tip" })
            // hqq.setSprite(inputurnickname, { path: blpath + "inputurnickname" })
            hqq.setBtn(copybtn, { path: xpath + "btnback" })

            hqq.setSprite(title_login, { path: xlpath + "denglu", position: { x: -300, y: 220 } })
            hqq.setBtn(txt_forgetpwd, { path: xlpath + "wjmm" })

            hqq.setBtn(webbtn, { path: xpath + "btnback" })
            hqq.setBtn(appbtn, { path: xpath + "btnback" })

            hqq.setSprite(usdttitle, { path: xlpath + "title_usdt" })
            hqq.setSprite(usdteditboxback, { path: xlpath + "popup_usdt_frame" })

            title.getComponent(cc.Label).string = hqq.getTip("imchoice")
            weblabel.getComponent(cc.Label).string = hqq.getTip("weblabel")
            applabel.getComponent(cc.Label).string = hqq.getTip("applabel")
        } else if (hqq.app.pinpai == "juding" ) {
            tip0.getComponent(cc.Label).fontSize = 28
            tip0.getComponent(cc.Label).lineHeight = 28
            tip1.getComponent(cc.Label).fontSize = 28
            tip1.getComponent(cc.Label).lineHeight = 28
            let bpath = "base/juding/img/"
            let blpath = "base/language/" + hqq.language + "/juding/"
            let hpath = "hall/juding/img/"
            let hlpath = "hall/language/" + hqq.language + "/juding/"
            hqq.setSprite(this.back, { path: hpath + "jd_p_bandalibg_1", width: 857, height: 529 })
            hqq.setBtn(surecg, { path: hpath + "jd_p_btn_1_3" })
            hqq.addNode(surecg, { string: "qr",fontSize:32,color:cc.color("#94510A"),y:-10,bold:true })
            hqq.setBtn(closebtn, { path: hpath + "jd_popup_btn_close", x: 365, y: 221 , width:119, height:70})
             
            hqq.setSprite(title_changehead, { path: hlpath + "jd_popup_title_profile", x:-315,y: 225 })
            let changehead_di = cc.find("smallsublayer/changehead/changehead_di")
            changehead_di.active = false

            hqq.setSprite(titile_tip, { path: hlpath + "jd_popup_title_changeNickname", x:-315,y: 225 })
            hqq.setSprite(inputurnickname, { path: hpath + "jd_p_inputBox_1", y: 20, width: 600, type: cc.Sprite.Type.SLICED })

            hqq.setSprite(title_login, { path: hlpath + "denglu", x:-320,y: 230 })
            login_form.active = false
            let login = cc.find("smallsublayer/login")
            hqq.addNode(login, { path: hpath + "jd_p_inputBox_1", zIndex: -1, width: 560, y: 100, type: cc.Sprite.Type.SLICED })
            hqq.addNode(login, { path: hpath + "jd_p_inputBox_1", zIndex: -1, width: 560, type: cc.Sprite.Type.SLICED })
            hqq.addNode(login, { path: hpath + "shoujid", x: -250, y: 100, })
            hqq.addNode(login, { path: hpath + "suotou", x: -250, y: 0, })
            hqq.setBtn(txt_forgetpwd, { path: blpath + "wjmm" })
            login.getChildByName("phoneeditbox").getChildByName("TEXT_LABEL").color = cc.color("#546277");
            login.getChildByName("phoneeditbox").getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            login.getChildByName("phoneeditbox").getChildByName("PLACEHOLDER_LABEL").color = cc.color("#546277");
            login.getChildByName("phoneeditbox").getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;

            login.getChildByName("passeditbox").getChildByName("TEXT_LABEL").color = cc.color("#546277");
            login.getChildByName("passeditbox").getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            login.getChildByName("passeditbox").getChildByName("PLACEHOLDER_LABEL").color = cc.color("#546277");
            login.getChildByName("passeditbox").getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;


            hqq.setBtn(copybtn, { path: hpath + "jd_p_btn_1_3" })
            hqq.setNode(btnlabel, { color: cc.color(187, 187, 187) })

            hqq.addNode(this.imnode, { path: hlpath + "kffkxz", x:-280,y: 230 })
            hqq.setBtn(webbtn, { path: hpath + "jd_p_btn_1_1" })
            hqq.setBtn(appbtn, { path: hpath + "jd_p_btn_1_1", active: false })
            weblabel.color = new cc.Color(255, 255, 255)
            applabel.color = new cc.Color(255, 255, 255)
            weblabel.getComponent(cc.Label).string = hqq.getTip("weblabel")
            applabel.getComponent(cc.Label).string = hqq.getTip("applabel")

            let rlogin_form = cc.find("smallsublayer/register/login_form")
            rlogin_form.active = false
            let login_form1 = cc.find("smallsublayer/register/login_form1")
            login_form1.active = false
            let register = cc.find("smallsublayer/register")
            hqq.addNode(register,{path:hlpath+"jd_popup_form_signUp"});
            hqq.addNode(register,{path:hlpath+"jd_popup_title_signUp",x:-350,y:225});
            registertitle.active = false;
            title0.active = false;
            title1.active = false;
            title2.active = false;
            accountnode.x = 120;
            accountnode.y = 115;
            accountnode.getChildByName("TEXT_LABEL").color = cc.color("#546277");
            accountnode.getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            accountnode.getChildByName("PLACEHOLDER_LABEL").color = cc.color("#546277");
            accountnode.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            pass0node.x = 120;
            pass0node.y = 5;
            pass0node.getChildByName("TEXT_LABEL").color = cc.color("#546277");
            pass0node.getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            pass0node.getChildByName("PLACEHOLDER_LABEL").color = cc.color("#546277");
            pass0node.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            pass1node.x = 120;
            pass1node.y = -105;
            pass1node.getChildByName("TEXT_LABEL").color = cc.color("#546277");
            pass1node.getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            pass1node.getChildByName("PLACEHOLDER_LABEL").color = cc.color("#546277");
            pass1node.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            tip0.color = cc.color("#EC6941")
            tip0.getComponent(cc.Label).fontSize = 24;
            tip0.getComponent(cc.Label).string = hqq.getTip("tip2")
            tip1.color = cc.color("#EC6941")
            tip1.getComponent(cc.Label).fontSize = 24;
            tip1.getComponent(cc.Label).string = hqq.getTip("tip3")

            let proxycodechangehead_di = cc.find("smallsublayer/proxycode/changehead_di")
            hqq.setSprite(proxycodechangehead_di, { path: hpath + "jd_p_inputBox_1", width: 550, type: cc.Sprite.Type.SLICED })
            cc.find("smallsublayer/proxycode/codeeditbox/TEXT_LABEL").color = cc.color("#546277");
            cc.find("smallsublayer/proxycode/codeeditbox/TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            cc.find("smallsublayer/proxycode/codeeditbox/PLACEHOLDER_LABEL").color = cc.color("#546277");
            cc.find("smallsublayer/proxycode/codeeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;

            let bindusdt = cc.find("smallsublayer/bindusdt")
            hqq.addNode(bindusdt, { path: hpath + "jd_p_inputBox_1", zIndex: -1, width: 570, x: 80, y: 105, type: cc.Sprite.Type.SLICED })
            hqq.addNode(bindusdt, { path: hpath + "jd_p_inputBox_1", zIndex: -1, width: 460, x: 25, y: -15, type: cc.Sprite.Type.SLICED })
            hqq.setSprite(usdttitle, { path: hlpath + "UST", x:-270,y: 225 })
            hqq.addNode(bindusdt, { string: "usdtllx", x: -260, y: -15 ,fontSize:32,color:cc.color("#485E9A"),bold:true})
            hqq.addNode(bindusdt, { string: "usdtqbdz", x: -270, y: 105 ,fontSize:32,color:cc.color("#485E9A"),bold:true})
            bindusdt.getChildByName("type").color = cc.color("#546277");
            bindusdt.getChildByName("adress").getChildByName("TEXT_LABEL").color = cc.color("#546277");
            bindusdt.getChildByName("adress").getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            bindusdt.getChildByName("adress").getChildByName("PLACEHOLDER_LABEL").color = cc.color("#546277");
            bindusdt.getChildByName("adress").getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            info.color = cc.color("#0B3460")
            info.getComponent(cc.Label).string = hqq.getTip("proxy2")
            this.tiplayerinfo.node.color = cc.color("#0B3460")
            this.tiplayerinfo.node.y -= 30;

            downlabel.color = cc.color("#546277");
            downlabel2.color = cc.color("#546277");
        } else if (hqq.app.pinpai == "huaxing" ) {
            tip0.getComponent(cc.Label).fontSize = 28
            tip0.getComponent(cc.Label).lineHeight = 28
            tip1.getComponent(cc.Label).fontSize = 28
            tip1.getComponent(cc.Label).lineHeight = 28
            let bpath = "base/huaxing/img/"
            let blpath = "base/language/" + hqq.language + "/huaxing/"
            let hpath = "hall/huaxing/img/"
            let hlpath = "hall/language/" + hqq.language + "/huaxing/"
            hqq.setSprite(this.back, { path: hpath + "d_ggtc", width: 857, height: 529 , type: cc.Sprite.Type.SLICED})
            hqq.setBtn(surecg, { path: hpath + "btn_2" })
            hqq.addNode(surecg, { string: "qr",fontSize:32,color:cc.color(255,255,255),y:-10,bold:true })
            hqq.setBtn(closebtn, { path: hpath + "btn_x", x: 420, y: 260 , width:78, height:78})
            hqq.setSprite(title_changehead, { path: hlpath + "17", x:0,y: 260 })
            let changehead_di = cc.find("smallsublayer/changehead/changehead_di")
            changehead_di.active = false

            // hqq.setSprite(titile_tip, { path: hlpath + "jd_popup_title_changeNickname", x:-315,y: 225 })
            titile_tip.active = false;
            hqq.addNode(cc.find("smallsublayer/nickchange"),{string:"nickchangetitle",x:0,y:255,bold:true,fontSize:45,lineHeight:50,color:cc.color(242,222,149)})
            hqq.setSprite(inputurnickname, { path: hpath + "4", y: 20, width: 600, type: cc.Sprite.Type.SLICED })

            hqq.setSprite(title_login, { path: hlpath + "15", x:0,y: 260 })
            login_form.active = false
            let login = cc.find("smallsublayer/login")
            hqq.addNode(login, { path: hpath + "4", zIndex: -1, width: 560, y: 100, type: cc.Sprite.Type.SLICED })
            hqq.addNode(login, { path: hpath + "4", zIndex: -1, width: 560, type: cc.Sprite.Type.SLICED })
            hqq.addNode(login, { path: hpath + "19", x: -250, y: 100, })
            hqq.addNode(login, { path: hpath + "18", x: -250, y: 0, })
            hqq.setBtn(txt_forgetpwd, { path: hlpath + "25" })
            // login.getChildByName("phoneeditbox").getChildByName("TEXT_LABEL").color = cc.color("#546277");
            login.getChildByName("phoneeditbox").getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            // login.getChildByName("phoneeditbox").getChildByName("PLACEHOLDER_LABEL").color = cc.color("#546277");
            login.getChildByName("phoneeditbox").getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;

            // login.getChildByName("passeditbox").getChildByName("TEXT_LABEL").color = cc.color("#546277");
            login.getChildByName("passeditbox").getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            // login.getChildByName("passeditbox").getChildByName("PLACEHOLDER_LABEL").color = cc.color("#546277");
            login.getChildByName("passeditbox").getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;


            hqq.setBtn(copybtn, { path: hlpath + "12" })
            // hqq.setNode(btnlabel, { color: cc.color(187, 187, 187) })

            hqq.addNode(this.imnode, { path: hlpath + "tit_kffk", x:0,y: 260 })
            hqq.setBtn(webbtn, { path: hpath + "btn_2" })
            hqq.setBtn(appbtn, { path: hpath + "btn_2", active: false })
            weblabel.color = new cc.Color(255, 255, 255)
            applabel.color = new cc.Color(255, 255, 255)
            weblabel.getComponent(cc.Label).string = hqq.getTip("weblabel")
            applabel.getComponent(cc.Label).string = hqq.getTip("applabel")

            let rlogin_form = cc.find("smallsublayer/register/login_form")
            rlogin_form.active = false
            let login_form1 = cc.find("smallsublayer/register/login_form1")
            login_form1.active = false
            let register = cc.find("smallsublayer/register")
            // hqq.addNode(register,{path:hlpath+"jd_popup_form_signUp"});
            hqq.addNode(register,{path:hlpath+"6",x:0,y:260});
            hqq.addNode(register, { path: hpath + "4", zIndex: -2, width: 630, x: 30, y: 150, type: cc.Sprite.Type.SLICED })
            hqq.addNode(register, { path: hpath + "4", zIndex: -2, width: 420, x: -75, y: 40, type: cc.Sprite.Type.SLICED })
            hqq.addNode(register, { path: hpath + "4", zIndex: -2, width: 420, x: -75, y: -70, type: cc.Sprite.Type.SLICED })
            hqq.addNode(register, { path: hpath + "19", zIndex: -1, x: -250, y: 150 })
            hqq.addNode(register, { path: hpath + "21", zIndex: -1, x: -250, y: 40 })
            hqq.addNode(register, { path: hpath + "18", zIndex: -1, x: -250, y: -70 })

            registertitle.active = false;
            title0.active = false;
            title1.active = false;
            title2.active = false;
            accountnode.x = 0;
            accountnode.y = 150;
            // accountnode.getChildByName("TEXT_LABEL").color = cc.color("#546277");
            accountnode.getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            // accountnode.getChildByName("PLACEHOLDER_LABEL").color = cc.color("#546277");
            accountnode.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            pass0node.x = 0;
            pass0node.y = 40;
            // pass0node.getChildByName("TEXT_LABEL").color = cc.color("#546277");
            pass0node.getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            // pass0node.getChildByName("PLACEHOLDER_LABEL").color = cc.color("#546277");
            pass0node.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            pass1node.x = 0;
            pass1node.y = -70;
            // pass1node.getChildByName("TEXT_LABEL").color = cc.color("#546277");
            pass1node.getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            // pass1node.getChildByName("PLACEHOLDER_LABEL").color = cc.color("#546277");
            pass1node.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            // tip0.color = cc.color("#EC6941")
            tip0.getComponent(cc.Label).fontSize = 24;
            tip0.getComponent(cc.Label).string = hqq.getTip("tip2")
            tip0.y = 95
            // tip1.color = cc.color("#EC6941")
            tip1.getComponent(cc.Label).fontSize = 24;
            tip1.getComponent(cc.Label).string = hqq.getTip("tip3")
            tip1.y = -15

            let proxycodechangehead_di = cc.find("smallsublayer/proxycode/changehead_di")
            hqq.setSprite(proxycodechangehead_di, { path: hpath + "4", width: 550, type: cc.Sprite.Type.SLICED })
            // cc.find("smallsublayer/proxycode/codeeditbox/TEXT_LABEL").color = cc.color("#546277");
            cc.find("smallsublayer/proxycode/codeeditbox/TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            // cc.find("smallsublayer/proxycode/codeeditbox/PLACEHOLDER_LABEL").color = cc.color("#546277");
            cc.find("smallsublayer/proxycode/codeeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;

            let bindusdt = cc.find("smallsublayer/bindusdt")
            hqq.addNode(bindusdt, { path: hpath + "4", zIndex: -1, width: 570, x: 90, y: 95, type: cc.Sprite.Type.SLICED })
            hqq.addNode(bindusdt, { path: hpath + "4", zIndex: -1, width: 460, x: 35, y: -25, type: cc.Sprite.Type.SLICED })
            hqq.setSprite(usdttitle, { path: hlpath + "13", x:0,y: 260 })
            hqq.addNode(bindusdt, { string: "usdtllx", x: -280, y: -25 ,fontSize:32,color:cc.color(232,169,98),bold:true})
            hqq.addNode(bindusdt, { string: "usdtqbdz", x: -290, y: 95 ,fontSize:32,color:cc.color(232,169,98),bold:true})
            // bindusdt.getChildByName("type").color = cc.color("#546277");
            // bindusdt.getChildByName("adress").getChildByName("TEXT_LABEL").color = cc.color("#546277");
            bindusdt.getChildByName("adress").x = -163;
            bindusdt.getChildByName("adress").getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            // bindusdt.getChildByName("adress").getChildByName("PLACEHOLDER_LABEL").color = cc.color("#546277");
            bindusdt.getChildByName("adress").getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            // info.color = cc.color("#0B3460")
            info.getComponent(cc.Label).string = hqq.getTip("proxy2")
            // this.tiplayerinfo.node.color = cc.color("#0B3460")
            this.tiplayerinfo.node.y -= 30;

            // downlabel.color = cc.color("#546277");
            // downlabel2.color = cc.color("#546277");
        } else if (hqq.app.pinpai == "ninetwo" ) {
            tip0.getComponent(cc.Label).fontSize = 28
            tip0.getComponent(cc.Label).lineHeight = 28
            tip1.getComponent(cc.Label).fontSize = 28
            tip1.getComponent(cc.Label).lineHeight = 28
            let bpath = "base/ninetwo/img/"
            let blpath = "base/language/" + hqq.language + "/ninetwo/"
            let hpath = "hall/ninetwo/img/"
            let hlpath = "hall/language/" + hqq.language + "/ninetwo/img/"
            if( this.data.type == 10 || this.data.type == 4  || this.data.type == 5){
                hqq.setSprite(this.back, { path: hpath + "kuangti3", width: 835, height: 296})
                hqq.setBtn(closebtn, { path: hpath + "guanbi", x: 410, y: 145 , width:60, height:60})
                hqq.setBtn(surecg, { path: hpath + "settinganiu" , x:0,y:-120})
                hqq.addNode(surecg, { string: "qr",fontSize:30,lineHeight:35,color:cc.color(59,31,11),y:-5,bold:true })
            } else if( this.data.type == 16 ){
                hqq.setSprite(this.back, { path: hpath + "d5", width: 923, height: 466})
                hqq.setBtn(closebtn, { path: hpath + "guanbi", x: 458, y: 230 , width:60, height:60})
            } else if( this.data.type == 8 || this.data.type == 12 ){
                hqq.setSprite(this.back, { path: hpath + "d", width: 814, height: 563})
                hqq.setBtn(closebtn, { path: hpath + "guanbi", x: 400, y: 280 , width:60, height:60})
                hqq.setBtn(surecg, { path: hpath + "settinganiu" , x:0,y:-200})
                hqq.addNode(surecg, { string: "qr",fontSize:30,lineHeight:35,color:cc.color(59,31,11),y:-5,bold:true })
            } else {
                hqq.setSprite(this.back, { path: hpath + "kuangti2", width: 673, height: 464})
                hqq.setBtn(closebtn, { path: hpath + "guanbi", x: 330, y: 230 , width:60, height:60})
                hqq.setBtn(surecg, { path: hpath + "settinganiu" , x:0,y:-180})
                hqq.addNode(surecg, { string: "qr",fontSize:30,lineHeight:35,color:cc.color(59,31,11),y:-5,bold:true })
            }
            // hqq.addNode(surecg, { string: "login",fontSize:10,color:cc.color(59,31,11),y:-10,bold:true })
            
            hqq.setSprite(title_changehead, { path: hlpath + "titleggtx", x:0,y: 198 })
            let changehead_di = cc.find("smallsublayer/changehead/changehead_di")
            hqq.setSprite(changehead_di,{path:hpath+"kuangti1",width:576,height:273,x:0,y:5});
            let headscroll = cc.find("smallsublayer/changehead/headscroll");
            hqq.setNode(headscroll,{width:576,height:273,x:0,y:5});
            hqq.setNode(headscroll.getComponent(cc.ScrollView)._view,{width:576,height:273});
            hqq.setNode(headscroll.getComponent(cc.ScrollView).content,{width:576,height:273,x:0,y:136});
            hqq.setSprite(this.headitem,{path:hpath+"dtxk",width:105,height:159})
            hqq.setNode(this.headitem.getChildByName("masknode"),{width:101,height:155});
            // hqq.setSprite(this.headitem.getChildByName("selectsp"),{path:hpath+"dtxk2",width:105,height:159,x:0,y:0})
            // hqq.setSprite(titile_tip, { path: hlpath + "jd_popup_title_changeNickname", x:-315,y: 225 })
            titile_tip.active = false;
            hqq.addNode(cc.find("smallsublayer/nickchange"),{string:"nickchangetitle",x:0,y:190,bold:true,fontSize:45,lineHeight:50,color:cc.color(242,222,149)})
            hqq.setSprite(inputurnickname, { path: hpath + "yjks", y: 20, width: 600, type: cc.Sprite.Type.SLICED })

            hqq.setSprite(title_login, { path: hlpath + "titledl", x:0,y: 110 })
            login_form.active = false
            let login = cc.find("smallsublayer/login")
            hqq.addNode(login, { path: hpath + "kuangti1", zIndex: -2, width: 576,height:150, x: 0, y: -10, type: cc.Sprite.Type.SLICED })
            let input1 = hqq.addNode(login, { path: hpath + "yjks", zIndex: -2, width: 513,height:36, x: 0, y: 20, type: cc.Sprite.Type.SLICED })
            hqq.addNode(input1,{path:hpath + "shouji",x:-240})
            let input4 = hqq.addNode(login, { path: hpath + "yjks", zIndex: -2, width: 513,height:36, x: 0, y: -40, type: cc.Sprite.Type.SLICED })
            hqq.addNode(input4,{path:hpath + "gfdsg",x:-240})

            let phoneeditbox = cc.find("smallsublayer/login/phoneeditbox");
            hqq.setNode(phoneeditbox,{width:480,height:36,x:17,y:20});
            hqq.setNode(phoneeditbox.getChildByName("BACKGROUND_SPRITE"),{width:480,height:36});
            hqq.setNode(phoneeditbox.getChildByName("TEXT_LABEL"),{width:480,height:36});
            hqq.setNode(phoneeditbox.getChildByName("PLACEHOLDER_LABEL"),{width:480,height:36,color:cc.color("#81817e")});

            let passeditbox = cc.find("smallsublayer/login/passeditbox");
            hqq.setNode(passeditbox,{width:480,height:36,x:17,y:-40});
            hqq.setNode(passeditbox.getChildByName("BACKGROUND_SPRITE"),{width:480,height:36});
            hqq.setNode(passeditbox.getChildByName("TEXT_LABEL"),{width:480,height:36});
            hqq.setNode(passeditbox.getChildByName("PLACEHOLDER_LABEL"),{width:480,height:36,color:cc.color("#81817e")});


            hqq.setBtn(copybtn, { path: hpath + "daanniu1" })
            hqq.setNode(btnlabel, { color: cc.color(59,31,11) })

            hqq.addNode(this.imnode, { path: hlpath + "tit_kffk", x:0,y: 260 })
            hqq.setBtn(webbtn, { path: hpath + "btn_2" })
            hqq.setBtn(appbtn, { path: hpath + "btn_2", active: false })
            weblabel.color = new cc.Color(255, 255, 255)
            applabel.color = new cc.Color(255, 255, 255)
            weblabel.getComponent(cc.Label).string = hqq.getTip("weblabel")
            applabel.getComponent(cc.Label).string = hqq.getTip("applabel")

            let rlogin_form = cc.find("smallsublayer/register/login_form")
            rlogin_form.active = false
            let login_form1 = cc.find("smallsublayer/register/login_form1")
            login_form1.active = false
            let register = cc.find("smallsublayer/register")
            hqq.addNode(register, { path: hpath + "kuangti1", zIndex: -2, width: 750,height:300, x: 0, y: 20, type: cc.Sprite.Type.SLICED })
            let registerinput1 = hqq.addNode(register, { path: hpath + "yjks", zIndex: -2, width: 513,height:36, x: 0, y: 135, type: cc.Sprite.Type.SLICED })
            hqq.addNode(registerinput1,{path:hpath + "shouji",x:-240})
            let registerinput2 = hqq.addNode(register, { path: hpath + "yjks", zIndex: -2, width: 513,height:36, x: 0, y: 30, type: cc.Sprite.Type.SLICED })
            hqq.addNode(registerinput2,{path:hpath + "gfdsg",x:-240})
            let registerinput3 = hqq.addNode(register, { path: hpath + "yjks", zIndex: -2, width: 513,height:36, x: 0, y: -60, type: cc.Sprite.Type.SLICED })
            hqq.addNode(registerinput3,{path:hpath + "gfdsg",x:-240})

            hqq.setNode(accountnode,{width:480,height:36,x:17,y:135});
            hqq.setNode(accountnode.getChildByName("BACKGROUND_SPRITE"),{width:480,height:36});
            hqq.setNode(accountnode.getChildByName("TEXT_LABEL"),{width:480,height:36});
            hqq.setNode(accountnode.getChildByName("PLACEHOLDER_LABEL"),{width:480,height:36,color:cc.color("#81817e")});

            hqq.setNode(pass0node,{width:480,height:36,x:17,y:30});
            hqq.setNode(pass0node.getChildByName("BACKGROUND_SPRITE"),{width:480,height:36});
            hqq.setNode(pass0node.getChildByName("TEXT_LABEL"),{width:480,height:36});
            hqq.setNode(pass0node.getChildByName("PLACEHOLDER_LABEL"),{width:480,height:36,color:cc.color("#81817e")});

            hqq.setNode(pass1node,{width:480,height:36,x:17,y:-60});
            hqq.setNode(pass1node.getChildByName("BACKGROUND_SPRITE"),{width:480,height:36});
            hqq.setNode(pass1node.getChildByName("TEXT_LABEL"),{width:480,height:36});
            hqq.setNode(pass1node.getChildByName("PLACEHOLDER_LABEL"),{width:480,height:36,color:cc.color("#81817e")});

            registertitle.getComponent(cc.Label).string = "";
            registertitle.setPosition(0,240);
            hqq.addNode(registertitle,{path:hlpath+"titlezczszh"});
            title0.active = false;
            title1.active = false;
            title2.active = false;
            
            // tip0.color = cc.color("#EC6941")
            tip0.getComponent(cc.Label).fontSize = 24;
            tip0.getComponent(cc.Label).string = hqq.getTip("tip2")
            tip0.y = 95
            // tip1.color = cc.color("#EC6941")
            tip1.getComponent(cc.Label).fontSize = 24;
            tip1.getComponent(cc.Label).string = hqq.getTip("tip3")
            tip1.y = -15

            let proxycodechangehead_di = cc.find("smallsublayer/proxycode/changehead_di")
            hqq.setSprite(proxycodechangehead_di, { path: hpath + "4", width: 550, type: cc.Sprite.Type.SLICED })
            // cc.find("smallsublayer/proxycode/codeeditbox/TEXT_LABEL").color = cc.color("#546277");
            cc.find("smallsublayer/proxycode/codeeditbox/TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            // cc.find("smallsublayer/proxycode/codeeditbox/PLACEHOLDER_LABEL").color = cc.color("#546277");
            cc.find("smallsublayer/proxycode/codeeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;

            let bindusdt = cc.find("smallsublayer/bindusdt")
            hqq.addNode(bindusdt, { path: hpath + "4", zIndex: -1, width: 570, x: 90, y: 95, type: cc.Sprite.Type.SLICED })
            hqq.addNode(bindusdt, { path: hpath + "4", zIndex: -1, width: 460, x: 35, y: -25, type: cc.Sprite.Type.SLICED })
            hqq.setSprite(usdttitle, { path: hlpath + "13", x:0,y: 260 })
            hqq.addNode(bindusdt, { string: "usdtllx", x: -280, y: -25 ,fontSize:32,color:cc.color(232,169,98),bold:true})
            hqq.addNode(bindusdt, { string: "usdtqbdz", x: -290, y: 95 ,fontSize:32,color:cc.color(232,169,98),bold:true})
            // bindusdt.getChildByName("type").color = cc.color("#546277");
            // bindusdt.getChildByName("adress").getChildByName("TEXT_LABEL").color = cc.color("#546277");
            bindusdt.getChildByName("adress").x = -163;
            bindusdt.getChildByName("adress").getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            // bindusdt.getChildByName("adress").getChildByName("PLACEHOLDER_LABEL").color = cc.color("#546277");
            bindusdt.getChildByName("adress").getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            // info.color = cc.color("#0B3460")
            info.getComponent(cc.Label).string = hqq.getTip("proxy2")
            // this.tiplayerinfo.node.color = cc.color("#0B3460")
            this.tiplayerinfo.node.y -= 30;

            // downlabel.color = cc.color("#546277");
            // downlabel2.color = cc.color("#546277");
        } else {
            let blpath = "base/language/" + hqq.language + "/img/"
            hqq.setSprite(this.back, { path: "base/img/p_bandalibg" })
            hqq.setBtn(closebtn, { path: "base/img/p_close" })
            hqq.setBtn(surecg, { path: blpath + "surecg" })

            hqq.setSprite(title_changehead, { path: blpath + "title_changehead" })

            // hqq.setSprite(title_bdali, { path: blpath + "title_bdali" })
            // hqq.setSprite(bdali_form, { path: blpath + "bdali_form" })

            hqq.setSprite(titile_tip, { path: blpath + "titile_tip" })
            hqq.setSprite(inputurnickname, { path: blpath + "inputurnickname" })

            hqq.setBtn(copybtn, { path: "base/img/getcodebtn" })

            hqq.setSprite(title_login, { path: blpath + "title_login" })
            hqq.setBtn(txt_forgetpwd, { path: blpath + "txt_forgetpwd" })

            hqq.setBtn(webbtn, { path: "base/img/getcodebtn" })
            hqq.setBtn(appbtn, { path: "base/img/getcodebtn", active: false })

            hqq.setSprite(usdttitle, { path: blpath + "title_usdt" })
            hqq.setSprite(usdteditboxback, { path: blpath + "popup_usdt_frame" })

            title.getComponent(cc.Label).string = hqq.getTip("imchoice")
            weblabel.getComponent(cc.Label).string = hqq.getTip("weblabel")
            applabel.getComponent(cc.Label).string = hqq.getTip("applabel")
        }
    },

    init(data) {
        this.headpanelinit = false
        this.changehead.active = false
        this.bindalipay.active = false
        this.nickchange.active = false
        this.login.active = false
        this.nologin.active = false
        this.tiplayer.active = false
        this.download.active = false
        this.weblogin.active = false;
        this.data = data

        this.UILoad();

        switch (data.type) {
            case 1: // 修改头像
                this.changehead.active = true
                if (!this.headpanelinit) {
                    this.headpanelinit = true
                    this.changeheadInit()
                }
                if(hqq.app.pinpai == "juding"){
                    let hpath = "hall/juding/img/"
                    hqq.addNode(this.back,{path: hpath + "jd_popup_inBg"});
                } else if(hqq.app.pinpai == "huaxing" ){
                    hqq.addNode(this.back, { path: "hall/huaxing/img/d_tit" , y:260})
                }
                break;
            case 2: // 绑定支付宝
                this.bindalipay.active = true
                break;
            case 3: // 修改昵称
                this.nickchange.active = true
                if(hqq.app.pinpai=="juding"){
                    let editboxEventHandler = new cc.Component.EventHandler();
                    editboxEventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
                    editboxEventHandler.component = "hallPSubsLayer"
                    editboxEventHandler.handler = "onnickchangetextChanged";

                    this.nickchange.getChildByName("nickeditbox").getComponent(cc.EditBox).editingDidEnded.push(editboxEventHandler);
                    this.nickchange.getChildByName("nickeditbox").getComponent(cc.EditBox).maxLength = 12;
                    cc.find("smallsublayer/nickchange/nickeditbox/TEXT_LABEL").color = cc.color("#546277");
                    cc.find("smallsublayer/nickchange/nickeditbox/PLACEHOLDER_LABEL").color = cc.color("#546277");
                }  else if(hqq.app.pinpai == "huaxing" ){
                    hqq.addNode(this.back, { path:"hall/huaxing/img/d_tit" , y:260})
                }
                break;
            case 4: // 切换账号
                this.login.active = true
                if( hqq.app.pinpai == "huaxing" ){
                    hqq.addNode(this.back, { path: "hall/huaxing/img/d_tit" , y:260})
                }
                break;
            case 5: // 切换账号 自动加 id 
                this.login.active = true
                if (hqq.gameGlobal.player.id) {
                    this.login.getChildByName("phoneeditbox").getComponent(cc.EditBox).string = hqq.gameGlobal.player.id
                }
                if( hqq.app.pinpai == "huaxing" ){
                    hqq.addNode(this.back, { path: "hall/huaxing/img/d_tit" , y:260})
                }
                break;
            case 6: // 账号掉线
                this.nologin.active = true
                this.exitbtn.active = false
                if (hqq.app.pinpai == "fuxin" ||hqq.app.pinpai == "juding") {
                    this.surecg.y = -220
                } else {
                    this.surecg.y = -140
                }
                if (cc.director.getScene().name != "hall"){
                    this.node.removeFromParent(true)
                    hqq.eventMgr.dispatch(hqq.eventMgr.refreshHallChongFuDenLu, null)
                    this.scheduleOnce(()=>{hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("accontloginother"))},0.5);
                }
                break;
            case 7: // 账号掉线 加自动登录
                this.login.active = true
                if (this.login.getChildByName("txt_autologin")) {
                    this.login.getChildByName("txt_autologin").active = true
                }
                if (this.login.getChildByName("txt_forgetpwd")) {
                    this.login.getChildByName("txt_forgetpwd").active = false
                }
                if (hqq.gameGlobal.player.id) {
                    this.login.getChildByName("phoneeditbox").getComponent(cc.EditBox).string = hqq.gameGlobal.player.id
                }
                break;
            case 8: // 安装包跳转下载
                this.download.active = true
                if (data.msg) {
                    let label = this.download.getChildByName('downlabel').getComponent(cc.Label)
                    label.string = data.msg || hqq.getTip("reinstall")
                }
                this.exitbtn.active = false
                this.surecg.y = -10
                this.clearLocalData()
                break;
            case 9: // 跳转浏览器网页客户端
                this.tiplayerinfo.string = data.msg || hqq.getTip("jumptoweb")
                this.tiplayer.active = true
                if (hqq.app.pinpai == "fuxin" ||hqq.app.pinpai == "juding" ) {
                    this.surecg.y = -220
                } else {
                    this.surecg.y = -140
                }
                break;
            case 10: // 任意提示信息
                this.tiplayerinfo.string = data.msg || hqq.getTip("goldlack")
                if (data.fontSize) {
                    this.tiplayerinfo.fontSize = data.fontSize
                    this.tiplayerinfo.lineHeight = data.fontSize * 1.3
                }
                if(data.fontcolor){
                    this.tiplayerinfo.node.color = data.fontcolor;
                }
                this.tiplayer.active = true
                if (hqq.app.pinpai == "fuxin") {
                    let blpath = "base/language/" + hqq.language + "/fuxin/";
                    hqq.addNode(this.tiplayerinfo.node, { path: blpath + "gonggaobiaoti2", y: 200, type: cc.Sprite.Type.SLICED })
                    this.surecg.y = -220
                } else if(hqq.app.pinpai == "juding"){
                    let hlpath = "hall/language/" + hqq.language + "/juding/";
                    hqq.addNode(this.tiplayerinfo.node, { path: hlpath + "gg", x:-350,y: 205, type: cc.Sprite.Type.SLICED })
                    this.surecg.y = -205
                    let hpath = "hall/juding/img/"
                    hqq.addNode(this.back,{path: hpath + "jd_popup_inBg"});
                }  else if(hqq.app.pinpai == "huaxing" ){
                    hqq.addNode(this.back, { path: "hall/huaxing/img/d_tit" , y:260})
                    hqq.addNode(this.back,{string:"gg",y:255,bold:true,fontSize:45,lineHeight:50,color:cc.color(242,222,149)})
                } else {
                    this.surecg.y = -140
                }
                break;
            case 11: // im选择
                this.imnode.active = true
                this.surecg.active = false
                if (hqq.app.pinpai == "xingui") {
                    hqq.addNode(this.back, { path: "base/language/" + hqq.language + "/xingui/kffk", y: 200 })
                } else if( hqq.app.pinpai == "huaxing" ){
                    hqq.addNode(this.back, { path: "hall/huaxing/img/d_tit" , y:260})
                }
                this.initImNode()
                break;
            case 12: // 注册
                this.register.active = true
                if( hqq.app.pinpai == "huaxing" ){
                    this.back.width = 897;
                    this.back.height = 609;
                    hqq.addNode(this.back, { path: "hall/huaxing/img/d_tit" , y:260})
                }
                break;
            case 13: // 输入上级ID
                this.proxycode.active = true
                if(hqq.app.pinpai == "juding "){
                    let hpath = "hall/juding/img/"
                    hqq.addNode(this.back,{path: hpath + "jd_popup_inBg"});
                } else if( hqq.app.pinpai == "huaxing" ){
                    hqq.addNode(this.back, { path: "hall/huaxing/img/d_tit" , y:260})
                    hqq.addNode(this.back,{string:"proxytitle",y:255,bold:true,fontSize:45,lineHeight:50,color:cc.color(242,222,149)})
                }
                break;
            case 14: // usdt
                this.usdtnode.active = true
                if(hqq.app.pinpai == "huaxing" ){
                    hqq.addNode(this.back, { path: "hall/huaxing/img/d_tit" , y:260})
                }
                break;
            case 15: // web登入
                this.back.active = false;
                this.surecg.removeAllChildren();
                this.surecg.active = false;
                this.scheduleOnce(()=>{
                    if(!cc.isValid(this.node))return;
                    this.back.removeAllChildren();
                    hqq.setSprite(this.back, { path: "base/img/web_sign_bg", size: { width: 700,height:470 } ,active:true})
                    this.weblogin.active = true;
                    let global = hqq.localStorage.getGlobal();
                    if(global.playerKey.account_name!=""&&global.playerKey.account_pass!=""){
                        this.weblogin_login();
                    } else{
                        this.weblogin_register();
                    }
                },0.5)
                break;
            case 16: // 设置
                cc.find("smallsublayer/p_close").setPosition(458,230)
                this.setting.active = true;
                this.onSettingMenuClick(null,1);
                break;
        }
        if (data.hideexitbtn) {
            this.exitbtn.active = false
        }
        if (data.exitfunc) {
            this.onClickExit = () => {
                this.node.removeFromParent(true)
                data.exitfunc()
            }
        }
    },
    randDeviceID() {
        let randID = ""
        for (let i = 0; i < 3; i++) {
            let s = Math.random().toString(36)
            randID += s.substring(s.indexOf(".") + 1)
        }
        return randID
    },
    registerTextEndCheck(event, customEventData) {
        let text = event.string
        if (text.length < 6) {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("tooshort"))
            return
        }
        if (text.length > 12) {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("toolong"))
            return
        }
        if (!text.match(/[0-9a-zA-Z]/g) || text.match(/[0-9a-zA-Z]/g).length != text.length) {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("notcontain"))
            return
        }
    },
    registerAccount() {
        let account = this.register.getChildByName("account").getComponent(cc.EditBox).string
        let pass0 = this.register.getChildByName("pass0").getComponent(cc.EditBox).string
        let pass1 = this.register.getChildByName("pass1").getComponent(cc.EditBox).string
        if (account.length < 6) {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("accountshort"))
            return
        }
        if (account.length > 12) {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("accountlong"))
            return
        }
        if (account.match(/[0-9a-zA-Z]/g).length != account.length) {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("accountnotcontain"))
            return
        }
        if (pass0.length < 6 || pass1.length < 6) {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("passshort"))
            return
        }
        if (pass0.length > 12) {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("passlong"))
            return
        }
        if (pass0 != pass1) {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("passdiff"))
            return
        }
        if (pass0.match(/[0-9a-zA-Z]/g).length != pass0.length) {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("passnotcontain"))
            return
        }
        let randid = this.randDeviceID()
        let callback = (data, url) => {
            if (data.code == 200) {
                this.onClickExit()
                hqq.gameGlobal.player.deviceid = randid
                hqq.app.deviceID = randid
                hqq.loginMgr.setPlayerInfo(data)
            } else {
                if (data.code == 404 && data.msg == "uuid is exists") {
                    randid = this.randDeviceID()
                    hqq.http.sendXMLHttpRequest({
                        method: 'POST',
                        urlto: hqq.app.server,
                        endurl: hqq.app.getIpPostEndUrl(9),
                        callback: callback,
                        failcallback: failcallback,
                        needJsonParse: true,
                        param: {
                            uuid: randid,
                            os: hqq.app.os,
                            package_name: hqq.app.packgeName,
                            account_pass: pass1,
                            game_nick: account,
                            role_name: account,
                            proxy_user_id: hqq.gameGlobal.player.code,
                        }
                    })
                } else {
                    hqq.logMgr.log("注册失败:" + data.code + ",信息:" + data, data.msg)
                    hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("registerfail1") + data.code + hqq.getTip("registerfail2") + data.msg)
                }
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            hqq.logMgr.log("注册失败:" + status + ",错误:" + err, readyState)
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("registerfail1") + status + hqq.getTip("registerfail3") + err)
        }
        if (!hqq.gameGlobal.player.code) {
            hqq.gameGlobal.player.code = hqq.app.getGeneralAgency()
        }
        hqq.http.sendXMLHttpRequest({
            method: 'POST',
            urlto: hqq.app.server,
            endurl: hqq.app.getIpPostEndUrl(9),
            callback: callback,
            failcallback: failcallback,
            needJsonParse: true,
            param: {
                uuid: randid,
                os: hqq.app.os,
                package_name: hqq.app.packgeName,
                account_pass: pass1,
                role_name: account,
                proxy_user_id: hqq.gameGlobal.player.code,
            }
        })
    },
    initImNode() {
        let web = this.imnode.getChildByName("web")
        var webclickEventHandler = new cc.Component.EventHandler();
        webclickEventHandler.target = this.node;
        webclickEventHandler.component = "hallPSubsLayer";
        webclickEventHandler.handler = "onClickImWeb";
        let webbutton = web.getComponent(cc.Button);
        webbutton.clickEvents.push(webclickEventHandler);

        let app = this.imnode.getChildByName("app")
        if (hqq.app.huanjin != "online") {
            app.active = true
        }
        var appclickEventHandler = new cc.Component.EventHandler();
        appclickEventHandler.target = this.node;
        appclickEventHandler.component = "hallPSubsLayer";
        appclickEventHandler.handler = "onCLlickImApp";
        let appbutton = app.getComponent(cc.Button);
        appbutton.clickEvents.push(appclickEventHandler);
    },
    onClickImWeb() {
        // hqq.eventMgr.dispatch(hqq.eventMgr.showTip, "客服系统更新中,请选择app端入口冾线上客服")
        // cc.sys.openURL("https://chatlink.mstatik.com/widget/standalone.html?eid=211901")
        // cc.sys.openURL("https://vue.livelyhelp.chat/chatwindow.aspx?platform=4a06-4ce4-926f-12e26e1043fa&planId=189&code=2abc&siteId=5001662&new=1&Skill=English&Product=LiveChat")
        cc.sys.openURL(hqq.app.versionJson.live_service.url1);
    },
    onCLlickImApp() {
        // cc.sys.openURL("http://www.kefu363.com/standalone.html?appId=M78540") // 404失效
        // cc.sys.openURL("http://livechats.bffkydw.cn/service.html?cid=M78540")
        if (hqq.subModel.im.lanchscene != "") {
            hqq.gameGlobal.imReceive = 0;
            hqq.reflect && hqq.reflect.setOrientation("portrait")
            cc.director.loadScene(hqq.subModel.im.lanchscene)
        } else {
            console.log("请配置im场景")
        }
    },

    // 清除本地缓存及可读写路径
    clearLocalData() {
        let islocalstorageClear = false
        if (hqq.localStorage) {
            islocalstorageClear = hqq.localStorage.clear()
            if (hqq.app.huanjin == 'dev') {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("deletelocalstorage"), islocalstorageClear)
            }
        }
        if (cc.sys.isBrowser) {
            return
        }
        let directory = jsb.fileUtils.getWritablePath()
        let isok = jsb.fileUtils.removeDirectory(directory)
        return isok
    },
    downLoadCallback() {
        if (hqq.app.downloadUrl) {
            cc.sys.openURL(hqq.app.downloadUrl)
        } else {
            if (hqq.app.pinpai == "test") {
                cc.sys.openURL("https://temp.wepic666.com?p=1&u=442619406")
            } else if (hqq.app.pinpai == "debi") {
                cc.sys.openURL("https://temp.wepic666.com?p=2&u=770256905")
            } else if (hqq.app.pinpai == "xingba") {
                cc.sys.openURL("https://temp.wepic666.com?p=3&u=811425071")
            } else if (hqq.app.pinpai == "xinsheng") {
                cc.sys.openURL("https://temp.wepic666.com?p=8&u=779681851")
            } else if (hqq.app.pinpai == "xingui") {
                cc.sys.openURL("https://temp.wepic666.com?p=9&u=800242589")
            } else if (hqq.app.pinpai == "fuxin" ) {
                cc.sys.openURL("https://temp.wepic666.com?p=10&u=250188151")
            } else if (hqq.app.pinpai == "xinhao") {
                cc.sys.openURL("https://temp.wepic666.com?p=11&u=341292395")
            }  else if (hqq.app.pinpai == "xinlong") {
                cc.sys.openURL("https://temp.wepic666.com?p=12&u=736282263")
            } else if (hqq.app.pinpai == "nineone"){
                cc.sys.openURL("https://temp.wepic666.com?p=6&u=541999022")
            } else if (hqq.app.pinpai == "huangshi"){
                cc.sys.openURL("https://temp.wepic666.com?p=13&u=195201705")
            } else if (hqq.app.pinpai == "juding"){
                cc.sys.openURL("https://temp.wepic666.com?p=15&u=855395847")
            } else if (hqq.app.pinpai == "huaxing"){
                cc.sys.openURL("https://temp.wepic666.com?p=18&u=657592379")
            } else if (hqq.app.pinpai == "ninetwo"){
                cc.sys.openURL("https://temp.wepic666.com?p=16&u=186959995")
            } else {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("downloadurlerr"))
            }
        }
    },
    nologinCallback() {
        this.node.removeFromParent(true)
        if (cc.director.getScene().name == "hall"){
            hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, { type: 7 })
        }         
        // this.exitbtn.active = true
        // this.nologin.active = false
        // this.surecg.y = this.surecg.y - 61
        // this.login.active = true
        // this.login.getChildByName("phoneeditbox").getComponent(cc.EditBox).string = hqq.gameGlobal.player.id
        // this.data = { type: 7 }
        // this.ensurefunc = this.loginCallback
    },

    changeheadCallback() {
        let callback = (data, url) => {
            if (data.code == 200) {
                hqq.app.setGameInfo({ game_img: data.msg, })
                this.onClickExit()
            } else {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("revisefail") + data.msg)
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("requestfail") + status + ",err:" + err, readyState)
        }

        let endurl = hqq.app.getIpPostEndUrl(8)
        let data = {
            id: hqq.gameGlobal.player.id,
            token: hqq.gameGlobal.token,
            image: this.headindex + ".png",
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

    alipayInputCheck(event) { // 支付宝账号输入检测
        let str = ''
        for (let i = 0; i < event.string.length; i++) {
            let input = event.string[i]
            if (!isNaN(input) || ((input >= 'A' && input <= 'Z') || (input >= 'a' && input <= 'z')) || input == "@" || input == ".") {
                str += event.string[i]
            } else if (/[^\u4e00-\u9fa5]/.test(event.string.charCodeAt(i))) { // @ 字符在里面
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("alipaynotsupport"))
            } else {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("alipayonlysupport"))
            }
        }
        this.bindalipay.getChildByName("alipayeditbox").getComponent(cc.EditBox).string = str
    },
    // 绑定支付宝
    bindalipayCallback() {
        let url = hqq.gameGlobal.pay.pay_host + "/api/payment_account/saveAccount"
        let alipayaccount = this.bindalipay.getChildByName("alipayeditbox").getComponent(cc.EditBox).string
        if (alipayaccount.length == 0) {
            return hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("alipayaccount"))
        }
        for (let i = 0; i < alipayaccount.length; i++) {
            let input = alipayaccount[i]
            if (!isNaN(input) || ((input >= 'A' && input <= 'Z') || (input >= 'a' && input <= 'z')) || input == "@" || input == ".") {
            } else {
                return hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("alipayonlysupport"))
            }
        }
        let shoukuanren = this.bindalipay.getChildByName("shoukuanren").getComponent(cc.EditBox).string
        if (shoukuanren.length == 0) {
            return hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("receivername"))
        }
        let obj = {};
        obj = {
            account_card: alipayaccount,
            account_name: shoukuanren,
        };
        let info = JSON.stringify(obj);
        let dataStr = "user_id=" + hqq.gameGlobal.pay.user_id
        dataStr += "&user_name=" + hqq.gameGlobal.pay.user_name
        dataStr += "&action=add&withdraw_type=1&type=2"
        dataStr += "&info=" + info
        dataStr += "&client=" + hqq.gameGlobal.pay.client
        dataStr += "&proxy_user_id=" + hqq.gameGlobal.pay.proxy_user_id
        dataStr += "&proxy_name=" + hqq.gameGlobal.pay.proxy_name
        dataStr += "&package_id=" + hqq.gameGlobal.pay.package_id
        dataStr += "&token=e40f01afbb1b9ae3dd6747ced5bca532"
        dataStr += "&version=1"
        dataStr += "&center_auth=" + hqq.gameGlobal.token
        let callback = (response) => {
            if (response.status == 0) {
                hqq.eventMgr.dispatch(hqq.eventMgr.getPayInfo)
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("actsuccess"))
                this.onClickExit()
            } else {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, response.msg)
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("requestfail") + status + hqq.getTip("registerfail3") + err, readyState)
        }
        hqq.http.sendXMLHttpRequest({
            method: 'POST',
            urlto: url,
            param: dataStr,
            callback: callback,
            needJsonParse: true,
            failcallback: failcallback,
        })
    },

    nickchangeCallback() {
        let callback = (data, url) => {
            if (data.code == 200) {
                hqq.eventMgr.dispatch(hqq.eventMgr.refreshPlayerinfo, { game_nick: data.msg })
                this.onClickExit()
            } else {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("revisefail") + data.msg)
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("requestfail") + status + hqq.getTip("registerfail3") + err, readyState)
        }

        let nick = this.nickchange.getChildByName("nickeditbox").getComponent(cc.EditBox).string
        if (nick == "") {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("usefulnick"))
            return
        }

        let tempstr = nick.replace(/[^\a-\z\A-\Z\u4E00-\u9FA5]/g,'');
        let strlength = 0;
        let i = 0;
        for( i = 0;i<tempstr.length;i++){
            let a = tempstr.charAt(i);
            strlength++;
            if(escape(a).length > 4 ){
                strlength++;
            }
        }
        if(strlength>12){
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("changenickname"))
            return
        }
        for( i = 0;i < hqq.unusestrlist.length;i++){
            if(tempstr.match(hqq.unusestrlist[i])){
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("changenicknamefail"))
                return;
            }
        }
        nick = tempstr;
        let endurl = hqq.app.getIpPostEndUrl(1)
        let data = {
            id: hqq.gameGlobal.player.id,
            token: hqq.gameGlobal.token,
            game_nick: nick,
        }
        cc.log(hqq.app.server + endurl)
        hqq.http.sendXMLHttpRequest({
            method: 'POST',
            urlto: hqq.app.server + endurl,
            param: data,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: true,
        })
    },

    loginCallback() {
        let account = this.login.getChildByName("phoneeditbox").getComponent(cc.EditBox).string
        let pass = this.login.getChildByName("passeditbox").getComponent(cc.EditBox).string
        hqq.loginMgr.accountChange(account, pass, (issucess) => {
            if (issucess) {
                this.onClickExit()
            } else {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("changeaccountfail"))
            }
        })
    },

    changeheadInit() {
        this.itemlist = []
        this.headindex = "1"
        let headlen = 10
        if(hqq.app.pinpai == "ninetwo" ){
            headlen = 4;
        }
        this.headscroll.content.height = Math.floor(headlen / 5) * 155
        let player = hqq.gameGlobal.player
        let headid = parseInt(player.headurl.substring(0, player.headurl.indexOf(".")))
        headid = headid % 10
        for (let i = 0; i < headlen; i++) {
            let headitem = cc.instantiate(this.headitem)
            if (hqq.app.pinpai == "fuxin" ) {
                let select = headitem.getChildByName("selectsp")
                hqq.setSprite(select, { path: "base/fuxin/img/xz" })
            } else if (hqq.app.pinpai == "xingui") {
                let select = headitem.getChildByName("selectsp")
                hqq.setSprite(select, { path: "base/xingui/img/gou" })
            } else if (hqq.app.pinpai == "juding" ) {
                let select = headitem.getChildByName("selectsp")
                hqq.setSprite(select, { path: "hall/juding/img/jd_personal_select" })
            } else if (hqq.app.pinpai == "huaxing" ) {
                let select = headitem.getChildByName("selectsp")
                hqq.setSprite(select, { path: "hall/huaxing/img/9" })
            } else if (hqq.app.pinpai == "ninetwo" ) {
                let select = headitem.getChildByName("selectsp")
                hqq.setSprite(select, { path: "hall/ninetwo/img/dtxk2",x:0,y:0 })
            }
            let head = headitem.getChildByName("masknode").getChildByName("head").getComponent(cc.Sprite)
            
            let x = i % 5
            let y = Math.floor(i / 5)
            
            if(hqq.app.pinpai == "ninetwo" ){
                let headconver = [0,3,6,8];
                cc.log("changeheadInit i=",i," headconver[i]=",headconver[i])
                hqq.commonTools.loadHeadRes(headconver[i], head,101)
                headitem.setPosition( 140 * (i - 1.5) , -130 )
            } else{
                hqq.commonTools.loadHeadRes(i, head,101)
                headitem.setPosition(156 * (x - 2), 155 * (-0.5 - y))
            }
            headitem.active = true
            this.itemlist.push(headitem)
            var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node;
            clickEventHandler.component = "hallPSubsLayer";
            clickEventHandler.customEventData = i;
            clickEventHandler.handler = "onClickHeadItem";
            let button = headitem.getComponent(cc.Button);
            button.clickEvents.push(clickEventHandler);

            this.headscroll.content.addChild(headitem)
            if (headid == i) {
                this.onClickHeadItem({ target: headitem }, headid)
            }
        }
    },

    onClickHeadItem(event, custom) {
        this.headindex = custom + ""
        event.target.getChildByName("selectsp").active = true
        for (let i = 0; i < this.itemlist.length; i++) {
            if (custom == i) {
            } else {
                this.itemlist[i].getChildByName("selectsp").active = false
            }
        }
    },

    onClickForgetPass() {
        hqq.eventMgr.dispatch(hqq.eventMgr.showBiglayer, 1)
        this.onClickExit()
    },

    onClickAutoLogin() {
        hqq.loginMgr.autoLogin()
    },

    onClickCopyDownurl() {
        if (hqq.reflect) {
            if (hqq.reflect.setClipboard(hqq.app.downloadUrl)) {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("copyurlsuccess"))
            } else {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("copyurlfail"))
            }
        }
    },

    onClickExit() {
        this.node.removeFromParent(true)
    },
    charCodeAddress(s) {
        var ret = false;
        for (var i = 0; i < s.length; i++) {//遍历每一个文本字符bai
            //只要包含中文,就返回true
            if (s.charCodeAt(i) >= 10000) {
                ret = true
            }
        }
        if (s.charCodeAt(0) != 48 || s.charCodeAt(1) != 120) {
            //开头不是0x，返回true
            ret = true
        }
        if (s.length != 42) {
            //长度不是42位，返回true
            ret = true
        }
        return ret
    },
    onClickUSDT() {
        let address = this.usdtadress.getComponent(cc.EditBox).string
        if (address == '') {
            return hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("needaddress"))
        } else if (this.charCodeAddress(address)) {
            return hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("wrongaddress"))
        } else {
            var url = hqq.gameGlobal.pay.pay_host + `/api/payment_account/saveAccount`;
            let obj = {
                wallet_addr: address,
                protocol: this.usdttype.getComponent(cc.Label).string,
            };
            let info = JSON.stringify(obj);
            let dataStr = "user_id=" + hqq.gameGlobal.pay.user_id
            dataStr += "&user_name=" + hqq.gameGlobal.pay.user_name
            dataStr += "&action=add&type=4"
            dataStr += "&info=" + info
            dataStr += "&client=" + hqq.gameGlobal.pay.client
            dataStr += "&proxy_user_id=" + hqq.gameGlobal.pay.proxy_user_id
            dataStr += "&proxy_name=" + hqq.gameGlobal.pay.proxy_name
            dataStr += "&package_id=" + hqq.gameGlobal.pay.package_id
            dataStr += "&token=e40f01afbb1b9ae3dd6747ced5bca532"
            dataStr += "&version=1"
            dataStr += "&center_auth=" + hqq.gameGlobal.token
            let callback = (response) => {
                if (response.status == 0) {
                    hqq.eventMgr.dispatch(hqq.eventMgr.getPayInfo)
                    hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("actsuccess"))
                    this.onClickExit()
                } else {
                    hqq.eventMgr.dispatch(hqq.eventMgr.showTip, response.msg)
                }
            }
            let failcallback = (status, forcejump, url, err, readyState) => {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("requestfail") + status + hqq.getTip("registerfail3") + err, readyState)
            }
            hqq.http.sendXMLHttpRequest({
                method: 'POST',
                urlto: url,
                param: dataStr,
                callback: callback,
                needJsonParse: true,
                failcallback: failcallback,
            })
        }
    },

    onClickSure() {
        switch (this.data.type) {
            case 1: // 修改头像
                this.changeheadCallback()
                break;
            case 2: // 绑定支付宝
                this.bindalipayCallback()
                break;
            case 3: // 修改昵称
                this.nickchangeCallback()
                break;
            case 4: // 切换账号
                this.loginCallback()
                break;
            case 5: // 切换账号 自动加 id 
                this.loginCallback()
                break;
            case 6: // 账号掉线
                this.nologinCallback()
                break;
            case 7: // 账号掉线 加自动登录
                this.loginCallback()
                break;
            case 8: // 安装包跳转下载
                this.downLoadCallback()
                break;
            case 9: // 跳转浏览器网页客户端
                this.openUrl()
                break;
            case 10: // 任意提示信息
            case 11: // im选择
                if (this.data.ensurefunc) {
                    this.data.ensurefunc()
                } else {
                    this.onClickExit()
                }
                break
            case 12: // 注册
                if (this.data.ensurefunc) {
                    this.data.ensurefunc()
                } else {
                    this.registerAccount()
                }
                break;
            case 13: // 输入上级ID
                let code = this.proxycode.getChildByName("codeeditbox").getComponent(cc.EditBox).string
                let matchlist = code.match(/[0-9]/g)
                if (!matchlist || matchlist.length != code.length) {
                    hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("onlynumber"))
                    return
                }
                this.node.removeFromParent()
                if (this.data.ensurefunc) {
                    this.data.ensurefunc(code)
                } else {
                    hqq.gameGlobal.player.code = code
                    hqq.loginMgr.firstLogin()
                }
                break;
            case 14: // usdt
                this.onClickUSDT()
                break;
            case 15: // 网页版登入
                this.weblogin_click();
                break;
        }
    },
    weblogin_login(){
        hqq.setSprite(cc.find("form",this.weblogin),{path:"base/language/CN/img/web_signIn_form"});
        let account = cc.find("account",this.weblogin);
        account.setPosition(35,25);
        let url = window.location.search;
        let accountstr = null;
        let passstr = null;
        let global = hqq.localStorage.getGlobal();
        if( global.playerKey.account_name != "" && global.playerKey.account_pass != "" ){
            accountstr = global.playerKey.account_name;
            passstr = global.playerKey.account_pass;
        } else if (url.includes("?")){
            let strs = url.split("?")[1].split("&");
            for (let i = 0; i < strs.length; i++) {
                let temp = strs[i].split("=")[1];
                if (strs[i].split("=")[0] == "account") {
                    accountstr = temp;
                } else if (strs[i].split("=")[0] == "pass") {
                    passstr = temp;
                }  else if (strs[i].split("=")[0] == "webloginparam") {
                    var uncrypted = hqq.base64.decode(decodeURIComponent(temp));
                    uncrypted = JSON.parse(uncrypted)
                    accountstr = uncrypted.account;
                    passstr = uncrypted.password;
                }
                console.log(temp)
            }
        }
        if(accountstr){
            account.getComponent(cc.EditBox).string = accountstr;
        }
        let pass0 = cc.find("pass0",this.weblogin);
        pass0.setPosition(35,-80);
        if(passstr){
            pass0.getComponent(cc.EditBox).string = passstr;
        }
        cc.find("pass1",this.weblogin).active = false;
        hqq.setBtn(this.surecg, { path: "base/language/CN/img/web_signIn" ,active:true})
    },
    weblogin_register(){
        hqq.setSprite(cc.find("form",this.weblogin),{path:"base/language/CN/img/web_signUp_form"});
        let account = cc.find("account",this.weblogin);
        account.setPosition(35,39);
        account.getComponent(cc.EditBox).string = "";
        let pass0 = cc.find("pass0",this.weblogin);
        pass0.setPosition(35,-40);
        pass0.getComponent(cc.EditBox).string = "";
        let pass1 = cc.find("pass1",this.weblogin);
        pass1.active = true;
        hqq.setBtn(this.surecg, { path: "base/language/CN/img/web_signUp" , active:true})
    },

    weblogin_click() {
        if(this.weblogin.getChildByName("pass1").active){// 注册
            let account = this.weblogin.getChildByName("account").getComponent(cc.EditBox).string
            let pass0 = this.weblogin.getChildByName("pass0").getComponent(cc.EditBox).string
            let pass1 = this.weblogin.getChildByName("pass1").getComponent(cc.EditBox).string
            if (account.length < 6) {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("accountshort"))
                return
            }
            if (account.length > 12) {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("accountlong"))
                return
            }
            if (account.match(/[0-9a-zA-Z]/g).length != account.length) {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("accountnotcontain"))
                return
            }
            if (pass0.length < 6 || pass1.length < 6) {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("passshort"))
                return
            }
            if (pass0.length > 12) {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("passlong"))
                return
            }
            if (pass0 != pass1) {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("passdiff"))
                return
            }
            if (pass0.match(/[0-9a-zA-Z]/g).length != pass0.length) {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("passnotcontain"))
                return
            }
            let randid = this.randDeviceID()
            let callback = (data, url) => {
                if (data.code == 200) {
                    this.onClickExit()
                    hqq.gameGlobal.player.deviceid = randid
                    hqq.app.deviceID = randid
                    hqq.loginMgr.setPlayerInfo(data)
                } else {
                    if (data.code == 404 && data.msg == "uuid is exists") {
                        randid = this.randDeviceID()
                        hqq.http.sendXMLHttpRequest({
                            method: 'POST',
                            urlto: hqq.app.server,
                            endurl: hqq.app.getIpPostEndUrl(9),
                            callback: callback,
                            failcallback: failcallback,
                            needJsonParse: true,
                            param: {
                                uuid: randid,
                                os: hqq.app.os,
                                package_name: hqq.app.packgeName,
                                account_pass: pass1,
                                game_nick: account,
                                role_name: account,
                                proxy_user_id: hqq.gameGlobal.player.code,
                            }
                        })
                    } else {
                        hqq.logMgr.log("注册失败:" + data.code + ",信息:" + data, data.msg)
                        hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("registerfail1") + data.code + hqq.getTip("registerfail2") + data.msg)
                    }
                }
            }
            let failcallback = (status, forcejump, url, err, readyState) => {
                hqq.logMgr.log("注册失败:" + status + ",错误:" + err, readyState)
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("registerfail1") + status + hqq.getTip("registerfail3") + err)
            }
            if (!hqq.gameGlobal.player.code) {
                hqq.gameGlobal.player.code = hqq.app.getGeneralAgency()
            }
            hqq.http.sendXMLHttpRequest({
                method: 'POST',
                urlto: hqq.app.server,
                endurl: hqq.app.getIpPostEndUrl(9),
                callback: callback,
                failcallback: failcallback,
                needJsonParse: true,
                param: {
                    uuid: randid,
                    os: hqq.app.os,
                    package_name: hqq.app.packgeName,
                    account_pass: pass1,
                    role_name: account,
                    proxy_user_id: hqq.gameGlobal.player.code,
                }
            })
        } else{// 登入
            let account = this.weblogin.getChildByName("account").getComponent(cc.EditBox).string
            let pass = this.weblogin.getChildByName("pass0").getComponent(cc.EditBox).string
            hqq.loginMgr.accountChange(account, pass, (issucess) => {
                if (issucess) {
                    let tempurl = new window.URL(window.location.href);
                    var encrypted = hqq.base64.encode(JSON.stringify({
                        'account': account,
                        'password': pass,
                    }));
                    tempurl.searchParams.set("webloginparam",encrypted);
                    hqq.gameGlobal.player.account_name = account;
                    hqq.gameGlobal.player.account_pass = pass;
                    hqq.localStorage.globalSet(hqq.gameGlobal.playerKey, hqq.gameGlobal.player);
                    history.pushState({},"",tempurl.href);
                    this.onClickExit()
                } else {
                    hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("changeaccountfail"))
                }
            })
        }
    },

    onnickchangetextChanged(event,custom){
        let tempstr = event.string.replace(/[^\a-\z\A-\Z\u4E00-\u9FA5]/g,'');
        let strlength = 0;
        let i = 0;
        for( i = 0;i<tempstr.length;i++){
            let a = tempstr.charAt(i);
            strlength++;
            if(escape(a).length > 4 ){
                strlength++;
            }
        }
        if(strlength>12){
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("changenickname"))
            return
        }
        for( i = 0;i < hqq.unusestrlist.length;i++){
            if(tempstr.match(hqq.unusestrlist[i])){
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("changenicknamefail"))
                return;
            }
        }
        event.string = tempstr;
    },
    onMusicChange(value)
    {
        hqq.audioMgr.setBgVolume(value);
    },

    onSoundChange(value)
    {
        hqq.audioMgr.setEffectVolume(value);
    },

    onPlayBG(event,customEventData){
        hqq.audioMgr.playBg( "hallbg" , null , Number(customEventData) );
    },
    onSettingMenuClick( event , customEventData ){
        if( Number( customEventData) === 1 ){
            this.sliderBGM = cc.find("smallsublayer/setting/btncontainer/ylsz/checkmark/yjks/sliderBGM").getComponent("hqqSlider");
            this.sliderSound = cc.find("smallsublayer/setting/btncontainer/ylsz/checkmark/yjks/sliderSound").getComponent("hqqSlider");
            this.sliderBGM.setCallBackOnChange(this.onMusicChange.bind(this))
            this.sliderSound.setCallBackOnChange(this.onSoundChange.bind(this))
            this.sliderBGM.setProgress(hqq.audioMgr.getBgVolume());
            this.sliderSound.setProgress(hqq.audioMgr.getEffectVolume());
            let musicindex = hqq.localStorage.globalGet( "musiceIndexKey" );
            cc.find("smallsublayer/setting/btncontainer/ylsz/checkmark/yjks/yylxradio/toggle" + musicindex ).getComponent(cc.Toggle).check();
        } else if( Number( customEventData) === 2 ){
            let checkbox = cc.find("btncontainer/dlmm/checkmark/20/17",this.setting );
            checkbox.active = hqq.localStorage.globalGet("SettingSaveAccount");
            if(checkbox.active){
                let accountNode = cc.find("btncontainer/dlmm/checkmark/account",this.setting);
                let account = hqq.localStorage.globalGet("SettingAccount");
                if( account ){
                    accountNode.getComponent(cc.EditBox).string = hqq.localStorage.globalGet("SettingAccount")
                }
            }
        } else if( Number( customEventData) === 4 ){
            let appversion = cc.find("btncontainer/appgx/checkmark/appbbhvalue",this.setting);
            appversion.getComponent(cc.Label).string = hqq.app.apkVersion;
            let zybbbhvalue = cc.find("btncontainer/appgx/checkmark/zybbbhvalue",this.setting);
            zybbbhvalue.getComponent(cc.Label).string = (hqq.localStorage.globalGet(hqq.app.versionKey) || "1.0.0");
            let hcdxvalue = cc.find("btncontainer/appgx/checkmark/hcdxvalue",this.setting);
            hcdxvalue.getComponent(cc.Label).string = hqq.localStorage.getSize();
        }
    },
    onSettingLoginSaveAccountCallback() {
        let checkbox = cc.find("btncontainer/dlmm/checkmark/20/17",this.setting );
        checkbox.active = !checkbox.active;
        cc.log("onSettingLoginSaveAccountCallback checkbox.active=",checkbox.active)
        hqq.localStorage.globalSet("SettingSaveAccount",checkbox.active)
    },

    onSettingLoginCallback() {
        let account = cc.find("btncontainer/dlmm/checkmark/account",this.setting).getComponent(cc.EditBox).string
        let pass = cc.find("btncontainer/dlmm/checkmark/pass",this.setting).getComponent(cc.EditBox).string
        hqq.loginMgr.accountChange(account, pass, (issucess) => {
            if (issucess) {
                this.onClickExit()
            } else {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("changeaccountfail"))
            }
        })
    },

    onSettingAQMCallback() {
        let ysaqm = cc.find("btncontainer/aqm/checkmark/yjks/ysaqmedit",this.setting).getComponent(cc.EditBox).string || "";
        let xaqm = cc.find("btncontainer/aqm/checkmark/yjks/xaqmedit",this.setting).getComponent(cc.EditBox).string || "";
        let qraqm = cc.find("btncontainer/aqm/checkmark/yjks/qraqmedit",this.setting).getComponent(cc.EditBox).string || "";
        
        if( !ysaqm ){
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("changeaqmfail"))
            return;
        }
        if (ysaqm.match(/[0-9]/g).length != ysaqm.length) {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("aqmnotcontain"))
            return
        }

        if ( xaqm != qraqm ) {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("aqmdiff"))
            return
        }
        if (xaqm.match(/[0-9]/g).length != xaqm.length) {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("aqmnotcontain"))
            return
        }
        let url = hqq.gameGlobal.pay.pay_host + "/api/user_funds_password/updatePassword";
        let callback = (response) => {
            cc.log("onSettingAQMCallback callback response=",response)
            if (response.status == 0) {
                this.onClickExit();
            } else{
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, response.msg)
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            cc.log("status=",status," forcejump=",forcejump," url=",url," err=",err," readyState=",readyState)
        }
        let dataStr = "user_id=" + hqq.gameGlobal.pay.user_id
        dataStr += "&package_id=" + hqq.gameGlobal.pay.package_id
        dataStr += "&token=e40f01afbb1b9ae3dd6747ced5bca532"
        dataStr += "&center_auth=" + hqq.gameGlobal.token
        dataStr += "&old_password=" + hqq.gameGlobal.token
        dataStr += "&password=" + hqq.gameGlobal.token
        hqq.http.sendXMLHttpRequest({
            method: 'POST',
            urlto: url,
            param: dataStr,
            callback: callback,
            needJsonParse: true,
            failcallback: failcallback,
        })
    },
    onSettingAPPGXCallback() {
        if (hqq.localStorage) {
            hqq.localStorage.clear()
        }
        let hcdxvalue = cc.find("btncontainer/appgx/checkmark/hcdxvalue",this.setting);
        hcdxvalue.getComponent(cc.Label).string = hqq.localStorage.getSize();
    },
    // update (dt) {},

});
