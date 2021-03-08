

const {ccclass, property} = cc._decorator;
import { Language_pay } from "./../language/payLanguage";
@ccclass
export default class NewClass extends cc.Component {

    @property
    app  = null;
    
    onLoad(){
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.setLanguageResource()
    }
    onClick(){
        //按键音效
        this.app.loadMusic(1);
        this.node.removeFromParent();
    }
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        let title_tip= cc.find("Canvas/BeforePayOrderAlert/popWindowBG/title_tip")
        let btn1= cc.find('Canvas/BeforePayOrderAlert/popWindowBG/btn1')
        let label1= cc.find('Canvas/BeforePayOrderAlert/popWindowBG/content/label1').getComponent(cc.Label)
        let label2= cc.find('Canvas/BeforePayOrderAlert/popWindowBG/content/label2').getComponent(cc.Label)
        let label3= cc.find('Canvas/BeforePayOrderAlert/popWindowBG/content/label3').getComponent(cc.Label)

        this.app.loadIconLg(`${src}/font/title_tip`,title_tip)
        label1.string = Language_pay.Lg.ChangeByText('【温馨提示】')
        label2.string = Language_pay.Lg.ChangeByText('       系统收款账号不定期更换，请勿保存！请每次付款前认真核对，打入非指定银行账号，损失自重！')
        label3.string = Language_pay.Lg.ChangeByText('本渠道只支持银行卡转银行卡支付，不支持支付宝、微信转账。请务必填写备注(附言)信息，否则充值将无法成功到账。')
        this.app.loadIconLg(`${src}/btn/surebtn1`,btn1)
    }
    // update (dt) {}
}
