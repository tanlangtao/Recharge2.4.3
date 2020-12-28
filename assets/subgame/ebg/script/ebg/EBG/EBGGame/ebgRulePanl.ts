/**ebg游戏走势 */
import Utils from '../untils/ebgUtils';
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    private width :number = null;
    onLoad(){
        this.addBtnHandler('ScrollView/btn_rule');
        this.width = cc.sys.getSafeAreaRect().width;
    }
    public addBtnHandler(btnName :string):void {
        var btn = cc.find("Canvas/RulePanl/" + btnName);
        Utils.addClickEvent(btn, this.node, "ebgRulePanl", "onBtnClicked");
    }

    onBtnClicked(event: cc.Event){
        var btnName = event.target.name;
        if(btnName == 'btn_rule'){
            this.moveToRight()
        }
    }

    moveToRight():void{
        var action1 = cc.moveTo(0.2, cc.v2(1336, 0));
        var action2 = cc.moveTo(0, cc.v2(1336, 0));
        let callfunc = cc.callFunc(() => {
            this.moveCallFn();
        }, this)
        var action = cc.sequence(action1,action2,callfunc)

        this.node.runAction(action)
    }

    moveToLeft():void{
        var action1 = cc.moveTo(0.2, cc.v2(this.width/2, 0));
        var action2 = cc.moveTo(0, cc.v2(this.width/2, 0));
        let callfunc = cc.callFunc(() => {
            this.moveCallFn();
        }, this)
        var action = cc.sequence(action1,action2,callfunc)
        this.node.runAction(action)
    }
    moveCallFn(){

    }
}
