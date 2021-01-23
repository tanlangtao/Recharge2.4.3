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
        let bg= cc.find('Canvas/Activity/Content/HalfMonthGift/bg')

        this.app.loadIconLg(`${src}/activeBigImage/event_58for15days_content`,bg)

        let label1= cc.find('Canvas/Activity/Content/HalfMonthGift/bg/label1').getComponent(cc.Label)
        let label2= cc.find('Canvas/Activity/Content/HalfMonthGift/bg/label2').getComponent(cc.Label)
        let label3= cc.find('Canvas/Activity/Content/HalfMonthGift/bg/label3').getComponent(cc.Label)

        label1.string = Language_pay.Lg.ChangeByText('1. 半月存款过三次金额累计到达300元以上, 每半个月可领一次。')
        label2.string = Language_pay.Lg.ChangeByText('2. 流水要求一倍, 每个账号同 (手机-姓名-IP) 只允许一个账号申请。')
        label3.string = Language_pay.Lg.ChangeByText('3. 彩金发放时间为1号和16号, 如期间未联系客服领取视为放弃。')
    }
}
