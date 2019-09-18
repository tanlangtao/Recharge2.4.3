// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Node)
    iconSprite: cc.Node = null;

    @property()
    app = null;
    data = null;
    isClick =null;
    init(data,index){
        this.nameLabel.string = `${data.nick_name}`,
        this.data = data;
        this.app = cc.find('Canvas/Main').getComponent('Main');
        this.app.loadIcon(`icon/${index%7+1}`,this.iconSprite,60,60)
    }

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('Main');
    }

   onClick(){
        //按键音效
        this.app.clickClip.play();
        this.app.showWriteMoneyAlert(this,1,this.data);
        
   }
}

