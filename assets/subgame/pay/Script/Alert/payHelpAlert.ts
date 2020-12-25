
const {ccclass, property} = cc._decorator;
import { Language_pay } from "./../language/payLanguage";
@ccclass
export default class NewClass extends cc.Component {

    onLoad () {
        this.setLanguageResource()
    }
    setLanguageResource(){

        let label1= this.node.getChildByName('Content').getChildByName('label1').getComponent(cc.Label)
        let label2= this.node.getChildByName('Content').getChildByName('label2').getComponent(cc.Label)
        let label3= this.node.getChildByName('Content').getChildByName('label3').getComponent(cc.Label)

        label1.string = `${Language_pay.Lg.ChangeByText('1.银行卡转账流程：进入银行APP > 点击转账 > 复制收款账号、收款姓名、收款银行粘贴到对应转账信息 > 输入转账金额(包含小数点后2位数字) > 完成充值。')}`
        label2.string = `${Language_pay.Lg.ChangeByText("2.支付宝转账流程 ：支付宝首页 > 转账 > 转到银行卡 > 输入姓名、卡号、银行、金额(包含小数点后2位数字) > 点击下一步 > 点击确认转账。")}`
        label3.string = `${Language_pay.Lg.ChangeByText("3.微信转账流程 ：微信 > 我的 > 支付 > 收付款 > 转账到银行卡 > 输入姓名、卡号、银行 > 点击下一步 > 转账金额(包含小数点后2位数字) > 点击转账。")}`
    }
}
