
import notification from "./ZJHnet/ZJHNotification"
import Event from "./ZJHnet/ZJHEventCustom"
import msgSender from "./ZJHnet/ZJHmsgSender"
import comTools = require("./ZJHCommonTool")
const {ccclass, property} = cc._decorator;

@ccclass
export default class ZJHMagicEmoji extends cc.Component {

    @property(cc.Label)
    nick: cc.Label = null;

    @property(cc.Label)
    money: cc.Label = null;

    @property(cc.Sprite)
    headImg: cc.Sprite = null;

    @property([cc.Node])
    emojis: cc.Node []= [null];

    @property
    speed:number = 0.2;

    @property
    canTouch:boolean = true;

    @property
    _parent:any = null;

    @property
    _chair:number = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._parent = this.node.getParent().getComponent("ZJHGame")
        this.btnEvent();
    }

    initView(data: any){
        this.money.string = ""+comTools.cutNum(data.money,2);
        this.nick.string = ""+data.nick;
        this._chair = data.chair
        if(CC_BUILD){
            cc.loader.load(data.headUrl,function (err, texture) {
                if(!texture){
                    return;
                }
                var frame = new cc.SpriteFrame(texture);
                this.headImg.spriteFrame = frame;
            });
        }
    }

    btnEvent(){
        for(let i=0; i<this.emojis.length; ++i){
            this.emojis[i].on('touchend',()=>{
                if(!this.canTouch){
                    notification.sendNotify(Event.EVENT_SHOW_TOAST,"聊天过于频繁!")
                    return; 
                }
                msgSender.interactExpression(this._chair,i)
                this.canTouch = false;
            },this);
        }
    }

    _updateFillRange(sprite,dt) {
        var fillRange = sprite.fillRange;
        fillRange = fillRange > 0 ? fillRange -= (dt * this.speed) : 0;
        sprite.fillRange = fillRange;
    }

    update (dt) {
        if(!this.canTouch){
            for(let i=0; i<this.emojis.length; ++i){
                let time = this.emojis[i].getChildByName("sstime")
                time.active = true;
                let spr = time.getComponent(cc.Sprite);
                this._updateFillRange(spr,dt);
                if(spr.fillRange == 0){
                    spr.fillRange = 1;
                    this.canTouch = true;
                    time.active = false;
                }
            }
            
        }

    }
}
