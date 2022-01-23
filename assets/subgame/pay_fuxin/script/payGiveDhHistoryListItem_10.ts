
const {ccclass, property} = cc._decorator;
import { Language_pay } from "./payLanguage_10";
@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Label)
    created_atLabel: cc.Label = null;

    @property(cc.Label)
    IdLabel: cc.Label = null;

    @property(cc.Label)
    amountLabel: cc.Label = null;

    @property(cc.Label)
    statusLabel: cc.Label = null;


    @property
    public app = null;
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain_10');
    }

    public init(data){
        this.IdLabel.string = data.ReceiveUserId
        this.amountLabel.string  = this.app.config.toDecimal(data.Amount);
        if(data.status == 4){
            this.statusLabel.string  = '已成功'
        }else if(data.status == 5){
            this.statusLabel.string  = '已失败'
        }else{
            this.statusLabel.string  = '审核中'
        }
        this.created_atLabel.string = this.app.config.getTime(data.created_at);
    }
}
