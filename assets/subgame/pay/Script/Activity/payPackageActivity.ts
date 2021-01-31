//充值首页
const {ccclass, property} = cc._decorator;
import gHandler = require("../../../../base/common/gHandler");
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    Activity :cc.Prefab = null

    @property(cc.Prefab)
    Activity_8 :cc.Prefab = null

    onLoad() {
        if(gHandler.gameGlobal.pay.package_id == 8){
            var node = cc.instantiate(this.Activity_8)
            cc.find("Canvas").addChild(node)
        }else{
            var node = cc.instantiate(this.Activity)
            cc.find("Canvas").addChild(node)
        }
    }
    onDestroy(){

    }
}
