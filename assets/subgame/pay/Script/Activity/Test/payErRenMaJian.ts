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
        let bg= cc.find('Canvas/Activity/Content/ErRenMaJian/bg')

        this.app.loadIconLg(`${src}/activeBigImage/jincaihuodong_2rmj_20201123`,bg)

        let label= cc.find('Canvas/Activity/Content/ErRenMaJian/label').getComponent(cc.Label)
        label.string = Language_pay.Lg.ChangeByText("1、推荐一个人，玩20局，奖励10元。\n2、连续7天，每日玩初级场20局，奖励188元。\n3、每日体验场赢局数达到30局，奖励30元。\n4、每日初级场赢局数达到30局，奖励50元。\n5、完成任务即可联系客服申请彩金。\n6、彩金限制一倍流水兑换。\n7、本活动无法与每日救援金同时参与。\n8、本活动最终解释权归平台所有，平台有随时更改，停止并取消该活动的权利。\n9、同设备、同IP、账号异常、对刷套利者扣除收益一律封号处理。")
    }
}
