//充值首页
const {ccclass, property} = cc._decorator;
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    Recharge :cc.Prefab = null

    @property(cc.Prefab)
    Recharge_8 :cc.Prefab = null

    @property(cc.Prefab)
    Recharge_9 :cc.Prefab = null

    @property(cc.Prefab)
    Recharge_10 :cc.Prefab = null

    @property(cc.Prefab)
    Recharge_15 : cc.Prefab = null

    @property(cc.Prefab)
    Recharge_16 : cc.Prefab = null

    @property(cc.Prefab)
    Recharge_18 : cc.Prefab = null

    app= null
    onLoad() {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        if(this.app.UrlData.package_id == 8 || this.app.UrlData.package_id == 12 ){
            var node = cc.instantiate(this.Recharge_8)
            cc.find("Canvas").addChild(node)
        }else if(this.app.UrlData.package_id == 9){
            var node = cc.instantiate(this.Recharge_9)
            cc.find("Canvas").addChild(node)
        }else if(this.app.UrlData.package_id == 10 ){
            var node = cc.instantiate(this.Recharge_10)
            cc.find("Canvas").addChild(node)
        }else if(this.app.UrlData.package_id == 15){
            var node = cc.instantiate(this.Recharge_15)
            cc.find("Canvas").addChild(node)
        }else if(this.app.UrlData.package_id == 16){
            var node = cc.instantiate(this.Recharge_16)
            cc.find("Canvas").addChild(node)
        }else if(this.app.UrlData.package_id == 18){
            var node = cc.instantiate(this.Recharge_18)
            cc.find("Canvas").addChild(node)
        }else{
            var node = cc.instantiate(this.Recharge)
            cc.find("Canvas").addChild(node)
        }
    }
    onDestroy(){

    }
}
