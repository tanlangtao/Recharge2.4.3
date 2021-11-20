const {ccclass, property} = cc._decorator;

@ccclass
export default class hqqPersonalCenter extends cc.Component {

    uidlabel:cc.Label = null;
    parentidlabel:cc.Label = null;
    accountlabel:cc.Label = null;
    phonelabel:cc.Label = null;
    headimg:cc.Sprite = null;
    start () {
        if( hqq.app.pinpai == "ninetwo" ){
            hqq.setSprite( cc.find("personalcenter/exitbtn"),{path:"hall/language/" + hqq.language + "/ninetwo/img/fanhui"});
            hqq.setSprite( cc.find("personalcenter/title"),{path:"hall/language/" + hqq.language + "/ninetwo/img/titlegrzx"});
        }
        this.uidlabel = cc.find("personalcenter/btncontainer/grxx/checkmark/basicInfo_bg/uidvalue").getComponent(cc.Label);
        this.uidlabel.string = hqq.gameGlobal.player.id;
        this.parentidlabel = cc.find("personalcenter/btncontainer/grxx/checkmark/basicInfo_bg/parentidvalue").getComponent(cc.Label); 
        this.parentidlabel.string = hqq.gameGlobal.player.code;
        let accountnamelength = hqq.gameGlobal.player.account_name.toString().length;
        this.accountlabel = cc.find("personalcenter/btncontainer/grxx/checkmark/basicInfo_bg/accountvalue").getComponent(cc.Label);
        this.accountlabel.string = hqq.gameGlobal.player.account_name.toString().slice(0,2) + "**" + hqq.gameGlobal.player.account_name.toString().slice(accountnamelength-3,accountnamelength-1);
        let phonelength = hqq.gameGlobal.player.phonenum.toString().length;
        this.phonelabel = cc.find("personalcenter/btncontainer/grxx/checkmark/basicInfo_bg/phoneidvalue").getComponent(cc.Label);
        if( phonelength != "" ){
            this.phonelabel.string = hqq.gameGlobal.player.phonenum.toString().slice(0,2) + "**" + hqq.gameGlobal.player.phonenum.toString().slice(phonelength-3,phonelength-1);
        }
        this.headimg = cc.find("personalcenter/btncontainer/grxx/checkmark/basicInfo_bg/headsprite").getComponent(cc.Sprite);
        hqq.commonTools.loadHeadRes(hqq.gameGlobal.player.headurl, this.headimg,113)
    }

    onClose(){
        if(cc.isValid(this.node)){
            this.node.active = false;
        }
    }

    onTXKClick(){
        cc.log("=================onTXKClick");
        hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, { type: 1 })
    }

    onEnable() {
        hqq.eventMgr.register(hqq.eventMgr.refreshPlayerinfo, "hqqPersonalCenter", this.setPlayerInfo.bind(this))
    }

    onDisable() {
        hqq.eventMgr.unregister(hqq.eventMgr.refreshPlayerinfo, "hqqPersonalCenter")
    }

    onDestroy() {
        hqq.eventMgr.unregister(hqq.eventMgr.refreshPlayerinfo, "hqqPersonalCenter")
    }

    setPlayerInfo(msg) {
        if (msg.game_img) {
            hqq.commonTools.loadHeadRes(msg.game_img, this.headimg,113)
        }
        if (msg.phone_number) {
            this.phonelabel.string = msg.phone_number
        }
    }
}
