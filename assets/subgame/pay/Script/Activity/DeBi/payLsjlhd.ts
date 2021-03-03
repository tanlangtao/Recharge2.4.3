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
        let lshd_title= cc.find('Canvas/Activity/Content/Lsjlhd/bg/lshd_title')
        let lshd_content= cc.find('Canvas/Activity/Content/Lsjlhd/bg/lshd_content')

        this.app.loadIconLg(`${src}/activeSprite/lshd_title`,lshd_title)
        this.app.loadIconLg(`${src}/activeSprite/lshd_content`,lshd_content)

        let label1= cc.find('Canvas/Activity/Content/Lsjlhd/bg/label1').getComponent(cc.RichText)
        label1.string = Language_pay.Lg.ChangeByText("<color=#FFFD9C>1. 平台会根据用户每天产生的流水金额按照对应比例进行返水。\n2. 流水金额统计截止每日23:59:59，</c><color=#FF000>仅限棋牌类游戏</c> 。\n3. 请于次日中午12点-17点找客服领取, 未领取视为自动放弃。</color>")
    }   
}
