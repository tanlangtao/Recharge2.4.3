//充值首页
const {ccclass, property} = cc._decorator;
import gHandler = require("../../../../base/common/gHandler");
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    Cash :cc.Prefab = null

    @property(cc.Prefab)
    Cash_8 :cc.Prefab = null

    onLoad() {
        if(gHandler.gameGlobal.pay.package_id == 8){
            var node = cc.instantiate(this.Cash_8)
            cc.find("Canvas").addChild(node)
        }else{
            var node = cc.instantiate(this.Cash)
            cc.find("Canvas").addChild(node)
        }
    }
    onDestroy(){

    }
}
