import { Language_pay } from "../language/payLanguage";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    app= null;
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.setLanguageResource()
    }
    removeSelf() {
            //按键音效
        this.app.loadMusic(1);

        this.node.destroy();
    }
      //设置语言相关的资源和字
      setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        let title= cc.find('Canvas/TihuoDoneAlert/content/title')
        let zi_done= cc.find('Canvas/TihuoDoneAlert/content/zi_done')

        this.app.loadIconLg(`${src}/activeSprite/zi_congrat`,title)
        this.app.loadIconLg(`${src}/activeSprite/zi_done`,zi_done)
    }
    // update (dt) {}
}
