
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property()
    public app = null;
    public parentComponent = null;

    public init(data){
        this.parentComponent = data.parentComponent;
        this.label.string = `您确认转账${this.app.config.toDecimal(data.gold)}金币，给玩家ID:${data.id}吗？`
    }
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain_20');
    }

    onClick(){
        //按键音效
        this.app.loadMusic(1);
        this.parentComponent.fetchsendMoney();
        this.node.removeFromParent();
    }

    removeSelf(){
        //按键音效
        this.app.loadMusic(1);
        this.node.destroy();
    }
    // update (dt) {}
}
