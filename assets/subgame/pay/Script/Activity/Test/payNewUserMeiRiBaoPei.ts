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
        let bg= cc.find('Canvas/Activity/Content/NewUserMeiRiBaoPei/bg')

        this.app.loadIconLg(`${src}/activeBigImage/jincaihuodong_page5-2`,bg)

        let label1= cc.find('Canvas/Activity/Content/NewUserMeiRiBaoPei/group1/label1').getComponent(cc.Label)
        let label2= cc.find('Canvas/Activity/Content/NewUserMeiRiBaoPei/group1/label2').getComponent(cc.Label)
        let label3= cc.find('Canvas/Activity/Content/NewUserMeiRiBaoPei/group1/label3').getComponent(cc.Label)
        let label4= cc.find('Canvas/Activity/Content/NewUserMeiRiBaoPei/group1/label4').getComponent(cc.Label)
        let label5= cc.find('Canvas/Activity/Content/NewUserMeiRiBaoPei/group2/label5').getComponent(cc.Label)
        let label6= cc.find('Canvas/Activity/Content/NewUserMeiRiBaoPei/group3/label6').getComponent(cc.Label)
        let label7= cc.find('Canvas/Activity/Content/NewUserMeiRiBaoPei/group4/label7').getComponent(cc.Label)
        let label8= cc.find('Canvas/Activity/Content/NewUserMeiRiBaoPei/label8').getComponent(cc.Label)
        let rule= cc.find('Canvas/Activity/Content/NewUserMeiRiBaoPei/rule').getComponent(cc.RichText)

        label1.string = Language_pay.Lg.ChangeByText("首充金额")
        label2.string = Language_pay.Lg.ChangeByText("包赔金额")
        label3.string = Language_pay.Lg.ChangeByText("最高兑换金额")
        label4.string = Language_pay.Lg.ChangeByText("领取条件")
        label5.string = Language_pay.Lg.ChangeByText("(包赔金无需流水, 且不限制游戏)")
        label6.string = Language_pay.Lg.ChangeByText("(包赔金需一倍流水, 且不限制游戏)")
        label7.string = Language_pay.Lg.ChangeByText("(包赔金需一倍流水, 且不限制游戏)")
        label8.string = Language_pay.Lg.ChangeByText("❈找客服进行备注申请")
        rule.string = Language_pay.Lg.ChangeByText("<color=#E8C999>1. 活动仅限以下玩法：水果机、海王捕鱼、财神到(中途可更换其他规则内游戏)。\n 2. 包赔, 只可指定专线和专线ID参与。当天, 与平台其他活动不可同时参与。\n 3. 在规定游戏中亏损至余额低于5时, 即可联系客服申请包赔金。\n 4. 在领取包赔金或兑换前进行非规定游戏和要求, 首次违规扣除收益且不可参与当前包赔活动;</c><color=#EE000>\n     二次违规扣除收益跟充值本金, 且不可再申请包赔活动。</c>\n 5. 参与活动后只可以最高兑换指定金额, 超出扣除。\n 6. 每个ID用户只限领取一次。\n 7. 如有异常操作, 一律扣除收益并封号处理。</color>")
    }
}
