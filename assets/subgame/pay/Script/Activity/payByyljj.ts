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
        let bg= cc.find('Canvas/Activity/Content/Byyljj/bg')

        this.app.loadIconLg(`${src}/activeBigImage/event2_byjj_content`,bg)

        let title1= cc.find('Canvas/Activity/Content/Byyljj/bg/group/title1').getComponent(cc.Label)
        let title2= cc.find('Canvas/Activity/Content/Byyljj/bg/group/title2').getComponent(cc.Label)
        let title3= cc.find('Canvas/Activity/Content/Byyljj/bg/group/title3').getComponent(cc.Label)
        let ruleLabel= cc.find('Canvas/Activity/Content/Byyljj/bg/ruleLabel').getComponent(cc.Label)

        title1.string = Language_pay.Lg.ChangeByText('充值金额')
        title2.string = Language_pay.Lg.ChangeByText('盈利到')
        title3.string = Language_pay.Lg.ChangeByText('嘉奖金额')
        ruleLabel.string = Language_pay.Lg.ChangeByText("本活动于2020/12/28 00:00开始\n1. 一个ID每天在活动界面只能选择其中一档金额，且参与1次，充值成功后联系客服申请参加活动;  活动时间：12:00 到 24:00。\n2. 参与此活动，指定参加捕鱼游戏，中途如果跳转参加其他游戏则视为放弃该活动（放弃活动将失去该活动所有福利）。\n3. 总金额达到充值金额的三倍要及时兑换。 \n4. 嘉奖金联系在线客服领取时请提供客户手机号，银行卡号，且必须与绑定平台实名一致。\n5. 同IP、同设备关联不符合，刷子自觉，恶意套利将封号处理。\n6. 本活动最终解释权归德比所有。")
    }
}
