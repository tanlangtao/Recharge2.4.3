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
        let bg= cc.find('Canvas/Activity/Content/Stjzhd/bg/ScrollView/view/content/bg')
        
        this.app.loadIconLg(`${src}/activeBigImage/event_stjzhd_content`,bg)

        let label1= cc.find('Canvas/Activity/Content/Stjzhd/bg/ScrollView/view/group1/group1/label1').getComponent(cc.Label)
        let label2= cc.find('Canvas/Activity/Content/Stjzhd/bg/ScrollView/view/group1/group2/label2').getComponent(cc.Label)
        let label3= cc.find('Canvas/Activity/Content/Stjzhd/bg/ScrollView/view/group1/group3/label3').getComponent(cc.Label)
        let label4= cc.find('Canvas/Activity/Content/Stjzhd/bg/ScrollView/view/group1/group3/label4').getComponent(cc.Label)
        let label5= cc.find('Canvas/Activity/Content/Stjzhd/bg/ScrollView/view/group1/group4/label5').getComponent(cc.Label)
        let label6= cc.find('Canvas/Activity/Content/Stjzhd/bg/ScrollView/view/group1/group4/label6').getComponent(cc.Label)
        let label7= cc.find('Canvas/Activity/Content/Stjzhd/bg/ScrollView/view/group2/label7').getComponent(cc.Label)

        label1.string = Language_pay.Lg.ChangeByText('首次提款金额')
        label2.string = Language_pay.Lg.ChangeByText('赠送彩金')
        label3.string = Language_pay.Lg.ChangeByText('流水要求')
        label4.string = Language_pay.Lg.ChangeByText('一倍流水')
        label5.string = Language_pay.Lg.ChangeByText('领取方式')
        label6.string = Language_pay.Lg.ChangeByText('联系客服领取')
        label7.string = Language_pay.Lg.ChangeByText("1. 所获彩金需要一倍流水即可提领, 每个会员按首次提款金额可以申请相对应的金币福利。\n2. 请于次日中午12点-17点找客服领取，未领取视为自动放弃。\n3. 每位玩家、每一电话号码、及相同IP地址只能享有一次优惠。若会员有重复申请账号行为, 公司保留取消\n    或收回会员优惠彩金的权利。\n4.【德比游戏】保留对活动的最终解释权以及在无通知的情况下修改、终止活动的规则、适用于所有优惠。")
    }   
}
