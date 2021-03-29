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
        let bg= cc.find('Canvas/Activity/Content/ZhiShuYongHuFuChi/bg')

        this.app.loadIconLg(`${src}/activeBigImage/jincaihuodong_page6`,bg)

        let label1= cc.find('Canvas/Activity/Content/ZhiShuYongHuFuChi/group1/label1').getComponent(cc.Label)
        let label2= cc.find('Canvas/Activity/Content/ZhiShuYongHuFuChi/group1/label2').getComponent(cc.Label)
        let label3= cc.find('Canvas/Activity/Content/ZhiShuYongHuFuChi/group2/label3').getComponent(cc.Label)
        let label4= cc.find('Canvas/Activity/Content/ZhiShuYongHuFuChi/group2/label4').getComponent(cc.Label)
        let label5= cc.find('Canvas/Activity/Content/ZhiShuYongHuFuChi/group3/label5').getComponent(cc.Label)
        let label6= cc.find('Canvas/Activity/Content/ZhiShuYongHuFuChi/group3/label6').getComponent(cc.Label)
        let label7= cc.find('Canvas/Activity/Content/ZhiShuYongHuFuChi/group4/label7').getComponent(cc.Label)
        let label8= cc.find('Canvas/Activity/Content/ZhiShuYongHuFuChi/group4/label8').getComponent(cc.Label)
        let label9= cc.find('Canvas/Activity/Content/ZhiShuYongHuFuChi/label9').getComponent(cc.Label)

        label1.string = Language_pay.Lg.ChangeByText("每日发展直属新充值用户")
        label2.string = Language_pay.Lg.ChangeByText("领取金额")
        label3.string = `5${Language_pay.Lg.ChangeByText("人")}`
        label4.string = `38${Language_pay.Lg.ChangeByText("元")}`
        label5.string = `10${Language_pay.Lg.ChangeByText("人")}`
        label6.string = `88${Language_pay.Lg.ChangeByText("元")}`
        label7.string = `20${Language_pay.Lg.ChangeByText("人")}`
        label8.string = `188${Language_pay.Lg.ChangeByText("元")}`
        label9.string = Language_pay.Lg.ChangeByText("1. 同设备、同IP、账号异常、对刷套利者扣除收益一律封号处理\n2. 满足条件可联系客服领取")
    }
}
