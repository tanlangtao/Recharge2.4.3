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
        let bg= cc.find('Canvas/Activity/Content/FaPengYouQuan/bg')

        this.app.loadIconLg(`${src}/activeBigImage/jincaihuodong_page7`,bg)

        let label1= cc.find('Canvas/Activity/Content/FaPengYouQuan/group1/label1').getComponent(cc.Label)
        let label2= cc.find('Canvas/Activity/Content/FaPengYouQuan/group1/label2').getComponent(cc.Label)
        let label3= cc.find('Canvas/Activity/Content/FaPengYouQuan/group1/label3').getComponent(cc.Label)
        let label4= cc.find('Canvas/Activity/Content/FaPengYouQuan/group2/label4').getComponent(cc.Label)
        let label5= cc.find('Canvas/Activity/Content/FaPengYouQuan/group3/label5').getComponent(cc.Label)
        let label6= cc.find('Canvas/Activity/Content/FaPengYouQuan/group4/label6').getComponent(cc.Label)
        let rule= cc.find('Canvas/Activity/Content/FaPengYouQuan/rule').getComponent(cc.Label)

        label1.string = Language_pay.Lg.ChangeByText("QQ微信人数")
        label2.string = Language_pay.Lg.ChangeByText("游戏后台当日个人佣金")
        label3.string = Language_pay.Lg.ChangeByText("奖励金")
        label4.string = Language_pay.Lg.ChangeByText("满足上述条件, 奖励发圈人58元")
        label5.string = Language_pay.Lg.ChangeByText("满足上述条件, 奖励发圈人108元")
        label6.string = Language_pay.Lg.ChangeByText("满足上述条件, 奖励发圈人158元")
        rule.string = Language_pay.Lg.ChangeByText("1. 彩金领取为今天统计昨天佣金与QQ、微信人数所达档位发放。\n2. 发圈如带有屏蔽作假, 直接取消当天领取资格。\n3. 领取需保留前一天的朋友圈, 删除或者未发则当天没有领取资格。\n4. 佣金计算以游戏后台为标准。\n5. 彩金需达成一倍流水。\n6. 同设备、同IP、账号异常、对刷套利者扣除收益一律封号处理。\n7. 联系上级或咨询客服领取。")
    }
}
