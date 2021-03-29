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
        let bg= cc.find('Canvas/Activity/Content/NewPlayerCunSong/bg')
        let txt_warning= cc.find('Canvas/Activity/Content/NewPlayerCunSong/txt_warning')

        this.app.loadIconLg(`${src}/activeBigImage/dm_new`,bg)
        this.app.loadIconLg(`${src}/activeSprite/txt_warning`,txt_warning)

        let label1= cc.find('Canvas/Activity/Content/NewPlayerCunSong/label1').getComponent(cc.Label)
        let label2= cc.find('Canvas/Activity/Content/NewPlayerCunSong/label2').getComponent(cc.Label)
        let label3= cc.find('Canvas/Activity/Content/NewPlayerCunSong/label3').getComponent(cc.Label)
        label1.string = Language_pay.Lg.ChangeByText("活动说明：")
        label2.string = Language_pay.Lg.ChangeByText("1. 活动仅限下述玩法：水果机、海王捕鱼、财神到。")
        label3.string = Language_pay.Lg.ChangeByText("2. 领取方式：联系客服领取，若首存后未申请视同放弃。\n3. 如领取后下注未规定的游戏, 则清除盈利和流水, 重新打码。\n4. 首存活动领取后如需要娱乐其他游戏, 需要兑换后再充值进行游戏。\n5. 当天禁止同时参与平台内其他活动。\n6. 同设备、同IP、账号异常、对刷套利者扣除收益并一律封号处理。\n7. 兑换需在规定游戏内达到本金的三倍流水加彩金的五倍流水。")
    }
}
