
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    frame: cc.Node = null;

    @property(cc.Node)
    Detail: cc.Node = null;

    isUp :boolean = false;
    onLoad(){

    }
    //点击活动说明
    onClick(){
        if(!this.isUp){
            this.moveUp()
        }else{
            this.moveDown()
        }
        this.isUp = !this.isUp
    }
    bgClick(){
        this.moveDown()
        this.isUp = false
    }
    moveUp(){
        let action = cc.moveTo(0.5,cc.v2(0,-100))
        this.Detail.runAction(action)
        var fadeA = cc.fadeOut(1)
        this.frame.runAction(fadeA)
    }
    moveDown(){
        let action = cc.moveTo(0.5,cc.v2(0,-420))
        this.Detail.runAction(action)
        var fadeA = cc.fadeIn(1)
        this.frame.runAction(fadeA)
    }
}
