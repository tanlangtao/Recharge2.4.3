import { Language_pay } from "./../../language/payLanguage";
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
        let bg= cc.find('Canvas/Activity/Content/Lhysc/bg')

        this.app.loadIconLg(`${src}/activeBigImage/event12-3_lhysc_content`,bg)

        let label1= cc.find('Canvas/Activity/Content/Lhysc/bg/FootContent/label1').getComponent(cc.Label)
        let title1= cc.find('Canvas/Activity/Content/Lhysc/bg/group1/title1').getComponent(cc.Label)
        let title2= cc.find('Canvas/Activity/Content/Lhysc/bg/group2/title2').getComponent(cc.Label)
        let title3= cc.find('Canvas/Activity/Content/Lhysc/bg/group3/title3').getComponent(cc.Label)
        let title4= cc.find('Canvas/Activity/Content/Lhysc/bg/group3/title4').getComponent(cc.Label)

        label1.string = Language_pay.Lg.ChangeByText("1.实名限制2及2个以上不符合。\n 2.只限游戏（财神到，水果机，捕鱼，百人牛牛，红包乱斗，二八杠，21点，奔驰宝马）。\n 3.每个账号一天只限第一次充值（如果遇到无法一笔充值达到有效的档位，可充值两次以上）。\n 4.充值成功未下注之前找专线客服专员申请。\n 5.每一个账号（同一ip，同一设备，同一姓名）视为一个账号，只能申请一次。\n 6. 本活动最终解释权归德比所有。")
        title1.string = Language_pay.Lg.ChangeByText('充值金额')
        title2.string = Language_pay.Lg.ChangeByText('赠送金额')
        title3.string = Language_pay.Lg.ChangeByText('兑换限制')
        title4.string = Language_pay.Lg.ChangeByText('一倍流水')
    }   
}
