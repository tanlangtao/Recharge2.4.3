import { Language_pay } from "../language/payLanguage";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    app = null
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.setLanguageResource()
    }
    //设置语言相关的资源和字
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        let bg= cc.find('Canvas/Activity/Content/RechargeRebate/bg')

        this.app.loadIconLg(`${src}/activeBigImage/event_cashback`,bg)

        let label= cc.find('Canvas/Activity/Content/RechargeRebate/label').getComponent(cc.Label)

        label.string = Language_pay.Lg.ChangeByText("即日起，凡使用官方指定通道，进行支付每笔赠送2.0%，次次充，次次送")
    }
}
