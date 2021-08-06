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
        let bg= cc.find('Canvas/Activity/Content/RedRain/bg')
        let jifen= cc.find('Canvas/Activity/Content/RedRain/bg/ScrollView/view/content/jifen')
        let huodong= cc.find('Canvas/Activity/Content/RedRain/bg/ScrollView/view/content/huodong')

        if(this.app.UrlData.package_id == 8 ||this.app.UrlData.package_id == 9 || this.app.UrlData.package_id == 12){
            this.app.loadIconLg(`${src}/activeBigImage/hongbaoyu`,bg.getChildByName('hongbaoyu'))
        }else if(this.app.UrlData.package_id == 11 ){
            this.app.loadIconLg(`${src}/activeBigImage/hongbaoyu11`,bg)
        }else{
            this.app.loadIconLg(`${src}/activeBigImage/hongbaoyu`,bg)
            this.app.loadIconLg(`${src}/activeSprite/jifen`,jifen)
        }
        this.app.loadIconLg(`${src}/activeSprite/huodong`,huodong)

        let label1= cc.find('Canvas/Activity/Content/RedRain/bg/ScrollView/view/content/kuang2/line1/label1').getComponent(cc.Label)
        let label2= cc.find('Canvas/Activity/Content/RedRain/bg/ScrollView/view/content/kuang2/line1/label2').getComponent(cc.Label)
        let label3= cc.find('Canvas/Activity/Content/RedRain/bg/ScrollView/view/content/kuang2/line1/label3').getComponent(cc.Label)
        let label4= cc.find('Canvas/Activity/Content/RedRain/bg/ScrollView/view/content/kuang2/line1/label4').getComponent(cc.Label)
        let label5= cc.find('Canvas/Activity/Content/RedRain/bg/ScrollView/view/content/kuang2/line1/label5').getComponent(cc.Label)
        let label6= cc.find('Canvas/Activity/Content/RedRain/bg/ScrollView/view/content/kuang2/line1/label6').getComponent(cc.Label)
        let label7= cc.find('Canvas/Activity/Content/RedRain/bg/ScrollView/view/content/kuang2/line1/label7').getComponent(cc.Label)
        let label8= cc.find('Canvas/Activity/Content/RedRain/bg/ScrollView/view/content/kuang2/line1/label8').getComponent(cc.Label)
        let label9= cc.find('Canvas/Activity/Content/RedRain/bg/ScrollView/view/content/kuang2/line1/label9').getComponent(cc.Label)
        let label10= cc.find('Canvas/Activity/Content/RedRain/bg/ScrollView/view/content/kuang2/line2/label10').getComponent(cc.Label)
        let label11= cc.find('Canvas/Activity/Content/RedRain/bg/ScrollView/view/content/kuang2/line3/label11').getComponent(cc.Label)
        let label12= cc.find('Canvas/Activity/Content/RedRain/bg/ScrollView/view/content/kuang2/line4/label12').getComponent(cc.Label)
        let label13= cc.find('Canvas/Activity/Content/RedRain/bg/ScrollView/view/content/kuang2/line5/label13').getComponent(cc.Label)
        let label14= cc.find('Canvas/Activity/Content/RedRain/bg/ScrollView/view/content/kuang2/line2/label14').getComponent(cc.Label)
        let label15= cc.find('Canvas/Activity/Content/RedRain/bg/ScrollView/view/content/frame_1/label15').getComponent(cc.Label)

        label1.string = Language_pay.Lg.ChangeByText('四季发财红包雨')
        label2.string = Language_pay.Lg.ChangeByText("下雨时间\n每场15分钟")
        label3.string = Language_pay.Lg.ChangeByText('领取条件')
        label4.string = Language_pay.Lg.ChangeByText('充值')
        label5.string = Language_pay.Lg.ChangeByText('流水')
        label6.string = Language_pay.Lg.ChangeByText('红包总额')
        label7.string = Language_pay.Lg.ChangeByText('最小红包')
        label8.string = Language_pay.Lg.ChangeByText('财神红包')
        label9.string = Language_pay.Lg.ChangeByText('流水要求')
        label10.string = Language_pay.Lg.ChangeByText('春雨')
        label11.string = Language_pay.Lg.ChangeByText('夏雨')
        label12.string = Language_pay.Lg.ChangeByText('秋雨')
        label13.string = Language_pay.Lg.ChangeByText('冬雨')
        label14.string = Language_pay.Lg.ChangeByText('一倍流水')
        if(this.app.UrlData.package_id==11){
            label14.string = Language_pay.Lg.ChangeByText('3倍流水')
            label15.string = Language_pay.Lg.ChangeByText("1.每场红包雨下雨时间前达成领取条件, 即可参加这一场红包雨。\n2.每场雨可随机获得最小红包至财神红包数额区间的随机数额红包。\n3.当日存款、流水可累计, 所获红包三倍流水即可兑换。")
        }else{
            label15.string = Language_pay.Lg.ChangeByText("1.每场红包雨下雨时间前达成领取条件, 即可参加这一场红包雨。\n2.每场雨可随机获得最小红包至财神红包数额区间的随机数额红包。\n3.当日存款、流水可累计, 所获红包一倍流水即可兑换。")
        }
        
    }   
}
