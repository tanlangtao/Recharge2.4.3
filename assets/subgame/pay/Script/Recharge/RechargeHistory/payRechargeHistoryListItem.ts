
const {ccclass, property} = cc._decorator;
import {Language_pay} from "../../language/payLanguage"
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    amountLabel: cc.Label = null;

    @property(cc.Label)
    arrival_amount : cc.Label = null;

    @property(cc.Label)
    statusLabel: cc.Label = null;

    @property(cc.Label)
    typeLabel: cc.Label = null;

    @property(cc.Label)
    firstTimeLabel: cc.Label = null;

    @property(cc.Label)
    lastTimeLabel: cc.Label = null;

    @property(cc.Node)
    orderBtn: cc.Node = null;

    @property
    public results = {};
    public app = null;

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.setLanguageResource()
    }

    public init(data){
        this.amountLabel.string = this.app.config.toDecimal(data.amount);
        this.arrival_amount.string = this.app.config.toDecimal(data.arrival_amount);
        this.statusLabel.string = data.status ==6 ?`${Language_pay.Lg.ChangeByText('已完成')}` :(data.status == 4 ? `${Language_pay.Lg.ChangeByText('已撤销')}` : `${Language_pay.Lg.ChangeByText('未完成')}` );
        this.typeLabel.string = data.type == 1 ? `${Language_pay.Lg.ChangeByText('支付宝充值')}`  :
            (data.type == 2 ? `${Language_pay.Lg.ChangeByText('转账到银行卡')}` :
                (data.type == 3?`${Language_pay.Lg.ChangeByText('交易所')}`:
                    (data.type == 5?`${Language_pay.Lg.ChangeByText('赠送')}`:
                        (data.type == 6? `${Language_pay.Lg.ChangeByText('微信支付')}`:
                            (data.type == 7? `${Language_pay.Lg.ChangeByText('银联支付')}`:
                                (data.type == 8?`${Language_pay.Lg.ChangeByText('网银支付')}` :
                                    (data.type == 9? `${Language_pay.Lg.ChangeByText('快捷支付')}` :
                                        (data.type == 14?`${Language_pay.Lg.ChangeByText('专享快付')}`:
                                            ((data.type == 18 ||data.type == 19 ||data.type == 20 || data.type ==21)? `${Language_pay.Lg.ChangeByText("IM充值")}` :
                                                (data.type == 23?`USDT`:"")
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        this.firstTimeLabel.string = data.firstTime == 0 ?`${Language_pay.Lg.ChangeByText('无')}`  : this.app.config.getTime(data.firstTime);
        this.lastTimeLabel.string = data.lastTime == 0 ? `${Language_pay.Lg.ChangeByText('无')}` : this.app.config.getTime(data.lastTime);
        this.results = data.results;
        if(data.status != 6 && data.type == 2){

        }else{
            this.orderBtn.removeFromParent()
        }
    }

    start () {

    }

    onClick(){
        //按键音效
        this.app.loadMusic(1);
        var data = {
            data : this.results
        }
        this.app.showOrderAlert(2,data,false);
    }
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()

        let btn_dingdan1= this.node.getChildByName('5').getChildByName('btn_dingdan1')

        this.app.loadIconLg(`${src}/btn/btn_dingdan1`,btn_dingdan1)
    }
    // update (dt) {}
}
