//充值首页
const {ccclass, property} = cc._decorator;
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    Recharge :cc.Prefab = null

    @property(cc.Prefab)
    Recharge_8 :cc.Prefab = null
    app= null
    onLoad() {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        if(this.app.UrlData.package_id == 8){
            var node = cc.instantiate(this.Recharge_8)
            cc.find("Canvas").addChild(node)
        }else{
            var node = cc.instantiate(this.Recharge)
            cc.find("Canvas").addChild(node)
        }
    }
    onDestroy(){

    }
}
