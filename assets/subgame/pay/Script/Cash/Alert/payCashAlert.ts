

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    parentComponent = null;
    cash = null;
    app  = null;
    
    init(data,UsdtDh :any=false){
        this.parentComponent = data.parentComponent;
        let rateMount = data.rateMount;
        let amount = data.amount;
        if(UsdtDh){
            this.label.string = `申请兑换金额为${amount} (USDT),扣除手续费${rateMount} (USDT),实际到账金额为${amount -rateMount} (USDT),确认要提交兑换申请吗？`;
        }else{
            this.label.string = `申请兑换金额为${amount},扣除手续费${rateMount},实际到账金额为${amount -rateMount},确认要提交兑换申请吗？`;
        }
       
    }
    onLoad(){
        this.cash = cc.find('Canvas/Cash').getComponent('payCash')
        this.app = cc.find('Canvas/Main').getComponent('payMain');
    }
    onClick(){
        //按键音效
        this.app.loadMusic(1);

        this.parentComponent.DhBtn.getComponent(cc.Button).interactable =false;
        this.parentComponent.fetchwithDrawApply();
        this.node.removeFromParent();
    }

    removeSelf(){
        //按键音效
        this.app.loadMusic(1);
        this.node.destroy();
    }
    // update (dt) {}
}
