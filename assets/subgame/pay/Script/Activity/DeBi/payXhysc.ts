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
        let bg= cc.find('Canvas/Activity/Content/Xhysc/bg')
        let ren= cc.find('Canvas/Activity/Content/Xhysc/bg/event12-2_xhysc_ren')
        
        this.app.loadIconLg(`${src}/activeBigImage/event12-2_xhysc_bg`,bg)
        this.app.loadIconLg(`${src}/activeBigImage/event12-2_xhysc_ren`,ren)

        let label1= cc.find('Canvas/Activity/Content/Xhysc/bg/ScrollView/view/content/day1/label1').getComponent(cc.Label)
        let label2= cc.find('Canvas/Activity/Content/Xhysc/bg/ScrollView/view/content/day1/group1/label2').getComponent(cc.Label)
        let label3= cc.find('Canvas/Activity/Content/Xhysc/bg/ScrollView/view/content/day1/group2/label3').getComponent(cc.Label)
        let label4= cc.find('Canvas/Activity/Content/Xhysc/bg/ScrollView/view/content/day1/group3/label4').getComponent(cc.Label)
        let label5= cc.find('Canvas/Activity/Content/Xhysc/bg/ScrollView/view/content/day1/group3/label5').getComponent(cc.Label)
        let label6= cc.find('Canvas/Activity/Content/Xhysc/bg/ScrollView/view/content/day2/label6').getComponent(cc.Label)
        let label7= cc.find('Canvas/Activity/Content/Xhysc/bg/ScrollView/view/content/day2/group1/label7').getComponent(cc.Label)
        let label8= cc.find('Canvas/Activity/Content/Xhysc/bg/ScrollView/view/content/day2/group2/label8').getComponent(cc.Label)
        let label9= cc.find('Canvas/Activity/Content/Xhysc/bg/ScrollView/view/content/day2/group3/label9').getComponent(cc.Label)
        let label10= cc.find('Canvas/Activity/Content/Xhysc/bg/ScrollView/view/content/day2/group3/label10').getComponent(cc.Label)
        let label11= cc.find('Canvas/Activity/Content/Xhysc/bg/ScrollView/view/content/day3/label11').getComponent(cc.Label)
        let label12= cc.find('Canvas/Activity/Content/Xhysc/bg/ScrollView/view/content/day3/group1/label12').getComponent(cc.Label)
        let label13= cc.find('Canvas/Activity/Content/Xhysc/bg/ScrollView/view/content/day3/group2/label13').getComponent(cc.Label)
        let label14= cc.find('Canvas/Activity/Content/Xhysc/bg/ScrollView/view/content/day3/group3/label14').getComponent(cc.Label)
        let label15= cc.find('Canvas/Activity/Content/Xhysc/bg/ScrollView/view/content/day3/group3/label15').getComponent(cc.Label)
        let label16= cc.find('Canvas/Activity/Content/Xhysc/bg/ScrollView/view/content/FootContent/label16').getComponent(cc.Label)

        label1.string = Language_pay.Lg.ChangeByText('第一天')
        label2.string = Language_pay.Lg.ChangeByText('充值金额')
        label3.string = Language_pay.Lg.ChangeByText('赠送金额')
        label4.string = Language_pay.Lg.ChangeByText('兑换限制')
        label5.string = `3${Language_pay.Lg.ChangeByText('倍')}${Language_pay.Lg.ChangeByText('流水')}`
        label6.string = Language_pay.Lg.ChangeByText('第二天')
        label7.string = Language_pay.Lg.ChangeByText('充值金额')
        label8.string = Language_pay.Lg.ChangeByText('赠送金额')
        label9.string = Language_pay.Lg.ChangeByText('兑换限制')
        label10.string = `1${Language_pay.Lg.ChangeByText('倍')}${Language_pay.Lg.ChangeByText('流水')}`
        label11.string = Language_pay.Lg.ChangeByText('第三天')
        label12.string = Language_pay.Lg.ChangeByText('充值金额')
        label13.string = Language_pay.Lg.ChangeByText('赠送金额')
        label14.string = Language_pay.Lg.ChangeByText('兑换限制')
        label15.string = `1${Language_pay.Lg.ChangeByText('倍')}${Language_pay.Lg.ChangeByText('流水')}`
        label16.string = Language_pay.Lg.ChangeByText("申请条件：\n1. 当天新注册用户，需先绑定好手机号码，银行卡(ip关联2个以下)。\n2. 实名限制2及2个以上不符合。\n3. 只限游戏（财神到，水果机，捕鱼，百人牛牛，红包乱斗，二八杠，21点，奔驰宝马）。\n4. 每个账号一天只限第一次充值（如果遇到无法一笔充值达到有效的档位，可充值两次以上）\n充值成功未下注之前找专线客服专员申请。\n5. 每一个账号（同一ip，同一设备，同一姓名）视为一个账号，只能申请一次。\n6. 本活动最终解释权归德比所有。")
    }   
}
