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
        let bg= cc.find('Canvas/Activity/Content/NewPlayerGift/bg')
        let event_starterPack_rule= cc.find('Canvas/Activity/Content/NewPlayerGift/bg/event_kuang1/event_starterPack_rule')

        this.app.loadIconLg(`${src}/activeBigImage/event_starterPack_content`,bg)
        this.app.loadIconLg(`${src}/activeSprite/event_starterPack_rule`,event_starterPack_rule)

        let label1= cc.find('Canvas/Activity/Content/NewPlayerGift/bg/event_kuang1/label').getComponent(cc.Label)

        label1.string = Language_pay.Lg.ChangeByText("在游戏首页点击 (全民代理) 到 (月入百万) 页面, 保存二维码和截图此页面图片, 分享到微信朋友圈24小时, 收集5个赞, 满足分享条件请联系在线客服申请彩金。每个申请用户需绑定好 (银行卡) 方便提现, 一个微信每15天可申请一次 。")
    }
}
