//充值首页
const {ccclass, property} = cc._decorator;
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    Cash :cc.Prefab = null

    @property(cc.Prefab)
    Cash_8 :cc.Prefab = null

    @property(cc.Prefab)
    Cash_9 :cc.Prefab = null

    app = null
    onLoad() {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        var node = cc.instantiate(this.Cash_9)
            cc.find("Canvas").addChild(node)
        return;
        if(this.app.UrlData.package_id == 8){
            var node = cc.instantiate(this.Cash_8)
            cc.find("Canvas").addChild(node)
            
        }else if(this.app.UrlData.package_id == 9){
            var node = cc.instantiate(this.Cash_9)
            cc.find("Canvas").addChild(node)
            
        }else{
            var node = cc.instantiate(this.Cash)
            cc.find("Canvas").addChild(node)
        }  
    }
    onDestroy(){

    }
}
