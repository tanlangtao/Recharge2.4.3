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
        let title_rks= cc.find('Canvas/Activity/Content/Rkshd/bg/title_rks')

        this.app.loadIconLg(`${src}/activeSprite/title_rks`,title_rks)

        let label1= cc.find('Canvas/Activity/Content/Rkshd/bg/content/group1/label1').getComponent(cc.Label)
        let label2= cc.find('Canvas/Activity/Content/Rkshd/bg/content/group2/label2').getComponent(cc.Label)
        let label3= cc.find('Canvas/Activity/Content/Rkshd/bg/content/group3/label3').getComponent(cc.Label)
        let label4= cc.find('Canvas/Activity/Content/Rkshd/bg/content/group4/label4').getComponent(cc.Label)
        let rule= cc.find('Canvas/Activity/Content/Rkshd/bg/rule').getComponent(cc.RichText)

        label1.string = Language_pay.Lg.ChangeByText('日亏损')
        label2.string = Language_pay.Lg.ChangeByText('每日彩金')
        label3.string = Language_pay.Lg.ChangeByText('日亏损')
        label4.string = Language_pay.Lg.ChangeByText('每日彩金')
        rule.string = Language_pay.Lg.ChangeByText("<color=#FFFD9C>1. 按充值金额计算亏损, 例如充值2000亏了, 即可申请180元彩金。\n2. 严禁注册多账号利用此活动在平台套彩金, 违规账号一律冻结处理。\n3. 请于次日中午12点-17点找客服领取, 未领取视为自动放弃。\n4.  本活动仅限 </c><color=#ff0000> 棋牌类游戏</c>（财神到，聚宝盆，海王，水果机，二八杠，百人牛牛），其他\n等游戏不计入亏损计算。\n5.  参与首充或者包赔活动 ，需扣除赠送金额再进行计算。</color>")
    }   
}
