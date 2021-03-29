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
        let smcjhd= cc.find('Canvas/Activity/Content/Smcj/bg/smcjhd')
        let zi= cc.find('Canvas/Activity/Content/Smcj/bg/d_1/zi')
        
        this.app.loadIconLg(`${src}/activeSprite/smcjhd`,smcjhd)
        this.app.loadIconLg(`${src}/activeSprite/zi`,zi)

        let label= cc.find('Canvas/Activity/Content/Smcj/bg/d_1/label').getComponent(cc.Label)

        label.string = Language_pay.Lg.ChangeByText('只要您在本平台注册过账号, 或者曾经登录过本平台, 都将有可能收到我们为您随机派发的神秘惊喜彩金, 彩金将由系统自动发送到您的账户, 敬请关注。')
    }   
}
