//充值首页
const {ccclass, property} = cc._decorator;
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    Activity :cc.Prefab = null

    @property(cc.Prefab)
    Activity_8 :cc.Prefab = null

    app=null
    onLoad() {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        console.log("loadPayPackageActivity",this.app.UrlData.package_id)
        if(this.app.UrlData.package_id == 8){
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
