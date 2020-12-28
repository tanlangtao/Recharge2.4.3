/*erb麻将*/
const { ccclass, property } = cc._decorator;

@ccclass
export default class ebgCardItem extends cc.Component {

    @property(cc.SpriteFrame)
    bgFrame: cc.SpriteFrame = null;

    value: number = 10;//牌值

    start() {
        this.node.scale = 1;//控制大小
    }
    // update (dt) {}
}
