const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Label)
    BankName: cc.Label = null;
    
    app = null;

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain_25');
    }
    init(info){
       let Info =  JSON.parse(info)
       this.BankName.string = Info.bank_name
       this.label.string = this.app.config.testBankNum(Info.card_num)
    }
}
