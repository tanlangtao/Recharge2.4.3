
import comTools = require("./ZJHCommonTool");
const {ccclass, property} = cc._decorator;

@ccclass
export default class ZJHFlyNum extends cc.Component {

    @property(cc.Node)
    money: cc.Node = null;

    @property(cc.SpriteAtlas)
    atlas: cc.SpriteAtlas = null;

    @property(cc.Node)
    spr: cc.Node = null;

    @property(cc.Node)
    bg: cc.Node = null;

    @property(cc.LabelAtlas)
    labelWin:cc.LabelAtlas = null;

    @property(cc.LabelAtlas)
    labelLose:cc.LabelAtlas = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    create(value: number){
        let sprUrl = value > 0 ? "golden_plus" : "silver_minus";
        let LabelUrl = value > 0 ? this.labelWin : this.labelLose;
        let bgUrl = value > 0 ? "p_eff_win" : "p_eff_lose";
        value = value > 0 ? value : -value;
        value = Math.round(value*100)/100;
        let newValue = String(value).replace(".","/");
        this.money.getComponent(cc.Label).string = newValue;
        this.money.getComponent(cc.Label).font = LabelUrl;
        this.spr.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame(sprUrl)
        this.bg.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame(bgUrl)
    }

    start () {

    }

    // update (dt) {}
}
