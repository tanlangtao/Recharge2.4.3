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
        let bg= cc.find('Canvas/Activity/Content/DailyRescueGold2/bg')
        let Layout= cc.find('Canvas/Activity/Content/DailyRescueGold2/bg/Layout')

        this.app.loadIconLg(`${src}/activeBigImage/event_jyj20201101`,bg)
        this.app.loadIconLg(`${src}/activeSprite/frames`,Layout)

        let label1= cc.find('Canvas/Activity/Content/DailyRescueGold2/bg/Layout/label1').getComponent(cc.Label)
        let label2= cc.find('Canvas/Activity/Content/DailyRescueGold2/bg/Layout/label2').getComponent(cc.Label)
        let label3= cc.find('Canvas/Activity/Content/DailyRescueGold2/bg/Layout/label3').getComponent(cc.Label)
        let label4= cc.find('Canvas/Activity/Content/DailyRescueGold2/bg/Layout/label4').getComponent(cc.Label)
        let label5= cc.find('Canvas/Activity/Content/DailyRescueGold2/bg/Layout/label5').getComponent(cc.Label)
        let label6= cc.find('Canvas/Activity/Content/DailyRescueGold2/bg/Layout/label6').getComponent(cc.Label)
        let label7= cc.find('Canvas/Activity/Content/DailyRescueGold2/bg/Layout/label7').getComponent(cc.Label)
        let label8= cc.find('Canvas/Activity/Content/DailyRescueGold2/bg/Layout/label8').getComponent(cc.Label)
        let label9= cc.find('Canvas/Activity/Content/DailyRescueGold2/bg/Layout/label9').getComponent(cc.Label)
        let rule= cc.find('Canvas/Activity/Content/DailyRescueGold2/bg/Content/ScrollView/view/content/rule').getComponent(cc.Label)

        label1.string = `5${Language_pay.Lg.ChangeByText("元")}+`
        label2.string = `12${Language_pay.Lg.ChangeByText("元")}+`
        label3.string = `18${Language_pay.Lg.ChangeByText("元")}+`
        label4.string = `38${Language_pay.Lg.ChangeByText("元")}+`
        label5.string = `68${Language_pay.Lg.ChangeByText("元")}+`
        label6.string = `108${Language_pay.Lg.ChangeByText("元")}+`
        label7.string = `498${Language_pay.Lg.ChangeByText("元")}+`
        label8.string = Language_pay.Lg.ChangeByText("(兑换需三倍彩金流水)")
        label9.string = Language_pay.Lg.ChangeByText("(兑换需五倍彩金流水)")
        rule.string = Language_pay.Lg.ChangeByText("1. 限当天有进行充值，且完成手机及银行卡绑定的用户才能参与。\n2. 玩法限棋牌类游戏。彩票、视讯龙虎斗、视讯百家乐、沙巴体育、电竞等游戏不能参加。\n3. 亏损金额计算方式为当日游戏总输-当日游戏总赢(税前)。\n4. 用户的亏损金额计算至当天的23:59:59，次日0点将进行重置，请统一在次日联系客服进行申请。\n5.不可与包赔活动及首存活动同时参与；且专线用户不能参予此活动。\n6. 亏损1000+，108元（兑换需三倍彩金流水）；亏损5000+，498元（兑换需五倍彩金流水）；其余档位无兑换流水限制。\n7. 如有异常操作，对刷套利等情节，则进行冻结账号处理。\n8. 本活动最终解释权归平台所有，平台有随时更改，停止并取消该活动的权利。")
    }
}
