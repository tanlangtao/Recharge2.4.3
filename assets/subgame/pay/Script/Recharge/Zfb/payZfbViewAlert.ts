//支付宝webview

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.WebView)
    ZfbView:cc.WebView = null;

    init(data){
        this.ZfbView.url = data.url;
    }

    start () {
        
    }

    onClick(){
        this.node.destroy()
    }
    // update (dt) {}
}
