// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    parentComponent = null;
    cash = null;
    app  = null;
    
    init(data){
        this.parentComponent = data.parentComponent;
        let rateMount = data.rateMount;
        let amount = data.amount;
        this.label.string = `申请兑换金额为${amount},扣除手续费${rateMount},实际到账金额为${amount -rateMount},确认要提交兑换申请吗？`;
    }
    onLoad(){
        this.cash = cc.find('Canvas/Cash').getComponent('Cash')
        this.app = cc.find('Canvas/Main').getComponent('Main');
    }
    onClick(){
        //按键音效
        this.app.clickClip.play();

        this.parentComponent.DhBtn.getComponent(cc.Button).interactable =false;
        this.parentComponent.fetchwithDrawApply();
        this.node.removeFromParent();
    }

    removeSelf(){
        //按键音效
        this.app.clickClip.play();
        this.node.destroy();
    }
    // update (dt) {}
}
