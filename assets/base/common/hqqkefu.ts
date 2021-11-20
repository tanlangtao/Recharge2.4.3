const {ccclass, property} = cc._decorator;

@ccclass
export default class hqqkefu extends cc.Component {

    @property(cc.WebView)
    kefuweb: cc.WebView = null;
    start () {
        if( cc.isValid(this.kefuweb) ){
            this.kefuweb.url = hqq.app.versionJson.live_service.url1;
            let scalex = cc.view.getVisibleSize().width/cc.view.getDesignResolutionSize().width;
            let scaley = cc.view.getVisibleSize().height/cc.view.getDesignResolutionSize().height;
            let originwidth = this.kefuweb.node.width;
            let originheiht = this.kefuweb.node.height;
            this.kefuweb.node.width *= scalex;
            this.kefuweb.node.height *= scaley;
            // this.kefuweb.node.x *= scalex;
            // this.kefuweb.node.y *= scaley; 
        }
        if( hqq.app.pinpai == "ninetwo" ){
            hqq.setSprite( cc.find("kefulayer/exitbtn"),{path:"hall/language/" + hqq.language + "/ninetwo/img/fanhui"});
            hqq.setSprite( cc.find("kefulayer/title"),{path:"hall/language/" + hqq.language + "/ninetwo/img/title_kf"});
        }
    }

    onClose(){
        if(cc.isValid(this.node)){
            this.node.active = false;
        }
    }
}
