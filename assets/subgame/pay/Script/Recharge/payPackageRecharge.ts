//充值首页
const {ccclass, property} = cc._decorator;
import gHandler = require("../../../../base/common/gHandler");
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    Recharge :cc.Prefab = null

    @property(cc.Prefab)
    Recharge_8 :cc.Prefab = null

    onLoad() {
        if(gHandler.gameGlobal.pay.package_id == 8){
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
