
const {ccclass, property} = cc._decorator;
import { Language_pay } from "./../language/payLanguage";
@ccclass
export default class NewClass extends cc.Component {

    app = null
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.setLanguageResource()
    }
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()

        let title_cztutor= cc.find('Canvas/helpAlert/Content/title_cztutor')

        this.app.loadIconLg(`${src}/font/title_cztutor`,title_cztutor)

        let label1= cc.find('Canvas/helpAlert/Content/label1').getComponent(cc.Label)
        let label2= cc.find('Canvas/helpAlert/Content/label2').getComponent(cc.Label)
        let label3= cc.find('Canvas/helpAlert/Content/label3').getComponent(cc.Label)

        label1.string = `${Language_pay.Lg.ChangeByText('1.银行卡转账流程：进入银行APP > 点击转账 > 复制收款账号、收款姓名、收款银行粘贴到对应转账信息 > 输入转账金额(包含小数点后2位数字) > 完成充值。')}`
        label2.string = `${Language_pay.Lg.ChangeByText("2.支付宝转账流程 ：支付宝首页 > 转账 > 转到银行卡 > 输入姓名、卡号、银行、金额(包含小数点后2位数字) > 点击下一步 > 点击确认转账。")}`
        label3.string = `${Language_pay.Lg.ChangeByText("3.微信转账流程 ：微信 > 我的 > 支付 > 收付款 > 转账到银行卡 > 输入姓名、卡号、银行 > 点击下一步 > 转账金额(包含小数点后2位数字) > 点击转账。")}`
    }
}
