

const {ccclass, property} = cc._decorator;
@ccclass
export default class NewClass extends cc.Component {

    @property
    app  = null;
    url = ''
    init(url){
        this.url = url
    }
    onLoad(){
        this.app = cc.find('Canvas/Main').getComponent('payMain_29');
    }
    onClick(){
        //按键音效
        this.app.loadMusic(1);
        this.node.removeFromParent();
        cc.sys.openURL(encodeURI(this.url))
        cc.log(encodeURI(this.url))
    }
    removeSelf(){
        this.app.loadMusic(1);
        this.node.removeFromParent();
    }
}
