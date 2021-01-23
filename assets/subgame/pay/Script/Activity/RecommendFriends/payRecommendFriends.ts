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
        let event_rf_title= cc.find('Canvas/Activity/Content/RecommendFriends/ScrollView/view/content/event_rf_title')
        let event_rf_intro= cc.find('Canvas/Activity/Content/RecommendFriends/ScrollView/view/content/detail/event_rf_intro')

        this.app.loadIconLg(`${src}/activeSprite/event_rf_title`,event_rf_title)
        this.app.loadIconLg(`${src}/activeSprite/event_rf_intro`,event_rf_intro)

        let label1= cc.find('Canvas/Activity/Content/RecommendFriends/ScrollView/view/content/event_rf_frame/line1/label1').getComponent(cc.Label)
        let label2= cc.find('Canvas/Activity/Content/RecommendFriends/ScrollView/view/content/event_rf_frame/line1/label2').getComponent(cc.Label)
        let label3= cc.find('Canvas/Activity/Content/RecommendFriends/ScrollView/view/content/event_rf_frame/line2/label3').getComponent(cc.Label)
        let label4= cc.find('Canvas/Activity/Content/RecommendFriends/ScrollView/view/content/event_rf_frame/line3/label4').getComponent(cc.Label)
        let label5= cc.find('Canvas/Activity/Content/RecommendFriends/ScrollView/view/content/event_rf_frame/line4/label5').getComponent(cc.Label)
        let label6= cc.find('Canvas/Activity/Content/RecommendFriends/ScrollView/view/content/event_rf_frame/line5/label6').getComponent(cc.Label)
        let label7= cc.find('Canvas/Activity/Content/RecommendFriends/ScrollView/view/content/event_rf_frame/line6/label7').getComponent(cc.Label)
        let rule= cc.find('Canvas/Activity/Content/RecommendFriends/ScrollView/view/content/detail/event_kuang1/rule').getComponent(cc.Label)

        label1.string = Language_pay.Lg.ChangeByText("推荐有效好友")
        label2.string = Language_pay.Lg.ChangeByText("奖金")
        label3.string = `2${Language_pay.Lg.ChangeByText("人")}+`
        label4.string = `3${Language_pay.Lg.ChangeByText("人")}+`
        label5.string = `5${Language_pay.Lg.ChangeByText("人")}+`
        label6.string = `10${Language_pay.Lg.ChangeByText("人")}+`
        label7.string = `20${Language_pay.Lg.ChangeByText("人")}+`
        rule.string = Language_pay.Lg.ChangeByText("规则1：\n 推荐新增直属下级会员需累计充值300以上， 累计流水500以上连续游戏3天为有效直属玩家。\n 规则2：\n 推荐会员不允许同ip，同设备，同实名，一个会员只能计算一次。\n 温馨提示：\n 如发现任何团队或个人以不诚实方式进行套利将取消活动资格。\n 领取方式：\n 达到申请要求后可直接联系在线客服领取，每周一至周日为一个活动周期（第二周申请上周推荐奖励）。")
    }
}
