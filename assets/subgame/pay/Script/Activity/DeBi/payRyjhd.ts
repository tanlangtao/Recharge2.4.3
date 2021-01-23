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
        let bg= cc.find('Canvas/Activity/Content/Ryjhd/bg')

        this.app.loadIconLg(`${src}/activeBigImage/event5_ryjhd_content`,bg)

        let label1= cc.find('Canvas/Activity/Content/Ryjhd/bg/group/label1').getComponent(cc.Label)
        let label2= cc.find('Canvas/Activity/Content/Ryjhd/bg/group/label2').getComponent(cc.Label)
        let label3= cc.find('Canvas/Activity/Content/Ryjhd/bg/group/label3').getComponent(cc.Label)
        let label4= cc.find('Canvas/Activity/Content/Ryjhd/bg/label4').getComponent(cc.Label)
        let rule= cc.find('Canvas/Activity/Content/Ryjhd/bg/label5').getComponent(cc.Label)

        label1.string = Language_pay.Lg.ChangeByText('日业绩')
        label2.string = Language_pay.Lg.ChangeByText('扶持金')
        label3.string = Language_pay.Lg.ChangeByText('(大福利)')
        label4.string = Language_pay.Lg.ChangeByText('合作共赢，代理直属业绩达到后找上级进行申请领取，刷子团队请绕道。')
        rule.string = Language_pay.Lg.ChangeByText("注: 解释权归德比棋牌所有。")
    }   
}
