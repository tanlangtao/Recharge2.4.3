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
        let content= cc.find('Canvas/Activity/Content/Fxpyq3/bg/ScrollView/view/content/content')

        this.app.loadIconLg(`${src}/activeBigImage/event12_fxpyq_content`,content)

        let label1= cc.find('Canvas/Activity/Content/Fxpyq3/bg/ScrollView/view/content/content/label1').getComponent(cc.Label)
        let label2= cc.find('Canvas/Activity/Content/Fxpyq3/bg/ScrollView/view/content/content/label2').getComponent(cc.Label)
        let label3= cc.find('Canvas/Activity/Content/Fxpyq3/bg/ScrollView/view/content/content/label3').getComponent(cc.Label)
        let label4= cc.find('Canvas/Activity/Content/Fxpyq3/bg/ScrollView/view/content/content/label4').getComponent(cc.Label)
        let title1= cc.find('Canvas/Activity/Content/Fxpyq3/bg/ScrollView/view/content/content/group1/title1').getComponent(cc.Label)
        let title2= cc.find('Canvas/Activity/Content/Fxpyq3/bg/ScrollView/view/content/content/group2/title2').getComponent(cc.Label)
        let title3= cc.find('Canvas/Activity/Content/Fxpyq3/bg/ScrollView/view/content/content/group3/title3').getComponent(cc.Label)
        let title4= cc.find('Canvas/Activity/Content/Fxpyq3/bg/ScrollView/view/content/content/group4/title4').getComponent(cc.Label)
        let title5= cc.find('Canvas/Activity/Content/Fxpyq3/bg/ScrollView/view/content/content/group4/title5').getComponent(cc.Label)

        label1.string = Language_pay.Lg.ChangeByText("1. 分享内容：佣金领取截图 活动图 游戏赢分截图 业绩图 游戏邀请二维码。\n 2. 每日分享朋友圈, 超过12小时, 屏蔽人数不能超过5人, 满12小时后隔天, 录屏审核。")
        label2.string = Language_pay.Lg.ChangeByText("审核要求，提供ID，要求微信人数跟当日佣金达到以上要求，录制视屏昨日朋友圈所发内容跟微信人数仅此我这条线下面的ID。\n 所领取的每日工资，赠送的金币一倍流水即可兑换。\n 此活动不能跟官网优惠活动同时申请。")
        label3.string = Language_pay.Lg.ChangeByText("1. 点开微信，并结束微信进程。\n 2. 打开 '微信' ，点击聊天页随意找到一个好友，点击对方头像进入对方朋友圈。\n 3. 点击通讯录，并将通讯录翻至最底部显示好友人数。\n 4. 请您点击 '发现' 进入朋友圈，点击自己朋友圈的头像进入自己的朋友圈，并点击昨日分享的朋友圈进入查看朋友圈状态。\n 5. 点击 '我' 页面，点击 '支付' 页面。进入两秒后退出。")
        label4.string = Language_pay.Lg.ChangeByText("所有代理连续申请该活动3天没有明显且真实的推广效果, 公司将关闭此id所有代理活动的申请权限！")
        title1.string = Language_pay.Lg.ChangeByText('昨日领取佣金')
        title2.string = Language_pay.Lg.ChangeByText('好友人数')
        title3.string = Language_pay.Lg.ChangeByText('当日分享彩金(朋友圈)')
        title4.string = Language_pay.Lg.ChangeByText('申请方式')
        title5.string = Language_pay.Lg.ChangeByText('联系代理客服/代理专员查询即可领取')
    }   
}
