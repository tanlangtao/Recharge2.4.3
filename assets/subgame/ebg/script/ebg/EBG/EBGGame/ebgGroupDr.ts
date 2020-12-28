//  下注区域

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    headbg: cc.Node = null;

    @property(cc.Node)
    footbg: cc.Node = null;

    @property(cc.Label)
    Label_myBets: cc.Label = null;

    @property(cc.Label)
    Label_totalBets: cc.Label = null;

    @property(cc.Node)
    chips: cc.Node = null;

    @property(cc.Node)
    he : cc.Node = null;
    
    @property(cc.Node)
    xiazhuwin: cc.Node= null;//赢

    onLoad () {
    }
    //赢钱闪烁效果
    public showWinBg():void{
        this.xiazhuwin.active = true;
        var action = cc.blink(2, 5);
        this.xiazhuwin.runAction(action)
    }
    public hideWinBg():void{
        this.xiazhuwin.active = false;
    }
     //和
    public showHe():void{
        this.he.active = true;
    }
     //和
     public hideHe():void{
        this.he.active = false;
    }
    public clear() {
        this.Label_myBets.string= ''
        this.Label_totalBets.string= ''
        this.headbg.active = false;
        this.footbg.active = false;
    }
    // update (dt) {}
}
